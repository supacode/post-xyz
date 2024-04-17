import { axiosInstance } from '../axios';
import { type Post } from '@/types/Post';

interface PostQueryParams {
  _limit?: number;
  _page?: number;
}

export const getPosts = async (params?: PostQueryParams): Promise<Post[]> => {
  const response = await axiosInstance.get('/posts', {
    params: {
      ...params,
    },
  });

  return response.data;
};
