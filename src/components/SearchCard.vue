<script setup lang='ts'>
import { DonationLocationDate } from '@/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
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


const items = computed(() => {
  return rows.map((item) => ({
    title: item.donationLocation.name,
    value: item.donationLocation.name,
    subtitle: item.donationLocation.address.city,
    time: useOpeningTime(item.dateOpen, item.dateClose)
  })).filter((item) =>
    search.value.time === 'isOpen' ? item.time.isOpen
      : search.value.time === 'willOpen' ? item.time.willOpen
        : true)
})

const search = ref<{
  time: 'isOpen' | 'willOpen',
  query: string
}>({
  time: 'isOpen',
  query: ''
})

const { t, locale } = useI18n()

const menu = ref(true)


const clickOutside = {
  // include: [document?.querySelector('.select-time')],
  handler() {
    menu.value = true
  }
}

</script>

<template>
  <v-card elevation='0' class='search-card'>
    <!--     semantic markup for search caption-->
    <div class='search-header d-flex flex-row'>
      <h2 v-t="'search.title'" />
      <v-radio-group
        v-model='search.time'
        hide-details
        inline
        class='select-time'
        :mandatory='true'
      >
        <v-radio
          label='isOpen'
          value='isOpen'
        />
        <v-radio
          label='willOpen'
          value='willOpen'
        />
      </v-radio-group>
    </div>

    <v-autocomplete
      eager
      v-click-outside='clickOutside'
      :placeholder="t('search.description')"
      v-model='search.item'
      hide-details
      auto-select-first
      variant='outlined'
      :menu-props="{ 'class': 'rounded-menu' }"
      rounded
      :items='items'
      :no-data-text="t('search.noData')"
    >
      <template #item='{ item, props: { title, props} }'>
        <v-list-item v-bind='props'>
          <v-list-item-title>
            <span v-text='item.raw.title' />
            <v-chip
              color='secondary'
              v-if='item?.raw?.time.isOpen'
              text='isOpen'
            />
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
        :href='`/${locale}/donation-location/${search.item}`'
        :disabled='!search.item || (row && search.item === row.id)'
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
