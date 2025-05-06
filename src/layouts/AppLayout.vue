<template>
  <div class="pt-5 md:pt-10 min-h-screen">
    <div class="m-auto max-w-screen-md p-4">
      <header class="flex justify-between items-center mb-10">
        <h1 class="text-xl">
          <AppLink to="/" class="text-lg" variant="ghost">
            {{ $t('appName') }}
          </AppLink>
        </h1>

        <div class="flex items-center gap-4">
          <!-- Navigation -->
          <nav v-if="includeNav">
            <AppLink to="/posts/create">
              <template #icon>
                <PenIcon />
              </template>

              {{ $t('postActions.create.link') }}
            </AppLink>
          </nav>
        </div>
      </header>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import i18next from 'i18next';
import AppLink from '@/components/ui/AppLink/AppLink.vue';
import AppButton from '@/components/ui/AppButton/AppButton.vue';
import AppPopover from '@/components/ui/AppPopover/AppPopover.vue';
import { PenIcon } from '@/assets/icons';

const { includeNav = true } = defineProps<{ includeNav?: boolean }>();

const currentLanguage = ref(i18next.language);
const languagePopoverVisible = ref(false);

const changeLanguage = async (lang: string) => {
  await i18next.changeLanguage(lang);
  currentLanguage.value = lang;
  languagePopoverVisible.value = false;
};

onMounted(() => {
  currentLanguage.value = i18next.language;
});
</script>
