export type AppTab = 'list' | 'stats'

type AppTabsProps = {
  value: AppTab
  onChange: (tab: AppTab) => void
}

const TABS: { id: AppTab; label: string }[] = [
  { id: 'list', label: '기록' },
  { id: 'stats', label: '통계' },
]

function AppTabs({ value, onChange }: AppTabsProps) {
  return (
    <div className="app-tabs" role="tablist" aria-label="화면 선택">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={value === tab.id}
          aria-controls="tab-panel"
          className="app-tab"
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default AppTabs
