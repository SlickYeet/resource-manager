import electron from "electron"

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeToStatistics: (callback) => {
    ipcOn("statistics", (stats) => {
      callback(stats)
    })
  },
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"])

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(key, (_, payload) => callback(payload))
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key)
}
