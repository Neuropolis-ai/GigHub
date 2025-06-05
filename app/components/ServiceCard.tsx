'use client'

import { motion } from 'framer-motion'
import { Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export interface ServiceCardProps {
  id: number
  title: string
  slug?: string | null
  short_description_ru?: string | null
  logo_url?: string | null
  cover_url?: string | null
  bookmarks_count?: number | null
  price?: string | null
  service_url?: string | null
  categories?: {
    id: number
    name: string
    slug: string
  } | null
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

// Функция для нормализации URL изображений
const normalizeImageUrl = (url: string | undefined | null): string | null => {
  if (!url || typeof url !== 'string') return null;
  
  // Если URL начинается с //, добавляем https:
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  
  // Если URL относительный, возвращаем null (будем использовать fallback)
  if (url.startsWith('/') && !url.startsWith('//')) {
    return null;
  }
  
  // Если URL уже полный, возвращаем как есть
  return url;
}

export default function ServiceCard({ 
  id, 
  title,
  slug,
  short_description_ru, 
  logo_url,
  cover_url,
  bookmarks_count,
  categories, 
  price, 
  service_url, 
  index = 0, 
  className = '' 
}: ServiceCardProps) {
  const badgeColor = categories ? getBadgeColor(categories.name) : 'from-gray-500 to-slate-500'
  const initials = getInitials(title)
  
  // Нормализуем URL изображений
  const normalizedCoverUrl = normalizeImageUrl(cover_url)
  const normalizedLogoUrl = normalizeImageUrl(logo_url)

  // Используем slug если есть, иначе fallback на ID
  const serviceLink = slug ? `/ai-services/${slug}` : `/ai-services/${id}`

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent-primary/30 cursor-pointer ${className} flex flex-col h-full`}
    >
      <Link href={serviceLink} className="block flex-1 flex flex-col h-full">
        {/* Category Badge */}
        {categories && (
          <div className="absolute top-4 left-4 z-20">
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${badgeColor} text-white text-xs font-semibold shadow-lg`}>
              {categories.name}
            </div>
          </div>
        )}

        {/* Cover Image */}
        {normalizedCoverUrl && (
          <div className="aspect-video rounded-t-3xl overflow-hidden">
            <Image
              src={normalizedCoverUrl}
              alt={`Скриншот интерфейса ${title}`}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.parentElement!.style.display = 'none'
              }}
            />
          </div>
        )}

        {/* Logo Area (если нет обложки) */}
        {!normalizedCoverUrl && (
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-3xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${badgeColor} opacity-10`} />
            {normalizedLogoUrl ? (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Image
                  src={normalizedLogoUrl}
                  alt={`Логотип ${title}`}
                  width={80}
                  height={80}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
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
        <div className="p-6 flex-1 flex flex-col">
          {/* Header with logo and title */}
          <div className="flex items-start gap-3 mb-4">
            {/* Logo (маленький) */}
            {normalizedLogoUrl && normalizedCoverUrl && (
              <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                <Image
                  src={normalizedLogoUrl}
                  alt={`Логотип ${title}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xs font-bold">${initials}</div>`
                  }}
                />
              </div>
            )}
            
            <div className={`flex-1 min-w-0 ${price ? 'items-start' : 'flex items-center h-12'}`}>
              <div className="w-full">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2 mb-1">
                  {title}
                </h3>
                {price && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg">
                    {price}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {short_description_ru || 'Описание сервиса'}
          </p>

          {/* CTA Button */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              {bookmarks_count && bookmarks_count > 0 ? (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{bookmarks_count}</span>
                </div>
              ) : (
                <div></div>
              )}
              <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                <span className="text-accent-primary group-hover:text-white text-base leading-none flex items-center justify-center w-full h-full">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 