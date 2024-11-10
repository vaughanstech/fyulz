const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openFilePicker: () => ipcRenderer.invoke("dialog:openFile"),
});
