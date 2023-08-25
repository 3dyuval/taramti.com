<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import Chip from "primevue/chip";
import { useHeart } from "@/stores/useHeart";
import { storeToRefs } from "pinia";
const props = defineProps<{
  search: string;
}>();

const emit = defineEmits<{
  "update:search": [payload: string];
}>();

const heart = useHeart();
const { hearts } = storeToRefs(heart);

function onClick(key: number): void {
  const value = hearts.value[key];

  if (value && value !== props.search) {
    emit("update:search", value);
  }
}

function isCurrent(searchText: string, heart: string): boolean {
  return heart === searchText;
}
</script>

<template>
  <div class="chips">
    <Chip
      v-for="(item, index) of hearts"
      @click="onClick(index)"
      :class="{ selected: isCurrent(search, item)   }"
      :icon="isCurrent(search, item) ? 'pi pi-heart-fill' : 'pi pi-heart'"
      :removable="isCurrent(search, item)"
      @remove="heart.remove(index)"
      :label="item"
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

    .p-chip-text {
      margin: .3em;
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
