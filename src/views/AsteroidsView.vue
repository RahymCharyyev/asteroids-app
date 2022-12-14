<template>
  <Loading v-if="isLoading" />
  <AsteroidLayout
    v-else
    :fetchData="fetchData"
    :plusDay="plusDay"
    :changeDay="changeDay"
    :arrayLength="arrayLength"
  >
    <div class="container">
      <button class="button" @click="sortedByDate = !sortedByDate">
        {{ sortedByDate ? "Sort by Velocity" : "Sort by date" }}
      </button>
      <button class="button" @click="sortedByHazard = !sortedByHazard">
        {{ sortedByHazard ? "Reset to all" : "Show Hazardous" }}
      </button>
      <input
        type="text"
        class="search"
        placeholder="Search by name"
        v-model="searchQuery"
      />
    </div>
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
  // Sign up to https://api.nasa.gov/ to get full access to API via API KEY
  fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?end_date=${getDate()}&&api_key=${
      process.env.VUE_APP_API_KEY
    }`
  )
    // fetch(`https://api.nasa.gov/neo/rest/v1/feed?end_date=${getDate()}&&api_key=DEMO_KEY`)
    .then((res) => res.json())
    .then((res) => {
      let fetchedData = res.near_earth_objects[getDate()];
      data.value = fetchedData;
    })
    .catch(() =>
      alert(
        "Sorry, we can't load the data from API. Please, try again later or check your internet connection"
      )
    )
    .finally(() => (isLoading.value = false));
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
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}

.search {
  border: none;
  height: 30px;
  width: 147px;
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
  height: 35px;
  width: 150px;
  font-size: 14px;
  outline: none;
  border: none;
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
  color: var(--secondary);
  background-color: var(--primary);
}

.search:hover,
.search:focus {
  border: 3px solid var(--secondary);
}

@media (max-width: 450px) {
  .container {
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
  }

  .button,
  .search {
    margin-top: 10px;
    margin-right: 0;
  }
}
</style>
