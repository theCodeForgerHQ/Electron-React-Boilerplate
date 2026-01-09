import path from "path";
import { app, BrowserWindow } from "electron";
import { isDev } from "./utils.js";

app.setName("Electron + React App");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    minWidth: 1000,
    minHeight: 800,
    title: "Electron + React App",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
