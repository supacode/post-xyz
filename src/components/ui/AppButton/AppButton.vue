<template>
  <button
    @click="onClick"
    @keyup.enter="onClick"
    @keyup.space="onClick"
    :disabled="isLoading"
    :title="title"
    :aria-label="isLoading ? `${title} (loading)` : title"
    :aria-busy="isLoading ? 'true' : 'false'"
    :class="buttonClasses"
    tabindex="0"
  >
    <div class="mr-2">
      <HalfCircle v-if="isLoading" class="animate-spin" role="img" aria-hidden="true" />
      <slot name="icon" v-if="hasIcon && !isLoading" />
    </div>
    <span class="sr-only" v-if="isLoading">Loading</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { HalfCircle } from '@/assets/icons/';

const slots = useSlots();
const hasIcon = !!slots.icon;

const { isLoading, onClick, title, variant } = withDefaults(
  defineProps<{
    title?: string;
    isLoading?: boolean;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'ghost';
  }>(),
  {
    title: '',
    isLoading: false,
    onClick: () => {},
    variant: 'primary',
  },
);

console.log({ title });

const buttonClasses = computed(() => {
  const baseClasses =
    'text-sm rounded-3xl flex items-center content-fit border-none transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    primary: 'px-4 py-2 text-white bg-blue-500',
    secondary: 'px-4 py-2 text-white bg-gray-500',
    danger: 'px-4 py-2 text-white bg-red-500',
    warning: 'px-4 py-2 text-white bg-yellow-500',
    ghost: 'px-0 py-0 bg-transparent text-gray-500',
  }[variant];

  return [baseClasses, variantClasses].filter(Boolean).join(' ');
});
</script>
