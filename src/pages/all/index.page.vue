<script setup lang='ts'>

import OpeningHoursChip from '@/components/OpeningHoursChip.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
const props = defineProps<{
  rows: any[]
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
  <v-data-table
    filter-mode='some'
    :filter-keys="['Name', 'City']"
    :search='search'
    dir='rtl'
    :headers='headers'
    :items='rows'
    items-per-page='20'
    show-expand
    prev-icon='ph-caret-next'
  >
    <template #expanded-row='{ item }'>
      <v-card>
        <opening-hours-chip
          class='my-5'
          :from-hour='item.FromHour'
          :to-hour='item.ToHour'
        />
        <v-card-actions>
          <v-btn
            color='primary'
            :text="t('cta.showAll')"
            :href='`/donation-location/${item.id}`'
          />
        </v-card-actions>
      </v-card>
    </template>
    <template #data-table-group='{ item, count, props }'>
      <td
        dir='rtl'
        class='v-data-table__td v-data-table-column--align-start v-data-table-group-header-row__column v-data-table-group-header-row__column'
      >
        <v-btn
          @click='props.onClick'
          size='large'
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

<style scoped lang='scss'>

</style>