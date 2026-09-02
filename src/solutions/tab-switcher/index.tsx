import { type JSX, useState } from 'react';
import './styles.css';

interface Tab {
  id: string;
  label: string;
  content: string;
}

const tabs: Tab[] = [
  { id: 'home', label: 'Home', content: 'Welcome to the Home tab!' },
  { id: 'profile', label: 'Profile', content: 'This is your Profile.' },
  { id: 'settings', label: 'Settings', content: 'Adjust your Settings here.' },
];

export default function TabSwitcher(): JSX.Element {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id ?? '');

  if (!Array.isArray(tabs) || tabs.length === 0) {
    return (
      <div className="tab-switcher-body-container">
        <h1>Tab Switcher</h1>
        <div className="tab-content" data-testid="tab-content">
          No tabs available
        </div>
      </div>
    );
  }

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="tab-switcher-body-container">
      <h1>Tab Switcher</h1>

      <div className="tab-buttons" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTabId}
            className={tab.id === activeTabId ? 'active' : ''}
            data-testid={`tab-button-${tab.id}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content" data-testid="tab-content" role="tabpanel">
        {activeTab?.content ?? ''}
      </div>
    </div>
  );
}
