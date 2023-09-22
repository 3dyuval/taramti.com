<script setup lang="ts">
import type { Row, Coords } from '@/types'
import { ref } from 'vue'
import Map from '@/components/Map.vue'
import LocationOpenHours from '@/components/LocationOpenHours.vue'

defineProps<{
  row: Row
  coords: Coords
  error?: string
}>()


</script>

<template>
  <error v-if="error" :error="error" />
  <Map v-if="row && coords" :center="coords" >
    <h1>{{ row.Name }}</h1>
    <v-btn variant="tonal" color="primary">נווט</v-btn>
    <location-open-hours :row="row" />
  </Map>
</template>
