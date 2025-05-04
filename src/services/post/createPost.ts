import { db, simulateLatency } from '../db';

export const createPost = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}): Promise<number> => {
  await simulateLatency();
  const id = await db.posts.add({ title, body });
  return id;
};
