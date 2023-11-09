<script setup lang='ts'>

import { Row } from '@/types'
import { reactive } from 'vue'

const {rows, row} = defineProps<Props>()

type Props = {
  rows: Row[]
  row?: Row
}

function mapRowsToItems(rows: Row[] = []) {
  return rows.map((row) => {
    return {
      title: row.Name,
      value: row.id,
      city: row.City,
    }
  })
}

const search = reactive<{
  modal: boolean
  item: number | undefined
}>({
  modal: false,
  item: row?.id,
})



</script>

<template>
  <v-card>
    <v-autocomplete
      placeholder="חפש מקום לפי שם"
      :items="mapRowsToItems(rows)"
      v-model="search.item"
    >
      <template #item="{ item, props }">
        <v-list-item
          v-bind="props"
          :title="item.title"
          :subtitle="item.raw.city"
        />
      </template>
    </v-autocomplete>
    <v-card-actions>
      <v-btn
        text="סגור"
        color="secondary"
        variant="outlined"
        @click="search.modal = !search.modal"
      />
      <v-btn
        text="חפש"
        color="primary"
        variant="tonal"
        block
        :href="`/donation-location/${search.item}`"
        :disabled="!search.item || (row && search.item === row.id)"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang='scss'>

</style>