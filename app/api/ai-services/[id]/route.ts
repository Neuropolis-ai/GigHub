import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Инициализация Supabase с проверкой переменных окружения
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return createClient(supabaseUrl, supabaseKey)
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const identifier = params.id
    let service = null
    let error = null

    // Создание Supabase клиента
    const supabase = createSupabaseClient()

    // Сначала пробуем найти по slug
    const { data: serviceBySlug, error: slugError } = await supabase
      .from('ai_services')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          description
        )
      `)
      .eq('slug', identifier)
      .eq('status', 'active')
      .maybeSingle()

    if (serviceBySlug) {
      service = serviceBySlug
    } else {
      // Если не найдено по slug и identifier это число, пробуем найти по ID
      const serviceId = parseInt(identifier)
      if (!isNaN(serviceId)) {
        const { data: serviceById, error: idError } = await supabase
          .from('ai_services')
          .select(`
            *,
            categories (
              id,
              name,
              slug,
              description
            )
          `)
          .eq('id', serviceId)
          .eq('status', 'active')
          .maybeSingle()

        if (serviceById) {
          service = serviceById
        } else {
          error = idError
        }
      } else {
        error = slugError
      }
    }

    if (!service) {
      return NextResponse.json(
        { 
          error: 'Service not found',
          code: 'NOT_FOUND',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      )
    }

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to load service information',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: service,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 