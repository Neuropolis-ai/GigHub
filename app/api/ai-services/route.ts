import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    let query = supabase
      .from('ai_services')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)

    // Фильтрация по категории
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    // Поиск по названию и описанию
    if (search) {
      query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%`)
    }

    // Только активные сервисы
    query = query.eq('status', 'active')

    // Пагинация
    query = query
      .order('name')
      .range(offset, offset + limit - 1)

    const { data: services, error, count } = await query

    if (error) {
      console.error('Ошибка при получении ИИ-сервисов:', error)
      return NextResponse.json(
        { error: 'Не удалось получить ИИ-сервисы' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: services,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('Непредвиденная ошибка:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' }, 
      { status: 500 }
    )
  }
} 