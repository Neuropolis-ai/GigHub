'use client'

import { Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useAnalytics from '@/app/hooks/useAnalytics'

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
  return name.split(' ')
    .filter(word => word.trim().length > 0)
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
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
  const { trackServiceView } = useAnalytics()
  
  // Нормализуем URL изображений
  const normalizedCoverUrl = normalizeImageUrl(cover_url)
  const normalizedLogoUrl = normalizeImageUrl(logo_url)

  // Используем slug если есть, иначе fallback на ID
  const serviceLink = slug ? `/ai-services/${slug}` : `/ai-services/${id}`

  const handleCardClick = () => {
    // Отслеживаем клик по карточке
    trackServiceView({
      item_id: slug || id.toString(),
      item_name: title,
      item_category: categories?.name || 'Неопределенная',
      price: price || 'Бесплатно',
      currency: 'USD'
    })
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent-primary/30 cursor-pointer min-h-[320px] sm:min-h-[350px] flex flex-col h-full touch-manipulation ${className}`}
    >
      <Link href={serviceLink} className="block flex-1 flex flex-col h-full" onClick={handleCardClick}>
        {/* Category Badge */}
        {categories && (
          <div className="absolute top-4 left-4 z-20">
            <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r ${badgeColor} text-white text-xs font-semibold shadow-lg`}>
              {categories.name}
            </div>
          </div>
        )}

        {/* Cover Image */}
        {normalizedCoverUrl && (
          <div className="aspect-[4/3] sm:aspect-video rounded-t-3xl overflow-hidden">
            <Image
              src={normalizedCoverUrl}
              alt={`Скриншот интерфейса ${title}`}
              width={400}
              height={300}
              className="w-full h-full object-cover"
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
          <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-3xl">
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
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          {/* Header with logo and title */}
          <div className="flex items-start gap-3 mb-4">
            {/* Logo (увеличенный для мобильных) */}
            {normalizedLogoUrl && normalizedCoverUrl && (
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                <Image
                  src={normalizedLogoUrl}
                  alt={`Логотип ${title}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xs font-bold">${initials}</div>`
                  }}
                />
              </div>
            )}
            
            {/* Заголовок с условным выравниванием */}
            <div className={`flex-1 min-w-0 ${!price && normalizedLogoUrl && normalizedCoverUrl ? 'flex items-center' : ''}`}>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2 line-clamp-2 leading-tight">
                  {title}
                </h3>
                {price && (
                  <div className="text-accent-primary font-normal text-xs sm:text-sm">
                    {price}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description с обработкой преимуществ/недостатков */}
          {short_description_ru && (
            <div className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4 flex-1">
              {short_description_ru.split('\n').map((line, index) => {
                const trimmedLine = line.trim()
                if (trimmedLine.startsWith('-')) {
                  // Преимущество/недостаток - убираем дефис и добавляем стилизацию
                  const content = trimmedLine.substring(1).trim()
                  return (
                    <div key={index} className="flex items-start gap-2 mb-1">
                      <span className="text-accent-primary mt-1 flex-shrink-0">•</span>
                      <span>{content}</span>
                    </div>
                  )
                } else if (trimmedLine) {
                  // Обычный текст
                  return (
                    <p key={index} className="line-clamp-3 mb-2">
                      {trimmedLine}
                    </p>
                  )
                }
                return null
              }).filter(Boolean).slice(0, 4)} {/* Ограничиваем количество строк */}
            </div>
          )}

          {/* Footer с улучшенными touch targets */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            {bookmarks_count !== null && bookmarks_count !== undefined && (
              <div className="flex items-center gap-2 text-text-secondary">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">{bookmarks_count}</span>
              </div>
            )}
            
            <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary transition-all duration-300">
              <ExternalLink className="w-4 h-4 text-accent-primary group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 