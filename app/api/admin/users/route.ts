import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin, createAuthErrorResponse, getClientIP, logAuthFailure } from '@/lib/auth'
import { validateData, createValidationErrorResponse, changeUserRoleSchema, paginationSchema } from '@/lib/validations'

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

// GET /api/admin/users - Получение списка всех пользователей (только для админов)
export async function GET(request: NextRequest) {
  try {
    // Rate limiting для админских операций
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

    // Валидация пагинации
    const { searchParams } = new URL(request.url)
    const queryObject = Object.fromEntries(searchParams.entries())
    const queryValidation = paginationSchema.safeParse(queryObject)
    
    if (!queryValidation.success) {
      const errors = queryValidation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return createValidationErrorResponse(errors)
    }

    const { page, limit } = queryValidation.data

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Получение всех пользователей через RPC функцию
    const { data: users, error } = await supabase.rpc('get_all_users')

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to fetch users',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    // Пагинация в памяти (для малых объемов данных)
    const total = users?.length || 0
    const offset = (page - 1) * limit
    const paginatedUsers = users?.slice(offset, offset + limit) || []

    return NextResponse.json({
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
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

// PUT /api/admin/users - Изменение роли пользователя (только для админов)
export async function PUT(request: NextRequest) {
  try {
    // Rate limiting
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
    const validation = validateData(changeUserRoleSchema, body)
    
    if (!validation.success) {
      return createValidationErrorResponse(validation.errors!)
    }

    const { user_id, role } = validation.data!

    // Создание Supabase клиента
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Изменение роли через RPC функцию
    const { data: success, error } = await supabase.rpc('change_user_role', {
      user_id,
      new_role: role
    })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to change user role',
          code: 'DATABASE_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    if (!success) {
      return NextResponse.json(
        { 
          error: 'User not found or insufficient permissions',
          code: 'USER_NOT_FOUND',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'User role changed successfully',
      user_id,
      new_role: role,
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