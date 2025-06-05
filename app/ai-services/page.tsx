'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, CheckCircle, Users, ExternalLink, Sparkles, TrendingUp, Clock } from 'lucide-react'
import { AIServiceWithCategory, Category } from '@/lib/supabase'
import ServiceCard from '@/app/components/ServiceCard'

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

// Функция для правильного склонения категорий
const getCategoryDeclined = (categoryName: string): string => {
  const declensions: { [key: string]: string } = {
    'Изображения': 'изображений',
    'Генерация изображений': 'генерации изображений',
    'Большие языковые модели': 'больших языковых моделей',
    'Чат-боты': 'чат-ботов',
    'Аудио': 'аудио',
    'Музыка': 'музыки',
    'Видео': 'видео',
    'Продуктивность': 'продуктивности',
    'Автоматизация': 'автоматизации',
    'Текст': 'работы с текстом',
    'Аналитика данных': 'аналитики данных',
    'Виртуальные аватары': 'виртуальных аватаров',
    'Email': 'работы с email',
    'Безопасность': 'безопасности',
    'Бизнес и стартапы': 'бизнеса и стартапов',
    'Архитектура и дизайн интерьера': 'архитектуры и дизайна интерьера',
    'Здоровье и фитнес': 'здоровья и фитнеса',
    'Маркетинг и продажи': 'маркетинга и продаж',
    'Образ жизни': 'образа жизни',
    'Развлечения и lifestyle': 'развлечений и lifestyle',
    'Обслуживание и поддержка клиентов': 'обслуживания и поддержки клиентов',
    'Обучение, гайды и коучинг': 'обучения, гайдов и коучинга',
    'Создание презентаций': 'создания презентаций',
    'Разработка и IT': 'разработки и IT',
    'Развлечения': 'развлечений',
    'Инвестиции и финансы': 'инвестиций и финансов',
    'Создание контента': 'создания контента',
    'Социальные сети': 'социальных сетей',
    'Трудоустройство и HR': 'трудоустройства и HR',
    'Документы': 'работы с документами'
  }
  return declensions[categoryName] || categoryName.toLowerCase()
}

export default function AIServicesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'created_at')
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
      if (selectedCategory) {
        // Найдем категорию по slug или ID
        const category = categories.find(cat => 
          cat.slug === selectedCategory || cat.id.toString() === selectedCategory
        )
        if (category) {
          params.append('category_id', category.id.toString())
        }
      }

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
    if (categories.length > 0) {
      fetchServices(1)
    }
  }, [searchTerm, selectedCategory, sortBy, categories])

  const updateURL = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    if (sortBy !== 'created_at') params.set('sort', sortBy)
    
    const newURL = params.toString() ? `?${params.toString()}` : ''
    router.push(`/ai-services${newURL}`)
  }

  useEffect(() => {
    if (categories.length > 0) {
      updateURL()
    }
  }, [searchTerm, selectedCategory, sortBy, categories])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

  const handlePageChange = (page: number) => {
    fetchServices(page)
  }

  // Получаем выбранную категорию
  const selectedCategoryObj = categories.find(cat => 
    cat.slug === selectedCategory || cat.id.toString() === selectedCategory
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm text-text-secondary">
          <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
          <li className="mx-2">/</li>
          <li><span className="text-text-primary">Каталог нейросетей</span></li>
          {selectedCategoryObj && (
            <>
              <li className="mx-2">/</li>
              <li><span className="text-text-primary">{selectedCategoryObj.name}</span></li>
            </>
          )}
        </ol>
      </nav>

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
                {selectedCategoryObj ? `Категория: ${selectedCategoryObj.name}` : 'Каталог ИИ-сервисов'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              {selectedCategoryObj ? (
                <>Нейросети для <span className="text-gradient">{getCategoryDeclined(selectedCategoryObj.name)}</span></>
              ) : (
                <>Каталог <span className="text-gradient">нейросетей</span> и ИИ-сервисов</>
              )}
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              {selectedCategoryObj ? (
                `Откройте для себя ${pagination.total} проверенных ИИ-инструментов в категории "${selectedCategoryObj.name}"`
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
              <label className="block text-sm font-semibold text-text-primary mb-3">
                Поиск по названию или описанию
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Введите название сервиса..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">
                Категория
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="">Все категории</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug || category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">
                Сортировка
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="created_at">По дате добавления</option>
                  <option value="title">По названию</option>
                  <option value="bookmarks_count">По популярности</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* View Mode Toggle and Stats */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-accent-primary" />
              <span className="text-text-primary font-semibold">
                {pagination.total} результатов найдено
              </span>
              {selectedCategoryObj && (
                <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full text-sm font-medium">
                  {selectedCategoryObj.name}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Services Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                {...service}
                index={0}
              />
            ))}
          </div>
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