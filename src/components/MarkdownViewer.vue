<template>
  <div v-if="markdown" v-html="markdown" />
</template>

<script lang="ts" setup>
const { markdown } = defineProps({
  markdown: {
    type: String,
    default: '',
  },
});
</script>
