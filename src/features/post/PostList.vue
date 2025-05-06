<template>
  <div v-if="isLoading">
    <div v-for="index in 7" :key="index" class="mt-6">
      <PostCardSkeleton />
    </div>
  </div>

  <div v-else-if="data && data.length === 0" class="text-center py-8">
    <p class="text-gray-500 text-lg mb-4">{{ $t('postActions.noPosts') }}</p>
  </div>

  <template v-else-if="data">
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
import AppLink from '@/components/ui/AppLink/AppLink.vue';
import { PenIcon } from '@/assets/icons';

const { data: unsortedData, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: () => getPosts(),
});

const data = computed(() => {
  if (unsortedData.value) {
    return [...unsortedData.value].sort((prev, next) => {
      const prevId = prev.id ?? 0;
      const nextId = next.id ?? 0;
      return nextId - prevId;
    });
  }

  return [];
});
</script>
