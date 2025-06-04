'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Star, Users, ExternalLink, Grid, List } from 'lucide-react'
import { AIServiceWithCategory, Category } from '@/lib/supabase'

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

interface APIResponse {
  data: AIServiceWithCategory[]
  pagination: PaginationInfo
}

export default function AIServicesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category_id') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'created_at')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  })

  // Получение данных
  const fetchServices = async (page = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sort: sortBy,
        order: 'desc'
      })

      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category_id', selectedCategory)

      const response = await fetch(`/api/ai-services?${params}`)
      if (!response.ok) throw new Error('Ошибка загрузки данных')

      const data: APIResponse = await response.json()
      setServices(data.data)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Ошибка:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Ошибка загрузки категорий')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchServices(1)
  }, [searchTerm, selectedCategory, sortBy])

  const updateURL = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category_id', selectedCategory)
    if (sortBy !== 'created_at') params.set('sort', sortBy)
    
    const newURL = params.toString() ? `?${params.toString()}` : ''
    router.push(`/ai-services${newURL}`)
  }

  useEffect(() => {
    updateURL()
  }, [searchTerm, selectedCategory, sortBy])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

  const handlePageChange = (page: number) => {
    fetchServices(page)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Каталог ИИ-сервисов
            </h1>
            <p className="text-gray-600">
              Найдено {pagination.total} сервисов искусственного интеллекта
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск ИИ-сервисов..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Все категории</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="created_at">По дате</option>
                <option value="title">По названию</option>
                <option value="rating">По рейтингу</option>
                <option value="bookmarks">По популярности</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {pagination.total} результатов
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Services Grid */}
        {!loading && (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                viewMode={viewMode} 
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Сервисы не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPreviousPage}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Назад
            </button>
            
            <span className="px-4 py-2 text-gray-700">
              Страница {pagination.page} из {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Вперед
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Service Card Component
function ServiceCard({ service, viewMode }: { service: AIServiceWithCategory, viewMode: 'grid' | 'list' }) {
  const cardClasses = viewMode === 'grid' 
    ? "bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
    : "bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200 flex items-center p-4"

  if (viewMode === 'list') {
    return (
      <div className={cardClasses}>
        {/* Logo */}
        <div className="flex-shrink-0 w-16 h-16 mr-4">
          {service.logo_url ? (
            <Image
              src={service.logo_url || ''}
              alt={`${service.title} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-blue-600">
                {service.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <Link 
                href={`/ai-services/${service.id}`}
                className="block hover:text-blue-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {service.title}
                </h3>
              </Link>
              
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {service.short_description_ru || 'Описание недоступно'}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                {service.categories && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {service.categories.name}
                  </span>
                )}
                
                {service.rating && service.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating.toFixed(1)}</span>
                  </div>
                )}
                
                {service.bookmarks_count && service.bookmarks_count > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{service.bookmarks_count}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              {service.service_url && (
                <a
                  href={service.service_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Открыть сервис"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cardClasses}>
      {/* Cover Image */}
      {service.cover_url && (
        <div className="aspect-video rounded-t-xl overflow-hidden">
          <Image
            src={service.cover_url || ''}
            alt={`${service.title} cover`}
            width={400}
            height={225}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.parentElement!.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="p-6">
        {/* Header with Logo */}
        <div className="flex items-start gap-3 mb-4">
          {service.logo_url && (
            <div className="flex-shrink-0 w-12 h-12">
              <Image
                src={service.logo_url || ''}
                alt={`${service.title} logo`}
                width={48}
                height={48}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          )}
          
          <div className="flex-grow min-w-0">
            <Link 
              href={`/ai-services/${service.id}`}
              className="block hover:text-blue-600 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {service.title}
              </h3>
            </Link>
            
            {service.categories && (
              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                {service.categories.name}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.short_description_ru || 'Описание недоступно'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {service.rating && service.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{service.rating.toFixed(1)}</span>
              </div>
            )}
            
            {service.bookmarks_count && service.bookmarks_count > 0 && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{service.bookmarks_count}</span>
              </div>
            )}
          </div>

          {service.service_url && (
            <a
              href={service.service_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
              title="Открыть сервис"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
} 