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
