<template>
  <PostDetailsSkeleton v-if="isLoading" />

  <p v-else-if="error" role="alert">
    {{ $t('postActions.fetchError') }}
    {{ error }}
  </p>

  <section v-else class="flex mt-10 bg-gray-200 rounded-xl p-4">
    <article aria-labelledby="post-title" v-if="post">
      <div class="flex items-center justify-between">
        <h2 class="text-xl mb-1">
          {{ post.title }}
        </h2>

        <PostCardPopover :post="post" />
      </div>

      <div class="text-sm" :title="post.title">
        <MarkdownViewer :markdown="post.body" />
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import MarkdownViewer from '@/components/MarkdownViewer.vue';
import PostDetailsSkeleton from '@/features/post/PostDetailsSkeleton.vue';
import { useGetPost } from '@/features/post/composables/useGetPost';
import PostCardPopover from '@/features/post/PostCardPopover.vue';

const route = useRoute();
const postId = route.params.id;
const { isLoading, error, post } = useGetPost(`${postId}`);
</script>
