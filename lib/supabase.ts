import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Типы для удобства
export type Category = Database['public']['Tables']['categories']['Row']
export type AIService = Database['public']['Tables']['ai_services']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type AIServiceInsert = Database['public']['Tables']['ai_services']['Insert'] 