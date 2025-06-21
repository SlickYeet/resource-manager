import { app, BrowserWindow } from "electron"
import path from "path"

import { getPreloadPath } from "./path-resolver.js"
import { getStaticData, pollResources } from "./resource-manager.js"
import { ipcMainHandle, isDev } from "./utils.js"

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  })
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123")
  } else {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "/dist-frontend/index.html")
    )
  }

  pollResources(mainWindow)

  ipcMainHandle("getStaticData", () => {
    return getStaticData()
  })
})
