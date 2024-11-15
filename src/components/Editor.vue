<!-- Editor.vue File -->
<template>
  <MdEditor class="editor" :toolbars="[]" v-model="content" language="en-US" @on-save="saveFile" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

config({
  editorConfig: {
    renderDelay: 0
  }
});

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  file: {
    type: Object,
    required: true
  }
});

const content = ref(props.content);
const currFile = ref(props.file);
const emit = defineEmits(['contentChanged']);

watch(
  () => props.content,
  (newContent) => {
    content.value = newContent;
  }
);

watch(
  () => props.file,
  (newFile) => {
    currFile.value = newFile;
    loadFile(newFile);
  }
);

const loadFile = async (file) => {
  if (file.kind === 'file' && file.handle) {
    try {
      const fileData = await file.handle.getFile();
      const fileContent = await fileData.text();
      content.value = fileContent;
    } catch (error) {
      console.error('Error reading file:', error);
    }
  } else {
    console.log('Selected item is not a file');
  }
};

const saveFile = async () => {
  const fileData = await currFile.value.handle.getFile();
  const fileContent = await fileData.text();
  
  if (content.value === fileContent) {
    console.log('No changes detected');
    return;
  }

  const writable = await currFile.value.handle.createWritable();
  await writable.write(content.value);
  await writable.close();

  console.log('File saved successfully');
};
</script>

<style scoped>
.editor {
  height: 100vh;
}
</style>