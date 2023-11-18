<script setup lang='ts'>
import { DonationLocation } from '@/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'


const { rows, row } = defineProps<Props>()
const emit = defineEmits<Emits>()

type Props = {
  rows: DonationLocation[]
  row?: DonationLocation,
  closeBtn?: boolean
}

type Emits = {
  close: []
}


const search = ref<{
  item: number | undefined
}>({
  item: row?.id
})

const { t, locale } = useI18n()
</script>

<template>
  <v-card>
    <v-autocomplete
      eager
      :placeholder="t('search.description')"
      v-model='search.item'
      :items='rows.map(({donationLocation}) => ({
          title: donationLocation.name,
          value: donationLocation.name,
          subtitle: donationLocation.address.city
        }))'
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
        @click="emit('close')"
        color='secondary'
        variant='outlined'
      />
      <v-btn
        :text="t('common.search')"
        color='primary'
        variant='tonal'
        :href='`/${locale}/donation-location/${search.item}`'
        :disabled='!search.item || (row && search.item === row.id)'
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang='scss'>

</style>
