'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Link from 'next/link'

export interface ServiceCardProps {
  id: number
  name: string
  short_description: string
  category?: {
    id: number
    name: string
    slug: string
  }
  price?: string | null
  service_url: string
  index?: number
  className?: string
}

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
    'Обучение, гайды и коучинг': 'from-violet-500 to-violet-700'
  }
  return colors[categoryName] || 'from-gray-500 to-slate-500'
}

const getInitials = (name: string) => {
  return name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2).toUpperCase()
}

export default function ServiceCard({ 
  id, 
  name, 
  short_description, 
  category, 
  price, 
  service_url, 
  index = 0, 
  className = '' 
}: ServiceCardProps) {
  const badgeColor = category ? getBadgeColor(category.name) : 'from-gray-500 to-slate-500'
  const initials = getInitials(name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent-primary/30 cursor-pointer ${className}`}
    >
      <Link href={`/ai-services/${id}`} className="block">
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 z-20">
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${badgeColor} text-white text-xs font-semibold shadow-lg`}>
              {category.name}
            </div>
          </div>
        )}

        {/* Image/Logo Area */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${badgeColor} opacity-10`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-white bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              {initials}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2">
                {name}
              </h3>
              {category && (
                <span className="text-sm text-accent-primary font-medium">{category.name}</span>
              )}
            </div>
            {price && (
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg ml-2">
                <span className="text-sm font-semibold text-green-700">{price}</span>
              </div>
            )}
          </div>

          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4">
            {short_description}
          </p>

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