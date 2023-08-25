<script setup lang="ts">
import { ref, type Ref } from 'vue'
import MapView from '@/components/Map.vue'
import DataTable from '@/components/Table.vue'
import Loading from '@/components/Loading.vue'
import PlaceDetails from '@/components/PlaceDetails.vue'
import type { Row } from '@/@types'
import useErrorCapture from '@/composables/useErrorCapture'

defineProps<{ searchText: string }>()

const { toastError } = useErrorCapture({
  summary: 'לא הצלחנו להביא את הנתונים',
})

const rows = ref<Row[]>([])


if (!!import.meta.env.DEV) {
    const json = await import('../assets/data.json')
    rows.value = json.default as Row[]
} else if (import.meta.env.MODE === 'production'){
  rows.value = await fetch('./netlify/functions/fetchmada')
  .then(result => result.json())
  .then((data) => data as Row[])
  .catch(err => {
    toastError(err.message)
    return []
  })

}





</script>

<template>
  <data-table :rows="rows" >
    <template #expansion="slotProps">
      <place-details :row="slotProps.data" />
      <suspense>
        <template #default>
          <map-view :row="slotProps.data" />
        </template>
        <template #fallback>
          <loading />
        </template>
      </suspense>
    </template>
  </data-table>
</template>

<style lang="scss"></style>
