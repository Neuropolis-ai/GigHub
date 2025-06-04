'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Star, Users, Calendar, Shield, Zap, Globe, Check, X } from 'lucide-react'
import { AIService, Category } from '@/lib/supabase'

interface ServiceWithCategory extends AIService {
  categories: Category | null
}

export default function AIServicePage() {
  const params = useParams()
  const [service, setService] = useState<ServiceWithCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchService(params.id as string)
    }
  }, [params.id])

  const fetchService = async (id: string) => {
    try {
      const response = await fetch(`/api/ai-services/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Сервис не найден')
        }
        throw new Error('Не удалось загрузить информацию о сервисе')
      }
      const data = await response.json()
      setService(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Загружаем информацию о сервисе...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            {error || 'Сервис не найден'}
          </h2>
          <Link
            href="/ai-services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к списку сервисов
          </Link>
        </motion.div>
      </div>
    )
  }

  // Парсим FAQ и недостатки для лучшего отображения
  const faqItems = service.faq_ru ? service.faq_ru.split('\n').filter(item => item.trim()) : []
  const disadvantageItems = service.disadvantages ? service.disadvantages.split('\n').filter(item => item.trim()) : []
  const features = service.full_description ? service.full_description.split('.').slice(0, 6).filter(item => item.trim()) : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/ai-services"
              className="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Вернуться к каталогу</span>
            </Link>
            
            {service.service_url && (
              <motion.a
                href={service.service_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors"
              >
                Открыть {service.name}
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-primary/5 via-white to-accent-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                {service.categories && (
                  <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-medium rounded-full">
                    {service.categories.name}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-text-secondary text-sm">(отзывы)</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
                {service.name}
              </h1>

              <p className="text-xl text-text-secondary leading-relaxed">
                {service.short_description || 'Мощный ИИ-инструмент для решения ваших задач'}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Активные пользователи</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Добавлен {new Date(service.created_at).toLocaleDateString('ru-RU')}</span>
                </div>
                {service.price && (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>{service.price}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {service.categories && (
                  <span className="px-3 py-1 bg-gray-100 text-text-secondary text-sm rounded-lg">
                    {service.categories.name}
                  </span>
                )}
                <span className="px-3 py-1 bg-gray-100 text-text-secondary text-sm rounded-lg">
                  ИИ-инструмент
                </span>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/30">{service.name.charAt(0)}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            {service.full_description && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-text-primary mb-6">О продукте</h2>
                <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-line">
                  {service.full_description}
                </p>
              </motion.section>
            )}

            {/* Features */}
            {features.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-text-primary mb-6">Основные возможности</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-accent-primary/10 rounded-lg flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent-primary" />
                      </div>
                      <span className="text-text-primary">{feature.trim()}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* FAQ */}
            {service.faq_ru && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-text-primary mb-6">Часто задаваемые вопросы</h2>
                <div className="space-y-4">
                  {faqItems.slice(0, 6).map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-accent-primary/30 transition-colors">
                      <span className="text-text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Disadvantages */}
            {service.disadvantages && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-text-primary mb-6">Ограничения</h2>
                <div className="space-y-3">
                  {disadvantageItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-8">
            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
            >
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">Попробовать {service.name}</h3>
                <p className="text-text-secondary text-sm">
                  Начните использовать {service.name} уже сегодня
                </p>
                {service.service_url && (
                  <motion.a
                    href={service.service_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors"
                  >
                    Перейти на сайт
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">Информация</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Рейтинг</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
                {service.categories && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Категория</span>
                    <span className="font-semibold">{service.categories.name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Статус</span>
                  <span className="font-semibold text-green-600">Активен</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Добавлен</span>
                  <span className="font-semibold">{new Date(service.created_at).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </motion.div>

            {/* Pricing Card */}
            {service.price && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-4">Стоимость</h3>
                <div className="text-2xl font-bold text-accent-primary mb-2">
                  {service.price}
                </div>
                <p className="text-text-secondary text-sm">
                  Актуальные тарифы смотрите на официальном сайте
                </p>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">Быстрые действия</h3>
              <div className="space-y-3">
                <Link
                  href="/ai-services"
                  className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Все сервисы
                </Link>
                {service.categories && (
                  <Link
                    href={`/ai-services?category_id=${service.categories.id}`}
                    className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Сервисы категории
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 