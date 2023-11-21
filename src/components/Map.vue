<script setup lang='ts'>
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref } from 'vue'
import type { Row } from '@/types'
import { Coords } from '@/types'
import Error from '@/components/Error.vue'
import 'v-mapbox/dist/v-mapbox.css?inline'
import 'mapbox-gl/dist/mapbox-gl.css?inline'
import { VMap, VMarker } from 'v-mapbox'

const props = defineProps<{
  rows: Row[]
  center: Coords
  error?: string
  closeButton?: boolean
}>()

function onHover() {
  console.log('hover')
}

const open = ref(true)
const markers = ref(Array.from({ length: 10 })
  .fill({
    lat: Number(props.center.lat) + Math.random() / 100,
    lng: Number(props.center.lng) + Math.random() / 100
  }))

const icon = new URL('@/assets/drop.png', import.meta.url).href

const mapboxToken = import.meta.env['VITE_MAPBOX_TOKEN']

const mapOptions = ref({
  accessToken: mapboxToken,
  style: 'mapbox://styles/mapbox/light-v11', //https://docs.mapbox.com/api/maps/styles/
  center: props.center,
  zoom: 15
})

const map = ref()

async function onMapLoaded(event: any) {
  map.value = event.map
  // event.component.actions.flyTo({
  //   center: props.center,
  //   zoom: 15
  // })
}

const markerOptions = {
  draggable: false
}


const popupOptions = {
  closeButton: false,
  closeOnClick: false,
  closeOnMove: false,
  closeOnZoom: false,
  maxWidth: 'none',
  className: 'map-popup',
  offset: 0
}
</script>

<template>
  <error v-if='error' :error-message="'אין כתובת להצגה במפה'" />
  <VMap v-if='false' :options='mapOptions'>
    <VMarker :coordinates='center'>
      <!--      <template #marker>-->
      <!--        <img :src='icon' alt='location' />-->
      <!--      </template>-->
    </VMarker>
    <!--                  :options='markerOptions' :popup-options='popupOptions' -->
  </VMap>
  <GMapMap v-else :center='center' :zoom='15' :clickable='true' :draggable='false'>
    <GMapMarker
      v-for='(marker, key) of markers'
      :key='key'
      class='map-marker'
      :position='marker'
      @mouseover='onHover'
      @click='open = true'
      :options='{
        styles: mapStylesSilver,
      }'
      :icon='{
        url: icon,
        scaledSize: { width: 35, height: 60 },
      }'
    >
      <GMapInfoWindow
        :opened='open'
        :closeclick='false'
        @closeclick='null'
        :data-show-close='closeButton'
      >
        <slot name='default' />
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<style lang='scss'>
.vue-map-container, .v-map-container {
  width: 100%;
  height: 100svh;
  flex: 1;
}

//button[title='Close'] {
//  visibility: hidden;
//}
//
//[role='dialog'].gm-style-iw:has([data-show-close='true']) {
//  button[title='Close'] {
//    visibility: visible;
//  }
//}
</style>