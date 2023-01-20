<script setup lang="ts">
import type { Row } from '@/@types'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Tooltip from 'primevue/tooltip'
import CardBody from 'primevue/card'
import Chip from 'primevue/chip'
import { computed } from 'vue'
const props = defineProps<{
  row: Row
}>()

const formattedAddress = `${props.row.City} ${props.row.Name} ,${props.row.NumHouse} ,${props.row?.City} ${props.row.AccountType}`
const placeName = props.row.Street
  ? props.row.Street
  : props.row.AccountType
  ? props.row?.NumHouse
  : props.row.Name
</script>

<template>
  <card>
    <template #title>
      {{ placeName }}
    </template>
    <template #content>
      <chip class="" :label="formattedAddress" icon="pi pi-map-marker" />
    </template>
    <template #footer>
      <Button icon="pi pi-share-alt" label="שתף">שתף</Button>
      <Button icon="pi pi-directions-alt" label="גוגל מפות"></Button>
    </template>
  </card>
</template>

<style scoped>
.p-title {
  font-size: 32px;
  color: var(--red-700);
}

.p-chip {
  color: var(--red-700);
}
.p-card {
  width: 50%;
  padding: 24px;
  background-color: var(--gray-100);
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: baseline;
}
</style>
