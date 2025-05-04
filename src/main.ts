import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createNotivue } from 'notivue';

import App from './App.vue';
import router from './router';
import { i18n } from './localization/i18next';
import './assets/style.scss';

import 'notivue/notification.css';
import 'notivue/animations.css';

import { db } from './services/db';

const testDatabase = async () => {
  try {
    const testId = await db.posts.add({
      title: 'Test Post',
      body: 'This is a test post.',
    });

    await db.posts.delete(testId);
  } catch (error) {
    console.error('Database test failed:', error);
  }
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Check if IndexedDB is supported
    if (!window.indexedDB) {
      console.error('IndexedDB is not supported in this browser');
      return;
    }

    await testDatabase();

    const postsCount = await db.posts.count();
    console.log(`Current posts count: ${postsCount}`);

    if (postsCount === 0) {
      console.log('Database is empty, adding seed data...');
      await db.posts.bulkAdd([
        {
          title: 'First Post',
          body: 'This is the first post.',
        },
        {
          title: 'Second Post',
          body: 'This is the second post.',
        },
        {
          title: 'Third Post',
          body: 'This is the third post.',
        },
      ]);
      console.log('Database seeded successfully');

      const newCount = await db.posts.count();
      console.log(`Posts count after seeding: ${newCount}`);
    } else {
      console.log(`Database already has ${postsCount} posts`);
    }
  } catch (error) {
    console.error('Error seeding database:', error);

    try {
      console.log('Attempting to reset database...');
      await db.delete();
      await db.open();
      console.log('Database reset successful');

      await db.posts.bulkAdd([
        {
          title: 'First Post',
          body: 'This is the first post.',
        },
        {
          title: 'Second Post',
          body: 'This is the second post.',
        },
        {
          title: 'Third Post',
          body: 'This is the third post.',
        },
      ]);
      console.log('Database reseeded successfully');
    } catch (resetError) {
      console.error('Error resetting database:', resetError);
    }
  }
};

const initializeApp = async () => {
  await seedDatabase();

  const app = createApp(App);
  const notivue = createNotivue({
    position: 'top-right',
  });

  app.use(notivue);
  app.use(router);
  app.use(VueQueryPlugin);
  i18n(app);

  app.mount('#app');
};

initializeApp();
