'use client';

import { Post } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  // Get cover image - prioritize images array, fallback to coverImage, then default
  const coverImageUrl = post.images && post.images.length > 0 
    ? post.images[0] 
    : post.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';

  // Check if post has multiple images
  const hasMultipleImages = post.images && post.images.length > 1;
  const imageCount = post.images?.length || 0;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <Image
          src={coverImageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Image Count Badge */}
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span>{imageCount}</span>
          </div>
        )}

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              +{post.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-1 text-sm leading-relaxed">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {getInitials(post.author)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {post.author}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>

          <Link
           href={`/posts/${post._id}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-3 transition-all"
            aria-label={`Read more about ${post.title}`}
          >
            <span>Read</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}