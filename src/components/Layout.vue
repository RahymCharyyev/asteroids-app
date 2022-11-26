<template>
  <h2>{{ title }}</h2>
  <h3>{{ subtitle }}</h3>
  <hr />
  <slot></slot>
  <footer>
    <p class="buttons">
      <button @click="changeDay(-1)" v-if="plusDay">← Previous Day</button>
      <span v-else></span>
      <button @click="changeDay(+1)">Next Day →</button>
    </p>
    <p>{{ footerName }}</p>
  </footer>
</template>

<script>
import { format, addDays } from "date-fns";
import { computed } from "vue";

export default {
  props: ["data", "fetchData", "plusDay", "changeDay"],
  setup({ fetchData, data, plusDay, changeDay }) {
    const title = computed(
      () => `${format(addDays(new Date(), plusDay), "EEEE d-MMM")},`
    );

    const subtitle = computed(
      () => `There Will Be
      ${data.length} Near Misses`
    );

    const footerName = computed(() => `© ${new Date().getFullYear()} developed by RC`);

    return {
      title,
      subtitle,
      footerName,
      fetchData,
      changeDay,
    };
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}

h2,
h3 {
  text-align: center;
}

button {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 1em;
  cursor: pointer;
  font-family: Ubuntu Mono, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
    monospace;
  font-weight: 600;
  background-color: transparent;
  text-transform: capitalize;
  color: var(--secondary);
}

button:hover {
  color: var(--primary);
}

footer {
  color: var(--primary);
  font-weight: 500;
  text-align: center;
}
</style>
