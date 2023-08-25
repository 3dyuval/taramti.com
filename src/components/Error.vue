<script setup lang="ts">
import Error from "@/assets/error.json";
import { LottieAnimation } from "lottie-web-vue";

defineProps<{
  errorMessage: string | null;
  small?: boolean;
}>();
</script>

<template>
  <div class="error-wrapper" :class="{ small }">
    <lottie-animation class="error" :animation-data="Error" :loop="true" />
    <h2 v-if="typeof errorMessage === 'string'">{{ errorMessage }}</h2>
  </div>
</template>

<style lang="scss">
.error-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: inherit;

  .error {
    width: 50vw;
    height: 20rem;
  }

  &.small {
    .error {
      height: 5rem;
    }
  }
}
</style>
