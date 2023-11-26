<script setup lang='ts'>
import type { DonationLocationDate, Row } from '@/types'
import { useOpeningTime } from '@/composables/useOpeningTime'

const props = defineProps<{ row: DonationLocationDate }>()

const times = useOpeningTime(props.row.dateOpen, props.row.dateClose)


</script>
<template>
  <v-timeline
    density='compact'
    class='place-timeline'
  >
    <v-timeline-item
      size='small'
      :dot-color="
        times.isOpen ? 'primary' : times.wasOpen ? 'secondary' : 'surface'
      "
      :fill-dot='times.isOpen || times.wasOpen'
      icon='ph-clock ph-fill'
    >
      <div class='mb-4'>
        <p class='text-size-large'>{{ times.openingTime }}</p>
        <p class='text-size-medium' v-t='"location.time.closingTime"' />
      </div>
    </v-timeline-item>
    <v-timeline-item
      size='small'
      :dot-color="times.wasOpen ? 'secondary' : 'surface'"
      :fill-dot='times.wasOpen'
      icon='ph-clock ph-fill'
    >
      <div class='mb-4'>
        <p class='text-size-large'>{{ times.closingTime }}</p>
        <p class='text-size-medium' v-t='"location.time.openingTime"' />
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style lang='scss'>


.v-timeline.place-timeline {

}
</style>