<script setup lang="ts">
import { computed } from 'vue'
import { intlFormatDistance } from 'date-fns'
import { useOpeningTime } from '@/composables/useOpeningTime'
import { usePageContext } from '@/composables/usePageContext'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  fromHour: string
  toHour: string
}>()

const { locale } = usePageContext()

const { t } = useI18n()
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
    return t('location.time.willOpen', {
      time: intlFormatDistance(openingDate, new Date(), { locale }),
    })
  }
  if (isOpen) {
    return t('location.time.willOpen', { time: closingTime })
  }

  if (closingDate.getTime() - Date.now() < 2 * 60 * 60 * 1000) {
    // check if closing date is in the next 2 hours
    return t('location.time.willClose', {
      time: intlFormatDistance(closingDate, new Date(), { locale }),
    })
  }

  if (wasOpen) {
    return t('location.time.closed')
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