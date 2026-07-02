import { useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import BatchList from './components/BatchList';
import AssetMap from './components/AssetMap';
import SideBar from './components/SideBar';
import ImpactTracker from './components/ImpactTracker';
import { useBatchData } from './hooks/useBatchData';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const { data: batches } = useBatchData();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Card title="Total Energy Output" value="1,248.5 kWh" change="+3.2%" isPositive={true} />
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        <main className="mx-auto max-w-7xl px-6 py-12">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Monitoring live bio-mass performance parameters and metrics.
            </p>
          </header>
          <AssetMap
            selectedBatchId={selectedBatchId}
            onPinClick={setSelectedBatchId}
          />
          <div className="mt-8">
            <ImpactTracker batches={batches} />
          </div>
          <BatchList />
        </main>
        <SideBar
          selectedBatchId={selectedBatchId}
          onCardClick={setSelectedBatchId}
        />
      </div>
    </div>
  );
}

export default App;