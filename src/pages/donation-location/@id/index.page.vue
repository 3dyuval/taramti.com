<script setup lang="ts">
import type { Coords, Row } from '@/types'
import { ref } from 'vue'
import Map from '@/components/Map.vue'
import OpeningHoursTimeline from '@/components/OpeningHoursTimeline.vue'
import OpeningHoursChip from '@/components/OpeningHoursChip.vue'
import { usePageContext } from '@/composables/usePageContext'
import { getAddress } from '@/helpers/getAddress'
import { useShare } from '@vueuse/core'
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  rows: Row[]
  row: Row
  coords: Coords
  error?: string
}>()

const { t }  = useI18n()

const center = ref<Coords>(props.coords)

const address = getAddress(props.row)

const pageContext = usePageContext()

// const heart = useHeart()

const details = ref(false)
const drawer = ref(false)

const { share } = useShare({
  title: 'Taramti',
  text: 'Taramti',
  url: pageContext.urlPathname,
})

function onClickScheduleURL() {
  window.open(props.row.SchedulingURL, '_blank')
}
</script>

<template>
  <Map :center="center" :error="error">
    <div
      class="d-flex flex-column align-center location-window"
      :class="{ details }"
    >
      <v-card elevation="0">
        <template #title>
          <h3>{{ row.Name }}</h3>
        </template>
        <template #subtitle>
          <span class="d-flex py-2">
            <v-icon icon='map-pin-line'
              :size="20"
              weight="fill"
              color="gray"
              class="ml-2"
            />
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
              :text="t('donationLocation.openingHours')"
              @click="details = !details"
              class="my-2 flex-grow-1"
            />
<!--            <v-btn-->
<!--              variant="outlined"-->
<!--              icon="mdi-heart"-->
<!--              :color="'#f2f2f2'"-->
<!--            ></v-btn>-->
            <v-btn
              variant="plain"
              class="my-2"
              @click="share"
              v-t="'common.share'"
              icon="share"
            />
          </v-card-actions>
        </template>
      </v-card>
      <div class="details-card-expand">
        <v-card
          @click="drawer = !drawer"
          :subtitle="row.Name"
          class="details-card px-12"
          elevation="0"
        >
          <v-card-title v-t="'donationLocation.openingHours'"  />
          <template #actions>
            <v-card-actions>
              <v-btn
                color="default"
                @click.prevent
                v-ripple="false"
                variant="outlined"
                :text="t('common.moreActions')"
              />
            </v-card-actions>
          </template>
          <opening-hours-timeline :row="row" />
          <v-alert icon="ph-heart">
            <v-alert-title>נא שימו לב : לגבי שעות הפעילות</v-alert-title>
            כל הפרטים מגיעים דרך האתר של מד"א מידי יום. אין לנו שליטה או דרך
            לודא את שעות הפתיחה.
          </v-alert>
        </v-card>
      </div>
    </div>
  </Map>
  <v-navigation-drawer
    density="compfortable"
    v-model="drawer"
    location="bottom"
  >
    <v-list-item
      variant="text"
      color="primary"
      :href="props.row.SchedulingURL"
      target="_blank"
    >
      <template #append>
        <v-icon icon='ph-hand-pointing' :size="24" weight="fill" color="gray" />
      </template>
      <v-list-item-title>זימון תור</v-list-item-title>
      <v-tooltip
        activator="parent"
        text="פתח קישור בעמוד חדש"
        location="top center"
      />
    </v-list-item>
    <v-list-item
      variant="text"
      color="primary"
      :href="`http://www.google.com/maps/place/${props.coords.lat},${props.coords.lng}`"
      target="_blank"
    >
      <template #append>
        <v-icon icon='ph-map-trifold' :size="24" weight="fill" color="gray" />
      </template>
      <v-list-item-title> נווט למקום</v-list-item-title>
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
    >
      <template #append>
        <v-icon icon='ph-share' :size="20" weight="fill" />
      </template>
      <v-list-item-title> שתף</v-list-item-title>
      <v-tooltip activator="parent" text="שתף עם חבר" location="top center" />
    </v-list-item>
  </v-navigation-drawer>
</template>

<style lang="scss">
.location-window {
  h3 {
    font-size: 1.5rem;
    text-wrap: balance;
    max-width: 24rem;
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
