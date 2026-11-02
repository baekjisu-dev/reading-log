import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Rating } from '../types/book.ts'
import { useBookStore } from '../stores/bookStore.ts'
import { todayString } from '../lib/books.ts'

type FieldErrors = {
  title?: string
  author?: string
}

const RATINGS: Rating[] = [5, 4, 3, 2, 1]

function BookForm() {
  const addBook = useBookStore((s) => s.addBook)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [readAt, setReadAt] = useState(todayString)
  const [rating, setRating] = useState<Rating>(5)
  const [genre, setGenre] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    const nextErrors: FieldErrors = {}
    if (!trimmedTitle) nextErrors.title = '제목을 입력해 주세요.'
    if (!trimmedAuthor) nextErrors.author = '저자를 입력해 주세요.'
    setErrors(nextErrors)
    if (nextErrors.title || nextErrors.author) return

    addBook({
      title: trimmedTitle,
      author: trimmedAuthor,
      readAt: readAt || todayString(),
      rating,
      genre: genre.trim(),
    })

    setTitle('')
    setAuthor('')
    setReadAt(todayString())
    setRating(5)
    setGenre('')
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>책 등록</h2>

      <div className="field">
        <label htmlFor="book-title">제목</label>
        <input
          id="book-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }))
          }}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'book-title-error' : undefined}
        />
        {errors.title && (
          <p id="book-title-error" className="field-error">
            {errors.title}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="book-author">저자</label>
        <input
          id="book-author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value)
            if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }))
          }}
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? 'book-author-error' : undefined}
        />
        {errors.author && (
          <p id="book-author-error" className="field-error">
            {errors.author}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="book-read-at">읽은 날짜</label>
          <input
            id="book-read-at"
            type="date"
            value={readAt}
            onChange={(e) => setReadAt(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="book-rating">평점</label>
          <select
            id="book-rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value) as Rating)}
          >
            {RATINGS.map((r) => (
              <option key={r} value={r}>
                {'★'.repeat(r)} ({r})
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="book-genre">장르</label>
          <input
            id="book-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="예: 소설"
          />
        </div>
      </div>

      <button type="submit" className="primary-button">
        등록
      </button>
    </form>
  )
}

export default BookForm
