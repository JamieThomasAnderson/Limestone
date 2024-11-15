<template>
  <div class="app">
    <div
      v-if="isCommandVisible"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-start justify-center z-50"
    >
      <div class="bg-white rounded shadow-lg w-1/2 mt-16">
        <Command />
      </div>
    </div>
    <Layout />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Layout from "./components/Layout.vue";
import Command from "./components/Command.vue";

const isCommandVisible = ref(false);

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLowerCase() === "p") {
    event.preventDefault();
    isCommandVisible.value = !isCommandVisible.value;
  }

  if (event.keyCode === 27) {
    isCommandVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
