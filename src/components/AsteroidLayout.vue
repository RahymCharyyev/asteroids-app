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
    <p class="footer">{{ footerName }}</p>
  </footer>
</template>

<script>
import { format, addDays } from "date-fns";
import { computed } from "vue";

export default {
  props: ["fetchData", "plusDay", "changeDay", "searchQuery", "arrayLength"],
  setup({ fetchData, plusDay, changeDay, searchQuery }) {
    const title = computed(
      () => `${format(addDays(new Date(), plusDay), "EEEE d-MMM")},`
    );

    const footerName = computed(() => `© ${new Date().getFullYear()} developed by RC`);

    return {
      title,
      footerName,
      fetchData,
      changeDay,
      searchQuery,
    };
  },
};
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
  color: var(--primary);
  font-weight: 500;
  text-align: center;
}
</style>
