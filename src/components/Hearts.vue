<script setup lang="ts">
import Chip from 'primevue/chip'

defineProps<{
  hearts: string[]
  searchText?: string
}>()

const emit = defineEmits<{
  (event: 'input:search', payload: string): void
  (event: 'heart:remove', payload: string): void
}>()
</script>

<template>
  <div class="chips">
    <Chip
      v-for="heart in hearts"
      @click="emit('input:search', heart)"
      @remove="emit('heart:remove', heart)"
      :class="{ selected: searchText == heart }"
      :icon="searchText == heart ? 'pi pi-heart-fill' : 'pi pi-heart'"
      :label="heart"
    >
    </Chip>
  </div>
</template>

<style lang="scss">
.chips {
  gap: 12px;
  display: flex;
  justify-content: center;
  transition: outline 500ms ease-in-out;

  .p-chip {
    &.selected {
      color: white;
      background-color: var(--heart100);
    }
    background-color: var(--heart000);
    &:hover {
      background-color: var(--heart100);
      cursor: pointer;
    }

    .p-chip-icon::before {
      color: var(--heart200);

      &.selected {
        color: var(--heart000);
      }
    }
  }
}
</style>
