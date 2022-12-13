<template>
  <Loading v-if="isLoading" />
  <AsteroidLayout
    v-else
    :fetchData="fetchData"
    :plusDay="plusDay"
    :changeDay="changeDay"
    :arrayLength="arrayLength"
  >
    <input
      type="text"
      class="search"
      placeholder="Search an asteroid by name"
      v-model="searchQuery"
    />
    <button class="button" @click="sortedByDate = !sortedByDate">
      {{ sortedByDate ? "Sort by Velocity" : "Sort by date" }}
    </button>
    <button class="button" @click="sortedByHazard = !sortedByHazard">
      {{ sortedByHazard ? "Reset to all" : "Show Hazardous" }}
    </button>
    <div v-for="asteroid in filteredData" :key="asteroid.id">
      <Asteroids :asteroid="asteroid" />
    </div>
  </AsteroidLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { addDays } from "date-fns";
import { computed } from "vue";
import Loading from "../components/Loading.vue";
import AsteroidLayout from "../components/AsteroidLayout.vue";
import Asteroids from "../components/Asteroids.vue";
const data = ref([]);
const isLoading = ref(false);
const sortedByDate = ref(false);
const sortedByHazard = ref(false);
const plusDay = ref(0);
const searchQuery = ref("");
onMounted(() => {
  fetchData(data.value);
});
const fetchData = () => {
  isLoading.value = true;
  fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?end_date=${getDate()}&&api_key=${
      process.env.VUE_APP_API_KEY
    }`
  )
    .then((res) => res.json())
    .then((res) => {
      let fetchedData = res.near_earth_objects[getDate()];
      data.value = fetchedData;
      isLoading.value = false;
    })
    .catch(() =>
      alert(
        "Sorry, we can't load the data from API. Please, try again later or check your internet connection"
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
  let modifiedData = data.value;
  if (sortedByDate.value) {
    modifiedData.sort((a, b) => {
      return (
        Date.parse(new Date(a.close_approach_data[0].close_approach_date_full)) -
        Date.parse(new Date(b.close_approach_data[0].close_approach_date_full))
      );
    });
  }
  if (!sortedByDate.value) {
    modifiedData.sort((a, b) => {
      return (
        a.close_approach_data[0].relative_velocity.kilometers_per_hour -
        b.close_approach_data[0].relative_velocity.kilometers_per_hour
      );
    });
  }
  if (sortedByHazard.value) {
    modifiedData = modifiedData.filter((asteroid) => {
      return asteroid.is_potentially_hazardous_asteroid;
    });
  }
  if (searchQuery.value !== "") {
    modifiedData = modifiedData.filter((asteroid) => {
      return asteroid.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1;
    });
  }
  return modifiedData;
});

const arrayLength = computed(() => {
  return filteredData.value.length;
});
</script>

<style scoped>
.search {
  position: relative;
  left: 72%;
  border: none;
  height: 30px;
  width: 200px;
  outline: none;
  border: 3px solid var(--primary);
  border-radius: 35px;
  color: black;
  font-size: 14px;
  font-weight: 200;
  text-align: center;
  transition: 0.3s;
}

.button {
  position: relative;
  right: 27%;
  height: 35px;
  width: 150px;
  font-size: 14px;
  outline: none;
  border: 3px solid var(--secondary);
  border-radius: 35px;
  color: var(--primary);
  background-color: var(--secondary);
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
  transition: 0.3s;
}

.button:hover {
  font-size: 16px;
  border: 3px solid var(--primary);
}

.search:hover,
.search:focus {
  border: 3px solid var(--secondary);
}
</style>
