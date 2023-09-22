<script setup lang="ts">
import type { Row } from '@/types'

const props = defineProps<{
  rows: Row[]
  id: string
}>()
</script>

<template>
  {{ rows.find(row => rows.id === id ) }}
</template>
