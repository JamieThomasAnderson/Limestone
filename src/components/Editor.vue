<!-- Editor.vue File -->
<template>
  <MdEditor
    class="editor"
    v-model="content"
    :toolbars="[]"
    language="en-US"
    @on-save="saveFile"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import { store, refreshVault } from "@/store";

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


watch(
  () => store.openFile,
  (newFile) => {
    console.log("Loading changed:", newFile);
    loadFile(newFile);
  }
);

const loadFile = async (file) => {

  if (!file) {
    content.value = "";
    return;
  }

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
  if (!store.openFile) {
    await saveNewFile();
    if (store.handler) {
      refreshVault(store.handler);
    }
    console.log("New file saved successfully");
    return;
  }

  const fileData = await store.openFile.handle.getFile();
  const fileContent = await fileData.text();

  if (content.value === fileContent) {
    console.log("No changes detected");
    return;
  }

  const writable = await store.openFile.handle.createWritable();
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

    console.log("New file saved successfully", handle);
    
    store.appendRecentFile(handle);
    store.setOpenFile({ kind: "file", handle, name: handle.name });

  } catch (error) {
    console.error("Error saving new file:", error);
  }
};
</script>

<style scoped>
.editor {
  height: 93vh;
  border-bottom: none;
  border-left: none;
  border-top: 1px solid #e2e8f0;
}
</style>
