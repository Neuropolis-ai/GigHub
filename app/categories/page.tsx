'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Category } from '@/lib/supabase'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Не удалось загрузить категории')
      }
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Загружаем категории...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Ошибка</h2>
          <p>{error}</p>
          <button 
            onClick={fetchCategories}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Вернуться на главную
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Категории ИИ-сервисов
          </h1>
          <p className="text-xl text-gray-600">
            Выберите категорию, чтобы найти лучшие ИИ-инструменты для ваших задач
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/ai-services?category=${category.id}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                  →
                </span>
              </div>
              
              {category.description && (
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
              )}
              
              <div className="text-sm text-blue-600 font-medium">
                Посмотреть сервисы
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Категории не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
} 