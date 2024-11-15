<template>
    <div class="p-4">
        <h1>Recent</h1>
        <ul>
            <li v-for="file in openFiles" :key="file.name">
                {{ file.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { store } from "@/store.ts";

export default defineComponent({
    name: 'Recent',
    setup() {
        onMounted(() => {
            console.log(store.openFiles);
        });

        const openFiles = computed(() => store.openFiles);

        return {
            openFiles
        };
    }
});
</script>