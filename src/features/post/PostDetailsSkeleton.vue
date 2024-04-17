<template>
  <div class="post-details-skeleton h-10 rounded-2xl" />
  <div class="post-details-skeleton h-20 mt-4 rounded-2xl" />
  <div class="post-details-skeleton h-44 mt-4 rounded-2xl" />
  <div class="post-details-skeleton h-52 mt-4 rounded-2xl" />
</template>

<style lang="scss">
.post-details-skeleton {
  background: linear-gradient(90deg, #eee 25%, #dedede 50%, #eee 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite ease-in-out;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
