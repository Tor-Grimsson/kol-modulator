import { useState } from 'react';
import Styleguide from './pages/Styleguide';
import FrequencyModulator from './components/modulator/FrequencyModulator';

function App() {
  const [view, setView] = useState('modulator');

  if (view === 'styleguide') {
    return (
      <div className="bg-surface-primary min-h-screen">
        <button
          onClick={() => setView('home')}
          className="kol-btn kol-btn-md m-4"
        >
          ← Back
        </button>
        <Styleguide />
      </div>
    );
  }

  if (view === 'modulator') {
    return (
      <div className="bg-surface-primary h-screen">
        <FrequencyModulator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-auto mb-8">
        Hello KOL System!
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => setView('styleguide')}
          className="kol-btn kol-btn-primary kol-btn-md"
        >
          Open Styleguide
        </button>
        <button
          onClick={() => setView('modulator')}
          className="kol-btn kol-btn-primary kol-btn-md"
        >
          Frequency Modulator
        </button>
      </div>
    </div>
  );
}

export default App;
