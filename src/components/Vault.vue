<template>
  <div class="overflow-x-hidden">
    <button class="font-semibold pl-2 pt-4 pb-2" @click="selectDirectory">
      {{ directoryName || "Select Vault" }}
    </button>
    <DirectoryTree
      v-if="directoryStructure.length"
      :items="directoryStructure"
      @click="handleLoad"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import { store, refreshVault } from "@/store";
import DirectoryTree from "./DirectoryTree.vue";

const directoryStructure = ref([]);
const directoryName = ref("");
const emit = defineEmits(["load"]);

watch(
  () => store.vault,
  (vault) => {
    directoryStructure.value = vault;
  }
);

const selectDirectory = async () => {
  try {
    const directoryHandle = await window.showDirectoryPicker();
    directoryName.value = directoryHandle.name;

    await refreshVault(directoryHandle);

  } catch (error) {
    console.error("Error accessing directory:", error);
  }
};


const handleLoad = (file) => {
  if (file.kind === "file") {
    store.appendRecentFile(file);
    store.setOpenFile(file);
  }
};

</script>
