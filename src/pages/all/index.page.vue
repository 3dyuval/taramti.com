<script setup lang='ts'>
import { computed, ref } from 'vue'
import { type Coords } from '@/types'
import mapStylesSilver from '@/assets/map-styles-silver.json'
import Error from '@/components/Error.vue'

const props = defineProps<Props>()

const israel = { lat: 31.0461, lng: 34.8516 }

type Props = {
  locations: Record<string, Coords>
  center: Coords
  error?: string
  closeButton?: boolean,
}


function onHover() {
  console.log('hover')
}

const open = ref(true)

const icon = new URL('@/assets/drop.png', import.meta.url).href

const selectedlocationName = ref<string>('')

const selectedLocation = computed(() => {
  return selectedlocationName.value ? props.locations[selectedlocationName.value] : israel
})


</script>

<template>
  <GMapMap :center='selectedLocation' :clickable='true' :draggable='false' :zoom='10'>
    <GMapMarker
      v-for='(coord, key) in locations'
      :icon='{
        url: icon,
        scaledSize: { width: 35, height: 60 },
      }'
      :options='{
        styles: mapStylesSilver,
      }'
      :position='coord'
      class='map-marker'
      @click=' selectedlocationName = key'
      @mouseover='onHover'
    >
      <GMapInfoWindow v-if='selectedlocationName === key'>
        <suspense>
          <template #default>
            <h1>test</h1>
          </template>
          <template #fallback>
          </template>
        </suspense>
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