<script setup lang='ts'>
import VDataTable from 'vuetify/components'
import { DonationLocationDate } from '@/types'
import { ref } from 'vue'
const { rows } = defineProps<Props>()


type Props = {
  rows: DonationLocationDate[]
  row?: DonationLocationDate,
  locale: string;
}

const headers = [
  {
    title: 'name',
    key: 'donationLocation.name'
  },
  {
    title: 'dateOpen',
    key: 'dateOpen'
  },
  {
    title: 'dateClose',
    key: 'dateClose'
  }
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
    filter-mode='some'
    :items='rows'
    :headers='headers'
    :filter-keys="['name', 'address.city']"
    items-per-page='20'
    class=''
    prev-icon='ph-caret-next'
  />
</template>

<style scoped lang='scss'>
.v-table {
  margin-top: 64px;
  display: grid;
}
</style>