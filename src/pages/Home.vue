<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import SearchInput from '@/components/SearchInput.vue'
import SearchInputSettings from '@/components/SearchInputSettings.vue'
import Main from '@/components/SearchResults.vue'
import { onBeforeMount, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import { computed } from '@vue/reactivity'
import Hearts from '@/components/Hearts.vue'
import fetchMada from '@/assets/fetchMada'
const toast = useToast()
const searchText = ref('')
const searchSettings = ref({})

onBeforeMount(() => {
  fetchMada.then((res) => alert(res.json())).catch(console.error)
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
  const filteredItems = getHeartedItems().filter((i) => i === key)
  localStorage.setItem('heart', JSON.stringify(filteredItems))
  hearts.value = filteredItems
}
</script>

<template>
  <header class="padding-large">
    <hearts
      :key="key"
      :hearts="hearts"
      :search-text="searchText"
      @input:search="searchText = $event"
    />
    <card>
      <template #content>
        <search-input
          v-model="searchText"
          @click="handleSearch"
          @click:heart="addHearted"
          @heart-remove="deleteHeated"
          :is-heart="isHeart"
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
