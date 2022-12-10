<template>
  <h2 class="title">{{ title }}</h2>
  <p class="subtitle">{{ subtitle }}</p>
  <hr />
  <slot></slot>
  <footer>
    <a href="https://github.com/RahymCharyyev" class="footer">{{ footerName }}</a>
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
