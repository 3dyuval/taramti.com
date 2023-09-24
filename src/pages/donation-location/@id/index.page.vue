<script setup lang="ts">
import type { Row, Coords } from '@/types'
import Map from '@/components/Map.vue'
import LocationOpenHours from '@/components/LocationOpenHours.vue'
import { ref } from 'vue'

const props = defineProps<{
  row: Row
  coords: Coords
  error?: string
}>()

const center = ref<Coords>(props.coords)
</script>

<template>
  <Map :center="center" :markers="center" :error="error">
    <template #window>
      <h1>{{ row.Name }}</h1>
      <v-btn variant="tonal" color="primary">נווט</v-btn>
      <location-open-hours :row="row" />
    </template>
  </Map>
</template>
