<script setup lang='ts'>
import SearchCard from '@/components/SearchCard.vue'
import type { DonationLocationDate } from '@/types'

const props = defineProps<{
  locations: DonationLocationDate[],
  photos: string[]
}>()


</script>
<template>
  <v-carousel full-screen class='fullscreen-carousel' hide-delimiters
              selected-class='active-slide'
              :show-arrows='false' continuous
              :interval='4000' cycle :direction='$t("settings.dir")'>
    <v-carousel-item v-for='(image, i) in photos' :key='i'>
      <v-img :src='image' cover></v-img>
    </v-carousel-item>
  </v-carousel>
  <search-card v-bind='props' class='card-center' />
</template>

<style lang='scss'>


.fullscreen-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh !important;
  z-index: 0;

  .v-responsive.v-img {
    height: 100%;

  }

  .v-window-item {
    &.active-slide {
      animation: blur 3s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}

@keyframes blur {
  0% {
    filter: blur(15px);
  }
  100% {
    filter: blur(5px);
  }
}

.index.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 50%;
}
</style>