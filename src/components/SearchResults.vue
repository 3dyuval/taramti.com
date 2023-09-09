<script setup lang="ts">
import { ref, type Ref } from 'vue'
import MapView from '@/components/Map.vue'
import DataTable from '@/components/Table.vue'
import Loading from '@/components/Loading.vue'
import PlaceDetails from '@/components/PlaceDetails.vue'
import type { Row } from '@/@types'
import useErrorCapture from '@/composables/useErrorCapture'
import Error from '@/components/Error.vue'
import { computed } from '@vue/reactivity'
import { DataTableFilterMeta } from 'primevue/datatable'
// import Hearts from '@/components/Hearts.vue'

const props = defineProps<{ 
  search: string
 }>()

const emit = defineEmits<{
  'update:search': [payload: string]
  'update:is-heart': [payload: boolean]

}>()

let errorMsg = 'לא הצלחנו להביא את הנתונים'

const { toastError } = useErrorCapture({
  summary: errorMsg,
})

const rows = ref<Row[]>([])

function addId (row: Row, id: number): Row {
  return {
    ...row,
    id
  }
}
if (!!import.meta.env.DEV) {
    const json = await import('../assets/data.json')
    rows.value = (json.default as Row[]).map(addId)
} else if (import.meta.env.PROD){
  rows.value = await fetch('./.netlify/functions/fetchmada')
  .then(result => result.json())
  .then((data) => (data as Row[]).map(addId))
  .catch(err => {
    toastError(errorMsg)
    return Promise.reject(errorMsg)
  })
}

// https://www.primefaces.org/primevue/showcase/#/datatable/filter
const filters = computed<DataTableFilterMeta>(() => ({
  City: {
    value: props.search,
    matchMode: 'contains',
  },
  // Name: {
  //   value: props.search,
  //   matchMode: 'contains',
  // }
}))
</script>

<template>
  <div class="result">
    <data-table :filters="filters" :value="rows">
      <template #header>
        <!-- <hearts
          @update:is-heart="emit('update:is-heart', $event)"
          @update:search="emit('update:search', $event)"
          :search="search"
        /> -->
      </template>
      <template #expansion="slotProps">
        <div class="expansion">
          <place-details :row="slotProps.data" />
          <map-view :row="slotProps.data" />
        </div>
      </template>
    </data-table>
  </div>
</template>

<style lang="scss">
.expansion {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
}
</style>
