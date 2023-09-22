<script setup lang="ts">
import type { Row } from '@/types'

const props = defineProps<{
  rows: Row[]
}>()
</script>

<template>
  {{ rows }}
</template>
