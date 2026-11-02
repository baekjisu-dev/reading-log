import { useState } from 'react'
import BookForm from './components/BookForm.tsx'
import BookList from './components/BookList.tsx'
import AppTabs from './components/AppTabs.tsx'
import type { AppTab } from './components/AppTabs.tsx'
import StatsDashboard from './components/StatsDashboard.tsx'
import DevSampleButton from './components/DevSampleButton.tsx'

function App() {
  const [tab, setTab] = useState<AppTab>('list')

  return (
    <main className="app">
      <h1>나의 독서 기록</h1>
      <DevSampleButton />
      <AppTabs value={tab} onChange={setTab} />
      <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="tab-panel">
        {tab === 'list' ? (
          <>
            <BookForm />
            <BookList />
          </>
        ) : (
          <StatsDashboard />
        )}
      </div>
    </main>
  )
}

export default App
