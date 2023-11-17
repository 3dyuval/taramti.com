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

  <!--      :search="search"-->
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
  <!--    <template #expanded-row='{ item }'>-->
  <!--      <v-card>-->
  <!--        <opening-hours-chip-->
  <!--          class='my-5'-->
  <!--          :from-hour='item.timeOpen'-->
  <!--          :to-hour='item.timeClose'-->
  <!--        />-->
  <!--        <v-card-actions>-->
  <!--          <v-btn-->
  <!--            color='primary'-->
  <!--            :text="t('cta.showAll')"-->
  <!--            :href='`/donation-location/${item.id}`'-->
  <!--          />-->
  <!--        </v-card-actions>-->
  <!--      </v-card>-->
  <!--    </template>-->
  <!--      <template #data-table-group='{ item, count, props }'>-->
  <!--        <td-->
  <!--          dir='rtl'-->
  <!--          class='v-data-table__td v-data-table-column&#45;&#45;align-start v-data-table-group-header-row__column v-data-table-group-header-row__column'-->
  <!--        >-->
  <!--          <v-btn-->
  <!--            @click='props.onClick'-->
  <!--            size='large'-->
  <!--            :variant="props.icon === '$expand' ? 'elevated' : 'text'"-->
  <!--            :color="props.icon === '$expand' ? 'secondary' : 'default'"-->
  <!--          >-->
  <!--            <v-icon>ph-buildings</v-icon>-->
  <!--            {{ `${item.value} (${count})` }}-->
  <!--          </v-btn>-->
  <!--        </td>-->
  <!--      </template>-->
  <!--  </v-data-table>-->
</template>

<style scoped lang='scss'>
.v-table {
  display: grid;
}
</style>