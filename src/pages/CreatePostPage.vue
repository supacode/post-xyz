<template>
  <AppLayout :include-nav="false">
    <PostCreate />
  </AppLayout>
</template>

<script setup lang="ts">
import PostCreate from '@/features/post/PostCreate.vue';
import AppLayout from '@/layouts/AppLayout.vue';
</script>
