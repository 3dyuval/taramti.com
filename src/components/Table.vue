<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref, computed } from 'vue'
import type { Row } from '@/@types'

const props = defineProps<{
  rows: Row[]
}>()

const expandedRows = ref([])

const emit = defineEmits<{
  (event: 'select', index: number): void
  (event: 'deselect', index: number): void
}>()

const dateComparator = function (dataFromFilter, cellValue) {
  // dates are stored as yyyy-mm-ddThh:mm:ss
  // We create a Date object for comparison against the filter date
  const dateParts = cellValue.split('-')
  const year = Number(dateParts[0])
  const month = Number(dateParts[1]) - 1
  const day = Number(dateParts[2].split('T')[0])
  const cellDate = new Date(year, month, day)
  // Now that both parameters are Date objects, we can compare
  if (cellDate < dataFromFilter) {
    return -1
  } else if (cellDate > dataFromFilter) {
    return 1
  } else {
    return 0
  }
}
</script>

<template>
  <data-table
    dir="rtl"
    class="data-table"
    :value="rows"
    v-model:expandedRows="expandedRows"
    :scrollable="true"
    scrollHeight="60vh"
  >
    <template #header>
      <div class="table-header">
        תוצאות בדיקות דם
        <i class="pi pi-heart-fill" />
      </div>
    </template>
    <column field="expand" header="פרטים" :expander="true" />
    <column field="FromHour" header="משעה" :sortable="true"> </column>
    <column field="ToHour" header="עד שעה" :sortable="true"> </column>
    <column field="Name" header="שם" :sortable="true"> </column>
    <column field="City" header="עיר" :sortable="true"> </column>
    <template #expansion="{ data }">
      <slot name="expansion" :data="data"> </slot>
    </template>
  </data-table>
</template>

<style scoped lang="scss">
.data-table {
  border-radius: 12px;
  overflow: hidden;
}
</style>
