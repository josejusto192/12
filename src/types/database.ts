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
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          is_mother: boolean
          children_count: number | null
          children_ages: string[] | null
          main_difficulty: string[] | null
          available_time: number | null
          preferred_time: string | null
          interest_areas: string[] | null
          onboarding_completed: boolean
          subscription_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          is_mother?: boolean
          children_count?: number | null
          children_ages?: string[] | null
          main_difficulty?: string[] | null
          available_time?: number | null
          preferred_time?: string | null
          interest_areas?: string[] | null
          onboarding_completed?: boolean
          subscription_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          is_mother?: boolean
          children_count?: number | null
          children_ages?: string[] | null
          main_difficulty?: string[] | null
          available_time?: number | null
          preferred_time?: string | null
          interest_areas?: string[] | null
          onboarding_completed?: boolean
          subscription_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      practices: {
        Row: {
          id: string
          title: string
          dimension: string
          duration_minutes: number
          description: string
          instructions: Json
          reflection_prompt: string | null
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          dimension: string
          duration_minutes: number
          description: string
          instructions: Json
          reflection_prompt?: string | null
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          dimension?: string
          duration_minutes?: number
          description?: string
          instructions?: Json
          reflection_prompt?: string | null
          order_index?: number | null
          created_at?: string
        }
      }
      completed_practices: {
        Row: {
          id: string
          user_id: string
          practice_id: string
          completed_at: string
          reflection_text: string | null
          date: string
        }
        Insert: {
          id?: string
          user_id: string
          practice_id: string
          completed_at?: string
          reflection_text?: string | null
          date?: string
        }
        Update: {
          id?: string
          user_id?: string
          practice_id?: string
          completed_at?: string
          reflection_text?: string | null
          date?: string
        }
      }
      emotional_checkins: {
        Row: {
          id: string
          user_id: string
          date: string
          time: string
          mood: string
          mood_emoji: string
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          time?: string
          mood: string
          mood_emoji: string
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          time?: string
          mood?: string
          mood_emoji?: string
          note?: string | null
          created_at?: string
        }
      }
      daily_habits: {
        Row: {
          id: string
          user_id: string
          date: string
          water_glasses: number
          good_sleep: boolean | null
          exercised: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          water_glasses?: number
          good_sleep?: boolean | null
          exercised?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          water_glasses?: number
          good_sleep?: boolean | null
          exercised?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      planner_tasks: {
        Row: {
          id: string
          user_id: string
          date: string
          period: string
          description: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          period: string
          description: string
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          period?: string
          description?: string
          completed?: boolean
          created_at?: string
        }
      }
      daily_reflections: {
        Row: {
          id: string
          user_id: string
          date: string
          general_notes: string | null
          gratitude: string | null
          mood_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          general_notes?: string | null
          gratitude?: string | null
          mood_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          general_notes?: string | null
          gratitude?: string | null
          mood_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      motivational_quotes: {
        Row: {
          id: string
          text: string
          author: string | null
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          author?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          author?: string | null
          created_at?: string
        }
      }
      favorite_quotes: {
        Row: {
          id: string
          user_id: string
          quote_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quote_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quote_id?: string
          created_at?: string
        }
      }
      dimension_progress: {
        Row: {
          id: string
          user_id: string
          dimension: string
          percentage: number
          last_practice_date: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          dimension: string
          percentage?: number
          last_practice_date?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          dimension?: string
          percentage?: number
          last_practice_date?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_streak: {
        Args: {
          p_user_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
