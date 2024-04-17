import { axiosInstance } from '../axios';
import { type Post } from '@/types/Post';

export const getPost = async (id: string): Promise<Post> => {
  const response = await axiosInstance.get(`/posts/${id}`);

  return response.data;
};
