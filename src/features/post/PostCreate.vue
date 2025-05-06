<template>
  <form @submit.prevent="handleFormSubmit" class="bg-gray-200 p-4 rounded-xl">
    <AppInput
      v-model="postTitle"
      class="mb-4"
      name="title"
      :placeholder="$t('postActions.create.titlePlaceholder')"
      :required="true"
    />

    <WysiWyg v-model="postContent" />

    <div class="flex gap-2 mt-4">
      <AppButton @click="discardPost" variant="secondary" type="button">
        <template #icon>
          <TrashIcon />
        </template>
        {{ $t('postActions.create.cancelButton') }}
      </AppButton>

      <AppButton :key="`${isLoading}`" :is-loading="isLoading" type="submit">
        <template #icon>
          <PenIcon />
        </template>
        {{ $t('postActions.create.buttonText') }}
      </AppButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { push } from 'notivue';

import { PenIcon } from '@/assets/icons';
import AppInput from '@/components/ui/AppInput/AppInput.vue';
import AppButton from '@/components/ui/AppButton/AppButton.vue';
import WysiWyg from '@/components/WysiWyg.vue';
import { createPost as createPostService } from '@/services/post/createPost';
import TrashIcon from '@/assets/icons/TrashIcon.vue';
import { t } from '@/localization/translate';
import { useAppMutation } from '@/composables/useAppMutation';

const router = useRouter();
const postTitle = ref('');
const postContent = ref('');

const { isLoading, mutate } = useAppMutation({
  mutationFn: () => createPostService({ title: postTitle.value, body: postContent.value }),
  onSuccess: () => {
    push.success(t('postActions.create.success'));
    router.push('/');
  },
  onError: (error) => {
    console.log(error);
    push.error(t('postActions.create.error'));
  },
});

const discardPost = () => {
  if (confirm(t('postActions.create.cancelConfirmation'))) {
    postTitle.value = '';
    postContent.value = '';
    router.push('/');
  }
};

const handleFormSubmit = (event: Event) => {
  event.preventDefault();

  mutate();
};
</script>
