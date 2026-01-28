"use client";

import { useQuery } from "@tanstack/react-query";
import { postsApi } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import LoadingState from "@/components/LoadingState";
import PostDetail from "@/components/PostDetail";
import ErrorState from "@/ErrorState";

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postsApi.getPostById(postId),
  });

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !post) {
    return (
     <ErrorState
       message={error instanceof Error ? error.message : 'Post not found'}
       onRetry={() => router.back()}
     />
    );
  }

  return <PostDetail post={post} />;
}