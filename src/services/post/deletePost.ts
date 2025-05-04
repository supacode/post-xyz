import { db, simulateLatency } from '../db';

export const deletePost = async (id: number): Promise<void> => {
  await simulateLatency();
  await db.posts.delete(id);
};
