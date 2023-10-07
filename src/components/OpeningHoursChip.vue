<script setup lang="ts">
import { computed } from 'vue'
import { intlFormatDistance } from 'date-fns'
import { useOpeningTime } from '@/composables/useOpeningTime'

const props = defineProps<{
  fromHour: string
  toHour: string
}>()

const {
  willOpen,
  isOpen,
  wasOpen,
  openingDate,
  closingDate,
  openingTime,
  closingTime,
} = useOpeningTime(props.fromHour, props.toHour)

const caption = computed(() => {
  if (willOpen) {
    return (
      'יפתח ' + intlFormatDistance(openingDate, new Date(), { locale: 'he' })
    )
  }
  if (isOpen) {
    return `פתוח עד ${closingTime}`
  }

  if (wasOpen) {
    let txt = `נסגר `

    // check if closing date is in the next 2 hours

    if (closingDate.getTime() - Date.now() < 2 * 60 * 60 * 1000) {
      return (
        txt +
        intlFormatDistance(closingDate, new Date(), {
          locale: 'he',
        })
      )
    }

    if (wasOpen) {
      return txt + closingTime
    }

    return `סגור היום`
  }
})
</script>
<template>
  <v-chip
    size="large"
    :color="isOpen ? 'primary' : 'default'"
    :text="caption"
    prepend-icon="ph-clock"
  />
</template>

<style lang="scss"></style>