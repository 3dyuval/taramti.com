<script setup lang="ts">
import DataTable, { DataTableFilterMeta } from "primevue/datatable";
import Column from "primevue/column";
import { ref, computed } from "vue";
import type { Row } from "@/types";
import Hearts from "./Hearts.vue";

const props = defineProps<{
  value: Row[];
  filters?: DataTableFilterMeta;
}>();

const emit = defineEmits<{
  (event: "select", index: number): void;
  (event: "deselect", index: number): void;
}>();

const expandedRows = ref<[Row] | []>([]);

function onRowExpand({ data }: { data: Row }): void {
  if (expandedRows.value.length === 0) {
    expandedRows.value = [data];
  } else if (data.id !== expandedRows.value[0].id) {
    expandedRows.value = [data];
  }
}

function onRowCollapse({ data: { id } }: { data: Row }): void {
  expandedRows.value = [];
}
</script>

<template>
  <data-table
    dir="rtl"
    data-key="id"
    class="data-table"
    :value="value"
    :filters="filters"
    selection-mode="single"
    :scrollable="true"
    :expanded-rows="expandedRows"
    scrollHeight="60vh"
    @row-expand="onRowExpand"
    @row-collapse="onRowCollapse"
    @row-click="onRowExpand"
  >
    <template #empty><h3 class="empty">לא נמצאו תוצאות</h3> </template>
    <template #header>
      <slot name="header" />
    </template>
    <column field="City" header="עיר" :sortable="true"> </column>
    <column field="Name" header="שם" :sortable="true"> </column>
    <column field="ToHour" header="עד שעה" :sortable="true"> </column>
    <column field="FromHour" header="משעה" :sortable="true"> </column>
    <column field="expand" header="פרטים" :expander="true" />
    <template #expansion="{ data }">
      <slot name="expansion" :data="data"> </slot>
    </template>
  </data-table>
</template>

<style scoped lang="scss">
.data-table {
  border-radius: 12px;
  overflow: hidden;
  outline: 1px solid rgba(0, 0, 0, 0.2);
}

h3.empty {
  text-align: center;
  padding: 2em 0;
  color: var(--heart000);
}
</style>
@/types
