import { z } from 'zod'

// ===========================================
// СХЕМЫ ВАЛИДАЦИИ ДЛЯ API ENDPOINTS
// ===========================================

// Схема для AI сервисов
export const aiServiceSchema = z.object({
  title: z.string()
    .min(1, 'Название обязательно')
    .max(200, 'Название не должно превышать 200 символов'),
  
  short_description_ru: z.string()
    .min(1, 'Краткое описание обязательно')
    .max(500, 'Краткое описание не должно превышать 500 символов'),
  
  full_description_ru: z.string()
    .max(5000, 'Полное описание не должно превышать 5000 символов')
    .optional(),
  
  service_url: z.string()
    .url('Некорректный URL сервиса')
    .optional(),
  
  logo_url: z.string()
    .url('Некорректный URL логотипа')
    .optional(),
  
  cover_url: z.string()
    .url('Некорректный URL обложки')
    .optional(),
  
  ai_category: z.string()
    .min(1, 'Категория обязательна')
    .max(100, 'Категория не должна превышать 100 символов'),
  
  price: z.string()
    .max(100, 'Цена не должна превышать 100 символов')
    .optional(),
  
  rating: z.number()
    .min(0, 'Рейтинг не может быть отрицательным')
    .max(10, 'Рейтинг не может превышать 10')
    .optional(),
  
  advantages_ru: z.string()
    .max(2000, 'Преимущества не должны превышать 2000 символов')
    .optional(),
  
  disadvantages_ru: z.string()
    .max(2000, 'Недостатки не должны превышать 2000 символов')
    .optional(),
  
  faq_ru: z.string()
    .max(5000, 'FAQ не должно превышать 5000 символов')
    .optional(),
  
  slug: z.string()
    .min(1, 'Slug обязателен')
    .max(200, 'Slug не должен превышать 200 символов')
    .regex(/^[a-z0-9-]+$/, 'Slug может содержать только строчные буквы, цифры и дефисы'),
  
  status: z.enum(['active', 'inactive', 'pending'])
    .default('active'),
  
  bookmarks_count: z.number()
    .min(0, 'Количество закладок не может быть отрицательным')
    .optional(),
  
  sort_order: z.number()
    .min(0, 'Порядок сортировки не может быть отрицательным')
    .optional()
})

// Схема для обновления AI сервиса (все поля опциональны)
export const aiServiceUpdateSchema = aiServiceSchema.partial()

// Схема для категорий
export const categorySchema = z.object({
  name: z.string()
    .min(1, 'Название категории обязательно')
    .max(100, 'Название категории не должно превышать 100 символов'),
  
  slug: z.string()
    .min(1, 'Slug обязателен')
    .max(100, 'Slug не должен превышать 100 символов')
    .regex(/^[a-z0-9-]+$/, 'Slug может содержать только строчные буквы, цифры и дефисы'),
  
  description: z.string()
    .max(500, 'Описание не должно превышать 500 символов')
    .optional()
})

// Схема для обновления категории
export const categoryUpdateSchema = categorySchema.partial()

// Схема для профиля пользователя
export const profileSchema = z.object({
  full_name: z.string()
    .max(100, 'Имя не должно превышать 100 символов')
    .optional(),
  
  avatar_url: z.string()
    .url('Некорректный URL аватара')
    .optional(),
  
  role: z.enum(['user', 'admin', 'moderator'])
    .default('user')
})

// Схема для обновления профиля
export const profileUpdateSchema = profileSchema.partial()

// ===========================================
// СХЕМЫ ДЛЯ QUERY ПАРАМЕТРОВ
// ===========================================

// Схема для пагинации
export const paginationSchema = z.object({
  page: z.string()
    .regex(/^\d+$/, 'Страница должна быть числом')
    .transform(Number)
    .refine(val => val > 0, 'Страница должна быть больше 0')
    .default('1'),
  
  limit: z.string()
    .regex(/^\d+$/, 'Лимит должен быть числом')
    .transform(Number)
    .refine(val => val > 0 && val <= 100, 'Лимит должен быть от 1 до 100')
    .default('20')
})

// Схема для поиска AI сервисов
export const aiServiceSearchSchema = paginationSchema.extend({
  q: z.string()
    .max(200, 'Поисковый запрос не должен превышать 200 символов')
    .optional(),
  
  category: z.string()
    .max(100, 'Категория не должна превышать 100 символов')
    .optional(),
  
  status: z.enum(['active', 'inactive', 'pending'])
    .optional(),
  
  sort: z.enum(['title', 'rating', 'created_at', 'updated_at', 'bookmarks_count'])
    .default('bookmarks_count'),
  
  order: z.enum(['asc', 'desc'])
    .default('desc')
})

// Схема для поиска категорий
export const categorySearchSchema = paginationSchema.extend({
  q: z.string()
    .max(200, 'Поисковый запрос не должен превышать 200 символов')
    .optional(),
  
  sort: z.enum(['name', 'created_at'])
    .default('name'),
  
  order: z.enum(['asc', 'desc'])
    .default('asc')
})

// ===========================================
// СХЕМЫ ДЛЯ АДМИНСКИХ ОПЕРАЦИЙ
// ===========================================

// Схема для изменения роли пользователя
export const changeUserRoleSchema = z.object({
  user_id: z.string()
    .uuid('Некорректный ID пользователя'),
  
  role: z.enum(['user', 'admin', 'moderator'])
})

// Схема для массовых операций
export const bulkOperationSchema = z.object({
  ids: z.array(z.number().positive('ID должен быть положительным числом'))
    .min(1, 'Необходимо выбрать хотя бы один элемент')
    .max(100, 'Нельзя выбрать более 100 элементов'),
  
  action: z.enum(['delete', 'activate', 'deactivate'])
})

// ===========================================
// УТИЛИТЫ ДЛЯ ВАЛИДАЦИИ
// ===========================================

// Функция для валидации данных с детальными ошибками
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean
  data?: T
  errors?: string[]
} {
  try {
    const result = schema.parse(data)
    return {
      success: true,
      data: result
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      }
    }
    return {
      success: false,
      errors: ['Неизвестная ошибка валидации']
    }
  }
}

// Функция для валидации query параметров
export function validateQuery<T>(schema: z.ZodSchema<T>, searchParams: URLSearchParams): {
  success: boolean
  data?: T
  errors?: string[]
} {
  const queryObject = Object.fromEntries(searchParams.entries())
  return validateData(schema, queryObject)
}

// Функция для создания ответа с ошибкой валидации
export function createValidationErrorResponse(errors: string[]) {
  return new Response(
    JSON.stringify({
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors,
      timestamp: new Date().toISOString()
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  )
} 