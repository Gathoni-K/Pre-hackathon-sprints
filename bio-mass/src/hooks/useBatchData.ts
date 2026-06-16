import { useState, useEffect, useCallback } from 'react';

export interface Batch {
  id: number;
  name: string;
  status: 'Active' | 'Processing' | 'Completed';
  energyOutput: number;
  startDate: string;
  location: string;
}

interface UseBatchDataReturn {
  data: Batch[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBatchData(): UseBatchDataReturn {
  const [data, setData] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatchData = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();

      const batches: Batch[] = json.map((item: any) => ({
        id: item.id,
        name: `Batch #${item.id}`,
        status: (['Active', 'Processing', 'Completed'] as const)[item.id % 3],
        energyOutput: parseFloat((Math.random() * 500 + 100).toFixed(1)),
        startDate: '2026-06-01',
        location: ['Dunga', 'Usenge', 'Kendu Bay'][item.id % 3],
      }));

      setData(batches);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatchData(); 

    const interval = setInterval(() => {
      fetchBatchData(); 
    }, 10000);

    return () => clearInterval(interval); 
  }, [fetchBatchData]);

  return { data, loading, error, refetch: fetchBatchData };
}