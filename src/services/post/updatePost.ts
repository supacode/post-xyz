import type { Post } from '@/types/Post';
import { axiosInstance } from '../axios';

export const updatePost = async ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}): Promise<Post> => {
  const { data } = await axiosInstance.patch<Post>(`/posts/${id}`, { title, body });

  return data;
};
