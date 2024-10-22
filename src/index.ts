import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
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
