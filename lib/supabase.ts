import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Specific table types
export type MoodEntry = Tables<'mood_entries'>;
export type MoodType = Tables<'mood_types'>;
export type User = Tables<'users'>;
export type VisibilityLevel = Tables<'visibility_levels'>;
export type Badge = Tables<'badges'>;
export type UserBadge = Tables<'user_badges'>;
export type Friend = Tables<'friends'>;
export type Reaction = Tables<'reactions'>;
export type Comment = Tables<'comments'>;