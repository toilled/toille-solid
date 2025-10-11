<template>
  <main>
    <header>
      <h2
        class="title"
        @mousedown="
          () => {
            showHint = true;
            setTimeout(() => {
              showHint = false;
            }, 500);
          }
        "
      >
        <template v-if="page">
          {{ page.title }}
          <Transition name="fade">
            <span
              v-if="showHint"
              style="
                font-weight: 100;
                font-style: italic;
                font-size: 0.6em;
                vertical-align: middle;
              "
            >
              - Nothing here
            </span>
          </Transition>
        </template>
        <template v-else> 404 - Page not found </template>
      </h2>
    </header>
    <template v-if="page">
      <Paragraph
        v-for="(paragraph, index) in page.body"
        :key="index"
        :paragraph="paragraph"
        :last="index + 1 === page.body.length"
      />
    </template>
    <template v-else>
      <Paragraph
        :paragraph="`The page <strong>${$route.params.pathMatch[0]}</strong> does not exist!`"
        :last="true"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import pages from "../configs/pages.json";
import Paragraph from "./Paragraph.vue";
import { Page } from "../interfaces/Page";

const showHint = ref(false);
const route = useRoute();

const page = computed(() => {
  if (route.params.name) {
    return (
      pages.find((p) => p.link.slice(1) === route.params.name) || pages[0]
    );
  }
  if (route.params.pathMatch) {
    return null;
  }
  return pages[0];
});

watch(
  () => route.params.name,
  () => {
    const newPage =
      pages.find((p) => p.link.slice(1) === route.params.name) || pages[0];
    if (newPage) {
      document.title = "Elliot > " + newPage.title;
    }
  },
  { immediate: true },
);
</script>