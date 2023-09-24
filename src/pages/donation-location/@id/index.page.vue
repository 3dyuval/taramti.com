<script setup lang="ts">
import type { Row, Coords } from "@/types";
import { ref } from "vue";
import Map from "@/components/Map.vue";
import OpeningHoursTimeline from "@/components/OpeningHoursTimeline.vue";
import OpeningHoursChip from "@/components/OpeningHoursChip.vue";
import { usePageContext } from '@/composables/usePageContext';
import { getAddress } from '@/helpers/getAddress';
import { useShare } from "@vueuse/core";

const props = defineProps<{
  rows: Row[];
  row: Row;
  coords: Coords;
  error?: string;
}>();

const center = ref<Coords>(props.coords);

const address = getAddress(props.row);

function handleOpenOnGoogleMaps() {
  window.open(
    `http://www.google.com/maps/place/${props.coords.lat},${props.coords.lng}`,
    "_blank"
  );
}

const details = ref(false);
const drawer = ref(false);

const pageContext = usePageContext()

const { share, isSupported } = useShare({
                    title: 'Taramti',
                    text: 'תרומת דם ב-' + props.row.Name,
                    url: pageContext.urlPathname
                  })

</script>

<template>

      <Map :center="center" :error="error">
        <div class="d-flex flex-column align-center location-window" :class="{ details }">
          <v-card elevation="0">
            <template #title>
              <h3>{{ row.Name }}</h3>
            </template>
            <template #subtitle>
              
              <span class="d-flex py-2">
                <v-icon icon="mdi-map-marker" class="mx-2" />
              <address>{{ address }}</address> 
              </span>
            </template>
            <template #default>
              <div class="d-flex justify-center">
                <opening-hours-chip
                  class="my-5"
                  :from-hour="row.FromHour"
                  :to-hour="row.ToHour"
                />
              </div>
            <v-divider />
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
                @click="share">
                  שתף
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-card-actions>
            </template>
          </v-card>
          <div class="details-card-expand">
            <v-card
              @click="drawer = !drawer"
              :subtitle="row.Name"
              class="details-card px-12"
              title="שעות פעילות"
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
      <v-navigation-drawer
      density="compfortable"
       v-model="drawer" location="bottom">
        <v-list-item
          variant="text"
          color="primary"
          @click="handleOpenOnGoogleMaps"
        >
          <template #append>
          <v-icon icon="mdi-map" />
            </template>
          <v-list-item-title>
              נווט למקום
          </v-list-item-title>
          <v-tooltip
            activator="parent"
            text="פתח מיקום משוער בגוגל מפות"
            location="top center"
          />
        </v-list-item>
          <v-list-item
          variant="text"
          color="primary"
          @click="share()"
          :disabled="!isSupported"
        >
          <template #append>
          <v-icon icon="mdi-share" />
            </template>
          <v-list-item-title>
          שתף
        </v-list-item-title>
          <v-tooltip
            activator="parent"
            text="שתף עם חבר"
            location="top center"
          />
        </v-list-item>
      </v-navigation-drawer>
</template>

<style lang="scss">
.location-window {
  h3 {
    font-size: 1.5rem;
    // text-wrap: balance;
  }

  direction: rtl;

  .details-card-expand {
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s cubic-bezier(0.3, 0, 0.8, 0.15);

    .v-timeline {
      display: grid;
      height: auto;
      direction: rtl;
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
