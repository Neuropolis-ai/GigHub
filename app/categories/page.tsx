'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Image, 
  MessageSquare, 
  Music, 
  Video, 
  Zap, 
  FileText,
  Brain,
  Code,
  PenTool,
  Mic,
  Camera,
  BarChart,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string | null
  created_at: string
}

// Иконки для категорий
const getCategoryIcon = (categoryName: string) => {
  const iconMap: { [key: string]: any } = {
    'Изображения': Image,
    'Генерация изображений': Image,
    'Большие языковые модели': Brain,
    'Чат-боты': MessageSquare,
    'Аудио': Mic,
    'Музыка': Music,
    'Видео': Video,
    'Продуктивность': Zap,
    'Автоматизация': Zap,
    'Текст': FileText,
    'Аналитика данных': BarChart,
    'Виртуальные аватары': Users,
    'Email': MessageSquare,
    'Безопасность': Brain,
    'Бизнес и стартапы': BarChart,
    'Архитектура и дизайн интерьера': PenTool,
    'Здоровье и фитнес': Users,
    'Маркетинг и продажи': BarChart,
    'Образ жизни': Users,
    'Обслуживание и поддержка клиентов': MessageSquare,
    'Обучение, гайды и коучинг': Brain,
    'Создание презентаций': FileText,
    'Разработка и IT': Code,
    'Развлечения': Camera,
    'Инвестиции и финансы': BarChart,
    'Создание контента': PenTool,
    'Социальные сети': Users
  }
  return iconMap[categoryName] || Brain
}

// Градиенты для категорий
const getCategoryGradient = (categoryName: string) => {
  const gradients: { [key: string]: string } = {
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
    'Аналитика данных': 'from-teal-500 to-green-500',
    'Виртуальные аватары': 'from-slate-500 to-gray-500',
    'Email': 'from-blue-400 to-blue-600',
    'Безопасность': 'from-red-600 to-red-800',
    'Бизнес и стартапы': 'from-green-600 to-green-800',
    'Архитектура и дизайн интерьера': 'from-purple-600 to-purple-800',
    'Здоровье и фитнес': 'from-pink-500 to-pink-700',
    'Маркетинг и продажи': 'from-orange-500 to-orange-700',
    'Образ жизни': 'from-teal-400 to-teal-600',
    'Обслуживание и поддержка клиентов': 'from-cyan-500 to-cyan-700',
    'Обучение, гайды и коучинг': 'from-violet-500 to-violet-700',
    'Создание презентаций': 'from-orange-400 to-orange-600',
    'Разработка и IT': 'from-gray-500 to-gray-700',
    'Развлечения': 'from-pink-400 to-pink-600',
    'Инвестиции и финансы': 'from-emerald-500 to-emerald-700',
    'Создание контента': 'from-violet-400 to-violet-600',
    'Социальные сети': 'from-blue-400 to-blue-600'
  }
  return gradients[categoryName] || 'from-gray-500 to-slate-500'
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) {
          throw new Error('Ошибка при загрузке категорий')
        }
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Загружаем категории...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Ошибка загрузки</h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-primary/5 via-white to-accent-secondary/5 pt-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-accent-primary" />
              <span className="text-accent-primary font-semibold">Категории ИИ-сервисов</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Найдите <span className="text-gradient">идеальный инструмент</span> для любой задачи
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Исследуйте {categories.length} категорий искусственного интеллекта. 
              От генерации контента до анализа данных — у нас есть всё для вашего успеха.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>12,000+ сервисов</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Ежедневные обновления</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Проверенное качество</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {categories.map((category, index) => {
              const Icon = getCategoryIcon(category.name)
              const gradient = getCategoryGradient(category.name)
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Link href={`/ai-services?category_id=${category.id}`}>
                    <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-accent-primary/30 overflow-hidden h-full">
                      {/* Background gradient */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`}></div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                        {category.description || `Откройте для себя лучшие ИИ-инструменты в категории "${category.name}". Современные решения для ваших задач.`}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary font-medium">
                          Перейти в каталог
                        </span>
                        <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-accent-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Готовы найти свой <span className="text-gradient">идеальный ИИ-инструмент</span>?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Исследуйте весь каталог и найдите решение, которое изменит ваш рабочий процесс навсегда.
            </p>
            <Link href="/ai-services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent-primary text-white rounded-2xl font-semibold text-lg hover:bg-accent-primary/90 transition-colors shadow-lg"
              >
                Открыть каталог
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 