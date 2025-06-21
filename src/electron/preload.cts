const electron = require("electron")

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeToStatistics: (callback: (stats: any) => void) => callback({}),
  getStaticData: () => console.log("static"),
})
