export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      badges: {
        Row: {
          id: number
          name: string | null
          description: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          description?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          description?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          id: string
          entry_id: string | null
          commenter_id: string | null
          content: string
          created_at: string | null
        }
        Insert: {
          id?: string
          entry_id?: string | null
          commenter_id?: string | null
          content: string
          created_at?: string | null
        }
        Update: {
          id?: string
          entry_id?: string | null
          commenter_id?: string | null
          content?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_commenter_id_fkey"
            columns: ["commenter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "mood_entries"
            referencedColumns: ["id"]
          }
        ]
      }
      friends: {
        Row: {
          user_id: string
          friend_id: string
          status: string | null
        }
        Insert: {
          user_id: string
          friend_id: string
          status?: string | null
        }
        Update: {
          user_id?: string
          friend_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friends_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      mood_entries: {
        Row: {
          id: string
          user_id: string | null
          mood_type_id: number | null
          realtalk_mode: boolean | null
          journal: string | null
          visibility_id: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          mood_type_id?: number | null
          realtalk_mode?: boolean | null
          journal?: string | null
          visibility_id?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          mood_type_id?: number | null
          realtalk_mode?: boolean | null
          journal?: string | null
          visibility_id?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mood_entries_mood_type_id_fkey"
            columns: ["mood_type_id"]
            isOneToOne: false
            referencedRelation: "mood_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mood_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mood_entries_visibility_id_fkey"
            columns: ["visibility_id"]
            isOneToOne: false
            referencedRelation: "visibility_levels"
            referencedColumns: ["id"]
          }
        ]
      }
      mood_types: {
        Row: {
          id: number
          name: string
          emoji: string
        }
        Insert: {
          id?: number
          name: string
          emoji: string
        }
        Update: {
          id?: number
          name?: string
          emoji?: string
        }
        Relationships: []
      }
      reactions: {
        Row: {
          id: string
          entry_id: string | null
          reactor_id: string | null
          reaction_type: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          entry_id?: string | null
          reactor_id?: string | null
          reaction_type?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          entry_id?: string | null
          reactor_id?: string | null
          reaction_type?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reactions_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "mood_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_reactor_id_fkey"
            columns: ["reactor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_badges: {
        Row: {
          user_id: string
          badge_id: number
          awarded_at: string | null
        }
        Insert: {
          user_id: string
          badge_id: number
          awarded_at?: string | null
        }
        Update: {
          user_id?: string
          badge_id?: number
          awarded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          username: string
          email: string
          password_hash: string
          created_at: string | null
        }
        Insert: {
          id?: string
          username: string
          email: string
          password_hash: string
          created_at?: string | null
        }
        Update: {
          id?: string
          username?: string
          email?: string
          password_hash?: string
          created_at?: string | null
        }
        Relationships: []
      }
      visibility_levels: {
        Row: {
          id: number
          level_name: string
        }
        Insert: {
          id?: number
          level_name: string
        }
        Update: {
          id?: number
          level_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}