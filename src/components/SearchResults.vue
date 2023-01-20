<script setup lang="ts">
import { ref } from 'vue'
import MapView from '@/components/Map.vue'
import data from '@/assets/data.json'
import DataTable from '@/components/Table.vue'
import Loading from '@/components/Loading.vue'
import PlaceDetails from '@/components/PlaceDetails.vue'

const rows = ref(data)

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

await new Promise((resolve) => setTimeout(resolve, 1000))

// onMounted(() => {
// fetch('https://d6ebtk.deta.dev/api/get-data', {})
// .then((result) => result.json())
// .then((remoteRowData) => {
// rows.value = remoteRowData
// })
// })
</script>

<template>
  <data-table :rows="rows">
    <template #expansion="slotProps">
      <place-details :row="slotProps.data" />
      <suspense>
        <template #default>
          <map-view :row="slotProps.data" />
        </template>
        <template #fallback>
          <loading />
        </template>
      </suspense>
    </template>
  </data-table>
</template>

<style lang="scss"></style>
