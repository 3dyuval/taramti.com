<script setup lang='ts'>
import InputText from 'primevue/inputtext'
import { computed } from 'vue'

const props = defineProps<{
  search: string
}>()

const emit = defineEmits<{
  'update:search': [value: string]
}>()

function handleInputChange(e: any) {
  emit('update:search', e.target.value)
}

// const heart = useHeart();
// const { hearts } = storeToRefs(heart);
// const isHeart = computed<boolean>(() => hearts.value.includes(props.search));

const searchDisabled = computed<boolean>(() => !props.search.trim().length)
</script>
<template>
  <div class='p-inputgroup'></div>
  <div class='col-12 md:col-4'>
    <div class='p-inputgroup'>
      <Button
        :disabled='true'
        :label="searchDisabled ? '' : 'חיפוש'"
        class='search-button'
        :class="{ 'search-disabled': searchDisabled }"
        icon='pi pi-search'
      />
      <!--        dir="rtl"-->
      <input-text
        :value='search'
        @input.trim='handleInputChange'
        style='font-size: 1.5rem'
        placeholder='חפשו מקום לתרום דם לפי עיר או שם'
      />

      <Button
        :disabled='searchDisabled'
        v-tooltip.bottom="'הוסף למועדפים'"
        text
      >
        <!-- class="p-inputgroup-addon" @click="heart.add(search)" -->
        <i class='pi search-heart'></i>
        <!-- :class="[isHeart ? 'pi-heart-fill' : 'pi-heart']" -->
      </Button>
    </div>
  </div>
</template>

<style lang='scss'>
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