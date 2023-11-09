<script setup lang='ts'>
import { ref } from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'
import type { Row } from '@/types'
import { useI18n } from 'vue-i18n'
import OpeningHoursChip from '@/components/OpeningHoursChip.vue'
import SearchCard from '@/components/SearchCard.vue'

const props = defineProps<{
  rows: Row[]
}>()

const { t } = useI18n()
const search = ref('')

const headers = [
  { key: 'Name', sortable: true, title: 'שם' },
  { key: 'City', sortable: true, title: 'עיר' },
  { key: 'FromHour', sortable: true, title: 'שעת פתיחה' },
  { key: 'ToHour', sortable: true, title: 'שעת סגירה' }
]

function filterFunction(value: string, query: string) {
  debugger
  console.log({ value, query })
  if (value.toLowerCase().includes(search.value?.toLowerCase())) {
    return -1
  }
}

const groupBy = ref([{ key: 'City', order: 'asc', title: 'עיר' }])
</script>

<template>
  <div class='index container'>
    <search-card v-bind='props' class='card-center' />
  </div>
</template>

<style lang='scss'>

.index.container {
    height: 100lvmin;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.card-center {
  margin: 0 auto;
  width: 50%;
}
</style>