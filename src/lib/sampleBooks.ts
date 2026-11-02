import type { Book, Rating } from '../types/book.ts'

type SampleRow = [title: string, author: string, monthDay: string, rating: Rating, genre: string]

// 올해 8권(3월 2권 포함), 작년 4권, 장르 4종 + 미분류 1권. 총 12권.
const THIS_YEAR: SampleRow[] = [
  ['채식주의자', '한강', '01-14', 5, '소설'],
  ['코스모스', '칼 세이건', '02-03', 4, '과학'],
  ['사피엔스', '유발 하라리', '03-09', 4, '인문'],
  ['아몬드', '손원평', '03-27', 4, '소설'],
  ['클린 코드', '로버트 C. 마틴', '05-18', 3, 'IT'],
  ['이기적 유전자', '리처드 도킨스', '07-02', 5, '과학'],
  ['불편한 편의점', '김호연', '08-21', 3, '소설'],
  ['메모 습관의 힘', '신정철', '10-05', 2, ''],
]

const LAST_YEAR: SampleRow[] = [
  ['총, 균, 쇠', '재레드 다이아몬드', '02-11', 4, '인문'],
  ['리팩터링', '마틴 파울러', '06-30', 4, 'IT'],
  ['데미안', '헤르만 헤세', '09-15', 5, '소설'],
  ['정의란 무엇인가', '마이클 샌델', '12-01', 3, '인문'],
]

function toBooks(rows: SampleRow[], year: number): Omit<Book, 'id'>[] {
  return rows.map(([title, author, monthDay, rating, genre]) => ({
    title,
    author,
    readAt: `${year}-${monthDay}`,
    rating,
    genre,
  }))
}

/** 개발용 샘플 12권. 날짜는 올해·작년 기준으로 만든다. */
export function createSampleBooks(currentYear: number): Omit<Book, 'id'>[] {
  return [...toBooks(THIS_YEAR, currentYear), ...toBooks(LAST_YEAR, currentYear - 1)]
}
