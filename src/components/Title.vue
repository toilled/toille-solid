<template>
  <ul>
    <li>
      <hgroup>
        <h1 class="title question" @mousedown="$emit('activity')">
          {{ title }}
        </h1>
        <h2 class="title question" @mousedown="$emit('joke')">
          {{ subtitle }}
        </h2>
      </hgroup>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  activity: boolean;
  joke: boolean;
}>();

defineEmits<{
  (e: "activity"): void;
  (e: "joke"): void;
}>();
</script>