<template>
  <li>
    <router-link :to="page.link">{{ page.name }}</router-link>
  </li>
</template>

<script setup lang="ts">
import { Page } from "../interfaces/Page";

defineProps<{
  page: Page;
}>();
</script>