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
import { ref, onMounted } from "vue";
import { store } from "@/store";

import DirectoryTree from "./DirectoryTree.vue";

const directoryStructure = ref([]);
const directoryName = ref("");
const emit = defineEmits(["load"]);

const selectDirectory = async () => {
  try {
    const directoryHandle = await window.showDirectoryPicker();
    directoryName.value = directoryHandle.name;
    directoryStructure.value = [];
    await buildDirectoryTree(directoryHandle, directoryStructure.value);
  } catch (error) {
    console.error("Error accessing directory:", error);
  }
};

const buildDirectoryTree = async (directoryHandle, parentArray) => {
  for await (const entry of directoryHandle.values()) {
    const item = {
      name: entry.name,
      kind: entry.kind,
      isOpen: false,
      children: [],
      handle: entry.kind === "file" ? entry : null,
    };
    if (entry.kind === "directory") {
      await buildDirectoryTree(entry, item.children);
    }
    parentArray.push(item);
  }
};

const handleLoad = (file) => {
  if (file.kind === "file") {
    store.appendRecentFile(file);
    store.setOpenFile(file);
  }
};

</script>
