<template>
  <Loading v-if="isLoading" />
  <div
    v-else
    :data="data"
    :fetchData="fetchData"
    :plusDay="plusDay"
    :changeDay="changeDay"
  >
    <div v-for="image in data" :key="image.id">
      <Images :image="image" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { addDays } from "date-fns";
import Loading from "../components/Loading.vue";
import Images from "../components/Images.vue";
export default {
  components: { Loading, Images },
  setup() {
    const API_KEY = "Kzb0E64htPxZGEM33UC62hrug7mfHAzEzIH8Qyu1";
    let data = ref([]);
    let plusDay = ref(0);
    let isLoading = ref(false);
    onMounted(() => {
      fetchData(data.value);
    });
    const fetchData = (type) => {
      isLoading.value = true;
      data.value = type;
      fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&end_date=${getDate()}`
      )
        .then((res) => res.json())
        .then((res) => {
          let fetchedData = res;
          data.value = fetchedData;
          isLoading.value = false;
        })
        .catch(() =>
          alert(
            "Sorry, we can't load the asteroids data. Please try again later or check your internet connection"
          )
        );
    };
    const getDate = () => {
      return `${addDays(new Date(), plusDay.value).toISOString().substring(0, 10)}`;
    };

    const changeDay = (day) => {
      plusDay.value += day;
      fetchData(data.value);
    };
    return {
      data,
      isLoading,
      fetchData,
      getDate,
      changeDay,
      plusDay,
    };
  },
};
</script>
<style></style>
