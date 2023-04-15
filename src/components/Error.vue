<script setup lang="ts">
import Error from '@/assets/error.json'
import { LottieAnimation } from 'lottie-web-vue'

const props = defineProps<{
  errorMessage: string
}>()
</script>

<template>
  <div class="error-wrapper">
    <h2 v-if="typeof errorMessage === 'string'">{{ errorMessage }}</h2>
    <lottie-animation class="error" :animation-data="Error" :loop="true" />
  </div>
</template>

<style>
.error-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
.error {
  width: 50vw;
  height: 20rem;
}
</style>
