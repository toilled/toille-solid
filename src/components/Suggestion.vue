<template>
  <footer @click="newSuggestion" :style="{ cursor: loading ? 'progress' : '' }">
    <article v-if="suggestion" :title="hoverHintText" style="margin-bottom: 0">
      <header>
        <strong>{{ title }}</strong>
      </header>
      <p class="marginless">{{ suggestion[valueName] }}</p>
    </article>
    <article v-else style="margin-bottom: 0">
      <header>
        <strong>Have a laugh!</strong>
      </header>
      <p class="marginless" aria-busy="true">{{ url }} might be down.</p>
    </article>
    <Transition name="fade">
      <article v-if="!hideHint" style="padding-top: 0; margin-top: 0; margin-bottom: 0">
        <footer style="font-style: oblique; font-size: 0.8em; margin-top: 0">
          Click to update
        </footer>
      </article>
    </Transition>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const props = defineProps<{
  url: string;
  valueName: string;
  title: string;
}>();

const suggestion = ref<any>(null);
const loading = ref(false);
const hideHint = ref(false);

const hoverHintText = computed(() => "Click for a new " + props.valueName);

async function fetchSuggestion() {
  loading.value = true;
  try {
    const response = await fetch(props.url, {
      headers: { Accept: "application/json" },
    });
    suggestion.value = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function newSuggestion() {
  fetchSuggestion();
  if (!hideHint.value) {
    hideHint.value = true;
  }
}

onMounted(fetchSuggestion);
</script>