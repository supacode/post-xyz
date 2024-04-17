<template>
  <article
    class="post-card p-4 bg-gray-200 rounded-2xl transition duration-300 ease-in-out"
    tabindex="0"
  >
    <div class="flex items-center justify-between">
      <h2 class="mb-1">
        <AppLink :to="postLink" variant="ghost" class="text-xl hover:underline">
          {{ post.title }}
        </AppLink>
      </h2>

      <PostCardPopover :post="post" />
    </div>

    <p class="text-sm">
      <RouterLink :to="postLink">
        <MarkdownViewer :markdown="post.body" />
      </RouterLink>
    </p>
  </article>
</template>

<script setup lang="ts">
import { type Post } from '@/types/Post';
import MarkdownViewer from '@/components/MarkdownViewer.vue';
import AppLink from '@/components/ui/AppLink.vue';
import PostCardPopover from '@/features/post/PostCardPopover.vue';

const { post } = defineProps<{
  post: Post;
}>();

const postLink = `/posts/${post.id}`;
</script>

<style lang="scss">
.app-popover {
  &__content {
    right: 0;

    @media (min-width: 900px) {
      left: 0;
      right: auto;
    }
  }
}
</style>
