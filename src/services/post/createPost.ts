import type { Post } from '@/types/Post';
import { axiosInstance } from '../axios';

export const createPost = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}): Promise<Post> => {
  const { data } = await axiosInstance.post<Post>('/posts', { title, body });

  return data;
};

const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${id}`);
};
