import { useBookStore } from '../stores/bookStore.ts'
import { createSampleBooks } from '../lib/sampleBooks.ts'

/** 개발 모드에서만 보이는 샘플 12권 추가 버튼 */
function DevSampleButton() {
  const addBooks = useBookStore((s) => s.addBooks)

  if (!import.meta.env.DEV) return null

  return (
    <button
      type="button"
      className="dev-button"
      onClick={() => addBooks(createSampleBooks(new Date().getFullYear()))}
    >
      샘플 데이터 12권 넣기 (dev)
    </button>
  )
}

export default DevSampleButton
