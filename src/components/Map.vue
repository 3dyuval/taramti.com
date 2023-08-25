<script setup lang="ts">
import mapStylesSilver from "@/assets/map-styles-silver.json";
import { ref } from "vue";
import useErrorCapture from "@/composables/useErrorCapture";
import type { Row } from "@/@types";
import Error from "@/components/Error.vue";

const props = defineProps<{
  row: Row;
}>();

const error = ref<string | null>(null);

type Coords = {
  lat: number;
  lng: number;
};

const center = ref<Coords>();

let errorSummary = "אין כתובת להצגה במפה";
const { toastError } = useErrorCapture({ summary: errorSummary });
const googleGeocoding = new Request(`https://maps.googleapis.com/maps/api/geocode/json?&key=${
  import.meta.env.VITE_GOOGLE_MAP_API_KEY
}&address=
  ${props.row.City}%${props.row.Street}%${props.row.NumHouse}`);

try {
  if (!props.row.City || !props.row.Street) {
    throw "לא הצלחנו למצוא כתובת מלאה";
  }
  const response = await fetch(googleGeocoding);
  const data = await response.json();
  center.value = data.results[0].geometry.location;
} catch (err) {
  toastError(`${err}`);
  error.value = 'אין כתובת להצגה במפה';
}
</script>

<template>
  <Error v-if="error" :error-message="error" small />
  <loading v-else-if="!center" />
  <GMapMap
    v-else
    :center="center"
    :zoom="15"
    :options="mapStylesSilver"
    :disable-default-ui="true"
  >
    <GMapMarker :position="center" :clickable="true" :draggable="false" />
  </GMapMap>
</template>

<style lang="scss">
.vue-map-container {
  width: 100%;
  flex: 1;
}
</style>
