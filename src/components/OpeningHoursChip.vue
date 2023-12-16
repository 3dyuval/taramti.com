<script setup lang='ts'>
import { intlFormatDistance, isAfter, isBefore, subHours } from 'date-fns'
import { useOpeningTime } from '@/composables/useOpeningTime'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  fromHour: number
  toHour: number
}>()


const { t, locale } = useI18n()
const {
  willOpen,
  isOpen,
  wasOpen,
  openingDate,
  closingDate,
  openingTime,
  closingTime
} = useOpeningTime(props.fromHour, props.toHour)


</script>
<template>
  <v-chip
    :text=" (willOpen) ?  $t('location.time.willOpen', {time: intlFormatDistance(openingDate, new Date(), { locale })})
          : (isOpen) ? $t('location.time.willOpen', { time: closingTime })
          : (isAfter(new Date(), subHours(closingDate, 2))) && isBefore(new Date(), closingDate) ? $t('location.time.willClose', { time: intlFormatDistance(closingDate, new Date(), { locale })})
          : (wasOpen) ? $t('location.time.closed', { time: openingTime }) : `${openingTime} - ${closingTime}`"
    prepend-icon='ph-clock'
    size='large'
    class='opening-hours'
    :color="isOpen ? 'primary' : 'default'"
  />
</template>

<style lang='scss'>

</style>