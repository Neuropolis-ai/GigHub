import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Валидация и конвертация ID
    const serviceId = Number(id)
    if (!id || isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Неверный ID сервиса' },
        { status: 400 }
      )
    }

    const { data: service, error } = await supabase
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
      .single()

    if (error) {
      console.error('Ошибка при получении ИИ-сервиса:', error)
      return NextResponse.json(
        { error: 'Сервис не найден' },
        { status: 404 }
      )
    }

    if (!service) {
      return NextResponse.json(
        { error: 'Сервис не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error('Непредвиденная ошибка:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 