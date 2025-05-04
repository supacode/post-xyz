import { db, simulateLatency } from '../db';
import { type Post } from '@/types/Post';

export const getPost = async (id: string): Promise<Post | undefined> => {
  try {
    await simulateLatency();
    const post = await db.posts.get(Number(id));
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};
