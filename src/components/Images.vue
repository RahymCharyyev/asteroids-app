<template>
  <h2>
    {{ image.title }}
  </h2>
  <p>{{ image.date }}</p>
  <p>{{ image.copyright }}</p>
  <div>
    <img :src="image.url" alt="Astronomy image of the day" />
  </div>
  <p>{{ image.explanation }}</p>
  <hr />
</template>

<script>
export default {
  props: ["image"],
  setup() {},
};
</script>

<style scoped>
p,
h2 {
  text-align: center;
}

div {
  display: flex;
  justify-content: center;
}

img {
  width: 50%;
  height: 50%;
}
</style>
