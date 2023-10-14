<script setup lang="ts">
import { localesTranslated, OPTIONS } from '@/i18n'
import { usePageContext } from '@/composables/usePageContext'

const pageContext = usePageContext()

function onChangeLocale(locale: string) {
  const parts = window.location.pathname.split('/')
  if (OPTIONS.availableLocales.some((l: string) => l === parts[1])) {
    parts[1] = locale
  } else {
    parts.unshift(locale)
  }

  if (parts[0] !== '') {
    parts.unshift('')
  }

  window.location.pathname = parts.filter((part) => part !== '').join('/')
}
</script>

<template>
  <v-menu variant="plain" menu-icon="ph-translate" location="bottom center">
    <template #activator="{ props }">
      <v-btn class="mx-3" icon="ph-translate" v-bind="props" />
    </template>
    <template #default>
      <v-list>
        <v-list-item
          min-width="120"
          class="d-flex justify-center"
          v-for="(translation, locale) in localesTranslated"
          :key="locale"
          @click="onChangeLocale(locale)"
        >
          <v-chip
            text-color="white"
            style="cursor: pointer"
            :color="locale === pageContext.locale ? 'primary' : 'default'"
            :text="translation"
          />
        </v-list-item>
      </v-list>
    </template>
  </v-menu>
</template>

<style scoped lang="scss"></style>