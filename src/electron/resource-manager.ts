import type { BrowserWindow } from "electron"
import fs from "fs"
import os from "os"
import osUtils from "os-utils"

import { ipcWebContentsSend } from "./utils.js"

const POLLING_INTERVAL = 500

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage()
    const memoryUsage = getMemoryUsage()
    const diskUsage = getStorageData().usage

    ipcWebContentsSend("statistics", mainWindow.webContents, {
      cpuUsage,
      memoryUsage,
      diskUsage,
    })
  }, POLLING_INTERVAL)
}

export function getStaticData() {
  const cpuModel = os.cpus()[0].model
  const totalMemory = Math.floor(osUtils.totalmem() / 1024)
  const totalStorage = getStorageData().total

  return {
    cpuModel,
    totalMemory,
    totalStorage,
  }
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve)
  })
}

function getMemoryUsage() {
  return 1 - osUtils.freememPercentage()
}

function getStorageData() {
  const status = fs.statfsSync(process.platform === "win32" ? "C:/" : "/")
  const total = status.bsize * status.blocks
  const free = status.bsize * status.bfree

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  }
}
