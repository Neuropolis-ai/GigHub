import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

// Инициализация Supabase клиента
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Типы для аутентификации
export type UserRole = 'user' | 'admin' | 'moderator'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  full_name?: string
}

export interface AuthResult {
  success: boolean
  user?: AuthUser
  error?: string
}

// Проверка JWT токена
export async function verifyJWT(request: NextRequest): Promise<AuthResult> {
  try {
    // Получаем токен из заголовка Authorization
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        error: 'Missing or invalid authorization header'
      }
    }

    const token = authHeader.replace('Bearer ', '')

    // Создаем Supabase клиент с токеном пользователя
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    // Устанавливаем сессию с токеном
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return {
        success: false,
        error: 'Invalid or expired token'
      }
    }

    // Получаем профиль пользователя с ролью
    // Используем any для таблицы profiles до её создания в базе
    const { data: profile, error: profileError } = await supabase
      .from('profiles' as any)
      .select('role, full_name')
      .eq('id', user.id)
      .single()

    if (profileError) {
      // Если таблица profiles не существует, возвращаем базового пользователя
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email!,
          role: 'user' // По умолчанию user роль
        }
      }
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email!,
        role: profile.role as UserRole,
        full_name: profile.full_name || undefined
      }
    }

  } catch (error) {
    console.error('JWT verification error:', error)
    return {
      success: false,
      error: 'Authentication service error'
    }
  }
}

// Функция требования аутентификации
export async function requireAuth(request: NextRequest): Promise<AuthResult> {
  const authResult = await verifyJWT(request)
  
  if (!authResult.success) {
    return {
      success: false,
      error: authResult.error || 'Authentication required'
    }
  }

  return authResult
}

// Функция требования админских прав
export async function requireAdmin(request: NextRequest): Promise<AuthResult> {
  const authResult = await requireAuth(request)
  
  if (!authResult.success) {
    return authResult
  }

  if (authResult.user?.role !== 'admin') {
    return {
      success: false,
      error: 'Admin privileges required'
    }
  }

  return authResult
}

// Функция требования модераторских или админских прав
export async function requireModerator(request: NextRequest): Promise<AuthResult> {
  const authResult = await requireAuth(request)
  
  if (!authResult.success) {
    return authResult
  }

  const role = authResult.user?.role
  if (role !== 'admin' && role !== 'moderator') {
    return {
      success: false,
      error: 'Moderator or admin privileges required'
    }
  }

  return authResult
}

// Проверка API ключа (для внутренних сервисов)
export function verifyAPIKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.INTERNAL_API_KEY
  
  if (!expectedKey) {
    console.error('INTERNAL_API_KEY not configured')
    return false
  }

  return apiKey === expectedKey
}

// Получение IP адреса пользователя для rate limiting
export function getClientIP(request: NextRequest): string {
  // Проверяем заголовки прокси
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = request.headers.get('x-client-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (clientIP) {
    return clientIP
  }
  
  // Fallback для development
  return '127.0.0.1'
}

// Создание ответа с ошибкой аутентификации
export function createAuthErrorResponse(error: string, status: number = 401) {
  return new Response(
    JSON.stringify({ 
      error,
      code: 'AUTH_ERROR',
      timestamp: new Date().toISOString()
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  )
}

// Логирование неудачных попыток аутентификации
export function logAuthFailure(
  request: NextRequest, 
  error: string, 
  userAgent?: string
) {
  const ip = getClientIP(request)
  const url = request.url
  const method = request.method
  
  console.warn('Authentication failure:', {
    ip,
    url,
    method,
    error,
    userAgent: userAgent || request.headers.get('user-agent'),
    timestamp: new Date().toISOString()
  })
  
  // TODO: В продакшне здесь можно добавить отправку в внешний сервис логирования
  // например Sentry, LogRocket или собственную систему мониторинга
} 