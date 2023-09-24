<script setup lang="ts">
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref } from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'
import { Coords } from '@/types'
import Error from '@/components/Error.vue'

const props = defineProps<{
  center: Coords
  error?: string
  closeButton?: boolean
}>()

function onHover() {
  console.log('hover')
}

const open = ref(true)
</script>

<template>
  <error v-if="error" :error-message="'אין כתובת להצגה במפה'" />
  <GMapMap :center="center" :zoom="15" :clickable="true" :draggable="false">
    <GMapMarker
      class="map-marker"
      :position="center"
      @mouseover="onHover"
      @click="open = true"
      :options="{
        styles: mapStylesSilver,
      }"
      :icon="{
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Blood_drop.svg/734px-Blood_drop.svg.png',
        scaledSize: { width: 35, height: 60 },
      }"
    >
      <GMapInfoWindow
        :opened="open"
        :closeclick="false"
        @closeclick="null"
        :data-show-close="closeButton"
      >
        <slot name="default" />
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

button[title='Close'] {
  visibility: hidden;
}

[role='dialog'].gm-style-iw:has([data-show-close="true"]) {
  button[title='Close'] {
    visibility: visible;
  }
}
</style>
