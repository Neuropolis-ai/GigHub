import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAuth, requireModerator, createAuthErrorResponse, getClientIP, logAuthFailure } from '@/lib/auth'
import { validateData, createValidationErrorResponse, aiServiceSchema, aiServiceUpdateSchema, aiServiceSearchSchema } from '@/lib/validations'

// Инициализация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Rate limiting - простая реализация в памяти (в продакшне использовать Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userLimit.count >= limit) {
    return false
  }

  userLimit.count++
  return true
}

// GET /api/ai-services - Получение списка AI сервисов
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request)
    if (!checkRateLimit(ip, 100, 60000)) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED',
          timestamp: new Date().toISOString()
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      )
    }

    // Валидация query параметров
    const { searchParams } = new URL(request.url)
    const queryObject = Object.fromEntries(searchParams.entries())
    const queryValidation = aiServiceSearchSchema.safeParse(queryObject)
    
    if (!queryValidation.success) {
      const errors = queryValidation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return createValidationErrorResponse(errors)
    }

    const queryData = queryValidation.data
    const { q, category, status, sort, order, page, limit } = queryData

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Построение запроса
    let query = supabase
      .from('ai_services')
      .select('*', { count: 'exact' })

    // Фильтрация по статусу (публичные данные - только active)
    if (status) {
      query = query.eq('status', status)
    } else {
      query = query.eq('status', 'active')
    }

    // Поиск по тексту
    if (q) {
      query = query.or(`title.ilike.%${q}%,short_description_ru.ilike.%${q}%`)
    }

    // Фильтрация по категории
    if (category) {
      // Сначала пытаемся найти категорию по slug
      const { data: categoryData } = await supabase
        .from('categories')
        .select('name')
        .eq('slug', category)
        .single()
      
      if (categoryData) {
        // Если нашли категорию по slug, используем её название
        query = query.eq('ai_category', categoryData.name)
      } else {
        // Если не нашли по slug, используем значение как есть (возможно это название категории)
        query = query.eq('ai_category', category)
      }
    }

    // Сортировка
    query = query.order(sort, { ascending: order === 'asc' })

    // Пагинация
    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Database error',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
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

// POST /api/ai-services - Создание нового AI сервиса (требует аутентификации)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting для POST запросов (более строгий)
    const ip = getClientIP(request)
    if (!checkRateLimit(ip, 10, 60000)) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED',
          timestamp: new Date().toISOString()
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      )
    }

    // Проверка аутентификации
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      logAuthFailure(request, authResult.error!, request.headers.get('user-agent') || undefined)
      return createAuthErrorResponse(authResult.error!)
    }

    // Валидация данных
    const body = await request.json()
    const validation = validateData(aiServiceSchema, body)
    
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors!)
    }

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Проверка уникальности slug
    const { data: existingService } = await supabase
      .from('ai_services')
      .select('id')
      .eq('slug', validation.data!.slug)
      .single()

    if (existingService) {
      return createValidationErrorResponse(['slug: Такой slug уже существует'])
    }

    // Вставка данных
    const { data, error } = await supabase
      .from('ai_services')
      .insert([{
        ...validation.data!,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to create service',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      message: 'AI service created successfully',
      timestamp: new Date().toISOString()
    }, { status: 201 })

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

// PUT /api/ai-services - Обновление AI сервиса (требует модераторских прав)
export async function PUT(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request)
    if (!checkRateLimit(ip, 20, 60000)) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED',
          timestamp: new Date().toISOString()
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      )
    }

    // Проверка модераторских прав
    const authResult = await requireModerator(request)
    if (!authResult.success) {
      logAuthFailure(request, authResult.error!, request.headers.get('user-agent') || undefined)
      return createAuthErrorResponse(authResult.error!, 403)
    }

    // Валидация данных
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id || typeof id !== 'number') {
      return createValidationErrorResponse(['id: ID сервиса обязателен и должен быть числом'])
    }

    const validation = validateData(aiServiceUpdateSchema, updateData)
    
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors!)
    }

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Проверка существования сервиса
    const { data: existingService } = await supabase
      .from('ai_services')
      .select('id')
      .eq('id', id)
      .single()

    if (!existingService) {
      return NextResponse.json(
        { 
          error: 'Service not found',
          code: 'NOT_FOUND',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      )
    }

    // Обновление данных
    const { data, error } = await supabase
      .from('ai_services')
      .update({
        ...validation.data!,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to update service',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      message: 'AI service updated successfully',
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