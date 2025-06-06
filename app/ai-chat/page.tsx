'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Brain, Zap, Heart, Star, TrendingUp, CheckCircle, Clock, Award, Users, Lightbulb, ExternalLink } from 'lucide-react'
import { AIServiceWithCategory } from '@/lib/supabase'
import ServiceCard from '@/app/components/ServiceCard'

const benefits = [
  {
    icon: '🧠',
    title: 'Умные ответы',
    description: 'Получайте продуманные и релевантные ответы на любые вопросы'
  },
  {
    icon: '⚡',
    title: 'Быстро 24/7',
    description: 'Мгновенные ответы в любое время дня и ночи'
  },
  {
    icon: '💬',
    title: 'Естественное общение',
    description: 'Общайтесь как с живым человеком на любом языке'
  },
  {
    icon: '🎯',
    title: 'Специализация',
    description: 'Чат-боты для работы, учебы, творчества и развлечений'
  }
]

const topChatServices = [
  {
    name: 'ChatGPT',
    description: 'Самый популярный ИИ-ассистент от OpenAI для любых задач',
    category: 'Универсальный',
    rating: 4.8,
    pricing: 'Freemium',
    monthlyPrice: 'от $20/мес',
    url: 'https://chat.openai.com',
    features: ['GPT-4', 'Поиск в интернете', 'Анализ изображений', 'Генерация кода'],
    pros: ['Очень умный', 'Быстрые ответы', 'Множество функций'],
    cons: ['Платная подписка', 'Ограничения бесплатной версии']
  },
  {
    name: 'Claude (Anthropic)',
    description: 'Этичный ИИ-помощник для безопасного и полезного общения',
    category: 'Безопасный ИИ',
    rating: 4.7,
    pricing: 'Freemium',
    monthlyPrice: 'от $20/мес',
    url: 'https://claude.ai',
    features: ['Большой контекст', 'Анализ документов', 'Безопасность', 'Этичность'],
    pros: ['Очень безопасный', 'Понимает контекст', 'Этичные ответы'],
    cons: ['Медленнее ChatGPT', 'Меньше функций']
  },
  {
    name: 'Character.AI',
    description: 'Создавайте и общайтесь с персонализированными ИИ-персонажами',
    category: 'Развлечения',
    rating: 4.5,
    pricing: 'Freemium',
    monthlyPrice: 'от $9.99/мес',
    url: 'https://character.ai',
    features: ['Создание персонажей', 'Ролевые игры', 'Голосовые чаты', 'Сообщество'],
    pros: ['Креативные персонажи', 'Весело', 'Бесплатная версия'],
    cons: ['Иногда неточные ответы', 'Ограничения бесплатной версии']
  },
  {
    name: 'Poe by Quora',
    description: 'Доступ к множеству ИИ-моделей в одном приложении',
    category: 'Мульти-ИИ',
    rating: 4.3,
    pricing: 'Freemium',
    monthlyPrice: 'от $19.99/мес',
    url: 'https://poe.com',
    features: ['Множество моделей', 'GPT-4', 'Claude', 'Llama'],
    pros: ['Много ИИ в одном месте', 'Сравнение ответов', 'Удобно'],
    cons: ['Платная подписка', 'Интерфейс может быть сложным']
  },
  {
    name: 'Perplexity AI',
    description: 'ИИ-поисковик с источниками и точными ответами',
    category: 'Поиск',
    rating: 4.6,
    pricing: 'Freemium',
    monthlyPrice: 'от $20/мес',
    url: 'https://perplexity.ai',
    features: ['Поиск с источниками', 'Актуальная информация', 'Цитирование', 'Изображения'],
    pros: ['Всегда актуальные данные', 'Показывает источники', 'Точные ответы'],
    cons: ['Фокус только на поиске', 'Менее креативный']
  },
  {
    name: 'Google Bard',
    description: 'ИИ-помощник от Google с интеграцией в экосистему',
    category: 'Поиск',
    rating: 4.2,
    pricing: 'Бесплатно',
    monthlyPrice: 'Бесплатно',
    url: 'https://bard.google.com',
    features: ['Поиск Google', 'Gmail интеграция', 'Gemini Pro', 'Бесплатно'],
    pros: ['Полностью бесплатный', 'Интеграция с Google', 'Быстрый'],
    cons: ['Менее функциональный', 'Ограниченная креативность']
  }
]

const categories = [
  {
    name: 'Универсальные ИИ',
    description: 'Помощники для любых задач',
    icon: '🤖',
    count: 15
  },
  {
    name: 'Поиск и исследования',
    description: 'ИИ для поиска информации',
    icon: '🔍',
    count: 8
  },
  {
    name: 'Творчество и контент',
    description: 'Помощники для создания контента',
    icon: '✨',
    count: 12
  },
  {
    name: 'Разработка кода',
    description: 'ИИ для программирования',
    icon: '💻',
    count: 10
  }
]

export default function AIChatPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)

  const fetchChatServices = async () => {
    try {
      const response = await fetch('/api/ai-services?category=chatbots&limit=20')
      if (response.ok) {
        const data = await response.json()
        setServices(data.data || [])
      }
    } catch (error) {
      console.error('Ошибка загрузки чат-ботов:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChatServices()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm text-text-secondary">
          <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
          <li className="mx-2">/</li>
          <li><Link href="/ai-services" className="hover:text-accent-primary">Каталог</Link></li>
          <li className="mx-2">/</li>
          <li><span className="text-text-primary">ИИ чат-боты</span></li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MessageCircle className="w-8 h-8 text-green-500" />
              <span className="text-green-500 font-semibold">
                ИИ чат-боты
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              ИИ <span className="text-gradient bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">чат-боты</span> —<br className="hidden md:block" />
              лучшие нейросети для общения
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
              Откройте для себя мир умных собеседников. От ChatGPT до Character.AI — 
              выбирайте лучшие ИИ-чаты для работы, учебы, развлечений и решения любых задач.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-green-500" />
                <span>Умные ответы</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Мгновенно 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Понимают эмоции</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#services" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold">
                Смотреть чат-боты
              </Link>
              <Link href="/ai-services" className="inline-flex items-center px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-colors font-semibold">
                Полный каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Почему выбирают <span className="text-green-500">ИИ чат-боты</span>?
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Современные ИИ-чаты становятся незаменимыми помощниками в работе и жизни
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Лучшие <span className="text-green-500">ИИ чат-боты</span> 2025
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Сравнение топовых чат-ботов для разных задач и потребностей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {topChatServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-text-primary">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      service.pricing === 'Freemium' 
                        ? 'bg-blue-100 text-blue-700'
                        : service.pricing === 'Бесплатно'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {service.pricing}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{service.rating}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {service.monthlyPrice}
                  </span>
                </div>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">✅ Плюсы:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600 mb-1">❌ Минусы:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <a 
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 font-medium"
                >
                  Попробовать <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold">
              Смотреть все сервисы
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Категории <span className="text-green-500">ИИ чат-ботов</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Найдите подходящего ИИ-помощника для ваших конкретных задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {category.name}
                </h3>
                <p className="text-text-secondary mb-4">
                  {category.description}
                </p>
                <span className="text-sm font-medium text-green-600">
                  {category.count} сервисов
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Все <span className="text-green-500">ИИ чат-боты</span> в каталоге
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Полный список проверенных ИИ-чатов с подробными описаниями и отзывами
            </p>
          </div>

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
              <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-text-primary mb-2">Чат-боты не найдены</h3>
              <p className="text-text-secondary mb-6">
                Пока что в этой категории нет сервисов
              </p>
              <Link href="/ai-services" className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                Посмотреть все сервисы
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-500 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Начните общаться с ИИ уже сегодня
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Выберите подходящего ИИ-помощника и откройте для себя новые возможности 
              в работе, учебе и творчестве. Будущее общения уже здесь!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-services?category=chatbots">
                <button className="bg-white text-green-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                  Все чат-боты
                </button>
              </Link>
              <Link href="/ai-services">
                <button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  Полный каталог
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 