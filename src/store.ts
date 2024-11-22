import { reactive } from "vue";

export const store = reactive({
  openFile: null as File | null,
  recentFile: [] as File[],
  vault: [] as any,
  handler: null as FileSystemDirectoryHandle | null,
  isCommandVisible: false,
  
  appendRecentFile(file: File) {
    this.recentFile.push(file);
  },

  setOpenFile(file: File | null) {
    this.openFile = file;
  },

  setVault(vault: any) {
    this.vault = vault;
  },

  setHandler(handler: FileSystemDirectoryHandle | null) {
    this.handler = handler;
  },

  toggleCommandVisibility() {
    this.isCommandVisible = !this.isCommandVisible;
  }
});

export const refreshVault = async (directoryHandle: FileSystemDirectoryHandle) => {

  const directoryStructure = [] as any;
  await buildDirectoryTree(directoryHandle, directoryStructure);
  
  store.setVault(directoryStructure);
  store.setHandler(directoryHandle);
}


const buildDirectoryTree = async (
  directoryHandle: FileSystemDirectoryHandle, parentArray: any) => {

  for await (const entry of directoryHandle.values()) {
    const item = {
      name: entry.name,
      kind: entry.kind,
      isOpen: false,
      children: [],
      handle: entry.kind === "file" ? entry : null,
    };
    if (entry.kind === "directory") {
      await buildDirectoryTree(entry, item.children);
    }
    parentArray.push(item);
  }
};