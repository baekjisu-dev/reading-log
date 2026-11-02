import { useMemo } from 'react'
import { ALL_GENRES, useBookStore } from '../stores/bookStore.ts'
import { collectGenres, sortBooks } from '../lib/books.ts'
import type { BookSortKey } from '../lib/books.ts'

function BookList() {
  const books = useBookStore((s) => s.books)
  const removeBook = useBookStore((s) => s.removeBook)
  const genreFilter = useBookStore((s) => s.genreFilter)
  const setGenreFilter = useBookStore((s) => s.setGenreFilter)
  const sortKey = useBookStore((s) => s.sortKey)
  const setSortKey = useBookStore((s) => s.setSortKey)

  const genres = useMemo(() => collectGenres(books), [books])

  const visible = useMemo(() => {
    const filtered =
      genreFilter === ALL_GENRES
        ? books
        : books.filter((b) => b.genre === genreFilter)
    return sortBooks(filtered, sortKey)
  }, [books, genreFilter, sortKey])

  return (
    <section className="book-list">
      <h2>읽은 책 ({books.length})</h2>
      {books.length > 0 && (
        <div className="list-controls">
          <div className="field">
            <label htmlFor="filter-genre">장르</label>
            <select
              id="filter-genre"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value={ALL_GENRES}>전체</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="sort-key">정렬</label>
            <select
              id="sort-key"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as BookSortKey)}
            >
              <option value="latest">최신순</option>
              <option value="rating">별점순</option>
            </select>
          </div>
        </div>
      )}
      {books.length === 0 ? (
        <p className="empty">아직 등록된 책이 없어요.</p>
      ) : visible.length === 0 ? (
        <p className="empty">해당 장르의 책이 없어요.</p>
      ) : (
        <ul>
          {visible.map((book) => (
            <li key={book.id} className="book-item">
              <div className="book-info">
                <strong className="book-title">{book.title}</strong>
                <span className="book-meta">
                  {book.author}
                  {book.genre && ` · ${book.genre}`} · {book.readAt}
                </span>
              </div>
              <span className="book-rating" aria-label={`평점 ${book.rating}점`}>
                {'★'.repeat(book.rating)}
                {'☆'.repeat(5 - book.rating)}
              </span>
              <button
                type="button"
                className="delete-button"
                onClick={() => removeBook(book.id)}
                aria-label={`${book.title} 삭제`}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default BookList
