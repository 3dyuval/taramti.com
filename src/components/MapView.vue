<script setup lang="ts">
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref } from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'
import type { Row } from '@/types'
import Map from '@/components/Map.vue'

const props = defineProps<{
  row: Row
}>()

const center = ref()

const { toastError } = useErrorCapture({ summary: 'אין כתובת להצגה במפה' })
const googleGeocoding =
  new Request(`https://maps.googleapis.com/maps/api/geocode/json?&key=${
    import.meta.env.VITE_GOOGLE_MAP_API_KEY
  }&address=
  ${props.row.City}%${props.row.Street}%${props.row.NumHouse}`)

try {
  const response = await fetch(googleGeocoding)
  const data = await response.json()
  center.value = data.results[0].geometry.location
} catch (err) {
  toastError(`${err}`)
}
</script>

<template>
    <Map v-if="center" :coords="center" style="width: 50vw; height: 20rem" />
</template>
