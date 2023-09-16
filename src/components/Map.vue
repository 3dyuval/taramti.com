<script setup lang="ts">
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref } from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'

const props = defineProps<{
  coords: Coords
}>()

const error = ref<string | null>('No implemented')

type Coords = {
  lat: number
  lng: number
}

const center = ref<Coords>(props.coords)

if (!props.coords) {
  throw 'אין כתובת להצגה במפה'
}

function onHover() {
  console.log('hover')
}
</script>

<template>
  <!-- TODO :options="mapStylesSilver" -->
  <GMapMap :center="coords" :zoom="15" :clickable="true" :draggable="false">
    <GMapMarker
      :position="coords"
      @mouseover="onHover"
      :options="{
        styles: mapStylesSilver
      }"
      :icon="{
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Blood_drop.svg/734px-Blood_drop.svg.png',
        scaledSize: { width: 35, height: 60 },
      }"
    >
      <GMapInfoWindow :opened="true">
        <p>hello</p>
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<style lang="scss">
.vue-map-container {
  width: 100%;
  height: 100vh;
  flex: 1;
}
</style>
@/types
