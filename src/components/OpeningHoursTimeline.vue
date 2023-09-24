<script setup lang="ts">
import type { Row } from "@/types";
import { useOpeningTime } from "@/composables/useOpeningTime";
const props = defineProps<{ row: Row }>();

const times = useOpeningTime(props.row.FromHour, props.row.ToHour);
</script>
<template>
  <v-timeline density="compact" align="start" class="place-timeline">
    <v-timeline-item size="x-small" :dot-color="times.isOpen ? 'success' : 'default'">
      <div class="mb-4">
        <p>שעת פתיחה</p>
        <strong>{{ times.openingTime }}</strong>
      </div>
    </v-timeline-item>
    <v-timeline-item size="x-small" :dot-color="times.wasOpen ? 'error' : 'default'">
      <div class="mb-4">
        <strong>{{ times.closingTime }}</strong>
        <p>שעת סגירה</p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style lang="scss">
.place-timeline {
  direction: rtl;
}
</style>