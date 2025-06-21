import type { WebContents, WebFrameMain } from "electron"
import { ipcMain } from "electron"
import { pathToFileURL } from "url"

import { getUIPath } from "./path-resolver.js"

export function isDev(): boolean {
  return process.env.NODE_ENV === "development"
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    if (!event.senderFrame) {
      throw new Error("Event sender frame is not defined")
    }
    validateEventFrame(event.senderFrame)
    return handler()
  })
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload)
}

export function validateEventFrame(frame: WebFrameMain) {
  console.log(frame.url)
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious event frame detected")
  }
}
