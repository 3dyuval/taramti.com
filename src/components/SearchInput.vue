<script setup lang="ts">
import SplitButton from "primevue/splitbutton";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { computed } from "vue";

const props = defineProps<{
  search: string;
  isHeart: boolean;
}>();

const emit = defineEmits<{
  "update:search": [value: string];
}>();

function handleInputChange(e: any) {
  emit("update:search", e.target.value);
}

const searchDisabled = computed<boolean>(() => !props.search.trim().length);

const items = [{ label: "מחק תוצאות", command: () => emit("update:search", "") }];


</script>
<template>
  <div class="p-inputgroup"></div>
  <div class="col-12 md:col-4">
    <div class="p-inputgroup">
      <Button
        :disabled="true"
        :label="searchDisabled ? '' : 'חיפוש'"
        class="search-button"
        :class="{ 'search-disabled': searchDisabled }"
        icon="pi pi-search"
      />
      <input-text
        dir="rtl"
        :value="search"
        @input="handleInputChange"
        style="font-size: 1.5rem"
        placeholder="חפשו מקום לתרום דם לפי עיר או שם"
      />
      <span class="p-inputgroup-addon">
        <i
          class="pi search-heart"
          :class="[searchDisabled ? 'pi-heart' : isHeart ? 'pi-heart-fill' : 'pi-heart']"
        ></i>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.search-button {
  font-size: 1.5rem !important;
}

.search-disabled {
  background-color: var(--success000) !important;
  color: var(--success200) !important;
}
.search-button:not(.search-disabled) {
  background-color: var(--success200) !important;
  color: var(--success000) !important;
}

.search-heart {
  color: var(--heart000);
  &.pi-heart-fill {
    color: var(--heart100);
  }
}
</style>
