import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts/:id',
      name: 'viewPost',
      component: () => import('../pages/ViewPostPage.vue'),
      props: true,
    },
    {
      path: '/posts/create',
      name: 'createPost',
      component: () => import('../pages/CreatePostPage.vue'),
      props: true,
    },
    {
      path: '/edit-post/:id',
      name: 'editPost',
      component: () => import('../pages/EditPostPage.vue'),
      props: true,
    },
  ],
});

export default router;
