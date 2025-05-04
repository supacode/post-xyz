<template>
  <AppPopover v-model="popoverVisible">
    <template #trigger>
      <ThreeDots />
    </template>

    <template #content>
      <div class="flex flex-col space-y-2 w-fit bg-white">
        <AppLink title="Edit Post" :to="`/edit-post/${post.id}`" variant="ghost">
          <template #icon>
            <EditIcon />
          </template>
          {{ $t('postActions.update.link') }}
        </AppLink>

        <AppButton
          title="Delete post"
          :key="`${isLoading}`"
          :is-loading="isLoading"
          class="text-red-400"
          @click="onDelete"
          variant="ghost"
        >
          <template #icon>
            <ThrashIcon />
          </template>
          {{ $t('postActions.delete.buttonText') }}
        </AppButton>
      </div>
    </template>
  </AppPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { push } from 'notivue';
import { useQueryClient } from '@tanstack/vue-query';

import AppPopover from '@/components/ui/AppPopover.vue';
import { deletePost } from '@/services/post/deletePost';
import { ThreeDots, EditIcon, ThrashIcon } from '@/assets/icons';
import AppButton from '@/components/ui/AppButton.vue';
import AppLink from '@/components/ui/AppLink.vue';
import { type Post } from '@/types/Post';
import { t } from '@/localization/translate';
import { useAppMutation } from '@/composables/useAppMutation';

const { post } = defineProps<{
  post: Post;
}>();
const router = useRouter();
const queryClient = useQueryClient();
const popoverVisible = ref(false);

const { isLoading, mutate } = useAppMutation({
  mutationFn: (variables: unknown) => deletePost(variables as number),
  onSuccess: () => {
    popoverVisible.value = false;
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    push.success(t('postActions.delete.success'));
    router.push('/');
  },
  onError: (error) => {
    console.log(error);
    push.error(t('postActions.delete.error'));
  },
});

const onDelete = () => {
  if (confirm(t('postActions.delete.confirmation'))) {
    if (post.id) {
      mutate(post.id);
    }
  }
};
</script>
