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

    // Создаем базовый запрос для данных
    let dataQuery = supabase
      .from('ai_services')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)

    // Создаем запрос для подсчета
    let countQuery = supabase
      .from('ai_services')
      .select('*', { count: 'exact', head: true })

    // Применяем фильтры к обоим запросам
    if (categoryId) {
      const categoryIdNum = parseInt(categoryId)
      dataQuery = dataQuery.eq('category_id', categoryIdNum)
      countQuery = countQuery.eq('category_id', categoryIdNum)
    }

    if (search) {
      dataQuery = dataQuery.or(`name.ilike.%${search}%,short_description.ilike.%${search}%`)
      countQuery = countQuery.or(`name.ilike.%${search}%,short_description.ilike.%${search}%`)
    }

    // Только активные сервисы
    dataQuery = dataQuery.eq('status', 'active')
    countQuery = countQuery.eq('status', 'active')

    // Применяем пагинацию и сортировку к запросу данных
    dataQuery = dataQuery
      .order('name')
      .range(offset, offset + limit - 1)

    // Выполняем оба запроса параллельно
    const [dataResult, countResult] = await Promise.all([
      dataQuery,
      countQuery
    ])

    if (dataResult.error) {
      console.error('Ошибка при получении ИИ-сервисов:', dataResult.error)
      return NextResponse.json(
        { error: 'Не удалось получить ИИ-сервисы' }, 
        { status: 500 }
      )
    }

    if (countResult.error) {
      console.error('Ошибка при подсчете ИИ-сервисов:', countResult.error)
      return NextResponse.json(
        { error: 'Не удалось получить количество сервисов' }, 
        { status: 500 }
      )
    }

    const total = countResult.count || 0

    return NextResponse.json({
      data: dataResult.data || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
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