<template>
  <div>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="onInput"
      class="appearance-none border rounded-2xl shadow-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  label: String,
  id: String,
  name: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
});

const emits = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value);
};
</script>
