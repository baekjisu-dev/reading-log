import type { Book } from '../types/book.ts'

/** 읽은 날짜 최신순. YYYY-MM-DD는 문자열 비교로 정렬된다. */
export function sortByReadAtDesc(books: Book[]): Book[] {
  return [...books].sort((a, b) => b.readAt.localeCompare(a.readAt))
}

export function todayString(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

export type BookSortKey = 'latest' | 'rating'

/** 별점 높은순. 별점이 같으면 읽은 날짜 최신순. */
export function sortByRatingDesc(books: Book[]): Book[] {
  return [...books].sort(
    (a, b) => b.rating - a.rating || b.readAt.localeCompare(a.readAt),
  )
}

export function sortBooks(books: Book[], key: BookSortKey): Book[] {
  return key === 'rating' ? sortByRatingDesc(books) : sortByReadAtDesc(books)
}

/** 등록된 책들의 장르 목록(빈 값 제외, 중복 제거, 가나다순). */
export function collectGenres(books: Book[]): string[] {
  const genres = new Set(books.map((b) => b.genre).filter((g) => g !== ''))
  return [...genres].sort((a, b) => a.localeCompare(b, 'ko'))
}
