import { useQuery } from '@tanstack/vue-query';
import { getPost } from '@/services/post/getPost';

export const useGetPost = (postId: string) => {
  const queryKey = ['post', postId];
  const queryFn = () => getPost(postId);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn,
  });

  return { post, isLoading, error };
};
