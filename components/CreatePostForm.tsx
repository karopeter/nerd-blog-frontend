'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '@/hooks/usePosts';
import { createPostSchema, type CreatePostFormData } from '@/Schema/schema';
import ImageUpload from './ImageUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface CreatePostFormProps {
  onCloseAction: () => void;
}

export default function CreatePostForm({ onCloseAction }: CreatePostFormProps) {
  const createPost = useCreatePost();
  const [images, setImages] = useState<File[]>([]);

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      author: '',
      excerpt: '',
      content: '',
      tags: '',
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('excerpt', data.excerpt);
      formData.append('content', data.content);
      formData.append('tags', data.tags);

      images.forEach((image) => {
        formData.append('images', image);
      });

      await createPost.mutateAsync(formData);
      
      form.reset();
      setImages([]);
      onCloseAction();
    } catch (error) {
      console.error('Post creation error:', error);
    }
  };

const titleLength = useWatch({ control: form.control, name: 'title' })?.length || 0;
const excerptLength = useWatch({ control: form.control, name: 'excerpt' })?.length || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onCloseAction}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          
          {/* Decorative Header Background */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-10 pointer-events-none" />
          
          {/* Header */}
          <div className="relative border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  
                  {/* Title & Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      Create New Post
                    </h2>
                    <p className="text-sm text-gray-600">
                      Share your tech insights, tutorials, and stories with the nerd community
                    </p>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={onCloseAction}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 py-6">
                <div className="space-y-6">
                  
                  {/* Title Field */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel className="text-sm font-semibold text-gray-900">
                            Post Title *
                          </FormLabel>
                          <span className={`text-xs ${titleLength > 200 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                            {titleLength}/200
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="e.g., 10 Essential VS Code Extensions for Web Developers"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Author Field */}
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Author *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name or username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Excerpt Field */}
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel className="text-sm font-semibold text-gray-900">
                            Excerpt *
                          </FormLabel>
                          <span className={`text-xs ${excerptLength > 300 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                            {excerptLength}/300
                          </span>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Write a compelling summary that will appear on the post card..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          💡 Tip: Make it catchy to attract readers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Content Field */}
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Content *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your full post content here... Share your knowledge, experiences, and insights!"
                            rows={10}
                            className="font-mono text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Images Upload */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-900 block mb-1">
                        Post Images
                      </label>
                      <p className="text-xs text-gray-600">
                        📸 Upload up to 5 images (max 5MB each). First image becomes the cover.
                      </p>
                    </div>
                    <ImageUpload
                      value={images}
                      onChangeAction={(files) => {
                        setImages(files);
                      }}
                      maxFiles={5}
                      maxSizeMB={5}
                    />
                  </div>

                  {/* Tags Field */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Tags
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="javascript, react, typescript, tutorial, gaming"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          🏷️ Separate tags with commas. Helps readers discover your post!
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Action Buttons - Sticky Footer */}
                <div className="sticky bottom-0 -mx-8 -mb-6 mt-8 px-8 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                  <button
                    type="button"
                    onClick={onCloseAction}
                    disabled={createPost.isPending}
                    className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createPost.isPending}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {createPost.isPending ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Publish Post</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}