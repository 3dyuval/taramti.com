<script setup lang="ts">
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref } from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'
import { Coords } from '@/types'

type Props = {
  center: Coords
  markers: Coords | Coords[]
  error?: string
  closeButton?: boolean
}

type MarkerProps = {
  markerCenter: Coords
}

defineSlots<{
  marker: MarkerProps
  window: MarkerProps
}>()

const props = defineProps<Props>()

function onHover() {
  console.log('hover')
}

const open = true
</script>

<template>
  <error v-if="!center" :error-message="'אין כתובת להצגה במפה'" />
  <GMapMap :center="center" :zoom="15" :clickable="true" :draggable="false">
    <GMapMarker
      v-for="markerCenter in Array.isArray(markers) ? markers : [markers]"
      :position="markerCenter"
      class="map-marker"
      @mouseover="onHover"
      :options="{
        styles: mapStylesSilver,
      }"
      :icon="{
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Blood_drop.svg/734px-Blood_drop.svg.png',
        scaledSize: { width: 35, height: 60 },
      }"
    >
      <slot name="marker" :marker-center="markerCenter">
        <GMapInfoWindow
          :opened="open"
          :closeclick="false"
          @closeclick="null"
          :data-show-close="closeButton"
        >
          <slot name="window" :marker-center="markerCenter" />
        </GMapInfoWindow>
      </slot>
    </GMapMarker>
  </GMapMap>
</template>

<style lang="scss">
.vue-map-container {
  width: 100%;
  height: 100vh;
  flex: 1;
}

button[title='Close'] {
  visibility: hidden;
}

[role='dialog'].gm-style-iw:has([data-show-close='true']) {
  button[title='Close'] {
    visibility: visible;
  }
}
</style>
