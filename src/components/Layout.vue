<script setup lang="ts">
import Toast from 'primevue/toast'
import { usePageContext } from '@/composables/usePageContext'
import type { Row } from '@/types'
import { reactive } from 'vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import { OPTIONS } from '@/i18n'

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

function onChangeLocale(locale: string) {
  const parts = window.location.pathname.split('/')
  window.open(`/${locale}/${parts.slice(3)}`, '_self')
}
</script>
<template>
  <toast />
  <v-layout>
    <v-app-bar color="surface-variant">
      <template #extension>
        <v-select
          variant="plain"
          width="200px"
          :items="OPTIONS.availableLocales"
          :value="pageContext.locale"
          @update:model-value="onChangeLocale"
        >
          <template #selection="{ item }">
            <v-chip
              color="primary"
              text-color="white"
              class="ma-2"
              v-t="`settings.locale.${item.value}`"
            />
          </template>
        </v-select>
      </template>
      <template #append>
        <h1 v-t="'meta.title'" />
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