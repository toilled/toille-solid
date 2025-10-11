<template>
  <p :class="{ marginless: last }" v-html="paragraph"></p>
</template>

<script setup lang="ts">
defineProps<{
  paragraph: string;
  last: boolean;
}>();
</script>