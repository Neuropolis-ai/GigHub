'use client'

import React, { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ExternalLink, Star, Tag, Check, X, ArrowRight, Bookmark, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { AIServiceWithCategory } from '@/lib/supabase'
import useAnalytics from '@/app/hooks/useAnalytics'
import FAQSection from './components/FAQSection'
import SocialShare from './components/SocialShare'

interface FAQItem {
  question: string
  answer: string
}

export default function AIServicePage() {
  const params = useParams()
  const serviceId = params.id as string
  
  const [service, setService] = useState<AIServiceWithCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [relatedServices, setRelatedServices] = useState<AIServiceWithCategory[]>([])
  const { 
    trackServiceView,
    trackExternalLink
  } = useAnalytics()

  const fetchService = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ai-services/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          notFound()
          return
        }
        throw new Error('Ошибка загрузки сервиса')
      }

      const data = await response.json()
      setService(data.data)
      setRelatedServices(data.relatedServices || [])
      
      // Отслеживание просмотра страницы
      trackServiceView({
        item_id: data.data.slug || data.data.id.toString(),
        item_name: data.data.title,
        item_category: data.data.categories?.name || 'unknown'
      })
      
    } catch (error) {
      console.error('Ошибка загрузки:', error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (serviceId) {
      fetchService(serviceId)
    }
  }, [serviceId])

  if (loading) {
    return (
      <div className="min-h-screen-mobile bg-gray-50 safe-area-inset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div 
            className="bg-white rounded-3xl p-4 sm:p-8 shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-6 sm:h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-2/3 mb-6 animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!service) {
    return notFound()
  }

  // Парсинг преимуществ и недостатков
  const advantages = service.advantages_ru 
    ? service.advantages_ru.split('\n').filter(item => item.trim())
    : []
  
  const disadvantages = service.disadvantages_ru 
    ? service.disadvantages_ru.split('\n').filter(item => item.trim())
    : []

  // Парсинг FAQ
  const parseFAQ = (text: string): FAQItem[] => {
    if (!text) return []
    
    const lines = text.split('\n').filter(line => line.trim())
    const faqItems: FAQItem[] = []
    let currentQuestion = ''
    let currentAnswer = ''
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      if (trimmedLine.match(/^(\?|Q:|Вопрос:|В:)/i) || trimmedLine.endsWith('?')) {
        if (currentQuestion && currentAnswer) {
          faqItems.push({
            question: currentQuestion.replace(/^(\?|Q:|Вопрос:|В:)\s*/i, ''),
            answer: currentAnswer.replace(/^(A:|Ответ:|О:)\s*/i, '')
          })
        }
        currentQuestion = trimmedLine
        currentAnswer = ''
      } else if (trimmedLine.match(/^(A:|Ответ:|О:)/i) || currentQuestion) {
        currentAnswer += (currentAnswer ? ' ' : '') + trimmedLine
      }
    }
    
    if (currentQuestion && currentAnswer) {
      faqItems.push({
        question: currentQuestion.replace(/^(\?|Q:|Вопрос:|В:)\s*/i, ''),
        answer: currentAnswer.replace(/^(A:|Ответ:|О:)\s*/i, '')
      })
    }
    
    return faqItems
  }

  const faqData = service.faq_ru ? parseFAQ(service.faq_ru) : []

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="min-h-screen-mobile bg-gray-50 safe-area-inset">
      {/* Breadcrumbs */}
      <motion.nav 
        className="bg-white border-b border-gray-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 overflow-x-auto">
            <Link href="/" className="hover:text-gray-700 whitespace-nowrap">Главная</Link>
            <span>/</span>
            <Link href="/ai-services" className="hover:text-gray-700 whitespace-nowrap">Каталог</Link>
            <span>/</span>
            {service.categories && (
              <>
                <Link 
                  href={`/ai-services?category=${service.categories.slug}`}
                  className="hover:text-gray-700 whitespace-nowrap"
                >
                  {service.categories.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{service.title}</span>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header 
        className="bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <motion.div 
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Logo and Title */}
              <div className="flex items-start gap-3 sm:gap-4">
                {service.logo_url && (
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
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
                <div className="flex-grow min-w-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    {service.title}
                  </h1>
                  {service.categories && (
                    <span className="inline-block bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {service.categories.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                {service.short_description_ru || 'Описание недоступно'}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 sm:gap-6">
                {service.bookmarks_count && service.bookmarks_count > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{service.bookmarks_count}</span>
                    <span className="text-gray-500 text-sm sm:text-base">закладок</span>
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
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 min-h-[56px] bg-accent-primary text-white rounded-xl font-semibold hover:bg-accent-primary/90 transition-all shadow-lg touch-manipulation"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base sm:text-lg">Попробовать сервис</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              )}
            </motion.div>

            {/* Right: Cover Image */}
            <motion.div 
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {service.cover_url ? (
                <figure className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden aspect-video">
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
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-blue-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl sm:text-6xl font-bold text-white/30">
                      {service.title ? service.title.charAt(0) : '?'}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Main Content */}
          <article className="lg:col-span-2 space-y-8 sm:space-y-12">
            {/* Description */}
            {service.full_description_ru && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">О продукте</h2>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
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
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Преимущества</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {advantages.map((advantage, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3 p-3 sm:p-4 bg-green-50 rounded-xl touch-manipulation"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base">{advantage.trim()}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* FAQ */}
            {faqData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <FAQSection faqs={faqData} />
              </motion.div>
            )}

            {/* Disadvantages */}
            {disadvantages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Ограничения</h2>
                <div className="space-y-3">
                  {disadvantages.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3 p-3 sm:p-4 bg-red-50 rounded-xl touch-manipulation"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{item.trim()}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </article>

          {/* Right: Sidebar */}
          <aside className="space-y-6 sm:space-y-8">
            {/* CTA Card */}
            <motion.div 
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Попробовать {service.title}</h3>
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
                    className="block w-full px-6 py-3 min-h-[50px] bg-accent-primary text-white rounded-xl font-semibold hover:bg-accent-primary/90 transition-all touch-manipulation"
                    whileTap={{ scale: 0.98 }}
                  >
                    Перейти к сервису
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Social Share */}
            <motion.div 
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Поделиться</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <SocialShare service={service} />
                <motion.button
                  onClick={handleBookmark}
                  className={`flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-xl font-medium transition-colors touch-manipulation ${
                    isBookmarked 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span className="text-sm sm:text-base">{isBookmarked ? 'Сохранено' : 'Сохранить'}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Service Info */}
            <motion.div 
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Информация</h3>
              <div className="space-y-3">
                {service.categories && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Категория</span>
                    <Link 
                      href={`/ai-services?category=${service.categories.slug}`}
                      className="text-accent-primary hover:text-accent-primary/90 font-medium text-sm sm:text-base touch-manipulation"
                    >
                      {service.categories.name}
                    </Link>
                  </div>
                )}
                {service.bookmarks_count && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Популярность</span>
                    <span className="font-semibold text-sm sm:text-base">{service.bookmarks_count} закладок</span>
                  </div>
                )}
                {service.created_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Добавлено</span>
                    <span className="font-medium text-sm sm:text-base">
                      {new Date(service.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </aside>
        </div>
      </motion.main>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <motion.section 
          className="bg-white py-8 sm:py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Похожие сервисы
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Другие ИИ-сервисы из категории "{service.categories?.name}"
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedServices.map((relatedService, index) => (
                <motion.div
                  key={relatedService.id}
                  className="bg-gray-50 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-lg transition-shadow touch-manipulation"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {relatedService.cover_url && (
                    <div className="aspect-video relative bg-gray-200">
                      <Image
                        src={relatedService.cover_url}
                        alt={`Скриншот ${relatedService.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
                      {relatedService.short_description_ru}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {relatedService.bookmarks_count || 0}
                        </span>
                      </div>
                      
                      <Link
                        href={`/ai-services/${relatedService.slug || relatedService.id}`}
                        className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-primary/90 font-medium text-sm touch-manipulation min-h-[44px] px-2 py-1"
                      >
                        Подробнее
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
} 