'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Category {
  id: number
  name: string
  description: string | null
  created_at: string
}

interface AIService {
  id: number
  name: string
  short_description: string | null
  full_description: string | null
  service_url: string | null
  price: string | null
  category_id: number | null
  created_at: string
}

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ошибка загрузки</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white/50">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              <span className="gradient-text">ИИ-сервисы</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {selectedCategory 
                ? `Категория: ${getSelectedCategoryName()}`
                : `Исследуйте ${pagination.total} ИИ-инструментов для любых задач`
              }
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/80">
        <div className="container mx-auto px-6">
          <div className="card max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Поиск по названию или описанию
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Введите запрос..."
                    className="input-field rounded-r-none"
                  />
                  <button
                    type="submit"
                    className="btn-primary rounded-l-none px-6"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Категория
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="input-field"
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

            {/* Active Filters */}
            {(search || selectedCategory) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600">Активные фильтры:</span>
                  {search && (
                    <span className="category-tag">
                      Поиск: "{search}"
                      <button
                        onClick={() => setSearch('')}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="category-tag">
                      {getSelectedCategoryName()}
                      <button
                        onClick={() => setSelectedCategory('')}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSearch('')
                      setSelectedCategory('')
                      setCurrentPage(1)
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Очистить все
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
              <p className="text-gray-600">Загружаем сервисы...</p>
            </div>
          )}

          {/* Services Grid */}
          {!loading && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="service-card animate-fade-in-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {service.name}
                      </h3>
                      
                      {service.categories && (
                        <span className="category-tag">
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {service.price}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      {service.service_url && (
                        <a
                          href={service.service_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          Перейти на сайт
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      
                      <Link
                        href={`/ai-services/${service.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        Подробнее
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Предыдущая
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-4 py-2 text-sm text-gray-700 bg-white rounded-lg border">
                      Страница {pagination.page} из {pagination.totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                    disabled={currentPage === pagination.totalPages}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Следующая
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* No results */}
              {services.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {search || selectedCategory 
                      ? 'По вашему запросу ничего не найдено' 
                      : 'Сервисы не найдены'
                    }
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Попробуйте изменить параметры поиска или очистить фильтры
                  </p>
                  {(search || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearch('')
                        setSelectedCategory('')
                        setCurrentPage(1)
                      }}
                      className="btn-primary"
                    >
                      Показать все сервисы
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default function AIServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
            <p className="text-gray-600">Загружаем страницу...</p>
          </div>
        </div>
      </div>
    }>
      <AIServicesContent />
    </Suspense>
  )
} 