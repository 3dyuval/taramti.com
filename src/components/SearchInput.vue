<script setup lang="ts">
import SplitButton from 'primevue/splitbutton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  isHeart: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'click'): void
  (event: 'click:heart'): void
}>()

function handleInputChange(e: any) {
  emit('update:modelValue', e.target.value)
}

const searchDisabled = computed<boolean>(() => !props.modelValue.trim().length)

const items = [
  { label: 'שתף תוצאות', command: () => console.log('clean') },
  { label: 'מחק תוצאות', command: () => emit('update:modelValue', '') },
]

// TODO type event
function handleOnSearch(e: any) {
  if (searchDisabled.value) return
  emit('click')
}

function handleClickHeart() {
  if (props.isHeart || searchDisabled.value) return
  emit('click:heart')
}
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
        @keyup.enter="handleOnSearch"
        dir="rtl"
        :value="modelValue"
        @input="handleInputChange"
        style="font-size: 1.5rem"
        placeholder="חפשו מקום לתרום דם לפי שם, עיר, מקום, או יום"
      />
      <span class="p-inputgroup-addon" @click="handleClickHeart">
        <i
          class="pi search-heart"
          :class="[
            searchDisabled
              ? 'pi-heart'
              : isHeart
              ? 'pi-heart-fill'
              : 'pi-heart',
          ]"
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
