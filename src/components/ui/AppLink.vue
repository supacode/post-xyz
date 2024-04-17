<template>
  <component
    :is="element"
    :to="to"
    :href="href"
    :title="title"
    :aria-label="title"
    :class="elementClasses"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
  >
    <div v-if="hasIcon" class="mr-2">
      <slot name="icon" />
    </div>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { RouterLink } from 'vue-router';

const slots = useSlots();
const hasIcon = !!slots.icon;

const { title, to, href, target, variant } = withDefaults(
  defineProps<{
    title?: string;
    to?: string;
    href?: string;
    target?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'ghost';
  }>(),
  {
    variant: 'primary',
  },
);

const elementClasses = computed(() => {
  const baseClasses =
    'text-sm rounded-3xl flex items-center content-fit border-none transition duration-300 ease-in-out cursor-pointer';
  const variantClasses = {
    primary: 'px-4 py-2  text-white bg-blue-500 hover:bg-blue-600',
    secondary: 'px-4 py-2  text-white bg-gray-500 hover:bg-gray-600',
    danger: 'px-4 py-2  text-white bg-red-500 hover:bg-red-600',
    warning: 'px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600',
    ghost: 'bg-transparent text-black  hover:text-gray-600',
  }[variant];

  return [baseClasses, variantClasses].filter(Boolean).join(' ');
});

const element = computed(() => {
  if (to) return RouterLink;

  return 'a';
});
</script>
