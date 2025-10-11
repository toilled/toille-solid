<template>
  <ul>
    <MenuItem v-for="page in pages" :key="page.link" :page="page" />
  </ul>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
import { Page } from "../interfaces/Page";

defineProps<{
  pages: Page[];
}>();
</script>