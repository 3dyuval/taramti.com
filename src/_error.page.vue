<script setup lang="ts">
import { usePageContext } from '@/composables/usePageContext';
import Error from '@/components/Error.vue'

const pageContext = usePageContext()


</script>

<template>
  <error v-if="pageContext?.abortStatusCode  === 404" error-message="העמוד המבוקש לא נמצא" />
  <error :error-message="(pageContext.abortReason as string) || 'העמוד נתקל בבעיה'" />
</template>