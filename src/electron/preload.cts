import electron from "electron"

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeToStatistics: (callback: (stats: any) => void) => {
    electron.ipcRenderer.on("statistics", (_, stats) => {
      callback(stats)
    })
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
})
