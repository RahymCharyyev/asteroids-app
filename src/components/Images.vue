<template>
  <h2 class="title">
    {{ image.title }}
  </h2>
  <p class="copyright">{{ image.copyright }}</p>
  <div class="imgWrapper">
    <img
      class="img"
      :class="{ big: bigImg }"
      :src="image.url"
      alt="Astronomy image of the day"
      @click="bigImg = !bigImg"
    />
  </div>
  <p class="text">{{ image.explanation }}</p>
  <hr />
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  image: {},
});
const bigImg = ref(false);
</script>

<style scoped>
.title,
.copyright {
  text-align: center;
}

.imgWrapper {
  display: flex;
  justify-content: center;
}

.img {
  width: 50%;
  height: 50%;
  cursor: pointer;
  transition: 1.5s;
}

.big {
  width: 100%;
  height: auto;
  transition: 1.5s;
}

.text {
  text-align: justify;
  text-indent: 25px;
}
</style>
