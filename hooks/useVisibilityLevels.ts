import { useEffect, useState } from 'react';
import { supabase, VisibilityLevel } from '@/lib/supabase';

export function useVisibilityLevels() {
  const [visibilityLevels, setVisibilityLevels] = useState<VisibilityLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVisibilityLevels();
  }, []);

  const fetchVisibilityLevels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('visibility_levels')
        .select('*')
        .order('id');

      if (error) throw error;
      setVisibilityLevels(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch visibility levels');
    } finally {
      setLoading(false);
    }
  };

  return {
    visibilityLevels,
    loading,
    error,
    refetch: fetchVisibilityLevels,
  };
}