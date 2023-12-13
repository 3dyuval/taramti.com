<script setup lang='ts'>
import SelectLocale from '@/components/SelectLocale.vue'
import SearchCard from '@/components/SearchCard.vue'
import { ref } from 'vue'
import { usePageContext } from '@/composables/usePageContext'

const { urlPathname } = usePageContext()
const props = defineProps<Props>()

type Props = {
  locations: DonationLocationDate[]
  row: Location
}

const modal = ref(false)

const url = import.meta.env.PROD ? 'localhost' + import.meta.env.VITE_PORT :
  import.meta.env['VITE_HOST_URL']

</script>
<template>
  <v-app class='taramti-layout-bar' full-height>
    <v-app-bar color='surface-variant'>
      <template #prepend>
        <a :href='url' class='tamati-toolbar-title'>
          <h1 v-t="'meta.title'"></h1>
        </a>
      </template>
      <template #append>
        <select-locale />
        <h2 role='doc-subtitle' v-t="'meta.tag'" />
        <v-btn
          @click='modal = true'
          rounded
          variant='outlined'
          class='mx-3'
          role='search'
        >
          <v-icon icon='magnifying-glass' size='20' />
        </v-btn>
        <v-dialog v-model='modal' max-width='800'>
          <search-card close-btn v-bind='props' @close='modal = false' />
        </v-dialog>
      </template>
    </v-app-bar>
    <main>
      <slot />
    </main>
    <v-footer>
      <v-card elevation='0'>
        <v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols='12' md='6'>
                <v-card-title class='text-center'>
                  <h3 v-t="'meta.title'" />
                </v-card-title>
                <v-card-text>
                  <p v-t="'meta.description'" />
                  <p v-t="'meta.contactText'" />
                </v-card-text>
              </v-col>
              <v-col cols='12' md='6'>
                <v-card-title class='text-center'>
                  <h3 v-t="'meta.contact'" />
                </v-card-title>
                <v-card-text>
                  <a href='mailto://info@taramti.com'>info✉️taramti.com</a>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style lang='scss'>

.taramti-layout-bar {
  //height: 100lvmin;

  .tamati-toolbar-title {
    text-decoration: none;
    color: inherit;

  }

  h2 {
    font-size: 3.25vmin;
    line-height: 3vmin;
    text-align: center;
  }
}

main {
  //width: 100%;
  top: 64px;
  height: 100svh;
}

</style>
