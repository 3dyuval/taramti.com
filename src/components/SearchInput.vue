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
  (event: 'click')
}>()

function handleInputChange(e: Event) {
  emit('update:modelValue', e.target.value)
}

function handleOnClick(e) {
  if (searchDisabled) return
  emit('click')
}

const searchDisabled = computed<boolean>(() => !props.modelValue.trim().length)

const buttonType = computed(() =>
  !props.modelValue.trim().length ? Button : SplitButton
)

const items = [
  { label: 'שתף תוצאות', command: () => console.log('clean') },
  { label: 'מחק תוצאות', command: () => emit('update:modelValue', '') },
]
</script>
<template>
  <div class="p-inputgroup"></div>
  <div class="col-12 md:col-4">
    <div class="p-inputgroup">
      <component
        :is="buttonType"
        :disabled="buttonDisabled"
        :model="items"
        label="חיפוש"
        type="button"
        class="p-button-success"
        :class="[
          searchDisabled ? 'p-button-outlined' : 'p-button-solid green-600',
        ]"
        style="font-size: 1.5rem"
        icon="pi pi-search"
        @click="handleOnClick"
      />
      <input-text
        dir="rtl"
        :value="modelValue"
        @input="handleInputChange"
        style="font-size: 1.5rem"
        placeholder="חפשו מקום לתרום דם לפי שם, עיר, מקום, או יום"
      />
      <span class="p-inputgroup-addon">
        <i
          class="pi"
          :class="[searchDisabled ? 'pi-heart' : 'pi-heart-fill red']"
        ></i>
      </span>
    </div>
  </div>
</template>

<style scoped>
.red {
  color: var(--green-300);
}
</style>
