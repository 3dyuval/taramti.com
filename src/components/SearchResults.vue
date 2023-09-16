<script setup lang="ts">
import { ref, type Ref } from 'vue'
import DataTable from '@/components/Table.vue'
import Loading from '@/components/Loading.vue'
import PlaceDetails from '@/components/PlaceDetails.vue'
import type { Row } from '@/types'
import useErrorCapture from '@/composables/useErrorCapture'
import Error from '@/components/Error.vue'
import { computed } from '@vue/reactivity'
import { DataTableFilterMeta } from 'primevue/datatable'
// import Hearts from '@/components/Hearts.vue'
import MapView from '@/components/MapView.vue'

const props = defineProps<{
  search: string
  rows: Row[]
}>()

const emit = defineEmits<{
  'update:search': [payload: string]
  'update:is-heart': [payload: boolean]
}>()

let errorMsg = 'לא הצלחנו להביא את הנתונים'

const { toastError } = useErrorCapture({
  summary: errorMsg,
})

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
            <!-- <map-view :row="slotProps.data" /> -->
            <!-- TODO, get coords in custom server function -->
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
@/types
