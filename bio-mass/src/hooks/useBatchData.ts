import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface Batch {
  id: number;
  name: string;
  status: string;
  energy_output: number;
  start_date: string;
  location: string;
}

export function useBatchData() {
  const [data, setData] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatchData = useCallback(async () => {
    try {
      setError(null);
        console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('KEY:', import.meta.env.VITE_SUPABASE_KEY);

      const { data, error } = await supabase
        .from('Batches')
        .select('*');

      if (error) throw error;
      setData(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatchData();
    const interval = setInterval(fetchBatchData, 10000);
    return () => clearInterval(interval);
  }, [fetchBatchData]);

  return { data, loading, error, refetch: fetchBatchData };
}