<template>
  <footer>
    <article style="margin-bottom: 0">
      <header>Alcohol Checker</header>
      <section class="grid">
        <button @click="add" class="outline">Add</button>
        <button @click="subtract" class="outline">Subtract</button>
      </section>
      <table class="marginless">
        <thead>
          <tr>
            <th>Units consumed</th>
            <th>Borderline time</th>
            <th>Safe time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ count }}</td>
            <td>{{ limitTime }}</td>
            <td>{{ soberTime }}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const count = ref(0);
const limitTime = ref("");
const soberTime = ref("");

function updateTimes() {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  } as const;
  const currentTime = new Date().getTime();
  if (count.value === 0) {
    limitTime.value = new Date(currentTime).toLocaleTimeString([], options);
    soberTime.value = new Date(currentTime).toLocaleTimeString([], options);
  } else {
    limitTime.value = new Date(
      currentTime + count.value * 60 * 60 * 1000,
    ).toLocaleTimeString([], options);
    soberTime.value = new Date(
      currentTime + (count.value + 1) * 60 * 60 * 1000,
    ).toLocaleTimeString([], options);
  }
}

function add() {
  count.value++;
}

function subtract() {
  if (count.value > 0) {
    count.value--;
  }
}

onMounted(updateTimes);
watch(count, updateTimes);
</script>