import Dexie, { type Table } from 'dexie';
import { type Post } from '@/types/Post';

export const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 1000));

export class MySubClassedDexie extends Dexie {
  posts!: Table<Post>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      posts: '++id, title, body',
    });
  }
}

export const db = new MySubClassedDexie();
