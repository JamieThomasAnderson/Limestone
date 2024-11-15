<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <div @click="toggle(item)">
        <button v-if="item.kind === 'directory'">
          {{ item.name }} ({{ item.isOpen ? '-' : '+' }})
        </button>
        <span
          v-else
          :style="{ cursor: item.kind === 'file' ? 'pointer' : 'default' }"
          @click.stop="emitClick(item)"
        >
          {{ item.name }}
        </span>
      </div>
      <DirectoryTree v-if="item.isOpen && item.children" :items="item.children" @click="emitClick" />
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['click']);

const toggle = (item) => {
  if (item.kind === 'directory') {
    item.isOpen = !item.isOpen;
  }
};

const emitClick = (item) => {
  emit('click', item);
};
</script>