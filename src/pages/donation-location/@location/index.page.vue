<script setup lang='ts'>
import type { Coords, DonationLocationDate } from '@/types'
import Map from '@/components/MapSingle.vue'
import LocationCard from '@/components/LocationCard.vue'
import { ref } from 'vue'

const props = defineProps<{
  locations: DonationLocationDate[]
  location: DonationLocationDate
  coords: Coords
  error?: string
}>()

const center = ref<Coords>(props.coords)


</script>

<template>
  <Map :center='center' :error='error'>
    <location-card :location='location' :coords='coords' />
  </Map>

</template>


