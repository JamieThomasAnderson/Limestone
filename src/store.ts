import { reactive } from "vue";

export const store = reactive({
  openFile: null as File | null,
  recentFile: [] as File[],
  
  appendRecentFile(file: File) {
    this.recentFile.push(file);
  },

  setOpenFile(file: File) {
    this.openFile = file;
  }
});
