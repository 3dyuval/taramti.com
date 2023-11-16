<script setup lang='ts'>
import Toast from 'primevue/toast'
import SelectLocale from '@/components/SelectLocale.vue'
import SearchCard from '@/components/SearchCard.vue'
import { Row } from '@/types'
import { ref } from 'vue'
import { usePageContext } from '@/composables/usePageContext'

const { urlPathname } = usePageContext()
const props = defineProps<Props>()

type Props = {
  rows: Row[]
  row: Row
}

const modal = ref(false)

</script>
<template>
  <toast />
  <v-layout class='taramti-layout-bar'>
    <v-app-bar color='surface-variant'>
      <template #append>
        <a :href='urlPathname' class='tamati-toolbar-title'>
          <h1  v-t="'meta.title'"></h1>
        </a>
      </template>
      <template #prepend>
        <v-btn
          @click='modal = true'
          rounded
          variant='outlined'
          class='mx-3'
        >
          <v-icon icon='magnifying-glass' size='20' />
        </v-btn>
        <h2 v-t="'meta.tag'" />
        <select-locale />
        <v-dialog v-model='modal' max-width='800'>
          <search-card v-bind='props' />
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
