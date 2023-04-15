<script setup lang="ts">
import SplitButton from 'primevue/splitbutton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'click'): void
  (event: 'handleHeart'): void
}>()

function handleInputChange(e: Event) {
  emit('update:modelValue', e.target.value)
}

const searchDisabled = computed<boolean>(() => !props.modelValue.trim().length)

const items = [
  { label: 'שתף תוצאות', command: () => console.log('clean') },
  { label: 'מחק תוצאות', command: () => emit('update:modelValue', '') },
]

function handleOnSearch(e) {
  if (searchDisabled.value) return
  emit('click')
}
</script>
<template>
  <div class="p-inputgroup"></div>
  <div class="col-12 md:col-4">
    <div class="p-inputgroup">
      <Button
        v-if="searchDisabled"
        :disabled="true"
        label="הכניסו חיפוש"
        type="button"
        class="p-button-success"
        icon="pi pi-search"
      />
      <SplitButton
        v-else
        class="p-button-success green-600"
        style="font-size: 1.5rem"
        icon="pi pi-search"
        label="חיפוש"
        :button-props="{ onClick: handleOnSearch }"
        :model="items"
      />
      <input-text
        @keyup.enter="handleOnSearch"
        dir="rtl"
        :value="modelValue"
        @input="handleInputChange"
        style="font-size: 1.5rem"
        placeholder="חפשו מקום לתרום דם לפי שם, עיר, מקום, או יום"
      />
      <span class="p-inputgroup-addon" @click="emit('handleHeart')">
        <i
          class="pi"
          :class="[searchDisabled ? 'pi-heart' : 'pi-heart red']"
        ></i>
      </span>
    </div>
  </div>
</template>

<style scoped>
.red {
  color: var(--red-300);
}
</style>
