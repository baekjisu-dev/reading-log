import type { Book } from '../types/book.ts'

export type GenreSlice = { name: string; value: number }

export type YearSummary = {
  count: number
  /** 0권이면 null */
  averageRating: number | null
  /** 길이 12, 인덱스 = 월 - 1 */
  monthly: number[]
  genres: GenreSlice[]
}

export const UNCATEGORIZED_GENRE = '미분류'

/** readAt(YYYY-MM-DD)의 연도 */
export function yearOf(book: Book): number {
  return Number(book.readAt.slice(0, 4))
}

/**
 * 데이터에 있는 연도 + include(올해, 현재 선택 연도 등)를 합쳐 최신순으로.
 * 선택 연도의 책이 모두 삭제돼도 셀렉트 값이 옵션에서 사라지지 않게 한다.
 */
export function collectYears(books: Book[], include: number[]): number[] {
  const years = new Set([...books.map(yearOf), ...include])
  return [...years].sort((a, b) => b - a)
}

export function filterByYear(books: Book[], year: number): Book[] {
  return books.filter((b) => yearOf(b) === year)
}

export function countByMonth(books: Book[]): number[] {
  const counts = Array.from({ length: 12 }, () => 0)
  for (const book of books) {
    const month = Number(book.readAt.slice(5, 7))
    if (month >= 1 && month <= 12) counts[month - 1] += 1
  }
  return counts
}

/** 소수 첫째 자리까지 반올림 */
export function averageRating(books: Book[]): number | null {
  if (books.length === 0) return null
  const sum = books.reduce((acc, b) => acc + b.rating, 0)
  return Math.round((sum / books.length) * 10) / 10
}

/** 장르별 권수, 많은 순. 빈 장르는 '미분류'로 묶는다. */
export function genreRatio(books: Book[]): GenreSlice[] {
  const counts = new Map<string, number>()
  for (const book of books) {
    const name = book.genre || UNCATEGORIZED_GENRE
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }
  return [...counts]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name, 'ko'))
}

export function summarizeYear(books: Book[], year: number): YearSummary {
  const inYear = filterByYear(books, year)
  return {
    count: inYear.length,
    averageRating: averageRating(inYear),
    monthly: countByMonth(inYear),
    genres: genreRatio(inYear),
  }
}
