import { useMemo, useState } from "react"

import "./App.css"
import reactLogo from "./assets/react.svg"
import { useStatistics } from "./hooks/use-statistics"
import { Chart } from "./components/chart"

function App() {
  const statistics = useStatistics(10)
  const [count, setCount] = useState(0)

  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  )

  return (
    <div className="App">
      <div style={{ height: 120 }}>
        <Chart data={cpuUsages} maxDataPoints={10} />
      </div>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
