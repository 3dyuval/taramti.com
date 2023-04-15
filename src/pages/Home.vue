<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import SearchInput from '@/components/SearchInput.vue'
import SearchInputSettings from '@/components/SearchInputSettings.vue'
import Main from '@/components/SearchResults.vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import { computed } from '@vue/reactivity'
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

const heart = computed({
  get: getHeartedItems,
  set: setHeartedItems,
})

function getHeartedItems() {
  const savedItems = localStorage.getItem('heart')
  return savedItems ? JSON.parse(savedItems) : {}
}

function setHeartedItems(searchInput: string) {
  const items = { searchInput, ...getHeartedItems() }
  localStorage.setItem('heart', JSON.stringify(items))
}

function deleteHeatedItem(key: string) {
  const items = getHeartedItems()
}
</script>

<template>
  <header class="padding-large">
    <card>
      <template #content>
        <search-input
          v-model="searchText"
          @click="handleSearch"
          @handle-heart="heart = searchText"
        />
        <search-input-settings @update="handleSearchSettings" />
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
