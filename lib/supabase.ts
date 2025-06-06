import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Типы для компонентов
export type AIService = Database['public']['Tables']['ai_services']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type AIServiceInsert = Database['public']['Tables']['ai_services']['Insert']
export type AIServiceUpdate = Database['public']['Tables']['ai_services']['Update']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']

// Тип для сервиса с категорией
export interface AIServiceWithCategory extends AIService {
  categories: Category | null
} 