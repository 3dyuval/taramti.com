<script setup lang="ts">
import Toast from 'primevue/toast'
import { usePageContext } from '@/composables/usePageContext'
import type { Row } from '@/types'
import { reactive } from 'vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import SelectLocale from '@/components/SelectLocale.vue'

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

const search = reactive<{
  modal: boolean
  item: number | undefined
}>({
  modal: false,
  item: row ? row.id : undefined,
})
</script>
<template>
  <toast />
  <v-layout>
    <v-app-bar color="surface-variant">
      <template #append>
        <div class="d-flex">
          <h1 v-t="'meta.title'"></h1>
        </div>
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
        <h2 v-t="'meta.tag'" />
        <select-locale />
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
                :href="`/donation-location/${input}`"
                :disabled="!input || (row && search.item === row.id)"
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