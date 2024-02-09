<script setup lang='ts'>
import type { Coords, DonationLocationDate } from '@/types'
import Map from '@/components/Map.vue'
import LocationCard from '@/components/LocationCard.vue'
import { ref } from 'vue'

const props = defineProps<{
  locations: Coords[]
  coords: Coords
  error?: string
}>()

const center = ref<Coords>(props.coords)


</script>

<template>
  <Map :center='center' :error='error'>
    {{ coords }}
<!--    <location-card :location='location' :coords='coords' />-->
  </Map>

</template>


