<script setup lang="ts">
import Loading from '@/assets/loading.json'
import { LottieAnimation } from 'lottie-web-vue'
</script>

<template>
  <div class="loading-wrapper">
    <lottie-animation class="loading" :animation-data="Loading" :loop="true" />
  </div>
</template>

<style>
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
.loading {
  width: 50vw;
  height: 20rem;
}
</style>
