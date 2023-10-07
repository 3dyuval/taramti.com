<script setup lang="ts">
import type { Row } from '@/types'
import { useOpeningTime } from '@/composables/useOpeningTime'

const props = defineProps<{ row: Row }>()

const times = useOpeningTime(props.row.FromHour, props.row.ToHour)
</script>
<template>
  <v-timeline density="compact" align="start" class="place-timeline">
    <v-timeline-item
      size="small"
      :dot-color="
        times.isOpen ? 'primary' : times.wasOpen ? 'secondary' : 'surface'
      "
      :fill-dot="times.isOpen || times.wasOpen"
      icon="ph-clock ph-fill"
    >
      <div class="mb-4">
        <p class="text-size-large">{{ times.openingTime }}</p>
        <p class="text-size-medium">שעת פתיחה</p>
      </div>
    </v-timeline-item>
    <v-timeline-item
      size="small"
      :dot-color="times.wasOpen ? 'secondary' : 'surface'"
      :fill-dot="times.wasOpen"
      icon="ph-clock ph-fill"
    >
      <div class="mb-4">
        <p class="text-size-large">{{ times.closingTime }}</p>
        <p class="text-size-medium">שעת סגירה</p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style lang="scss">
.place-timeline {
  direction: rtl;
}
</style>