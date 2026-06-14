interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <button
  onClick={toggleDarkMode}
  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
>
  {darkMode ? "Switch to Light" : "Switch to Dark"}
</button>
  );
}