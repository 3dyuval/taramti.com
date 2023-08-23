<script setup lang="ts">
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref } from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'
import type { Row } from '@/@types'

const props = defineProps<{
  row: Row
}>()

const center = ref({ lat: 51.093048, lng: 6.84212 })

const { toastError } = useErrorCapture({summary: 'אין כתובת להצגה במפה'})
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
  <GMapMap
    :center="center"
    :zoom="15"
    :options="mapStylesSilver"
    :disableDefaultUI="true"
    style="width: 50vw; height: 20rem"
  >
    <GMapMarker :position="center" :clickable="true" :draggable="true" />
  </GMapMap>
</template>
