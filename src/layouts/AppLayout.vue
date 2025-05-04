<template>
  <div class="pt-5 md:pt-10 min-h-screen">
    <div class="m-auto max-w-screen-md p-4">
      <header class="flex justify-between items-center mb-10">
        <h1 class="text-xl">
          <AppLink to="/" class="text-lg" variant="ghost">
            {{ $t('appName') }}
          </AppLink>
        </h1>

        <nav v-if="includeNav">
          <AppLink to="/posts/create">
            <template #icon>
              <PenIcon />
            </template>

            {{ $t('postActions.create.link') }}
          </AppLink>
        </nav>
      </header>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLink from '@/components/ui/AppLink.vue';
import { PenIcon } from '@/assets/icons';

const { includeNav } = withDefaults(
  defineProps<{
    includeNav?: boolean;
  }>(),
  {
    includeNav: true,
  },
);
</script>
