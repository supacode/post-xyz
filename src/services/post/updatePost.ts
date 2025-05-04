import { db, simulateLatency } from '../db';

export const updatePost = async ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}): Promise<number> => {
  await simulateLatency();
  const updatedCount = await db.posts.update(Number(id), { title, body });
  return updatedCount;
};
