<template>
  <div class="flex h-screen">
    <aside class="w-64 h-full overflow-y-auto bg-gray-200">
      <Vault @load="updateFile" />
    </aside>
    <main class="flex-1 h-full overflow-hidden">
      <Editor :content="fileContent" :file="file" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Editor from './Editor.vue';
import Vault from './Vault.vue';

import { ref } from 'vue';


const fileContent = ref('# Hello, World!');
const file = ref({});

const updateFile = (newFile: any) => {
  file.value = newFile;
};
</script>