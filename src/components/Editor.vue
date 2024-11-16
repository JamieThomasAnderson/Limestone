<!-- Editor.vue File -->
<template>
  <MdEditor
    class="editor"
    v-model="content"
    language="en-US"
    @on-save="saveFile"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import { store } from "@/store";

import { MdEditor, config } from "md-editor-v3";
import { lineNumbers } from "@codemirror/view";
import "md-editor-v3/lib/style.css";

config({
  editorConfig: {
    renderDelay: 0,
  },
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  },
});

const content = ref('');
const emit = defineEmits(["contentChanged"]);


watch(
  () => store.openFile,
  (newFile) => {
    loadFile(newFile);
  }
);

const loadFile = async (file) => {
  if (file.kind === "file" && file.handle) {
    try {
      const fileData = await file.handle.getFile();
      const fileContent = await fileData.text();
      content.value = fileContent;
    } catch (error) {
      console.error("Error reading file:", error);
    }
  } else {
    console.log("Selected item is not a file");
  }
};

const saveFile = async () => {
  console.log('saving file');
  if (!store.openFile) {
    await saveNewFile();
    console.log("New file saved successfully");
    return;
  }

  const fileData = await currFile.value.handle.getFile();
  const fileContent = await fileData.text();

  if (content.value === fileContent) {
    console.log("No changes detected");
    return;
  }

  const writable = await currFile.value.handle.createWritable();
  await writable.write(content.value);
  await writable.close();

  console.log("File saved successfully");
};

const saveNewFile = async () => {
  try {
    const options = {
      types: [
        {
          description: "Markdown Files",
          accept: {
            "text/markdown": [".md"],
          },
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(content.value);
    await writable.close();

    console.log("New file saved successfully");
    currFile.value = { handle }; // Update the current file reference with the new handle
  } catch (error) {
    console.error("Error saving new file:", error);
  }
};
</script>

<style scoped>
.editor {
  height: 93vh;
  border: none;
}
</style>
