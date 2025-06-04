'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ServiceCard, { ServiceCardProps } from './ServiceCard'

// Моковые данные для демонстрации
const mockFeaturedServices: ServiceCardProps[] = [
  {
    id: 1,
    title: 'SeamlessExpressive',
    short_description_ru: 'Мультиязычный перевод с сохранением стиля речи.',
    rating: 0,
    bookmarks_count: 28,
    cover_url: 'https://media.theresanaiforthat.com/covers/seamlessexpressive.jpg',
    logo_url: 'https://media.theresanaiforthat.com/icons/seamlessexpressive.svg',
    price: 'Бесплатно',
    service_url: 'https://example.com',
    categories: {
      id: 1,
      name: 'Текст',
      slug: 'text'
    }
  },
  {
    id: 2,
    title: 'NewOaks',
    short_description_ru: 'Персонализированный чат-бот для назначения встреч.',
    rating: 0,
    bookmarks_count: 18,
    cover_url: 'https://media.theresanaiforthat.com/covers/newoaks.jpg',
    logo_url: 'https://media.theresanaiforthat.com/icons/newoaks.svg',
    price: 'Бесплатно + от $19/мес',
    service_url: 'https://example.com',
    categories: {
      id: 2,
      name: 'Чат-боты',
      slug: 'chatbots'
    }
  },
  {
    id: 3,
    title: 'Create',
    short_description_ru: 'Создавайте приложения автомагически быстро',
    rating: 5.0,
    bookmarks_count: 93,
    cover_url: 'https://media.theresanaiforthat.com/covers/create.jpg',
    logo_url: 'https://media.theresanaiforthat.com/icons/create.svg',
    price: 'Бесплатно',
    service_url: 'https://example.com',
    categories: {
      id: 3,
      name: 'Безопасность',
      slug: 'security'
    }
  },
  {
    id: 4,
    title: 'MyFitChecker',
    short_description_ru: 'Советы по моде и оценки стиля на основе загруженных фотографий.',
    rating: 5.0,
    bookmarks_count: 54,
    cover_url: 'https://media.theresanaiforthat.com/covers/myfitchecker.jpg',
    logo_url: 'https://media.theresanaiforthat.com/icons/myfitchecker.svg',
    price: 'Бесплатно',
    service_url: 'https://example.com',
    categories: {
      id: 4,
      name: 'Создание контента',
      slug: 'content-creation'
    }
  },
  {
    id: 5,
    title: 'Simplify Extension',
    short_description_ru: 'Краткие обзоры обучающих видеороликов на YouTube.',
    rating: 0,
    bookmarks_count: 27,
    cover_url: 'https://media.theresanaiforthat.com/covers/simplify.jpg',
    logo_url: 'https://media.theresanaiforthat.com/icons/simplify.svg',
    price: 'Бесплатно + от $5/мес',
    service_url: 'https://example.com',
    categories: {
      id: 5,
      name: 'Видео',
      slug: 'video'
    }
  },
  {
    id: 6,
    title: 'Bidlytics',
    short_description_ru: 'Bidlytics: Согласованные предложения для государственных контрактов.',
    rating: 0,
    bookmarks_count: 31,
    cover_url: 'https://media.theresanaiforthat.com/covers/bidlytics.jpg',
    logo_url: 'https://media.theresanaiforthat.com/icons/bidlytics.svg',
    price: 'Бесплатно + от $29.99/мес',
    service_url: 'https://example.com',
    categories: {
      id: 6,
      name: 'Безопасность',
      slug: 'security'
    }
  }
]

export default function FeaturedTools() {
  const [featuredServices, setFeaturedServices] = useState<ServiceCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Имитируем загрузку данных
    const timer = setTimeout(() => {
      setFeaturedServices(mockFeaturedServices)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                {...service}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/ai-services">
            <button className="group px-8 py-4 bg-white border-2 border-accent-primary text-accent-primary rounded-2xl font-semibold hover:bg-accent-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg">
              <span className="flex items-center gap-2">
                Посмотреть все инструменты
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 