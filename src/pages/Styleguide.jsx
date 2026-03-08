import { useState } from 'react';
import ColorPalette from '../components/styleguide/ColorPalette';
import Typography from '../components/styleguide/Typography';
import Components from '../components/styleguide/Components';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton';

const TABS = [
  { id: 'colors', label: 'Colors', icon: '●' },
  { id: 'typography', label: 'Typography', icon: 'Aa' },
  { id: 'components', label: 'Components', icon: '⊞' },
];

export default function Styleguide() {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="flex min-h-screen bg-surface-primary">
      {/* Collapsed Icon Sidebar */}
      <aside className="w-24 border-r border-fg-08 bg-surface-primary sticky top-0 h-screen flex-shrink-0">
        <nav className="flex flex-col items-center gap-6 py-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-full text-xl transition-colors ${
                activeTab === tab.id
                  ? 'bg-fg-08 text-auto'
                  : 'text-fg-48 hover:bg-fg-04 hover:text-auto'
              }`}
              aria-label={tab.label}
              title={tab.label}
            >
              {tab.icon}
            </button>
          ))}

          {/* Theme Toggle at bottom of sidebar */}
          <div className="mt-auto">
            <ThemeToggleButton />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'colors' && <ColorPalette />}
        {activeTab === 'typography' && <Typography />}
        {activeTab === 'components' && <Components />}
      </main>
    </div>
  );
}
