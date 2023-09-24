<script setup lang="ts">
import Toast from "primevue/toast";
import { usePageContext } from "@/composables/usePageContext";
import type { Row } from "@/types";
import { reactive } from "vue";
const pageContext = usePageContext();

const { rows, row } = pageContext.pageProps || {};

function mapRowsToItems(rows: Row[] = []) {
  return rows.map((row) => {
    return {
      title: row.Name,
      value: row.id,
      city: row.City,
    };
  });
}

const search = reactive<{ modal: boolean; item: number | undefined }>({
  modal: false,
  item: row ? row.id : undefined,
});

function onSearch(input: number | undefined) {
  if (!input) return;
  window.open("/donation-location/" + input, "_self");
}
</script>
<template>
  <toast />
  <v-layout>
    <v-app>
      <v-app-bar>
        <template #append>
          <h1>תרמתי</h1>
        </template>
        <template #prepend>
          <v-btn icon="mdi-magnify" @click="search.modal = true" />
          <h2>מצאו מקומות לתרום דם</h2>
          <v-dialog v-model="search.modal">
            <v-card>
              <v-autocomplete
                placeholder="חפש מקום לפי שם"
                :items="mapRowsToItems(rows)"
                v-model="search.item"
              >
                <template #item="{ item, props }">
                  <v-list-item
                    v-bind=" props "
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
      <slot />
    </v-app>
  </v-layout>
</template>
