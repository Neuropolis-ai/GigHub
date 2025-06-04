'use client'

import { motion } from 'framer-motion'
import { Star, ArrowRight, TrendingUp, Award, Sparkles } from 'lucide-react'
import Link from 'next/link'

const featuredTools = [
  {
    id: 'midjourney',
    name: 'MidJourney',
    description: 'Создавайте невероятные изображения из текстовых описаний',
    category: 'Генерация изображений',
    rating: 4.9,
    reviews: 12453,
    badge: 'trending',
    image: '/api/placeholder/300/200',
    features: ['Высокое качество', 'Художественные стили', 'Быстрая генерация']
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Умный ассистент для написания текстов, кода и решения задач',
    category: 'Чат-боты',
    rating: 4.8,
    reviews: 25671,
    badge: 'popular',
    image: '/api/placeholder/300/200',
    features: ['Диалоги', 'Программирование', 'Креативное письмо']
  },
  {
    id: 'runway-ml',
    name: 'Runway ML',
    description: 'Профессиональные инструменты для создания и редактирования видео',
    category: 'Видео',
    rating: 4.7,
    reviews: 8912,
    badge: 'new',
    image: '/api/placeholder/300/200',
    features: ['AI видео', 'Эффекты', 'Автомонтаж']
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Открытая модель для генерации изображений высокого качества',
    category: 'Генерация изображений',
    rating: 4.6,
    reviews: 15234,
    badge: 'trending',
    image: '/api/placeholder/300/200',
    features: ['Open Source', 'Кастомизация', 'Локально']
  },
  {
    id: 'mubert',
    name: 'Mubert',
    description: 'Генерация уникальной музыки под любые потребности',
    category: 'Музыка',
    rating: 4.5,
    reviews: 5678,
    badge: 'featured',
    image: '/api/placeholder/300/200',
    features: ['Роялти-фри', 'Любые жанры', 'API интеграция']
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'ИИ-копирайтер для маркетинга и контент-создания',
    category: 'Текст',
    rating: 4.4,
    reviews: 9876,
    badge: 'popular',
    image: '/api/placeholder/300/200',
    features: ['Маркетинг', 'SEO тексты', 'Соцсети']
  }
]

const getBadgeConfig = (badge: string) => {
  switch (badge) {
    case 'trending':
      return { icon: TrendingUp, text: 'Тренд', color: 'from-red-500 to-pink-500' }
    case 'popular':
      return { icon: Award, text: 'Топ выбор', color: 'from-blue-500 to-purple-500' }
    case 'new':
      return { icon: Sparkles, text: 'Новинка', color: 'from-green-500 to-emerald-500' }
    case 'featured':
      return { icon: Star, text: 'Рекомендуем', color: 'from-yellow-500 to-orange-500' }
    default:
      return { icon: Star, text: 'Популярно', color: 'from-gray-500 to-slate-500' }
  }
}

export default function FeaturedTools() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            <span className="text-gradient">Лучшие инструменты</span> недели
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Проверенные временем ИИ-сервисы, которые используют миллионы пользователей по всему миру
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTools.map((tool, index) => {
            const badgeConfig = getBadgeConfig(tool.badge)
            const BadgeIcon = badgeConfig.icon

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent-primary/30"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${badgeConfig.color} text-white text-xs font-semibold shadow-lg`}>
                    <BadgeIcon className="w-3 h-3" />
                    {badgeConfig.text}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white/30">{tool.name.charAt(0)}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-sm text-accent-primary font-medium">{tool.category}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-700">{tool.rating}</span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Reviews count and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      {tool.reviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} отзывов
                    </span>
                    <Link href={`/tool/${tool.id}`}>
                      <button className="group/btn flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-xl text-sm font-semibold hover:bg-accent-primary/90 transition-all duration-200 hover:scale-105">
                        Подробнее
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <button className="group px-8 py-4 bg-white border-2 border-accent-primary text-accent-primary rounded-2xl font-semibold hover:bg-accent-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg">
            <span className="flex items-center gap-2">
              Посмотреть все инструменты
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
} 