<script setup lang="ts">
import { Row } from "@/types";
import { computed } from "vue";
import { isPast, isFuture, intlFormat, intlFormatDistance } from "date-fns";
import { useOpeningTime } from "@/composables/useOpeningTime";

const props = defineProps<{
  fromHour: string;
  toHour: string
}>();

const {
  willOpen,
  isOpen,
  wasOpen,
  openingDate,
  closingDate,
  openingTime,
  closingTime,
} = useOpeningTime(props.fromHour, props.toHour);

const caption = computed(() => {
  if (willOpen) {
    return "יפתח " + intlFormatDistance(openingDate, new Date(), { locale: 'he'});
  }
  if (isOpen) {
    return `פתוח עד ${openingTime}`;
  }
  if (wasOpen) {
    return `סגור מ ${closingTime}`;
  }
});

</script>
<template>
  <v-chip 
  size="large"
  :color="isOpen ? 'primary' : 'default'" :text="caption" />
</template>

<style lang="scss"></style>
