<script setup lang="ts">
import { ref } from 'vue'
import MapView from '@/components/Map.vue'
import data from '@/assets/data.json'
import DataTable from '@/components/Table.vue'
import Loading from '@/components/Loading.vue'
import PlaceDetails from '@/components/PlaceDetails.vue'

const rows = ref(data)

// const result = await fetch('http://yuval.live/getBlood')
// rows.value = result.json()
</script>

<template>
  <data-table :rows="rows">
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
