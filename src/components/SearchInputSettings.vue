<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import { ref } from 'vue'
import Panel from 'primevue/panel'
</script>

<template>
  <Panel :toggleable="true" :collapsed="true" header="אפשרויות חיפוש">
    <div>
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <Dropdown
            v-model="selectedCity"
            :options="cities"
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
