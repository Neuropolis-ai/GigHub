import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const search = searchParams.get('search') || ''
    const categoryId = searchParams.get('category_id')
    const sortBy = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'

    const offset = (page - 1) * limit

    // Строим запрос с JOIN для категорий
    let query = supabase
      .from('ai_services')
      .select(`
        *,
        categories!inner(*)
      `, { count: 'exact' })

    // Добавляем поиск по названию и описанию
    if (search) {
      query = query.or(`
        title.ilike.%${search}%,
        short_description_ru.ilike.%${search}%,
        full_description_ru.ilike.%${search}%,
        ai_category.ilike.%${search}%
      `)
    }

    // Фильтрация по категории
    if (categoryId) {
      query = query.eq('category_id', parseInt(categoryId))
    }

    // Только активные сервисы
    query = query.eq('status', 'active')

    // Сортировка
    if (sortBy === 'rating') {
      query = query.order('rating', { ascending: order === 'asc' })
    } else if (sortBy === 'bookmarks') {
      query = query.order('bookmarks_count', { ascending: order === 'asc' })
    } else if (sortBy === 'title') {
      query = query.order('title', { ascending: order === 'asc' })
    } else {
      query = query.order('created_at', { ascending: order === 'asc' })
    }

    // Применяем пагинацию
    query = query.range(offset, offset + limit - 1)

    const { data: services, error, count } = await query

    if (error) {
      console.error('Ошибка при получении ИИ-сервисов:', error)
      return NextResponse.json(
        { error: 'Не удалось загрузить ИИ-сервисы' },
        { status: 500 }
      )
    }

    const totalPages = Math.ceil((count || 0) / limit)

    return NextResponse.json({
      data: services || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    })

  } catch (error) {
    console.error('Ошибка API:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 