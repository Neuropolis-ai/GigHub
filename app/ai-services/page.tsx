'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AIService, Category } from '@/lib/supabase'

interface ServiceWithCategory extends AIService {
  categories: Category | null
}

interface ServiceResponse {
  data: ServiceWithCategory[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

function AIServicesContent() {
  const searchParams = useSearchParams()
  const [services, setServices] = useState<ServiceWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchServices()
  }, [search, selectedCategory, currentPage])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Не удалось загрузить категории')
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err)
    }
  }

  const fetchServices = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      })
      
      if (search) params.append('search', search)
      if (selectedCategory) params.append('category_id', selectedCategory)

      const response = await fetch(`/api/ai-services?${params}`)
      if (!response.ok) throw new Error('Не удалось загрузить сервисы')
      
      const data: ServiceResponse = await response.json()
      setServices(data.data)
      setPagination(data.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchServices()
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return 'Все категории'
    const category = categories.find(c => c.id.toString() === selectedCategory)
    return category?.name || 'Неизвестная категория'
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Ошибка</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Вернуться на главную
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ИИ-сервисы
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {selectedCategory 
              ? `Категория: ${getSelectedCategoryName()}`
              : 'Все доступные ИИ-инструменты'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поиск по названию или описанию
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Введите запрос..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  Найти
                </button>
              </div>
            </form>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Все категории</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear filters */}
          {(search || selectedCategory) && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearch('')
                  setSelectedCategory('')
                  setCurrentPage(1)
                }}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Очистить фильтры
              </button>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загружаем сервисы...</p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    
                    {service.categories && (
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {service.categories.name}
                      </span>
                    )}
                  </div>

                  {service.short_description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {service.short_description}
                    </p>
                  )}

                  {service.price && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-green-600">
                        {service.price}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    {service.service_url && (
                      <a
                        href={service.service_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Перейти на сайт
                        <span className="ml-1">↗</span>
                      </a>
                    )}
                    
                    <Link
                      href={`/ai-services/${service.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Предыдущая
                </button>
                
                <span className="px-4 py-2 text-sm text-gray-700">
                  Страница {pagination.page} из {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Следующая
                </button>
              </div>
            )}

            {/* No results */}
            {services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  {search || selectedCategory 
                    ? 'По вашему запросу ничего не найдено' 
                    : 'Сервисы не найдены'
                  }
                </p>
                {(search || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearch('')
                      setSelectedCategory('')
                      setCurrentPage(1)
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Показать все сервисы
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function AIServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    }>
      <AIServicesContent />
    </Suspense>
  )
} 