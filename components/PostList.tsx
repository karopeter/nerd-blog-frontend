'use client';

import { usePosts } from '@/hooks/usePosts';
import PostCard from './PostCard';
import LoadingState from './LoadingState';
import ErrorState from '../ErrorState'
import EmptyState from '../EmptyState';
import Pagination from './Pagination';
import { usePostStore } from '@/store/usePostStore';

export default function PostList() {
  const { searchQuery } = usePostStore();
  const { data, isLoading, error, refetch } = usePosts();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Failed to load posts'}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data || data.data.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  return (
    <div className="space-y-8">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.data.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination pagination={data.pagination} />
    </div>
  );
}