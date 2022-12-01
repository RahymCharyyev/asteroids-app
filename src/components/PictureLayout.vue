<template>
  <h2 class="title">{{ title }}</h2>
  <p class="subtitle">{{ subtitle }}</p>
  <hr />
  <slot></slot>
  <footer>
    <p class="footer">{{ footerName }}</p>
  </footer>
</template>

<script>
import { format, addDays } from "date-fns";
import { computed } from "vue";

export default {
  props: ["fetchData", "plusDay"],
  setup({ fetchData, plusDay }) {
    const title = computed(() => `${format(addDays(new Date(), plusDay), "EEEE d-MMM")}`);
    const subtitle = computed(() => `*You can click on image to view it on actual size`);
    const footerName = computed(() => `© ${new Date().getFullYear()} developed by RC`);

    return {
      title,
      subtitle,
      footerName,
      fetchData,
    };
  },
};
</script>

<style scoped>
.title,
.subtitle {
  text-align: center;
}

.footer {
  color: var(--primary);
  font-weight: 500;
  text-align: center;
}
</style>
