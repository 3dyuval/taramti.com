<script setup lang='ts'>
import { DonationLocationDate } from '@/types'
import { computed, reactive } from 'vue'
import { useOpeningTime } from '@/composables/useOpeningTime'

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

const settings = reactive<{
  time: 'isOpen' | 'willOpen' | ''
  query: string | undefined,
  menu: boolean
}>({
  query: row?.donationLocation.name,
  time: 'isOpen',
  menu: false
})


const items = computed(() => {
  return rows.map((item) => ({
    title: item.donationLocation.name,
    value: item.donationLocation.name,
    subtitle: item.donationLocation.address.city,
    time: useOpeningTime(item.dateOpen, item.dateClose)
  }))
    .filter((item) =>
      settings.time === 'isOpen' ? item.time.isOpen
        : settings.time === 'willOpen' ? item.time.willOpen
          : true)
    .map(item => {
      if (!settings.time) {
        return Object.assign(item, { subtitle: `${item.subtitle || ''} - ${item.time.openingTime} - ${item.time.closingTime}` })
      }
      return item
    })
})


</script>

<template>
  <v-card elevation='0' class='search-card'>
    <div class='search-header d-flex flex-row'>
      <h2 v-t="'search.title'" />
      <v-radio-group
        v-model='settings.time'
        hide-details
        inline
        class='select-time'
        :mandatory='false'
      >
        <v-radio
          :label='$t("search.isOpen")'
          value='isOpen'
        />
        <v-radio
          :label='$t("search.willOpen")'
          value='willOpen'
        />
      </v-radio-group>
    </div>
    <v-autocomplete
      eager
      clearable
      @click:clear='Object.assign(settings, { query: null, time: null })'
      :placeholder="$t('search.description')"
      v-model='settings.query'
      :model-value:menu='settings.menu'
      :custom-filter='(_value, query, item) =>
          !!(item?.raw.title?.includes(query)
          || item?.raw.subtitle?.includes(query)
    )'
      hide-details
      auto-select-first
      variant='outlined'
      :menu-props="{ 'class': 'rounded-menu' }"
      rounded
      :items='items'
      :no-data-text="$t('search.noData')"
    >
      <template #item='{ item, props: { title, ...itemProps} }'>
        <v-list-item v-bind='itemProps'>
          <v-list-item-title>
            <span v-text='item.raw.title' />
            <template v-if='settings.time'>
              <v-chip
                color='primary'
                v-if='item?.raw?.time.isOpen'
                :text="$t('location.time.openUntil', { time: item?.raw?.time.closingTime })"
              />
              <v-chip
                color='secondary'
                v-if='item?.raw?.time.willOpen'
                :text="$t('location.time.willOpen', { time: item?.raw?.time.openingTime })"
              />
            </template>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span v-text='item.raw.subtitle' />
          </v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-autocomplete>
    <v-card-actions>
      <v-btn
        v-if='closeBtn'
        :text="$t('common.close')"
        @click="emit('close')"
        color='secondary'
        variant='outlined'
      />
      <v-btn
        :text="$t('common.search')"
        color='primary'
        variant='tonal'
        class='my-4 flex-1-1'
        :href='`donation-location/${settings.query}`'
        :disabled='settings.query === row?.donationLocation.name'
      />
    </v-card-actions>
  </v-card>
</template>


<style lang='scss'>

.search-card {
  .select-time {
    justify-items: end;
  }
}

.rounded-menu > .v-overlay__content {
  border-radius: 20px !important;
  overflow: hidden;
}
</style>
