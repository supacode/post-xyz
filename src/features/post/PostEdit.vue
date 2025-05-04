<template>
  <PostDetailsSkeleton v-if="isLoading" />

  <p v-else-if="error">
    {{ $t('postActions.fetchError') }}
  </p>

  <p v-else-if="!post">
    {{ $t('postActions.postNotFound') }}
  </p>

  <form @submit.prevent="handleFormSubmit" v-else-if="post" class="bg-gray-200 p-4 rounded-xl">
    <AppInput
      v-model="postTitle"
      label="Title"
      :required="true"
      name="title"
      :placeholder="$t('postActions.create.titlePlaceholder')"
      class="mb-4"
    />

    <WysiWyg v-model="postContent" />

    <div class="flex gap-2 mt-4">
      <AppLink to="/" variant="secondary">
        <template #icon>
          <ArrowBack />
        </template>
        {{ $t('postActions.update.cancelEdit') }}
      </AppLink>

      <AppButton
        :is-loading="isUpdating"
        type="submit"
        title="Update Post"
        :key="`${isUpdating}`"
        @click="mutate"
      >
        <template #icon>
          <PenIcon />
        </template>
        {{ $t('postActions.update.buttonText') }}
      </AppButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { push } from 'notivue';

import { PenIcon } from '@/assets/icons';
import AppInput from '@/components/ui/AppInput.vue';
import AppButton from '@/components/ui/AppButton.vue';
import WysiWyg from '@/components/WysiWyg.vue';
import { updatePost } from '@/services/post/updatePost';
import ArrowBack from '@/assets/icons/ArrowBack.vue';
import { useGetPost } from '@/features/post/composables/useGetPost';
import PostDetailsSkeleton from '@/features/post/PostDetailsSkeleton.vue';
import { useAppMutation } from '@/composables/useAppMutation';
import AppLink from '@/components/ui/AppLink.vue';
import { t } from '@/localization/translate';

const postTitle = ref('');
const postContent = ref('');

const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const { post, error, isLoading } = useGetPost(`${postId}`);

watch(
  post,
  (newPost) => {
    if (newPost) {
      postTitle.value = newPost.title;
      postContent.value = newPost.body;
    }
  },
  { immediate: true },
);

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  mutate();
};

const { isLoading: isUpdating, mutate } = useAppMutation({
  mutationFn: () =>
    updatePost({
      id: `${postId}`,
      title: postTitle.value,
      body: postContent.value,
    }),
  onSuccess: () => {
    push.success(t('postActions.update.success'));
    router.push('/');
  },
  onError: (error) => {
    console.log(error);
    push.error(t('postActions.update.error'));
  },
});
</script>
