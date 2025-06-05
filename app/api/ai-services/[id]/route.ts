import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const identifier = params.id
    let service = null
    let error = null

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
        { error: 'Сервис не найден' },
        { status: 404 }
      )
    }

    if (error) {
      console.error('Ошибка при получении сервиса:', error)
      return NextResponse.json(
        { error: 'Не удалось загрузить информацию о сервисе' },
        { status: 500 }
      )
    }

    return NextResponse.json(service)

  } catch (error) {
    console.error('Ошибка API:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 