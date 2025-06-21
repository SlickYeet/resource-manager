type Statistics = {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
}

type StaticData = {
  cpuModel: string
  totalMemory: number
  totalStorage: number
}

type EventPayloadMapping = {
  statistics: Statistics
  getStaticData: StaticData
}

interface Window {
  electron: {
    subscribeToStatistics: (callback: (stats: Statistics) => void) => void
    getStaticData: () => Promise<StaticData>
  }
}
