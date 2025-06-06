'use client'

import React, { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ExternalLink, Star, Tag, Check, X, ArrowRight, Bookmark, Share2 } from 'lucide-react'
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
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Главная</Link>
            <span>/</span>
            <Link href="/ai-services" className="hover:text-gray-700">Каталог</Link>
            <span>/</span>
            {service.categories && (
              <>
                <Link 
                  href={`/ai-services?category=${service.categories.slug}`}
                  className="hover:text-gray-700"
                >
                  {service.categories.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{service.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
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
                <a
                  href={service.service_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink({
                    service_name: service.title,
                    service_url: service.service_url!,
                    source_page: 'service_detail_hero'
                  })}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Попробовать сервис
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Right: Cover Image */}
            <div className="relative">
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
                    <div className="text-6xl font-bold text-white/30">
                      {service.title ? service.title.charAt(0) : '?'}
                    </div>
                  </div>
                </div>
              )}
            </div>
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
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">О продукте</h2>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {service.full_description_ru}
                </p>
              </section>
            )}

            {/* Advantages */}
            {advantages.length > 0 && (
              <section>
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
              </section>
            )}

            {/* FAQ */}
            {faqData.length > 0 && <FAQSection faqs={faqData} />}

            {/* Disadvantages */}
            {disadvantages.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Ограничения</h2>
                <div className="space-y-3">
                  {disadvantages.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                      <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right: Sidebar */}
          <aside className="space-y-8">
            {/* CTA Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Попробовать {service.title}</h3>
                <p className="text-gray-600 text-sm">
                  Начните использовать {service.title} уже сегодня
                </p>
                {service.service_url && (
                  <a
                    href={service.service_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackExternalLink({
                      service_name: service.title,
                      service_url: service.service_url!,
                      source_page: 'service_detail_sidebar'
                    })}
                    className="block w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
                  >
                    Перейти к сервису
                  </a>
                )}
              </div>
            </div>

            {/* Social Share */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Поделиться</h3>
              <div className="flex items-center gap-3">
                <SocialShare service={service} />
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    isBookmarked 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Сохранено' : 'Сохранить'}
                </button>
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация</h3>
              <div className="space-y-3">
                {service.categories && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Категория</span>
                    <Link 
                      href={`/ai-services?category=${service.categories.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {service.categories.name}
                    </Link>
                  </div>
                )}
                {service.bookmarks_count && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Популярность</span>
                    <span className="font-semibold">{service.bookmarks_count} закладок</span>
                  </div>
                )}
                {service.created_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Добавлено</span>
                    <span className="font-medium">
                      {new Date(service.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Похожие сервисы
              </h2>
              <p className="text-gray-600 text-lg">
                Другие ИИ-сервисы из категории "{service.categories?.name}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <div
                  key={relatedService.id}
                  className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
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
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
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
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Подробнее
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
} 