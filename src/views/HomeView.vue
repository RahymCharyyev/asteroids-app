<template>
  <Loading v-if="isLoading" />
  <Layout
    v-else
    :data="data"
    :fetchData="fetchData"
    :plusDay="plusDay"
    :changeDay="changeDay"
  >
    <form>
      <input type="text" placeholder="Search an asteroid by name" v-model="searchQuery" />
    </form>
    <div v-for="asteroid in filteredData" :key="asteroid.id">
      <Asteroids :asteroid="asteroid" />
    </div>
  </Layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { addDays } from "date-fns";
import { computed } from "vue";
import Loading from "../components/Loading.vue";
import Layout from "../components/Layout.vue";
import Asteroids from "../components/Asteroids.vue";
export default {
  components: {
    Loading,
    Layout,
    Asteroids,
  },
  setup() {
    const API_KEY = "Kzb0E64htPxZGEM33UC62hrug7mfHAzEzIH8Qyu1";
    let data = ref([]);
    let isLoading = ref(false);
    let plusDay = ref(0);
    const searchQuery = ref("");
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
    return {
      data,
      isLoading,
      fetchData,
      plusDay,
      changeDay,
      filteredData,
      searchQuery,
    };
  },
};
</script>

<style>
:root {
  --primary: #fff;
  --secondary: #d6a505;
  --hr: #838485;
  --background: #000;
  --red: red;
}

html {
  background-image: url(.././assets/bg.jpg);
  background-repeat: repeat, no-repeat;
  background-size: auto, cover;
  background-position: center, center;
  background-color: var(--background);
}

body {
  position: relative;
  max-width: 42em;
  margin: 0 auto;
  padding: 12px 20px 0 20px;
  font-family: Ubuntu Mono;
  font-size: 18px;
  color: var(--primary);
}

a {
  color: var(--secondary);
}

hr {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin: 2.5em 0;
  position: relative;
}

hr:before,
hr:after {
  content: "";
  position: absolute;
  bottom: 0px;
  height: 5em;
  width: 100%;
  background: radial-gradient(
    ellipse at bottom,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 0;
}

hr:after {
  top: 0px;
  bottom: auto;
  height: 1.5em;
  background: radial-gradient(
    ellipse at top,
    rgba(0, 0, 0, 0.06) 0%,
    rgba(0, 0, 0, 0) 70%
  );
}

form {
  text-align: right;
}

input[type="text"] {
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

@media (max-width: 600px) {
  body {
    font-size: 16px;
  }
}
</style>
