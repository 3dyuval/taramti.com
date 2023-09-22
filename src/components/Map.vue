<script setup lang="ts">
import mapStylesSilver from "@/assets/map-styles-silver.json";
import { ref } from "vue";
import useErrorCapture from "@/composables/useErrorCapture";
import { Coords } from '@/types';

const props = defineProps<{
  center: Coords;
}>();


function onHover() {
  console.log("hover");
}

const open = true

</script>

<template>
  <error v-if="!center" :error-message="'אין כתובת להצגה במפה'" />
  <GMapMap :center="center" :zoom="15" :clickable="true" :draggable="false">
    <GMapMarker
      :position="center"
      @mouseover="onHover"
      :options="{
        styles: mapStylesSilver,
      }"
      
      :icon="{
        url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Blood_drop.svg/734px-Blood_drop.svg.png',
        scaledSize: { width: 35, height: 60 },
      }"
    >
      <GMapInfoWindow :opened="open" :closeclick="false" @closeclick="null"   >
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
</style>
@/types
