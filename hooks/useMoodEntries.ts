import { useEffect, useState } from 'react';
import { supabase, MoodEntry, MoodType } from '@/lib/supabase';
import { useAuth } from './useAuth';

export type MoodEntryWithType = MoodEntry & {
  mood_types: MoodType | null;
};

export function useMoodEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MoodEntryWithType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    fetchMoodEntries();
  }, [user]);

  const fetchMoodEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mood_entries')
        .select(`
          *,
          mood_types (*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createMoodEntry = async (
    moodTypeId: number,
    journal?: string,
    visibilityId?: number,
    realTalkMode: boolean = false
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood_type_id: moodTypeId,
          journal,
          visibility_id: visibilityId,
          realtalk_mode: realTalkMode,
        })
        .select(`
          *,
          mood_types (*)
        `)
        .single();

      if (error) throw error;
      
      // Add to local state
      setEntries(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to create mood entry';
      return { data: null, error };
    }
  };

  const updateMoodEntry = async (id: string, updates: Partial<MoodEntry>) => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select(`
          *,
          mood_types (*)
        `)
        .single();

      if (error) throw error;

      // Update local state
      setEntries(prev => 
        prev.map(entry => entry.id === id ? data : entry)
      );
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to update mood entry';
      return { data: null, error };
    }
  };

  const deleteMoodEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('mood_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Remove from local state
      setEntries(prev => prev.filter(entry => entry.id !== id));
      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to delete mood entry';
      return { error };
    }
  };

  return {
    entries,
    loading,
    error,
    createMoodEntry,
    updateMoodEntry,
    deleteMoodEntry,
    refetch: fetchMoodEntries,
  };
}