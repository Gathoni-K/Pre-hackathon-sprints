import { useBatchData } from '../hooks/useBatchData';
import { useState, useEffect } from 'react';

export default function BatchList() {
  const { data, loading, error, refetch } = useBatchData();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (!loading) setLastUpdated(new Date());
  }, [data, loading]);

  if (loading) return (
    <div className="w-full p-8 flex items-center justify-center">
      <span className="text-slate-400 animate-pulse">Loading batch data...</span>
    </div>
  );

  if (error) return (
    <div className="w-full p-8 flex items-center justify-between rounded-xl border border-red-800 bg-red-950">
      <span className="text-red-400">Error: {error}</span>
      <button
        onClick={refetch}
        className="text-sm px-3 py-1 rounded-lg bg-red-800 text-red-200 hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Active Batches
          </h2>
          <span className="text-xs text-slate-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
        <button
          onClick={refetch}
          className="text-sm px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-teal-400 hover:border-teal-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map(Batch=> (
          <div
            key={Batch.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-900 dark:text-white">{Batch.name}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                Batch.status === 'Active'      ? 'bg-teal-500/10 text-teal-400' :
                Batch.status === 'Processing'  ? 'bg-yellow-500/10 text-yellow-400' :
                                                 'bg-slate-500/10 text-slate-400'
              }`}>
                {Batch.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
