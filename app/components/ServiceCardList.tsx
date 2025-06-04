'use client'

import { motion } from 'framer-motion'
import { Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ServiceCardProps } from './ServiceCard'

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
    'Обучение, гайды и коучинг': 'from-violet-500 to-violet-700',
    'Создание презентаций': 'from-orange-400 to-orange-600',
    'Разработка и IT': 'from-gray-500 to-gray-700',
    'Развлечения': 'from-pink-400 to-pink-600',
    'Инвестиции и финансы': 'from-emerald-500 to-emerald-700',
    'Создание контента': 'from-violet-400 to-violet-600',
    'Социальные сети': 'from-blue-400 to-blue-600'
  }
  return colors[categoryName] || 'from-gray-500 to-slate-500'
}

const getInitials = (name: string) => {
  if (!name || typeof name !== 'string') return 'AI';
  return name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2).toUpperCase();
}

export default function ServiceCardList({ 
  id, 
  title, 
  short_description_ru, 
  logo_url,
  bookmarks_count,
  categories, 
  price, 
  service_url, 
  index = 0
}: ServiceCardProps) {
  const badgeColor = categories ? getBadgeColor(categories.name) : 'from-gray-500 to-slate-500'
  const initials = getInitials(title)

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