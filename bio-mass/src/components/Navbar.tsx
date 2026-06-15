interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  return (
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
  )}