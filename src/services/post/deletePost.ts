import { axiosInstance } from '../axios';

export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${id}`);
};
