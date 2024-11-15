<template>
  <div class="p-4">
    <button class="font-semibold" @click="selectDirectory">
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
  store.appendOpenFile(file);
  emit("load", file);
};

</script>
