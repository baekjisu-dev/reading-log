import { useEffect, useRef } from 'react'
import type { ECharts } from 'echarts/core'
import { CHART_PALETTE, echarts, readCssVar } from '../lib/echarts.ts'
import type { GenreSlice } from '../lib/stats.ts'

type GenreChartProps = {
  data: GenreSlice[]
}

function GenreChart({ data }: GenreChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ECharts | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const chart = echarts.init(el)
    chartRef.current = chart
    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(el)
    return () => {
      observer.disconnect()
      chart.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    const text = readCssVar('--text')
    chartRef.current?.setOption({
      color: CHART_PALETTE,
      tooltip: { trigger: 'item', formatter: '{b}: {c}권 ({d}%)' },
      legend: { bottom: 0, textStyle: { color: text } },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: readCssVar('--bg'), borderWidth: 2 },
          label: { color: text, formatter: '{b} {d}%' },
          data,
        },
      ],
    })
  }, [data])

  return (
    <div
      ref={containerRef}
      className="chart"
      role="img"
      aria-label={`장르 비율: ${data.map((g) => `${g.name} ${g.value}권`).join(', ')}`}
    />
  )
}

export default GenreChart
