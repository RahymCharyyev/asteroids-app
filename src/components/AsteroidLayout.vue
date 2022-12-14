<template>
  <h2 class="title">{{ title }}</h2>
  <h3 class="subtitle">There Will Be {{ arrayLength }} Near Misses</h3>
  <hr />
  <slot></slot>
  <footer>
    <div class="buttons">
      <button class="button" @click="changeDay(-1)">← Previous Day</button>
      <button class="button" @click="changeDay(+1)">Next Day →</button>
    </div>
    <a href="https://github.com/RahymCharyyev" class="footer">{{ footer }}</a>
  </footer>
</template>

<script setup>
import { format, addDays } from "date-fns";
import { computed } from "vue";
const props = defineProps({
  fetchData: {},
  plusDay: {},
  changeDay: {},
  searchQuery: String,
  arrayLength: {},
});
const title = computed(
  () => `${format(addDays(new Date(), props.plusDay), "EEEE d-MMM")},`
);
const footer = computed(() => `© ${new Date().getFullYear()} developed by RC`);
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}

.title,
.subtitle {
  text-align: center;
}

.button {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 1em;
  cursor: pointer;
  font-family: Ubuntu Mono;
  font-weight: 600;
  background-color: transparent;
  text-transform: capitalize;
  color: var(--secondary);
}

.button:hover {
  color: var(--primary);
}

.footer {
  display: block;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  margin: 20px 0 20px 0;
  transition: 0.3s;
}

.footer:hover {
  color: var(--secondary);
}
</style>
