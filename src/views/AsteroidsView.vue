<template>
  <Loading v-if="isLoading" />
  <AsteroidLayout
    v-else
    :data="data"
    :fetchData="fetchData"
    :plusDay="plusDay"
    :changeDay="changeDay"
  >
    <input
      type="text"
      class="search"
      placeholder="Search an asteroid by name"
      v-model="searchQuery"
    />
    <button class="button" @click="sortedById = !sortedById" ref="buttonText">
      <!-- {{ buttonText }} -->
    </button>
    <div v-if="!sortedByDate" v-for="asteroid in data" :key="asteroid.id">
      <Asteroids :asteroid="asteroid" />
    </div>
    <div v-else v-for="asteroid in filteredData" :key="asteroid.name">
      <Asteroids :asteroid="asteroid" />
    </div>
  </AsteroidLayout>
</template>

<script>
import { onMounted, ref } from "vue";
import { addDays } from "date-fns";
import { computed } from "vue";
import Loading from "../components/Loading.vue";
import AsteroidLayout from "../components/AsteroidLayout.vue";
import Asteroids from "../components/Asteroids.vue";
export default {
  components: {
    Loading,
    AsteroidLayout,
    Asteroids,
  },
  setup() {
    const API_KEY = "Kzb0E64htPxZGEM33UC62hrug7mfHAzEzIH8Qyu1";
    const data = ref([]);
    const isLoading = ref(false);
    const sortedByDate = ref(true);
    const sortedById = ref(true);
    const plusDay = ref(0);
    const searchQuery = ref("");
    const buttonText = ref("Filter by date");
    onMounted(() => {
      fetchData(data.value);
    });

    const fetchData = (type) => {
      isLoading.value = true;
      data.value = type;
      fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?end_date=${getDate()}&&api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          let fetchedData = res.near_earth_objects[getDate()];
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
    let filteredData = computed(() => {
      filteredData = data.value;
      if (sortedByDate.value) {
        filteredData.sort((a, b) => {
          return (
            Date.parse(new Date(a.close_approach_data[0].close_approach_date_full)) -
            Date.parse(new Date(b.close_approach_data[0].close_approach_date_full))
          );
        });
      }
      if (sortedById.value) {
        filteredData.sort((a, b) => {
          return a.id - b.id;
        });
      }
      if (searchQuery.value !== "") {
        filteredData.filter((asteroid) => {
          return (
            asteroid.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
          );
        });
      }
      return filteredData;
    });
    return {
      data,
      isLoading,
      fetchData,
      plusDay,
      changeDay,
      filteredData,
      searchQuery,
      sortedByDate,
      sortedById,
      buttonText,
    };
  },
};
</script>

<style scoped>
.search {
  position: relative;
  left: 72%;
  border: none;
  height: 30px;
  width: 200px;
  outline: none;
  border: 3px solid var(--secondary);
  border-radius: 35px;
  color: black;
  font-size: 14px;
  font-weight: 200;
  text-align: center;
}

.button {
  position: relative;
  right: 27%;
  height: 35px;
  width: 150px;
  font-size: 14px;
  outline: none;
  border: 3px solid var(--primary);
  border-radius: 35px;
  color: var(--primary);
  background-color: var(--secondary);
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
}
</style>
