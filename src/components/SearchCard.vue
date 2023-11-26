<script setup lang='ts'>
import { DonationLocationDate } from '@/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'


const { rows, row } = defineProps<Props>()
const emit = defineEmits<Emits>()

type Props = {
  rows: DonationLocationDate[] //TODO change to locations
  row?: DonationLocationDate,
  closeBtn?: boolean
}

type Emits = {
  close: []
}


const search = ref<{
  item: number | undefined
}>({
  item: row?.donationLocation.name || ''
})

const { t, locale } = useI18n()
</script>

<template>
  <v-card>
    <v-autocomplete
      eager
      :placeholder="t('search.description')"
      v-model='search.item'
      hide-details
      :items='rows.map((item) => ({
          title: item.donationLocation.name,
          value: item.donationLocation.name,
          subtitle: item.donationLocation.address.city
        }))'
    >
      <template #item='{ item, props }'>
        <v-list-item
          v-bind='props'
          :subtitle='item.raw.subtitle'
        />
      </template>
    </v-autocomplete>
    <v-card-actions>
      <v-btn
        v-if='closeBtn'
        :text="t('common.close')"
        @click="emit('close')"
        color='secondary'
        variant='outlined'
      />
      <v-btn
        :text="t('common.search')"
        color='primary'
        variant='tonal'
        class='my-4 flex-1-1'
        :href='`/${locale}/donation-location/${search.item.replaceAll(/ /g, "-")}`'
        :disabled='!search.item || (row && search.item === row.id)'
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang='scss'>

</style>
