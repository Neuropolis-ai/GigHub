'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, CheckCircle, Users, ExternalLink, Grid, List, Sparkles, TrendingUp, Clock } from 'lucide-react'
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

  // Получаем название выбранной категории
  const selectedCategoryName = categories.find(cat => cat.id.toString() === selectedCategory)?.name

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-primary/5 via-white to-accent-secondary/5 pt-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-accent-primary" />
              <span className="text-accent-primary font-semibold">
                {selectedCategoryName ? `Категория: ${selectedCategoryName}` : 'Каталог ИИ-сервисов'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              {selectedCategoryName ? (
                <>Лучшие <span className="text-gradient">{selectedCategoryName.toLowerCase()}</span> инструменты</>
              ) : (
                <>Каталог <span className="text-gradient">ИИ-сервисов</span></>
              )}
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              {selectedCategoryName ? (
                `Откройте для себя ${pagination.total} проверенных ИИ-инструментов в категории "${selectedCategoryName}"`
              ) : (
                `Найдено ${pagination.total} сервисов искусственного интеллекта. Выберите идеальный инструмент для ваших задач.`
              )}
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Актуальные решения</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-500" />
                <span>Проверенное качество</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Ежедневные обновления</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Поиск по названию или описанию
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Введите название сервиса..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Категория
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
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
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Сортировка
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option value="created_at">По дате добавления</option>
                <option value="title">По названию</option>
                <option value="bookmarks_count">По популярности</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle and Stats */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-accent-primary" />
              <span className="text-text-primary font-semibold">
                {pagination.total} результатов найдено
              </span>
              {selectedCategoryName && (
                <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full text-sm font-medium">
                  {selectedCategoryName}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary mr-3">Вид:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-accent-primary text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-accent-primary text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Services Grid/List */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              : "space-y-6"
            }
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                short_description_ru={service.short_description_ru}
                logo_url={service.logo_url}
                cover_url={service.cover_url}
                bookmarks_count={service.bookmarks_count}
                categories={service.categories}
                price={service.price}
                service_url={service.service_url}
                index={index}
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Сервисы не найдены
            </h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Попробуйте изменить параметры поиска или выберите другую категорию
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                  setSortBy('created_at')
                }}
                className="px-6 py-3 bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors"
              >
                Сбросить фильтры
              </button>
              <Link href="/categories">
                <button className="px-6 py-3 border-2 border-accent-primary text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white transition-colors">
                  Все категории
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && services.length > 0 && pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center items-center gap-2 mt-16"
          >
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPreviousPage}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Назад
            </button>
            
            {[...Array(Math.min(pagination.totalPages, 5))].map((_, index) => {
              const pageNumber = pagination.page - 2 + index
              if (pageNumber < 1 || pageNumber > pagination.totalPages) return null
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    pageNumber === pagination.page
                      ? 'bg-accent-primary text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Далее
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ServiceCard({ 
  id, 
  title, 
  short_description_ru, 
  logo_url, 
  cover_url, 
  bookmarks_count, 
  categories, 
  price, 
  service_url, 
  index,
  viewMode = 'grid'
}: { 
  id: number, 
  title: string, 
  short_description_ru: string | null, 
  logo_url: string | null, 
  cover_url: string | null, 
  bookmarks_count: number | null, 
  categories: Category | null, 
  price: string | null, 
  service_url: string | null, 
  index: number,
  viewMode?: 'grid' | 'list'
}) {
  const getBadgeColor = (categoryName: string) => {
    const colors: { [key: string]: string } = {
      'Изображения': 'from-purple-500 to-pink-500',
      'Генерация изображений': 'from-purple-500 to-pink-500',
      'Большие языковые модели': 'from-blue-500 to-cyan-500',
      'Чат-боты': 'from-blue-500 to-cyan-500',
      'Аудио': 'from-green-500 to-emerald-500',
      'Музыка': 'from-green-500 to-emerald-500',
      'Видео': 'from-red-500 to-orange-500',
      'Продуктивность': 'from-yellow-500 to-amber-500',
      'Автоматизация': 'from-yellow-500 to-amber-500',
      'Текст': 'from-indigo-500 to-purple-500',
      'Аналитика данных': 'from-teal-500 to-green-500'
    }
    return colors[categoryName] || 'from-gray-500 to-slate-500'
  }

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return 'AI';
    return name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2).toUpperCase();
  }

  const badgeColor = categories ? getBadgeColor(categories.name) : 'from-gray-500 to-slate-500'
  const initials = getInitials(title)

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-accent-primary/30 p-6"
      >
        <Link href={`/ai-services/${id}`} className="block">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100">
              {logo_url ? (
                <Image
                  src={logo_url}
                  alt={`${title} logo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">${initials}</div>`
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-1 mb-1">
                    {title}
                  </h3>
                  {categories && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${badgeColor} text-white text-xs font-semibold`}>
                      {categories.name}
                    </span>
                  )}
                </div>
                {price && (
                  <div className="bg-green-50 px-3 py-1 rounded-lg">
                    <span className="text-sm font-semibold text-green-700">{price}</span>
                  </div>
                )}
              </div>

              <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                {short_description_ru || 'Описание сервиса'}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {bookmarks_count && bookmarks_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{bookmarks_count}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {service_url && (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-accent-primary font-medium">Подробнее →</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Grid view (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent-primary/30 cursor-pointer"
    >
      <Link href={`/ai-services/${id}`} className="block">
        {/* Category Badge */}
        {categories && (
          <div className="absolute top-4 left-4 z-20">
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${badgeColor} text-white text-xs font-semibold shadow-lg`}>
              {categories.name}
            </div>
          </div>
        )}

        {/* Cover Image */}
        {cover_url && (
          <div className="aspect-video rounded-t-3xl overflow-hidden">
            <Image
              src={cover_url}
              alt={`${title} cover`}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.parentElement!.style.display = 'none'
              }}
            />
          </div>
        )}

        {/* Logo Area (если нет обложки) */}
        {!cover_url && (
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${badgeColor} opacity-10`} />
            {logo_url ? (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Image
                  src={logo_url}
                  alt={`${title} logo`}
                  width={80}
                  height={80}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-white bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  {initials}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Header with logo and title */}
          <div className="flex items-start gap-3 mb-4">
            {/* Logo (маленький) */}
            {logo_url && cover_url && (
              <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={logo_url}
                  alt={`${title} logo`}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xs font-bold">${initials}</div>`
                  }}
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2 mb-1">
                {title}
              </h3>
              {categories && (
                <span className="text-sm text-accent-primary font-medium">{categories.name}</span>
              )}
            </div>

            {/* Price */}
            {price && (
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                <span className="text-sm font-semibold text-green-700">{price}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4">
            {short_description_ru || 'Описание сервиса'}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {bookmarks_count && bookmarks_count > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{bookmarks_count}</span>
                </div>
              )}
            </div>

            {service_url && (
              <div className="flex items-center text-xs text-gray-400">
                <ExternalLink className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* View Service Link */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              Перейти к сервису
            </span>
            <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
              <span className="text-accent-primary group-hover:text-white text-sm">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 