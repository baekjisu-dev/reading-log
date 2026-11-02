import type { Book } from '../types/book.ts'

const BOOKS_KEY = 'reading-log/books'

function isBook(value: unknown): value is Book {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    typeof v.author === 'string' &&
    typeof v.readAt === 'string' &&
    typeof v.genre === 'string' &&
    typeof v.rating === 'number' &&
    Number.isInteger(v.rating) &&
    v.rating >= 1 &&
    v.rating <= 5
  )
}

export function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(BOOKS_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isBook) : []
  } catch {
    return []
  }
}

export function saveBooks(books: Book[]): void {
  try {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
  } catch {
    // 저장 공간 부족·비활성화 등은 무시하고 메모리 상태만 유지
  }
}
