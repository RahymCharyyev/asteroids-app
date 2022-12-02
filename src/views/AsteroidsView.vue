<template>
  <Loading v-if="isLoading" />
  <AsteroidLayout
    v-else
    :data="data"
    :fetchData="fetchData"
    :plusDay="plusDay"
    :changeDay="changeDay"
  >
    <div class="inputWrapper">
      <input
        type="text"
        class="search"
        placeholder="Search an asteroid by name"
        v-model="searchQuery"
      />
    </div>
    <button @click="filterByDate">Filter by date</button>
    <div v-for="asteroid in filterByDate" :key="asteroid.id">
      <Asteroids :asteroid="asteroid" />
    </div>
    <!-- <div v-for="asteroid in filteredData" :key="asteroid.id">
      <Asteroids :asteroid="asteroid" />
    </div> -->
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
    let data = ref([]);
    let isLoading = ref(false);
    let plusDay = ref(0);
    let searchQuery = ref("");
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

    const filteredData = computed(() => {
      return data.value.filter((asteroid) => {
        return asteroid.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1;
      });
    });
    const filterByDate = computed(() => {
      return data.value.sort((a, b) => {
        return (
          a.close_approach_data[0].close_approach_date_full -
          b.close_approach_data[0].close_approach_date_full
        );
      });
    });
    return {
      data,
      isLoading,
      fetchData,
      plusDay,
      changeDay,
      filteredData,
      searchQuery,
      filterByDate,
    };
  },
};
</script>

<style scoped>
.inputWrapper {
  text-align: right;
}

.search {
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
</style>
