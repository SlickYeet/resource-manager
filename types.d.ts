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

type UnsubscribeFunction = () => void

interface Window {
  electron: {
    subscribeToStatistics: (
      callback: (stats: Statistics) => void
    ) => UnsubscribeFunction
    getStaticData: () => Promise<StaticData>
  }
}
