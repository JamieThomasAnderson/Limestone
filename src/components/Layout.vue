<template>  
  <div class="flex h-screen">
    <div class="flex flex-col w-64 h-full">
      <aside class="h-1/2 overflow-y-auto bg-gray-100">
        <Vault />
      </aside>
      <aside class="h-2 h-1/2 overflow-y-hidden bg-gray-100 border-t">
        <Recent />
      </aside>
    </div>
    <main class="flex-1 h-full overflow-hidden">
      <input class="text-xl p-4 w-full focus:outline-none w-1/2 font-semibold" :value="store.openFile?.name || 'Untitled'"> </input>
      <Editor />
    </main>
  </div>
</template>

<script setup lang="ts">

import Vault from './Vault.vue';
import Recent from './Recent.vue';
import Editor from './Editor.vue';

import { store } from '@/store';

</script>