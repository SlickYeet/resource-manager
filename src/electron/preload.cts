import electron from "electron"

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeToStatistics: (callback) =>
    ipcOn("statistics", (stats) => {
      callback(stats)
    }),
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"])

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (
    _: Electron.IpcRendererEvent,
    payload: EventPayloadMapping[Key]
  ) => callback(payload)
  electron.ipcRenderer.on(key, cb)
  return () => electron.ipcRenderer.off(key, cb)
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key)
}
