<template>
  <AppLayout :include-nav="false">
    <PostEdit />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import PostEdit from '@/features/post/PostEdit.vue';
</script>
