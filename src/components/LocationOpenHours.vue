<script setup lang="ts">
import { Row } from '@/types'
import { computed } from 'vue'
import { isPast, isFuture, intlFormat, intlFormatDistance } from 'date-fns'

const props = defineProps<{
  row: Row
}>()

const openingHourToday = new Date()
const closingHourToday = new Date()

//@ts-ignore
openingHourToday.setHours.apply(openingHourToday, props.row.FromHour.split(':').map(Number))
//@ts-ignore
closingHourToday.setHours.apply(closingHourToday, props.row.ToHour.split(':').map(Number))

const isOpenAlready = isPast(openingHourToday)
const isClosedAlready = isFuture(closingHourToday)

const text = computed(() => {
    if (isClosedAlready) {
        return 'סגור עכשיו'
    } else if (isOpenAlready && isFuture(closingHourToday))  {
        return 'נסגר היום ב-' + props.row.ToHour
    } else if (!isClosedAlready && isFuture(openingHourToday)) {
        return 'יפתח היום מ' + '-' + props.row.FromHour +  ' ועד -'  + props.row.ToHour
    }
  })

</script>
<template>
  <v-chip
    :color="isOpenAlready && !isClosedAlready ? 'primary' : 'secondary'"
    :class="{
      ['closed']: isClosedAlready,
      ['open']: isOpenAlready && !isClosedAlready,
    }"
    :text="text"
  />
</template>

<style lang="scss"></style>
