interface CardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function Card( { title, value, change, isPositive }: CardProps) {
  const changeClass = isPositive ? 'text-emerald-500' : 'text-rose-500';
  const changeSign = isPositive ? '▲' : '▼';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
      <p className={`mt-2 text-sm font-medium ${changeClass}`}>{changeSign} {change}</p>
    </div>
  );
}