import { useQuery } from '@tanstack/vue-query';
import { getPost } from '@/services/post/getPost';

export const useGetPost = (postId: string) => {
  const queryKey = ['post', postId];
  const queryFn = async () => {
    const post = await getPost(postId);
    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }
    return post;
  };

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
