import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      
      {/* --- NAVBAR START --- */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-emerald-400">
              TERRABYTE // BIO-MASS
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Dashboard</span>
            
            {/* Direct Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-800 transition-all hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              {darkMode ? "☀️ LIGHT MODE" : "🌙 DARK MODE"}
            </button>
          </div>
        </div>
      </nav>
      {/* --- NAVBAR END --- */}
      
      {/* --- MAIN BODY START --- */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Monitoring live bio-mass performance parameters and metrics.
          </p>
        </header>

        {/* Inline Card Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Energy Output</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">1,248.5 kWh</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Conversion Efficiency</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">94.2%</p>
          </div>
        </div>
      </main>
      {/* --- MAIN BODY END --- */}

    </div>
  );
}

export default App;