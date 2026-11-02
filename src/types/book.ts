export type Rating = 1 | 2 | 3 | 4 | 5

export type Book = {
  id: string
  title: string
  author: string
  /** YYYY-MM-DD */
  readAt: string
  rating: Rating
  genre: string
}
