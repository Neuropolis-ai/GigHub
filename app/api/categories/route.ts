import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAuth, requireAdmin, createAuthErrorResponse, getClientIP, logAuthFailure } from '@/lib/auth'
import { validateData, validateQuery, createValidationErrorResponse, categorySchema, categoryUpdateSchema, categorySearchSchema } from '@/lib/validations'

// Инициализация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Rate limiting - простая реализация в памяти (в продакшне использовать Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, limit: number = 200, windowMs: number = 60000): boolean {
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

// GET /api/categories - Получение списка категорий (публично доступно)
export async function GET(request: NextRequest) {
  try {
    // Rate limiting для GET запросов
    const ip = getClientIP(request)
    if (!checkRateLimit(ip, 200, 60000)) {
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
    const queryValidation = categorySearchSchema.safeParse(queryObject)
    
    if (!queryValidation.success) {
      const errors = queryValidation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return createValidationErrorResponse(errors)
    }

    const queryData = queryValidation.data
    const { q, sort, order, page, limit } = queryData

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Построение запроса
    let query = supabase
      .from('categories')
      .select('*', { count: 'exact' })

    // Поиск по тексту
    if (q) {
      query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`)
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

// POST /api/categories - Создание новой категории (только для админов)
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

    // Проверка админских прав
    const authResult = await requireAdmin(request)
    if (!authResult.success) {
      logAuthFailure(request, authResult.error!, request.headers.get('user-agent') || undefined)
      return createAuthErrorResponse(authResult.error!, 403)
    }

    // Валидация данных
    const body = await request.json()
    const validation = validateData(categorySchema, body)
    
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors!)
    }

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Проверка уникальности slug
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', validation.data!.slug)
      .single()

    if (existingCategory) {
      return createValidationErrorResponse(['slug: Такой slug уже существует'])
    }

    // Вставка данных
    const { data, error } = await supabase
      .from('categories')
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
          error: 'Failed to create category',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      message: 'Category created successfully',
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

// PUT /api/categories - Обновление категории (только для админов)
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

    // Проверка админских прав
    const authResult = await requireAdmin(request)
    if (!authResult.success) {
      logAuthFailure(request, authResult.error!, request.headers.get('user-agent') || undefined)
      return createAuthErrorResponse(authResult.error!, 403)
    }

    // Валидация данных
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id || typeof id !== 'number') {
      return createValidationErrorResponse(['id: ID категории обязателен и должен быть числом'])
    }

    const validation = validateData(categoryUpdateSchema, updateData)
    
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors!)
    }

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Проверка существования категории
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('id', id)
      .single()

    if (!existingCategory) {
      return NextResponse.json(
        { 
          error: 'Category not found',
          code: 'NOT_FOUND',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      )
    }

    // Обновление данных
    const { data, error } = await supabase
      .from('categories')
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
          error: 'Failed to update category',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      message: 'Category updated successfully',
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

// DELETE /api/categories - Удаление категории (только для админов)
export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting
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

    // Проверка админских прав
    const authResult = await requireAdmin(request)
    if (!authResult.success) {
      logAuthFailure(request, authResult.error!, request.headers.get('user-agent') || undefined)
      return createAuthErrorResponse(authResult.error!, 403)
    }

    // Получение ID из query параметров
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id || isNaN(Number(id))) {
      return createValidationErrorResponse(['id: ID категории обязателен и должен быть числом'])
    }

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Проверка существования категории
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('id', Number(id))
      .single()

    if (!existingCategory) {
      return NextResponse.json(
        { 
          error: 'Category not found',
          code: 'NOT_FOUND',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      )
    }

    // Проверка, используется ли категория в ai_services
    const { data: usageCheck } = await supabase
      .from('ai_services')
      .select('id')
      .eq('category_id', Number(id))
      .limit(1)

    if (usageCheck && usageCheck.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete category: it is used by AI services',
          code: 'CATEGORY_IN_USE',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      )
    }

    // Удаление категории
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', Number(id))

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to delete category',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Category deleted successfully',
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