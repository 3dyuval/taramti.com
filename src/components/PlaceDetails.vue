<script setup lang="ts">
import type { Row } from "@/types";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Tooltip from "primevue/tooltip";
import CardBody from "primevue/card";
import Chip from "primevue/chip";
import { computed } from "vue";


const emit = defineEmits<{
  'show-map': []
}>()

const props = defineProps<{
  row: Row;
}>();

const formattedAddress = `${props.row.City} ${props.row.Name} ,${props.row.NumHouse} ,${props.row?.City} ${props.row.AccountType}`;
const placeName = props.row.Street
  ? props.row.Street
  : props.row.AccountType
  ? props.row?.NumHouse
    : props.row.Name;


function handleButtonLink(event: Event) {
  const button = event.target as HTMLButtonElement;
  const href = button.dataset.href;
  if (!href) return;
  window.location.href =  href
}
  
</script>

<template>
  <card style="flex: .8;">
    <template #title>
      <div class="card-content-head">
        {{ placeName }}
        <chip class="" :label="formattedAddress" icon="pi pi-map-marker" />
      </div>
    </template>
    <template #footer>
      <div class="card-content-actions">
        <Button @click="handleButtonLink" role="link" :data-href="`/donation-location/${row.id}`" class="pi" plain text label="כל הפרטים"></Button>
        <Button class="pi pi-share-alt" plain text label="שתף"></Button>
        <Button class="pi pi-heart" plain-text color="var(--heart100)" label="אהבתי"></Button>
        <Button @click="emit('show-map')" class="pi pi-directions-alt" plain text label="הצג מפה"></Button>
      </div>
    </template>
  </card>
</template>

<style lang="scss">
.card-content-head {
  display: flex;
  justify-content: space-evenly;
  text-align: right;

  .p-title {
    font-size: 32px;
    color: var(--red-700);
  }

  .p-chip {
    color: var(--red-700);
  }
}

.card-content-actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  align-items: baseline;
  .p-button-label {
    margin: 0 0.5em;
  }
  button {
    direction: ltr;
  }
  .pi.pi-directions-alt{
    justify-self: flex-end;
  }
}
</style>
@/types