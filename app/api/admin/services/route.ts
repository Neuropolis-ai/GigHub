import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin, createAuthErrorResponse, getClientIP, logAuthFailure } from '@/lib/auth'
import { validateData, createValidationErrorResponse, bulkOperationSchema, aiServiceSearchSchema } from '@/lib/validations'

// Инициализация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Rate limiting для админских операций
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
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

// GET /api/admin/services - Получение всех сервисов для модерации (включая неактивные)
export async function GET(request: NextRequest) {
  try {
    // Rate limiting для админских операций
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

    // Валидация query параметров
    const { searchParams } = new URL(request.url)
    const queryObject = Object.fromEntries(searchParams.entries())
    const queryValidation = aiServiceSearchSchema.safeParse(queryObject)
    
    if (!queryValidation.success) {
      const errors = queryValidation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return createValidationErrorResponse(errors)
    }

    const { q, category, status, sort, order, page, limit } = queryValidation.data

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Построение запроса (админы видят все статусы)
    let query = supabase
      .from('ai_services')
      .select('*', { count: 'exact' })

    // Фильтрация по статусу (если указан)
    if (status) {
      query = query.eq('status', status)
    }

    // Поиск по тексту
    if (q) {
      query = query.or(`title.ilike.%${q}%,short_description_ru.ilike.%${q}%`)
    }

    // Фильтрация по категории
    if (category) {
      query = query.eq('ai_category', category)
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

// POST /api/admin/services - Массовые операции с сервисами (только для админов)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting для bulk операций (более строгий)
    const ip = getClientIP(request)
    if (!checkRateLimit(ip, 5, 60000)) {
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
    const validation = validateData(bulkOperationSchema, body)
    
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors!)
    }

    const { ids, action } = validation.data!

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    let result
    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    // Выполнение массовой операции
    switch (action) {
      case 'delete':
        const { error: deleteError } = await supabase
          .from('ai_services')
          .delete()
          .in('id', ids)
        
        if (deleteError) {
          console.error('Bulk delete error:', deleteError)
          errors.push(`Delete error: ${deleteError.message}`)
          errorCount = ids.length
        } else {
          successCount = ids.length
        }
        break

      case 'activate':
        const { error: activateError } = await supabase
          .from('ai_services')
          .update({ status: 'active', updated_at: new Date().toISOString() })
          .in('id', ids)
        
        if (activateError) {
          console.error('Bulk activate error:', activateError)
          errors.push(`Activate error: ${activateError.message}`)
          errorCount = ids.length
        } else {
          successCount = ids.length
        }
        break

      case 'deactivate':
        const { error: deactivateError } = await supabase
          .from('ai_services')
          .update({ status: 'inactive', updated_at: new Date().toISOString() })
          .in('id', ids)
        
        if (deactivateError) {
          console.error('Bulk deactivate error:', deactivateError)
          errors.push(`Deactivate error: ${deactivateError.message}`)
          errorCount = ids.length
        } else {
          successCount = ids.length
        }
        break

      default:
        return createValidationErrorResponse(['action: Недопустимое действие'])
    }

    return NextResponse.json({
      message: `Bulk ${action} operation completed`,
      action,
      total_items: ids.length,
      success_count: successCount,
      error_count: errorCount,
      errors: errors.length > 0 ? errors : undefined,
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

// PUT /api/admin/services - Одобрение/отклонение сервиса в статусе pending
export async function PUT(request: NextRequest) {
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

    // Валидация данных
    const body = await request.json()
    const { id, action, reason } = body

    if (!id || typeof id !== 'number') {
      return createValidationErrorResponse(['id: ID сервиса обязателен и должен быть числом'])
    }

    if (!action || !['approve', 'reject'].includes(action)) {
      return createValidationErrorResponse(['action: Действие должно быть approve или reject'])
    }

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Проверка существования сервиса
    const { data: existingService } = await supabase
      .from('ai_services')
      .select('id, status')
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

    // Обновление статуса
    const newStatus = action === 'approve' ? 'active' : 'inactive'
    const { data, error } = await supabase
      .from('ai_services')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to update service status',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: `Service ${action}d successfully`,
      data,
      action,
      reason: reason || undefined,
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