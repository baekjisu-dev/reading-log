import { create } from 'zustand'
import type { Book } from '../types/book.ts'
import { loadBooks, saveBooks } from '../lib/storage.ts'
import type { BookSortKey } from '../lib/books.ts'

/** 장르 필터의 '전체' 값 */
export const ALL_GENRES = ''

type BookState = {
  books: Book[]
  genreFilter: string
  sortKey: BookSortKey
  statsYear: number
  addBook: (book: Omit<Book, 'id'>) => void
  addBooks: (books: Omit<Book, 'id'>[]) => void
  removeBook: (id: string) => void
  setGenreFilter: (genre: string) => void
  setSortKey: (key: BookSortKey) => void
  setStatsYear: (year: number) => void
}

export const useBookStore = create<BookState>()((set, get) => ({
  books: loadBooks(),
  genreFilter: ALL_GENRES,
  sortKey: 'latest',
  statsYear: new Date().getFullYear(),
  addBook: (book) => {
    get().addBooks([book])
  },
  addBooks: (newBooks) => {
    const books = [
      ...get().books,
      ...newBooks.map((b) => ({ ...b, id: crypto.randomUUID() })),
    ]
    saveBooks(books)
    set({ books })
  },
  removeBook: (id) => {
    const books = get().books.filter((b) => b.id !== id)
    saveBooks(books)
    // 선택한 장르의 책이 모두 삭제되면 필터를 '전체'로 되돌린다.
    const { genreFilter } = get()
    const genreGone =
      genreFilter !== ALL_GENRES && !books.some((b) => b.genre === genreFilter)
    set(genreGone ? { books, genreFilter: ALL_GENRES } : { books })
  },
  setGenreFilter: (genreFilter) => set({ genreFilter }),
  setSortKey: (sortKey) => set({ sortKey }),
  setStatsYear: (statsYear) => set({ statsYear }),
}))
