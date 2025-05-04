import { db, simulateLatency } from '../db';
import { type Post } from '@/types/Post';

export const getPosts = async (): Promise<Post[]> => {
  try {
    await simulateLatency();
    const posts = await db.posts.toArray();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
