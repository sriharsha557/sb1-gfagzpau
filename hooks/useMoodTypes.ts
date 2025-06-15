import { useEffect, useState } from 'react';
import { supabase, MoodType } from '@/lib/supabase';

export function useMoodTypes() {
  const [moodTypes, setMoodTypes] = useState<MoodType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMoodTypes();
  }, []);

  const fetchMoodTypes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mood_types')
        .select('*')
        .order('name');

      if (error) throw error;
      setMoodTypes(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch mood types');
    } finally {
      setLoading(false);
    }
  };

  return {
    moodTypes,
    loading,
    error,
    refetch: fetchMoodTypes,
  };
}