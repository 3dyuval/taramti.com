<script setup lang='ts'>

import { Row } from '@/types'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'


const { rows, row } = defineProps<Props>()
const emit = defineEmits<Emits>()


type Props = {
  rows: Row[]
  row?: Row,
  closeBtn?: boolean
}

type Emits = {
  close: []
}

function mapRowsToItems(rows: Row[] = []) {
  return rows.map((row) => {
    return {
      title: row.Name,
      value: row.id,
      city: row.City
    }
  })
}

const search = reactive<{
  modal: boolean
  item: number | undefined
}>({
  modal: false,
  item: row?.id
})


const { t, locale } = useI18n()
</script>

<template>
  <v-card>
    <v-autocomplete
      eager
      :placeholder="t('search.description')"
      :items='mapRowsToItems(rows)'
      v-model='search.item'
    >
      <template #item='{ item, props }'>
        <v-list-item
          v-bind='props'
          :title='item.title'
          :subtitle='item.raw.city'
        />
      </template>
    </v-autocomplete>
    <v-card-actions>
      <v-btn
        v-if='closeBtn'
        :text="t('common.close')"
        color='secondary'
        variant='outlined'
        @click="emit('close')"
      />
      <v-btn
        :text="t('common.search')"
        color='primary'
        variant='tonal'
        block
        :href='`/${locale}/donation-location/${search.item}`'
        :disabled='!search.item || (row && search.item === row.id)'
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang='scss'>

</style>
