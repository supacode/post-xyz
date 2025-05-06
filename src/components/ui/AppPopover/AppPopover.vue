<template>
  <div aria-label="popover" ref="popoverRef" class="app-popover relative">
    <button @keyup.space.prevent="toggleVisibility" @click.stop.prevent="toggleVisibility">
      <slot name="trigger" />
    </button>

    <!-- class="absolute z-50 p-6 bg-white rounded-xl shadow-xl top-full mt-3" -->
    <div
      v-if="isVisible"
      class="app-popover__content absolute shadow-lg p-3 bg-white top-8 rounded-md"
      role="dialog"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useClickOutside } from '@/composables/useClickOutside';
import { useKeyPress } from '@/composables/useKeyPress';

const props = defineProps({ modelValue: Boolean });

const isVisible = ref(props.modelValue);
const popoverRef = ref<HTMLDivElement | null>(null);
const emit = defineEmits(['update:modelValue']);

const updateVisibility = (value: boolean) => {
  isVisible.value = value;
  emit('update:modelValue', value);
};

const toggleVisibility = () => updateVisibility(!isVisible.value);

useClickOutside({ elementRef: popoverRef, callback: () => updateVisibility(false) });

useKeyPress({ targetKey: 'Escape', callback: () => updateVisibility(false) });

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal;
  },
);
</script>
