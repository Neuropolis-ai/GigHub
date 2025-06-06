'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

// Компонент с useSearchParams
function AIServicesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'bookmarks_count')
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
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sort: sortBy,
        order: 'desc'
      })

      if (searchTerm) {
        params.append('q', searchTerm)
      }

      if (selectedCategory) {
        // Находим категорию по slug или ID
        const category = categories.find(cat => 
          cat.slug === selectedCategory || cat.id.toString() === selectedCategory
        )
        if (category) {
          // Используем slug категории для API запроса
          params.append('category', category.slug || category.name)
        }
      }

      const response = await fetch(`/api/ai-services?${params}`)
      if (!response.ok) {
        console.error('Ошибка API:', response.status, response.statusText)
        throw new Error('Ошибка загрузки данных')
      }

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
      if (!response.ok) {
        console.error('Ошибка загрузки категорий:', response.status, response.statusText)
        throw new Error('Ошибка загрузки категорий')
      }
      const data = await response.json()
      // Проверяем структуру ответа
      if (data.data && Array.isArray(data.data)) {
        setCategories(data.data)
      } else {
        console.error('Неожиданная структура ответа категорий:', data)
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchServices(1) // Загружаем сервисы независимо от категорий
  }, [])

  useEffect(() => {
    fetchServices(1)
  }, [searchTerm, selectedCategory, sortBy])

  const updateURL = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    if (sortBy !== 'bookmarks_count') params.set('sort', sortBy)
    
    const newURL = params.toString() ? `?${params.toString()}` : ''
    router.push(`/ai-services${newURL}`)
  }

  useEffect(() => {
    updateURL()
  }, [searchTerm, selectedCategory, sortBy])

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
      <section className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {selectedCategoryObj ? (
              <>Лучшие нейросети для <span className="text-gradient">{getCategoryDeclined(selectedCategoryObj.name)}</span></>
            ) : (
              <>Каталог <span className="text-gradient">нейросетей</span> и ИИ-сервисов</>
            )}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {selectedCategoryObj ? (
              `Изучите ${pagination.total} проверенных ИИ-инструментов категории "${selectedCategoryObj.name}"`
            ) : (
              'Найдите идеальный ИИ-инструмент из нашей коллекции проверенных сервисов'
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="space-y-4">
            {/* Search - на всю ширину */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по названию или описанию..."
                className="w-full pl-12 pr-4 py-4 min-h-[56px] text-base bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-accent-primary outline-none transition-all touch-manipulation"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              />
            </div>

            {/* Фильтры в две колонки на мобильном */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Категория</label>
                <select 
                  className="w-full py-4 px-4 min-h-[56px] text-base bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-accent-primary outline-none transition-all touch-manipulation"
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCategoryChange(e.target.value)}
                >
                  <option value="">Все категории</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug || category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Сортировка</label>
                <select 
                  className="w-full py-4 px-4 min-h-[56px] text-base bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-accent-primary outline-none transition-all touch-manipulation"
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSortChange(e.target.value)}
                >
                  <option value="bookmarks_count">По популярности</option>
                  <option value="created_at">По дате добавления</option>
                  <option value="title">По названию</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Найдено: {pagination.total} сервисов</span>
            </div>
            {selectedCategoryObj && (
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-accent-primary" />
                <span>Категория: {selectedCategoryObj.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Страница {pagination.page} из {pagination.totalPages}</span>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id}
                index={index}
                {...service}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-text-primary mb-2">Ничего не найдено</h3>
            <p className="text-text-secondary mb-6">
              Попробуйте изменить параметры поиска или выбрать другую категорию
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                  setSortBy('bookmarks_count')
                }}
                className="px-6 py-3 bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors"
              >
                Сбросить фильтры
              </button>
              <Link href="/categories" className="px-6 py-3 border border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 transition-colors">
                Посмотреть категории
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-2">
              <button 
                className="px-4 py-3 sm:px-6 sm:py-3 min-w-[48px] min-h-[48px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors touch-manipulation"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPreviousPage}
              >
                <span className="hidden sm:inline">Назад</span>
                <span className="sm:hidden">←</span>
              </button>
              
              {/* Номера страниц только на больших экранах */}
              <div className="hidden sm:flex items-center gap-2">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, pagination.page - 2) + i
                  if (pageNum <= pagination.totalPages) {
                    return (
                      <button
                        key={pageNum}
                        className={`px-4 py-3 min-w-[48px] min-h-[48px] rounded-xl font-medium transition-colors touch-manipulation ${
                          pagination.page === pageNum
                            ? 'bg-accent-primary text-white'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    )
                  }
                })}
              </div>
              
              {/* Мобильный индикатор страниц */}
              <div className="sm:hidden px-4 py-3 text-sm text-gray-700 font-medium">
                {pagination.page} из {pagination.totalPages}
              </div>
              
              <button 
                className="px-4 py-3 sm:px-6 sm:py-3 min-w-[48px] min-h-[48px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors touch-manipulation"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNextPage}
              >
                <span className="hidden sm:inline">Далее</span>
                <span className="sm:hidden">→</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Additional Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} className="text-accent-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Только лучшие сервисы
              </h3>
              <p className="text-text-secondary">
                Мы вручную проверяем каждый ИИ-инструмент перед добавлением в каталог
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} className="text-accent-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Актуальная информация
              </h3>
              <p className="text-text-secondary">
                Регулярно обновляем данные о возможностях и ценах
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-accent-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Экономьте время
              </h3>
              <p className="text-text-secondary">
                Найдите подходящий инструмент за считанные минуты
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function AIServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Загружаем каталог...</p>
          </div>
        </div>
      </div>
    }>
      <AIServicesContent />
    </Suspense>
  )
} 