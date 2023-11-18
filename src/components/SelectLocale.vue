<script setup lang='ts'>
import { usePageContext } from '@/composables/usePageContext'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'vuetify'

const { current } = useLocale()
const pageContext = usePageContext()
const { t, availableLocales } = useI18n()

function onChangeLocale(locale: string) {
  const parts = window.location.pathname.split('/')
  if (availableLocales.some((l: string) => l === parts[1])) {
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
  <v-menu variant='plain' menu-icon='ph-translate' location='bottom center'>
    <template #activator='{ props }'>
      <v-btn class='mx-3' icon='ph-translate' v-bind='props' />
    </template>
    <template #default>
      <v-list>
        <v-list-item
          min-width='120'
          class='d-flex justify-center'
          v-for='key in availableLocales'
          :key='key'
          @click='onChangeLocale(key)'
        >
          <v-list-item-subtitle class='d-flex justify-center my-2'>
            {{ t('settings.locale.' + key, 1, { locale: key }) }}
          </v-list-item-subtitle>
          <v-chip
            :text="t('settings.locale.'+ key)"
            text-color='white'
            style='cursor: pointer'
            :color="key === pageContext.locale ? 'primary' : 'default'"
          />
        </v-list-item>
      </v-list>
    </template>
  </v-menu>
</template>

<style scoped lang='scss'></style>