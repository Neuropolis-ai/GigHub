'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Star, Users, Calendar, Shield, Zap, Globe, Check, X } from 'lucide-react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Моковые данные инструментов
const tools = {
  'midjourney': {
    id: 'midjourney',
    name: 'MidJourney',
    tagline: 'Создавайте невероятные изображения из текстовых описаний',
    description: 'MidJourney — это мощный ИИ-инструмент для генерации изображений, который превращает ваши текстовые описания в потрясающие произведения искусства. Платформа использует передовые алгоритмы машинного обучения для создания уникальных изображений в различных стилях.',
    category: 'Генерация изображений',
    rating: 4.9,
    reviews: 12453,
    users: '2M+',
    launched: '2022',
    pricing: 'От $10/мес',
    website: 'https://midjourney.com',
    badge: 'trending',
    features: [
      'Высококачественная генерация изображений',
      'Множество художественных стилей',
      'Быстрая обработка запросов',
      'Интеграция с Discord',
      'Коммерческое использование',
      'Постоянные обновления алгоритмов'
    ],
    pros: [
      'Исключительное качество изображений',
      'Интуитивно понятный интерфейс',
      'Активное сообщество',
      'Регулярные обновления'
    ],
    cons: [
      'Только через Discord',
      'Очереди в пиковое время',
      'Ограниченный контроль'
    ],
    useCases: [
      'Концепт-арт для игр и фильмов',
      'Иллюстрации для книг и статей',
      'Создание логотипов и брендинга',
      'Художественные проекты',
      'Маркетинговые материалы'
    ],
    tags: ['AI Art', 'Image Generation', 'Creative', 'Professional'],
    image: '/api/placeholder/800/400',
    gallery: [
      '/api/placeholder/300/300',
      '/api/placeholder/300/300',
      '/api/placeholder/300/300',
      '/api/placeholder/300/300'
    ]
  },
  'chatgpt': {
    id: 'chatgpt',
    name: 'ChatGPT',
    tagline: 'Умный ассистент для написания текстов, кода и решения задач',
    description: 'ChatGPT от OpenAI — это революционный языковой ИИ, который может помочь с написанием текстов, программированием, анализом данных, обучением и множеством других задач. Основан на архитектуре GPT и обучен на огромном объеме текстовых данных.',
    category: 'Чат-боты',
    rating: 4.8,
    reviews: 25671,
    users: '100M+',
    launched: '2022',
    pricing: 'Бесплатно, Pro от $20/мес',
    website: 'https://chat.openai.com',
    badge: 'popular',
    features: [
      'Генерация и редактирование текстов',
      'Помощь в программировании',
      'Решение математических задач',
      'Многоязычная поддержка',
      'Анализ и суммаризация',
      'Творческое письмо'
    ],
    pros: [
      'Универсальность применения',
      'Высокое качество ответов',
      'Бесплатная версия',
      'Постоянное обучение'
    ],
    cons: [
      'Может генерировать неточности',
      'Ограничения бесплатной версии',
      'Нет доступа к интернету'
    ],
    useCases: [
      'Написание статей и контента',
      'Программирование и отладка',
      'Обучение и репетиторство',
      'Деловая переписка',
      'Творческие проекты'
    ],
    tags: ['AI Assistant', 'Text Generation', 'Coding', 'Education'],
    image: '/api/placeholder/800/400',
    gallery: [
      '/api/placeholder/300/300',
      '/api/placeholder/300/300',
      '/api/placeholder/300/300',
      '/api/placeholder/300/300'
    ]
  }
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools[params.slug as keyof typeof tools]

  if (!tool) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/"
              className="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Вернуться к каталогу</span>
            </Link>
            
            <motion.a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors"
            >
              Открыть {tool.name}
              <ExternalLink className="w-4 h-4" />
            </motion.a>
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
                <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-medium rounded-full">
                  {tool.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tool.rating}</span>
                  <span className="text-text-secondary text-sm">
                    ({tool.reviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} отзывов)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
                {tool.name}
              </h1>

              <p className="text-xl text-text-secondary leading-relaxed">
                {tool.tagline}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{tool.users} пользователей</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Запущен в {tool.launched}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>{tool.pricing}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-text-secondary text-sm rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
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
                  <div className="text-6xl font-bold text-white/30">{tool.name.charAt(0)}</div>
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
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">О продукте</h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                {tool.description}
              </p>
            </motion.section>

            {/* Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">Основные возможности</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-accent-primary/10 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-primary" />
                    </div>
                    <span className="text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Pros & Cons */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">Плюсы и минусы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pros */}
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Преимущества
                  </h3>
                  <ul className="space-y-3">
                    {tool.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-text-secondary">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Недостатки
                  </h3>
                  <ul className="space-y-3">
                    {tool.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-text-secondary">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Use Cases */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">Случаи использования</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.useCases.map((useCase, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-accent-primary/30 transition-colors">
                    <span className="text-text-primary">{useCase}</span>
                  </div>
                ))}
              </div>
            </motion.section>
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
                <h3 className="text-xl font-semibold text-text-primary">Попробовать {tool.name}</h3>
                <p className="text-text-secondary text-sm">
                  Начните использовать {tool.name} уже сегодня
                </p>
                <motion.a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors"
                >
                  Перейти на сайт
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">Статистика</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Рейтинг</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tool.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Пользователи</span>
                  <span className="font-semibold">{tool.users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Отзывы</span>
                  <span className="font-semibold">
                    {tool.reviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Запуск</span>
                  <span className="font-semibold">{tool.launched}</span>
                </div>
              </div>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">Стоимость</h3>
              <div className="text-2xl font-bold text-accent-primary mb-2">
                {tool.pricing}
              </div>
              <p className="text-text-secondary text-sm">
                Актуальные тарифы смотрите на официальном сайте
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 