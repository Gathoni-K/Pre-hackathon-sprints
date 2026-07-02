import { useBatchData } from '../hooks/useBatchData';
import { useEffect, useRef } from 'react';

interface SidebarProps {
  selectedBatchId: number | null;
  onCardClick: (id: number) => void;
}

export default function Sidebar({ selectedBatchId, onCardClick }: SidebarProps) {
  const { data: batches, loading, error, refetch } = useBatchData();
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  
  useEffect(() => {
    if (selectedBatchId !== null) {
      cardRefs.current[selectedBatchId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedBatchId]);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-full overflow-y-auto">
      <div className="p-5 sticky top-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-10 flex items-center justify-between">
        <h2 className="font-bold text-slate-900 dark:text-slate-100">Batches</h2>
        <button
          onClick={refetch}
          className="text-xs px-2 py-1 rounded-lg border border-slate-700 text-slate-400 hover:text-teal-400 hover:border-teal-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="p-4 space-y-3">
        {loading && <p className="text-sm text-slate-400 animate-pulse">Loading batches...</p>}
        {error && <p className="text-sm text-red-400">Error: {error}</p>}

        {!loading && !error && batches.map(batch => {
          const isSelected = batch.id === selectedBatchId;

          return (
            <div
              key={batch.id}
              ref={el => { cardRefs.current[batch.id] = el; }}
              onClick={() => onCardClick(batch.id)}   // ← task 3: clicking card
              className={`rounded-xl border p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/40'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 hover:border-teal-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                  {batch.name}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  batch.status === 'Active'      ? 'bg-teal-500/10 text-teal-400' :
                  batch.status === 'Processing'  ? 'bg-yellow-500/10 text-yellow-400' :
                                                   'bg-slate-500/10 text-slate-400'
                }`}>
                  {batch.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">📍 {batch.location}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">⚡ {batch.energy_output} kWh</p>
            </div>
          );
        })}

        {!loading && !error && batches.length === 0 && (
          <p className="text-sm text-slate-500">No batches found.</p>
        )}
      </div>
    </aside>
  );
}