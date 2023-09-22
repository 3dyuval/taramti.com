<script setup lang="ts">
import type { Row, Coords } from '@/types'
import { ref } from 'vue'
import Map from '@/components/Map.vue'

defineProps<{
  row?: Row
  coords?: Coords
  error?: string
}>()

</script>

<template>
    <Map :center="coords">
        <p>
            name
        </p>
    </Map>
</template>
