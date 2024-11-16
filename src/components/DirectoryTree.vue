<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :key="index"
      class="text-sm"
    >
      <div @click="toggle(item)">
        <button
          class="hover:bg-neutral-300 w-full text-left text-nowrap"
          v-if="item.kind === 'directory'"
          :style="{ paddingLeft: `${level * 10}px` }"
        >
          {{ item.name }} ({{ item.isOpen ? "-" : "+" }})
        </button>
        <button
          v-else
          :style="{ cursor: item.kind === 'file' ? 'pointer' : 'default', paddingLeft: `${level * 10}px` }"
          @click.stop="emitClick(item)"
          class="hover:bg-neutral-300 w-full text-left text-nowrap"
        >
          {{ item.name }}
        </button>
      </div>
      <DirectoryTree
        v-if="item.isOpen && item.children"
        :items="item.children"
        :level="level + 1"
        @click="emitClick"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "DirectoryTree",
  props: {
    items: {
      type: Array,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    toggle(item) {
      item.isOpen = !item.isOpen;
    },
    emitClick(item) {
      this.$emit("click", item);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
