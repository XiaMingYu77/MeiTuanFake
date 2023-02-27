<template>
  <div class="content">
    <RouterView></RouterView>
  </div>
</template>

<style lang="less" scoped>
.content {
  height: 100vh;
}
</style>

<script setup lang="ts">
import { useStore } from 'vuex';
import { onMounted  ,reactive} from 'vue';
import Ribbon from './components/coloredRibbon'
new Ribbon();

let store = useStore();

// let background_Ribbon = document.createElement('script');
// background_Ribbon.type = 'text/javascript';
// background_Ribbon.src = './src/components/background/coloredRibbon.js';
// document.body.appendChild(background_Ribbon);


// //阻止页面的超额拖拽
// function func(e: any) {
//   e.preventDefault();
// }
// document.addEventListener('touchmove', func, { passive: false });

// localStorage.clear();

</script>