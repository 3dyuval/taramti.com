<script setup lang='ts'>

const { rows } = defineProps<Props>()


type Props = {
  rows: any;
  locale: string;
}

const headers = [
  {
    title: 'name',
    key: 'name'
  },
  {
    title: 'timeOpen',
    key: 'timeOpen'
  },
  {
    title: 'timeClose',
    key: 'timeClose'
  }
]
</script>

<template>
  <v-data-table
    filter-mode='some'
    :items='rows'
    :headers='headers'
    :filter-keys="['name', 'address.city']"
    :dir="locale === 'he' ? 'rtl' : 'ltr'"
    items-per-page='20'
    class=''
    prev-icon='ph-caret-next'
  />

</template>

<style scoped lang='scss'>
.v-table {
  display: grid;
}
</style>