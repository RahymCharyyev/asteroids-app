<template>
  <Loading v-if="isLoading" />
  <PictureLayout v-else :fetchData="fetchData">
    <Images :image="data" />
  </PictureLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";
import Images from "../components/Images.vue";
import PictureLayout from "../components/PictureLayout.vue";
let data = ref([]);
let isLoading = ref(false);
onMounted(() => {
  fetchData(data.value);
});
const fetchData = () => {
  isLoading.value = true;
  // Sign up to https://api.nasa.gov/ to get full access to API via API KEY
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.VUE_APP_API_KEY}`)
    // fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
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
    )
    .finally(() => (isLoading.value = false));
};
</script>
<style>

</style>
