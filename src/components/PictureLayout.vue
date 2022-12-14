<template>
  <h2 class="title">{{ title }}</h2>
  <p class="subtitle">{{ subtitle }}</p>
  <hr />
  <slot></slot>
  <footer>
    <a href="https://github.com/RahymCharyyev" class="footer">{{ footerName }}</a>
  </footer>
</template>

<script setup>
import { format } from "date-fns";
import { computed } from "vue";
const props = defineProps({
  plusDay: Number,
  fetchData: {},
});
const title = computed(() => `${format(new Date(), "EEEE d-MMM")}`);
const subtitle = computed(() => `* You can click on image to view it on actual size`);
const footerName = computed(() => `© ${new Date().getFullYear()} developed by RC`);
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
