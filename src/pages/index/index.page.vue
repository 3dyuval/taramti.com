<script setup lang="ts">
import Error from '@/components/Error.vue'
import Loading from '@/components/Loading.vue'
import SearchInput from '@/components/SearchInput.vue'
import SearchResult from '@/components/SearchResults.vue'
import { onErrorCaptured, ref } from 'vue'
import Card from 'primevue/card'
import useErrorCapture from '@/composables/useErrorCapture'
import type { Row } from '@/types'

const props = defineProps<{
  rows: Row[]
}>()

const { toastError } = useErrorCapture({ summary: 'אירעה שגיאה' })
const error = ref<string | null>(null)

onErrorCaptured((err: string) => {
  console.error(err)
  error.value = err
  toastError(err)
})

const search = ref('')
</script>

<template>
  <header></header>
  <main>
    <card class="header-card">
      <template #content>
        <search-input v-model:search="search" />
      </template>
    </card>
    <section class="content">
      <suspense>
        <template #fallback>
          <loading v-if="!error" />
          <error v-else :error-message="error"></error>
        </template>
        <template #default>
          <search-result v-model:search="search" :rows="rows" />
        </template>
      </suspense>
    </section>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  padding: 2rem;

  .header-card {
    margin: 1rem;
    overflow: hidden;
    flex: 1;
  }

  section.content {
    flex: 2;
    margin-bottom: 1rem;
  }
}
</style>
@/types