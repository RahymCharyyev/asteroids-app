<template>
  <h1 class="title">THE NASA API project</h1>
  <p class="text">
    The National Aeronautics and Space Administration (NASA /ˈnæsə/) is an independent
    agency of the US federal government responsible for the civil space program,
    aeronautics research, and space research. NASA was established in 1958, succeeding the
    National Advisory Committee for Aeronautics (NACA), to give the U.S. space development
    effort a distinctly civilian orientation, emphasizing peaceful applications in space
    science.NASA has since led most American space exploration, including Project Mercury,
    Project Gemini, the 1968-1972 Apollo Moon landing missions, the Skylab space station,
    and the Space Shuttle. NASA supports the International Space Station and oversees the
    development of the Orion spacecraft, the Space Launch System, Commercial Crew
    vehicles, and the planned Lunar Gateway space station. The agency is also responsible
    for the Launch Services Program, which provides oversight of launch operations and
    countdown management for uncrewed NASA launches.
  </p>
  <p>
    This project was developed using vue js. It includes the information about asteroids
    and pictures of the space captured by the NASA satellites. Check other pages for more
    information.
  </p>
  <hr />
  <p class="footer">{{ footerName }}</p>
</template>

<script>
import { computed } from "vue";
export default {
  setup() {
    const footerName = computed(() => `© ${new Date().getFullYear()} developed by RC`);
    return {
      footerName,
    };
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}

.text {
  text-align: justify;
}

.footer {
  text-align: center;
}
</style>
