<script setup lang="ts">
import mapStylesSilver from '@/assets/map-styles-silver.json'
import { ref, onErrorCaptured} from 'vue'
import useErrorCapture from '@/composables/useErrorCapture'
import type { Row } from '@/types'
import Error from '@/components/Error.vue'
import Map from '@/components/Map.vue'
 
const props = defineProps<{
  rows: Row[]
}>()

const error = ref<string | null>('No implemented')

type Coords = {
  lat: number
  lng: number
}

// Israel/Coordinates
// 31.0461° N, 34.8516° E

const israel = { lat: 31.0461, lng: 34.8516 }
const center = ref<Coords>(israel)
const { toastError } = useErrorCapture({ summary: 'משהו לא עבד' });

onErrorCaptured(() => {
  toastError('משהו לא עבד')
  return false
})

</script>

<template>
  <Suspense>
    <template #fallback>
      <Error :error-message="error" small />
    </template>
    <template #default>
      <Map :coords="center"  />
    </template>
  </Suspense>
</template>

<style lang="scss">
.vue-map-container {
  width: 100%;
  flex: 1;
}
</style>
