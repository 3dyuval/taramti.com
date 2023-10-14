<script setup lang="ts">
import Toast from 'primevue/toast'
import { usePageContext } from '@/composables/usePageContext'
import type { Row } from '@/types'
import { reactive } from 'vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

const pageContext = usePageContext()

const { rows, row } = pageContext.pageProps || {}

function mapRowsToItems(rows: Row[] = []) {
  return rows.map((row) => {
    return {
      title: row.Name,
      value: row.id,
      city: row.City,
    }
  })
}

const search = reactive<{ modal: boolean; item: number | undefined }>({
  modal: false,
  item: row ? row.id : undefined,
})

function onSearch(input: number | undefined) {
  if (!input) return
  window.open('/donation-location/' + input, '_self')
}
</script>
<template>
  <toast />
  <v-layout>
    <v-app-bar color="surface-variant">
      <template #append>
        <h1>{{ $t('meta.title') }}</h1>
      </template>
      <template #prepend>
        <v-btn
          @click="search.modal = true"
          rounded
          variant="outlined"
          class="mx-3"
        >
          <ph-magnifying-glass size="20" />
        </v-btn>
        <h2>מצאו מקומות לתרום דם</h2>
        <v-dialog v-model="search.modal" max-width="800">
          <v-card>
            <v-autocomplete
              placeholder="חפש מקום לפי שם"
              :items="mapRowsToItems(rows)"
              v-model="search.item"
            >
              <template #item="{ item, props }">
                <v-list-item
                  v-bind="props"
                  :title="item.title"
                  :subtitle="item.raw.city"
                />
              </template>
            </v-autocomplete>
            <v-card-actions>
              <v-btn
                text="סגור"
                color="secondary"
                variant="outlined"
                @click="search.modal = !search.modal"
              />
              <v-btn
                text="חפש"
                color="primary"
                variant="tonal"
                block
                @click="onSearch(search.item)"
                :disabled="row && search.item === row.id"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-app-bar>
    <main>
      <slot />
    </main>
  </v-layout>
</template>

<style lang="scss">
main {
  width: 100%;
  margin-top: 64px;
}
</style>