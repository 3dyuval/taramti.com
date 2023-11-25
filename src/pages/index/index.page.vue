<script setup lang='ts'>
import type { Row } from '@/types'
import SearchCard from '@/components/SearchCard.vue'

const props = defineProps<{
  rows: Row[]
}>()

</script>

<template>
  <div class='index container'>
    <search-card v-bind='props' class='card-center' />
  </div>
</template>

<style lang='scss'>

.index.container {
  height: 100lvmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-center {
  margin: 0 auto;
  width: 50%;
}
</style>