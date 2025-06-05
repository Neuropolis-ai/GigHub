'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  Users, 
  Check, 
  X,
  Calendar,
  Tag,
  DollarSign
} from 'lucide-react'
import { AIServiceWithCategory } from '@/lib/supabase'
import ServiceSEO from './components/ServiceSEO'
import Breadcrumbs from './components/Breadcrumbs'
import FAQSection from './components/FAQSection'
import SocialShare from './components/SocialShare'
import useAnalytics from '@/app/hooks/useAnalytics'

export default function AIServicePage() {
  const params = useParams()
  const [service, setService] = useState<AIServiceWithCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { trackServiceView, trackExternalLink } = useAnalytics()

  useEffect(() => {
    if (params.id) {
      fetchService(params.id as string)
    }
  }, [params.id])

  useEffect(() => {
    // Отслеживаем просмотр сервиса
    if (service) {
      trackServiceView({
        item_id: service.slug || service.id.toString(),
        item_name: service.title,
        item_category: service.categories?.name || 'Неопределенная',
        price: service.price || 'Бесплатно',
        currency: 'USD'
      })
    }
  }, [service, trackServiceView])

  const fetchService = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ai-services/${id}`)
      
      if (!response.ok) {
        throw new Error('Сервис не найден')
      }
      
      const data = await response.json()
      setService(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  // Парсинг преимуществ из текста
  const advantages = service?.advantages_ru 
    ? service.advantages_ru.split('\n')
        .filter(item => item.trim())
        .map(item => item.trim().replace(/^-+\s*/, ''))
        .filter(item => item.length > 0)
    : []

  // Парсинг недостатков из текста
  const disadvantages = service?.disadvantages_ru 
    ? service.disadvantages_ru.split('\n')
        .filter(item => item.trim())
        .map(item => item.trim().replace(/^-+\s*/, ''))
        .filter(item => item.length > 0)
    : []

  // Парсинг FAQ из текста
  const faqItems = service?.faq_ru 
    ? service.faq_ru.split('\n').filter(item => item.trim())
    : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загружаем информацию о сервисе...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Сервис не найден</h2>
          <p className="text-gray-600 mb-6">{error || 'Запрашиваемый сервис не существует'}</p>
          <Link 
            href="/ai-services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO метатеги и структурированные данные */}
      <ServiceSEO service={service} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="relative bg-white border-b pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <Breadcrumbs service={service} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Logo and Title */}
                <div className="flex items-start gap-4">
                  {service.logo_url && (
                    <div className="flex-shrink-0 w-16 h-16">
                      <Image
                        src={service.logo_url || ''}
                        alt={`Логотип ${service.title}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain rounded-xl"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h1>
                    {service.categories && (
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {service.categories.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xl text-gray-600 leading-relaxed">
                  {service.short_description_ru || 'Описание недоступно'}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  {service.bookmarks_count && service.bookmarks_count > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">{service.bookmarks_count}</span>
                      <span className="text-gray-500">закладок</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                {service.service_url && (
                  <motion.a
                    href={service.service_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackExternalLink({
                      service_name: service.title,
                      service_url: service.service_url!,
                      source_page: 'service_detail_hero'
                    })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Попробовать сервис
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                )}
              </motion.div>

              {/* Right: Cover Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {service.cover_url ? (
                  <figure className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden aspect-video">
                    <Image
                      src={service.cover_url || ''}
                      alt={`Скриншот интерфейса ${service.title}`}
                      fill
                      className="object-cover"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.parentElement!.style.display = 'none'
                      }}
                    />
                  </figure>
                ) : (
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-bold text-white/30">{service.title.charAt(0)}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Main Content */}
            <article className="lg:col-span-2 space-y-12">
              {/* Description */}
              {service.full_description_ru && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">О продукте</h2>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                    {service.full_description_ru}
                  </p>
                </motion.section>
              )}

              {/* Advantages */}
              {advantages.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Преимущества</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{advantage.trim()}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* FAQ */}
              <FAQSection faqText={service.faq_ru} />

              {/* Disadvantages */}
              {disadvantages.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Ограничения</h2>
                  <div className="space-y-3">
                    {disadvantages.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                        <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </article>

            {/* Right: Sidebar */}
            <aside className="space-y-8">
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Попробовать {service.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Начните использовать {service.title} уже сегодня
                  </p>
                  {service.service_url && (
                    <motion.a
                      href={service.service_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink({
                        service_name: service.title,
                        service_url: service.service_url!,
                        source_page: 'service_detail_sidebar'
                      })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация</h3>
                <dl className="space-y-3">
                  {service.bookmarks_count && service.bookmarks_count > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Закладки</dt>
                      <dd className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">{service.bookmarks_count}</span>
                      </dd>
                    </div>
                  )}
                  
                  {service.categories && (
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Категория</dt>
                      <dd className="font-semibold">{service.categories.name}</dd>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Статус</dt>
                    <dd className="font-semibold text-green-600">Активен</dd>
                  </div>
                  
                  {service.date_added && (
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Добавлен</dt>
                      <dd className="font-semibold">{new Date(service.date_added).toLocaleDateString('ru-RU')}</dd>
                    </div>
                  )}
                </dl>
              </motion.div>

              {/* Pricing Card */}
              {service.price && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Стоимость</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {service.price}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Актуальные тарифы смотрите на официальном сайте
                  </p>
                </motion.div>
              )}

              {/* Social Share */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Поделиться</h3>
                <div className="flex justify-center">
                  <SocialShare service={service} />
                </div>
                <p className="text-sm text-gray-600 text-center mt-3">
                  Расскажите друзьям о полезном сервисе
                </p>
              </motion.div>

              {/* Quick Actions */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg"
                aria-label="Быстрые действия"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <Link
                    href="/ai-services"
                    className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Все сервисы
                  </Link>
                  {service.categories && (
                    <Link
                      href={`/ai-services?category=${service.categories.slug || service.categories.id}`}
                      className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Сервисы категории
                    </Link>
                  )}
                </div>
              </motion.nav>
            </aside>
          </div>
        </main>
      </div>
    </>
  )
} 