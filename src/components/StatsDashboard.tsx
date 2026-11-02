import { useMemo } from 'react'
import { useBookStore } from '../stores/bookStore.ts'
import { collectYears, summarizeYear } from '../lib/stats.ts'
import MonthlyChart from './MonthlyChart.tsx'
import GenreChart from './GenreChart.tsx'

function StatsDashboard() {
  const books = useBookStore((s) => s.books)
  const statsYear = useBookStore((s) => s.statsYear)
  const setStatsYear = useBookStore((s) => s.setStatsYear)

  const years = useMemo(
    () => collectYears(books, [new Date().getFullYear(), statsYear]),
    [books, statsYear],
  )
  const summary = useMemo(() => summarizeYear(books, statsYear), [books, statsYear])

  if (books.length === 0) {
    return (
      <section className="stats">
        <h2>독서 통계</h2>
        <p className="empty">아직 등록된 책이 없어요. 책을 기록하면 통계가 보여요.</p>
      </section>
    )
  }

  return (
    <section className="stats">
      <div className="stats-header">
        <h2>독서 통계</h2>
        <div className="field">
          <label htmlFor="stats-year">연도</label>
          <select
            id="stats-year"
            value={statsYear}
            onChange={(e) => setStatsYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <span className="stat-label">{statsYear}년에 읽은 책</span>
          <strong className="stat-value">{summary.count}권</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">평균 별점</span>
          <strong className="stat-value">
            {summary.averageRating === null ? '-' : `★ ${summary.averageRating.toFixed(1)}`}
          </strong>
        </div>
      </div>

      {summary.count === 0 ? (
        <p className="empty">{statsYear}년에 읽은 책이 없어요.</p>
      ) : (
        <div className="stats-charts">
          <div className="chart-card">
            <h3>월별 읽은 권수</h3>
            <MonthlyChart data={summary.monthly} />
          </div>
          <div className="chart-card">
            <h3>장르 비율</h3>
            <GenreChart data={summary.genres} />
          </div>
        </div>
      )}
    </section>
  )
}

export default StatsDashboard
