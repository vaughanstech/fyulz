const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../dist/preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webgl: false,
      experimentalFeatures: false,
    },
  });

  mainWindow?.loadFile("./src/index.html");

  mainWindow?.on("closed", () => {
    mainWindow = null;
  });
});

app.disableHardwareAcceleration();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("dialog:openFile", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
  });

  return result.filePaths;
});
