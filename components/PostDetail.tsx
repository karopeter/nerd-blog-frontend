'use client';

import { Post } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const images = post.images && post.images.length > 0 ? post.images : post.coverImage ? [post.coverImage] : [];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Header with Back Button */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to posts</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {getInitials(post.author)}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-600">{formatDate(post.createdAt)}</p>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mb-12">
            {/* Main Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-4 bg-gray-100">
              <Image
                src={images[selectedImage]}
                alt={`${post.title} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
                priority
              />
              {hasMultipleImages && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-4 ring-blue-600 scale-105'
                        : 'ring-2 ring-gray-200 hover:ring-blue-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Excerpt */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
          <p className="text-lg text-gray-800 italic leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
              {post.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
                {getInitials(post.author)}
              </div>
              <div>
                <p className="text-sm text-gray-600">Written by</p>
                <p className="text-lg font-semibold text-gray-900">{post.author}</p>
              </div>
            </div>

            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Back to Posts
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}