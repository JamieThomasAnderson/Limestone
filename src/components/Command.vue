<template>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Commands">
        <CommandItem value="New File" @click="handleNewFile()">
          New File
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>

<script setup lang="ts">
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

import { store, refreshVault } from '@/store'

const handleNewFile = () => {
  store.setOpenFile(null);
  store.isCommandVisible = false;
}

</script>
