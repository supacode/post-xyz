<template>
  <main class="main">
    <AppLayout>
      <PostList />
    </AppLayout>
  </main>
</template>

<script setup lang="ts">
import PostList from '@/features/post/PostList.vue';
import AppLayout from '@/layouts/AppLayout.vue';
</script>
