<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import Search from '@/components/SearchInput.vue'
import SearchInputSettings from '@/components/SearchInputSettings.vue'
import Main from '@/components/SearchResults.vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
const toast = useToast()
const searchText = ref('')
const searchSettings = ref({})

function handleSearch() {
  console.log(searchText.value)
  toast.add({
    severity: 'info',
    summary: searchText.value,
    life: 2000,
  })
}
function handleSearchSettings() {}
</script>

<template>
  <header class="padding-large">
    <card>
      <template #content>
        <search v-model="searchText" @click="handleSearch" />
        <search-input-settings
          v-model="searchText"
          @update="handleSearchSettings"
        />
      </template>
    </card>
  </header>
  <suspense>
    <template #fallback>
      <loading />
    </template>
    <template #default>
      <main class="padding-large">
        <Main />
      </main>
    </template>
  </suspense>
</template>

<style lang="scss">
.padding-large {
  padding: 24px;
  margin: 12px;
}
</style>
