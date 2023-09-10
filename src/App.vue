<script setup lang="ts">
import Toast from 'primevue/toast'
import { Row } from './@types';

defineProps<{ rows: Row[] }>()
</script>

<template>
  <toast />
  <slot :rows="rows" />
</template>

<style lang="scss"></style>
