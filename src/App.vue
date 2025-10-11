<template>
  <nav>
    <Title
      :title="titles.title"
      :subtitle="titles.subtitle"
      :activity="activity"
      :joke="joke"
      @activity="toggleActivity"
      @joke="toggleJoke"
    />
    <Menu :pages="pages" />
  </nav>
  <router-view></router-view>
  <Transition name="fade">
    <footer v-if="noFootersShowing && showHint" @click="checker = !checker">
      The titles might be clickable...
    </footer>
  </Transition>
  <Transition name="fade">
    <Checker v-if="checker" />
  </Transition>
  <Transition name="fade">
    <Activity v-if="activity" />
  </Transition>
  <Transition name="fade">
    <Suggestion
      v-if="joke"
      url="https://icanhazdadjoke.com/"
      valueName="joke"
      title="Have a laugh!"
    />
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import Title from "./components/Title.vue";
import Menu from "./components/Menu.vue";
import Checker from "./components/Checker.vue";
import Activity from "./components/Activity.vue";
import Suggestion from "./components/Suggestion.vue";
import pages from "./configs/pages.json";
import titles from "./configs/titles.json";

const checker = ref(false);
const activity = ref(false);
const joke = ref(false);
const showHint = ref(false);
const route = useRoute();

const noFootersShowing = computed(() => {
  return !activity.value && !checker.value && !joke.value;
});

function toggleActivity() {
  activity.value = !activity.value;
}

function toggleJoke() {
  joke.value = !joke.value;
}

onMounted(() => {
  setTimeout(() => {
    showHint.value = true;
  }, 2000);

  setTimeout(() => {
    showHint.value = false;
  }, 5000);
});

watch(
  () => route.params.name,
  (newName) => {
    const currentPage = pages.find((page) => page.link.slice(1) === newName);
    document.title = "Elliot > " + (currentPage || pages[0]).title;
  },
  { immediate: true },
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>