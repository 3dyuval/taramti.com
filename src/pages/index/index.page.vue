<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'
import type { Row } from '@/types'

const props = defineProps<{
  rows: Row[]
}>()

const { toastError } = useErrorCapture({ summary: 'אירעה שגיאה' })
const error = ref<string | null>(null)

onErrorCaptured((err: string) => {
  console.error(err)
  error.value = err
  toastError(err)
})

const search = ref('')

const headers = [
  { key: 'Name', sortable: true, title: 'שם' },
  { key: 'City', sortable: true, title: 'עיר' },
  { key: 'FromHour', sortable: true, title: 'שעת פתיחה' },
  { key: 'ToHour', sortable: true, title: 'שעת סגירה' },
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
  <v-data-table
    filter-mode="some"
    :filter-keys="['Name', 'City']"
    :group-by="groupBy"
    :search="search"
    dir="rtl"
    :headers="headers"
    :items="rows"
    items-per-page="20"
    show-expand
    prev-icon="ph-caret-next"
  >
    <template #data-table-group="{ item, count, props }">
      <td
        dir="rtl"
        class="v-data-table__td v-data-table-column--align-start v-data-table-group-header-row__column v-data-table-group-header-row__column"
      >
        <v-btn
          @click="props.onClick"
          size="large"
          :variant="props.icon === '$expand' ? 'elevated' : 'text'"
          :color="props.icon === '$expand' ? 'secondary' : 'default'"
        >
          <v-icon>ph-buildings</v-icon>
          {{ `${item.value} (${count})` }}
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<style lang="scss"></style>