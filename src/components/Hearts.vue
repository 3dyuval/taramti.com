<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import Chip from "primevue/chip";
import { watch } from "vue";

const props = defineProps<{
  search: string;
}>();

const emit = defineEmits<{
  "update:search": [payload: string];
  "update:is-heart": [payload: boolean];
}>();

let key = 0;

const hearts = ref(getHeartedItems());

const isHeart = computed<boolean>(() => hearts.value.includes(props.search));

watch(isHeart, (value) => {
  emit("update:is-heart", value);
}, {
  immediate: true
});

function getHeartedItems() {
  const savedItems = localStorage.getItem("heart");
  return savedItems ? JSON.parse(savedItems) : [];
}

function addHeart(): void {
  const items = [props.search, ...getHeartedItems()];
  localStorage.setItem("heart", JSON.stringify(items));
  hearts.value = items;
}

function deleteHeart(key: string) {
  const filteredItems = getHeartedItems().filter((i: any) => i === key);
  localStorage.setItem("heart", JSON.stringify(filteredItems));
  hearts.value = filteredItems;
  emit('update:search', '')
}

function onSelectHeart(event) {
  const {value} = event.target
  if (value !== props.search) {
    emit("update:search", value);
  }
}

function isCurrent(searchText: string, heart: string) {
  return heart === searchText;
}


</script>

<template>
  <div class="chips">
    <Chip
      v-for="heart in hearts"
      @click="onSelectHeart($event)"
      :class="{ selected: isCurrent(search, heart) }"
      :icon="isCurrent(search, heart) ? 'pi pi-heart-fill' : 'pi pi-heart'"
      :removable="isCurrent(search, heart)"
      @remove="deleteHeart"
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
