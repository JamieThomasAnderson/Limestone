<template>  
  <div class="flex h-screen">
    <div class="flex flex-col w-64 h-full">
      <aside class="h-3/4 overflow-y-auto bg-gray-100">
        <Vault @load="updateFile" />
      </aside>
      <aside class="h-1/4 overflow-y-auto bg-gray-100 border-t">
        <Recent />
      </aside>
    </div>
    <main class="flex-1 h-full overflow-hidden">
      <input class="text-xl p-4 w-full focus:outline-none w-1/2 font-semibold" :value="file.name || 'Untitled'"> </input>
      <Editor :file="file" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Editor from './Editor.vue';
import Vault from './Vault.vue';
import Recent from './Recent.vue';

const file = ref<{ name?: string }>({});

const updateFile = (newFile: any) => {
  file.value = newFile;
};
</script>