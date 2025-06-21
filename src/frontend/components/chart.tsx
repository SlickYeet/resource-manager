import { useMemo } from "react"
import { BaseChart } from "./base-chart"

interface ChartProps {
  data: Array<number>
  maxDataPoints: number
}

export function Chart(props: ChartProps) {
  const { data, maxDataPoints } = props

  const preparedData = useMemo(() => {
    const points = data.map((point) => ({ value: point * 100 }))
    return [
      ...points,
      ...Array.from({ length: maxDataPoints - points.length }).map(() => ({
        value: 0,
      })),
    ]
  }, [data, maxDataPoints])

  return <BaseChart data={preparedData} />
}
