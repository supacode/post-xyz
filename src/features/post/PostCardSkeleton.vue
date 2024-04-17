<template>
  <div class="post-card-skeleton h-20 rounded-2xl" />
</template>

<style lang="scss">
.post-card-skeleton {
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
