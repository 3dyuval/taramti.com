<script setup lang="ts">
import Error from '@/components/Error.vue'
import Loading from '@/components/Loading.vue'
import SearchInput from '@/components/SearchInput.vue'
import SearchResult from '@/components/SearchResults.vue'
import { onErrorCaptured, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import { computed } from '@vue/reactivity'
import Hearts from '@/components/Hearts.vue'
const toast = useToast()
const searchText = ref('')
const searchSettings = ref({})

const errored = ref<string | null>(null)

onErrorCaptured((err: string) => {
  errored.value = err
})

function handleSearch() {
  toast.add({
    severity: 'info',
    summary: searchText.value,
    life: 2000,
  })
}

function handleSearchSettings() {}

let key = 0

const hearts = ref(getHeartedItems())

const isHeart = computed<boolean>(() => hearts.value.includes(searchText.value))

function getHeartedItems() {
  const savedItems = localStorage.getItem('heart')
  return savedItems ? JSON.parse(savedItems) : []
}

function addHearted(): void {
  const items = [searchText.value, ...getHeartedItems()]
  localStorage.setItem('heart', JSON.stringify(items))
  hearts.value = items
}

function deleteHeated(key: string) {
  const filteredItems = getHeartedItems().filter((i: any) => i === key)
  localStorage.setItem('heart', JSON.stringify(filteredItems))
  hearts.value = filteredItems
}
</script>

<template>
  <header class="padding-large">
    <card class="header-card">
      <template #header>
        <hearts
          :key="key"
          :hearts="hearts"
          :search-text="searchText"
          @input:search="searchText = $event"
        />
      </template>
      <template #content>
        <search-input
          v-model="searchText"
          @click="handleSearch"
          @click:heart="addHearted"
          @heart-remove="deleteHeated"
          :is-heart="isHeart"
        />
      </template>
    </card>
  </header>
  <suspense>
    <template #fallback>
      <loading v-if="!errored" />
      <error v-else :error-message="errored"></error>
    </template>
    <template #default>
      <main class="padding-large">
        <search-result />
      </main>
    </template>
  </suspense>
</template>

<style lang="scss">
.header-card {
  overflow: hidden;
}

.padding-large {
  padding: 24px;
  margin: 12px;
}
</style>
