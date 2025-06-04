import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = parseInt(params.id)

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'Некорректный ID сервиса' },
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
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Сервис не найден' },
          { status: 404 }
        )
      }
      
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