import { useEffect, useRef } from 'react'
import type { ECharts } from 'echarts/core'
import { echarts, readCssVar } from '../lib/echarts.ts'

type MonthlyChartProps = {
  /** 길이 12, 인덱스 = 월 - 1 */
  data: number[]
}

const MONTH_LABELS = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)

function MonthlyChart({ data }: MonthlyChartProps) {
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
    const border = readCssVar('--border')
    chartRef.current?.setOption({
      grid: { left: 32, right: 16, top: 16, bottom: 32 },
      tooltip: { trigger: 'axis', valueFormatter: (v: unknown) => `${String(v)}권` },
      xAxis: {
        type: 'category',
        data: MONTH_LABELS,
        axisLabel: { color: text },
        axisLine: { lineStyle: { color: border } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: { color: text },
        splitLine: { lineStyle: { color: border } },
      },
      series: [
        {
          type: 'bar',
          data,
          itemStyle: { color: readCssVar('--accent'), borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 32,
        },
      ],
    })
  }, [data])

  return (
    <div
      ref={containerRef}
      className="chart"
      role="img"
      aria-label={`월별 읽은 권수: ${data.map((n, i) => `${i + 1}월 ${n}권`).join(', ')}`}
    />
  )
}

export default MonthlyChart
