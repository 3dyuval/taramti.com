<script setup lang='ts'>
import SelectLocale from '@/components/SelectLocale.vue'
import SearchCard from '@/components/SearchCard.vue'
import { Row } from '@/types'
import { onBeforeMount, ref } from 'vue'
import { usePageContext } from '@/composables/usePageContext'
import { useI18n } from 'vue-i18n'

const { urlPathname } = usePageContext()
const props = defineProps<Props>()

type Props = {
  rows: Row[]
  row: Row
}

const modal = ref(false)

const { t } = useI18n()


onBeforeMount(() => {
  let dir = t('settings.dir')
  document.dir = dir
  document.body.classList.add(dir)
})

const url = import.meta.env.PROD ? 'localhost' + import.meta.env.VITE_PORT :
  import.meta.env['VITE_HOST_URL']

</script>
<template>
  <v-layout class='taramti-layout-bar'>
    <v-app-bar color='surface-variant'>
      <template #prepend>
        <a :href='url' class='tamati-toolbar-title'>
          <h1 v-t="'meta.title'"></h1>
        </a>
      </template>
      <template #append>
        <select-locale />
        <h2 v-t="'meta.tag'" />
        <v-btn
          @click='modal = true'
          rounded
          variant='outlined'
          class='mx-3'
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
  </v-layout>
</template>

<style lang='scss'>

.taramti-layout-bar {
  height: 100lvmin;

  .tamati-toolbar-title {
    text-decoration: none;
    color: inherit;
  }
}

main {
  width: 100%;
  top: 64px;
  height: 100%;
}

</style>
