<template>
  <div class="app">
    <Context />
    <div
      v-if="store.isCommandVisible"
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
import Context from "./components/Context.vue";
import { store } from "./store";

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLowerCase() === "p") {
    event.preventDefault();
    store.toggleCommandVisibility();
  }

  if (event.keyCode === 27) {
    store.isCommandVisible = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
