<template>
  <div v-if="isLoading">
    <div v-for="index in 7" :key="index" class="mt-6">
      <PostCardSkeleton />
    </div>
  </div>

  <template v-if="data">
    <div v-for="post in data" :key="post.id" class="mt-6">
      <PostCard :post="post" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { getPosts } from '@/services/post/getPosts';
import PostCard from '@/features/post/PostCard.vue';
import PostCardSkeleton from '@/features/post/PostCardSkeleton.vue';
import AppButton from '@/components/ui/AppButton.vue';

const { data: unsortedData, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: () => getPosts(),
});

// We are sorting the data by id in descending order
// because the API doesn't support sorting
const data = computed(() => {
  if (unsortedData.value) {
    return [...unsortedData.value].sort((prev, next) => next.id - prev.id);
  }

  return [];
});
</script>
