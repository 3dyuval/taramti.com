<script setup lang="ts">
import Chip from 'primevue/chip'

defineProps<{
  hearts: string[]
}>()

const emit = defineEmits<{
  (event: 'input:search', payload: string): void
}>()
</script>

<template>
  <div>
    <Chip
      v-for="heart in hearts"
      @click="emit('input:search', heart)"
      icon="pi pi-heart-fill"
      :label="heart"
    />
  </div>
</template>

<style scoped></style>
