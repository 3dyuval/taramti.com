<script setup lang='ts'>
import Earth from '@/assets/earth.svg'


defineOptions({
  inheritAttributes: false
})


</script>

<template>

  <div class='restricted'>
    <img :src='Earth' alt='world' />
    <div class='text'>
      <p>We're sorry, but access to this website is restricted in your country.</p>
      <p>This site does not provide any meaningful information outside of israel.</p>
      <p>We appreciate your understanding in this matter.</p>
      <p>If you believe this is an error or if you have any questions, please contact us.</p>
    </div>
  </div>
</template>

<style>

main {
  height: 100vh;
}

.v-toolbar {
  visibility: hidden;
}

.restricted {

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  background: rgb(245, 245, 245, 0.5);

  .text {

    display: flex;
    flex-direction: column;

    max-width: 500px;
    backdrop-filter: blur(2vw);
    background: radial-gradient(rgba(110, 80, 100, 0.25) 0%, rgba(255, 255, 255, 0.8) 100%);
    border-radius: 3vw;
    padding: 8vh 5vw;
    z-index: 15;
    gap: 1vh;

  }

  & img {
    transform: translate(8vw);
    max-width: 30vw;
    height: auto;
    z-index: 10;
  }
}

</style>\