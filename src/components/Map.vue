<script setup lang='ts'>
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref } from 'vue'
import { Coords } from '@/types'
import Error from '@/components/Error.vue'

const props = defineProps<{
  center: Coords
  error?: string
  closeButton?: boolean,
  locations: any[]
}>()

function onHover() {
  console.log('hover')
}

const open = ref(true)

const icon = new URL('@/assets/drop.png', import.meta.url).href

</script>

<template>
  <error v-if='error' :error-message="'אין כתובת להצגה במפה'" />
  <GMapMap :center='center' :zoom='15' :clickable='true' :draggable='false' :options='{
        styles: mapStylesSilver,
      }'>
    <GMapMarker v-for='location in locations || []' :icon='{url: icon, scaledSize: { width: 35, height: 60 }}'
    />
    <GMapMarker
      class='map-marker'
      :position='center'
      @mouseover='onHover'
      @click='open = true'
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