'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ServiceCard, { ServiceCardProps } from './ServiceCard'

export default function FeaturedTools() {
  const [featuredServices, setFeaturedServices] = useState<ServiceCardProps[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fetchFeaturedServices = async () => {
      try {
        const response = await fetch('/api/ai-services?limit=6&sort=bookmarks_count&order=desc')
        if (response.ok) {
          const data = await response.json()
          if (data.data && Array.isArray(data.data)) {
            setFeaturedServices(data.data)
          } else {
            console.error('Неожиданная структура ответа:', data)
          }
        } else {
          console.error('Ошибка загрузки сервисов:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedServices()
  }, [])

  // Показываем скелетон пока компонент не смонтирован или данные загружаются
  if (!mounted || loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              <span className="text-gradient">Лучшие инструменты</span> недели
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Проверенные временем ИИ-сервисы, которые используют миллионы пользователей по всему миру
            </p>
          </div>

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
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            <span className="text-gradient">Лучшие инструменты</span> недели
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Проверенные временем ИИ-сервисы, которые используют миллионы пользователей по всему миру
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              index={0}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/ai-services">
            <button className="group px-8 py-4 bg-white border-2 border-accent-primary text-accent-primary rounded-2xl font-semibold hover:bg-accent-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg transform active:scale-95">
              <span className="flex items-center gap-2">
                Посмотреть все инструменты
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
} 