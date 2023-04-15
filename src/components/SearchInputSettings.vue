<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import { ref, computed } from 'vue'
import Panel from 'primevue/panel'
import type { Row } from '@/@types'
import cities from '@/assets/cities.json'

const props = withDefaults(
  defineProps<{
    rows: Row[]
  }>(),
  {
    rows: () => [],
  }
)

const formattedCities = computed(function () {
  return props.rows.reduce((acc, val) => {
    return [
      acc,
      {
        label: val.City,
        icon: 'pi-map-marker',
      },
    ]
  }, [])
})
</script>

<template>
  <Panel :toggleable="true" :collapsed="true" header="אפשרויות חיפוש">
    <div>
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <Dropdown
            v-model="selectedCity"
            :options="formattedCities"
            optionLabel="name"
            placeholder="Select a City"
          />
        </div>
        <div class="p-inputgroup">
          <Checkbox v-model="checked" :binary="true" />
        </div>
      </div>
    </div>
  </Panel>
</template>

<style scoped></style>
