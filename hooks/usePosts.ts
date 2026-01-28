import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/lib/api';
import { usePostStore } from '@/store/usePostStore';
import { themedToast } from '@/lib/toast';

export const usePosts = () => {
  const { currentPage, searchQuery, limit } = usePostStore();

  return useQuery({
    queryKey: ['posts', currentPage, searchQuery, limit],
    queryFn: () => postsApi.getPosts({ page: currentPage, limit, search: searchQuery }),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postsApi.createPost(formData),
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      
      themedToast.success("Post created successfully!", {
        description: "Your post has been published to the community.",
      });
    },
    onError: (error: Error) => {
      themedToast.error("Failed to create post", {
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });
};