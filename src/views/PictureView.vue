<template>
  <Loading v-if="isLoading" />
  <PictureLayout v-else :fetchData="fetchData" :plusDay="plusDay">
    <Images :image="data" />
  </PictureLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";
import Images from "../components/Images.vue";
import PictureLayout from "../components/PictureLayout.vue";
const API_KEY = "Kzb0E64htPxZGEM33UC62hrug7mfHAzEzIH8Qyu1";
let data = ref([]);
let plusDay = ref(0);
let isLoading = ref(false);
onMounted(() => {
  fetchData(data.value);
});
const fetchData = () => {
  isLoading.value = true;
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.VUE_APP_API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      let fetchedData = res;
      data.value = fetchedData;
      isLoading.value = false;
    })
    .catch(() =>
      alert(
        "Sorry, we can't load the data from API. Please, try again later or check your internet connection"
      )
    );
};
</script>
<style></style>
