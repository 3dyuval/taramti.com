<script setup lang="ts">
import type { Row, Coords } from "@/types";
import Map from "@/components/Map.vue";
import { ref } from "vue";
import OpeningHoursTimeline from "@/components/OpeningHoursTimeline.vue";
import OpeningHoursChip from "@/components/OpeningHoursChip.vue";
import { useShare } from "@vueuse/core";
import { usePageContext } from '@/composables/usePageContext';
const props = defineProps<{
  rows: Row[];
  row: Row;
  coords: Coords;
  error?: string;
}>();

const center = ref<Coords>(props.coords);

const address = [props.row.City, props.row.Street, props.row.StreeNumber]
  .filter((i) => typeof i === "string" && i.length)
  .join(" ");

function handleOpenOnGoogleMaps() {
  window.open(
    `http://www.google.com/maps/place/${props.coords.lat},${props.coords.lng}`,
    "_blank"
  );
}

const details = ref(false);
const drawer = ref(false);

const { share, isSupported } = useShare()

const pageContext = usePageContext()

const url = pageContext.urlPathname
</script>

<template>
  <v-layout>
    <v-app>
      <v-app-bar title="תרמתי">מיקום תרומת דם</v-app-bar>
      <Map :center="center" :error="error">
        <div class="d-flex flex-column align-center location-window" :class="{ details }">
          <v-card elevation="0" direction="rtl">
            <template #title>
              <h1>{{ row.Name }}</h1>
            </template>
            <template #subtitle>
              <address>{{ address }}</address>
            </template>
            <template #default>
            <v-divider />
              <div class="d-flex justify-center">
                <opening-hours-chip
                  class="mt-5 mb-3"
                  :from-hour="row.FromHour"
                  :to-hour="row.ToHour"
                />
              </div>
            </template>
            <template #actions>
              <v-card-actions>
                <v-btn
                  variant="tonal"
                  color="secondary"
                  text="שעות פתיחה ופעולות נוספות"
                  @click="details = !details"
                  class="my-2 flex-grow-1"
                />
                <v-btn variant="plain" class="my-2"
                v-if="isSupported"
                @click="share({
                    title: 'Taramti',
                    text: 'תרומת דם ב-' + props.row.Name,
                    url
                  })">
                  שתף
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-card-actions>
            </template>
          </v-card>
          <div class="details-card-expand">
            <v-card
              @click="drawer = !drawer"
              :title="row.Name"
              class="details-card px-12"
              subtitle="שעות פעילות"
            >
              <opening-hours-timeline :row="row" />
              <template #actions>
                <v-card-actions>
                  <v-btn
                    color="default"
                    @click.prevent
                    v-ripple="false"
                    variant="outlined"
                    text="פעולות נוספות"
                  />
                </v-card-actions>
              </template>
            </v-card>
          </div>
        </div>
      </Map>
      <v-navigation-drawer v-model="drawer" location="bottom">
        <v-list-item
          variant="text"
          color="primary"
          @click="handleOpenOnGoogleMaps"
          v-bind="props"
        >
          <v-tooltip
            activator="parent"
            text="פתח מיקום משוער בגוגל מפות"
            location="top center"
          />
          <v-icon icon="mdi-map" />
          נווט
        </v-list-item>
      </v-navigation-drawer>
    </v-app>
  </v-layout>
</template>

<style lang="scss">
.location-window {
  h1 {
    font-size: 20px;
    text-wrap: balance;
  }

  .details-card-expand {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s cubic-bezier(0.3, 0, 0.8, 0.15);

    .v-timeline {
      display: grid;
      height: auto;
    }
    .details-card {
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.3, 0, 0.8, 0.15);
    }
  }

  &.details .details-card-expand {
    grid-template-rows: 1fr;
    transition: grid-template-rows 0.3s cubic-bezier(0.05, 0.7, 0.1, 1);
    .details-card {
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.05, 0.7, 0.1, 1);
    }
  }
}
</style>
