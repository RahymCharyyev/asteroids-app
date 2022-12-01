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

<script>
import { ref } from "vue";
export default {
  props: ["image"],
  setup() {
    let bigImg = ref(false);
    return {
      bigImg,
    };
  },
};
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
}
</style>
