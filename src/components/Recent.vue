<template>
  <div class="p-4">
    <h1 class="font-semibold text-sm">Recent</h1>
    <ul>
      <li
        class="hover:bg-neutral-300 w-full pl-1 text-left text-nowrap cursor-pointer text-sm"
        v-for="file in recent"
        :key="file.name"
        @click="handleLoad(file)"
      >
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { store } from "@/store.ts";

export default defineComponent({
  name: "Recent",
  setup() {
    const raw = computed(() => store.recentFile);
    const recent = computed(() => [...raw.value].reverse());

    const handleLoad = (file: File) => {
      store.setOpenFile(file);
    };

    return {
      recent,
      handleLoad,
    };
  },
});
</script>
