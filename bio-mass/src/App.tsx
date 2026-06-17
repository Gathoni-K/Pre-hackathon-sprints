import { useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import BatchList from './components/BatchList';
import AssetMap from './components/AssetMap';

interface LocationMarker {
  id: number;
  name: string;
  position: [number, number];
  description: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Card title="Total Energy Output" value="1,248.5 kWh" change="+3.2%" isPositive={true} />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Monitoring live bio-mass performance parameters and metrics.
          </p>
        </header>

        <BatchList />
        <AssetMap />
      </main>
    </div>
  );
}

export default App;