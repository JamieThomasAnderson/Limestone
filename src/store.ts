import { reactive } from "vue";

export const store = reactive({
  openFiles: [] as any[],
  openDirectory: "",
  defaultSaveDirectory: "",
  setOpenFiles(files: any) {
    this.openFiles = files;
  },
  appendOpenFile(file: any) {
    this.openFiles.push(file);
  },
  setOpenDirectory(directory: any) {
    this.openDirectory = directory;
  },

  setDefaultSaveDirectory(directory: any) {
    this.defaultSaveDirectory = directory;
  }
});
