import * as echarts from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 사용하는 차트·컴포넌트만 등록해 번들 크기를 줄인다.
echarts.use([
  BarChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
])

export { echarts }

/** index.css의 색상 변수 값을 읽는다 (다크 모드 반영). */
export function readCssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}

/** 도넛 차트용 범주 색. 첫 색은 --accent와 같은 계열. 라이트·다크 모두에서 읽히는 중간 명도. */
export const CHART_PALETTE = [
  '#aa3bff',
  '#2f9e8f',
  '#e8833a',
  '#3b82f6',
  '#d6457a',
  '#8a8f3c',
  '#7c6f9b',
]
