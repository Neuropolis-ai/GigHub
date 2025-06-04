'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { AIService, Category } from '@/lib/supabase'

interface ServiceWithCategory extends AIService {
  categories: Category | null
}

export default function AIServicePage() {
  const params = useParams()
  const [service, setService] = useState<ServiceWithCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchService(params.id as string)
    }
  }, [params.id])

  const fetchService = async (id: string) => {
    try {
      const response = await fetch(`/api/ai-services/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Сервис не найден')
        }
        throw new Error('Не удалось загрузить информацию о сервисе')
      }
      const data = await response.json()
      setService(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Загружаем информацию о сервисе...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error || 'Сервис не найден'}
          </h2>
          <Link
            href="/ai-services"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Вернуться к списку сервисов
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/ai-services" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Вернуться к сервисам
          </Link>
          {service.categories && (
            <Link
              href={`/ai-services?category=${service.categories.id}`}
              className="text-blue-600 hover:text-blue-800 mb-4 inline-block ml-4"
            >
              Другие сервисы в категории "{service.categories.name}"
            </Link>
          )}
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {service.name}
              </h1>
              {service.categories && (
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {service.categories.name}
                </span>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {service.service_url && (
                <a
                  href={service.service_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Перейти на сайт
                  <span className="ml-2">↗</span>
                </a>
              )}
              
              {service.price && (
                <div className="flex items-center px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-700 font-semibold">
                    {service.price}
                  </span>
                </div>
              )}
            </div>
          </div>

          {service.short_description && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {service.short_description}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            {service.full_description && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Подробное описание
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {service.full_description}
                  </p>
                </div>
              </div>
            )}

            {/* FAQ */}
            {service.faq_ru && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Часто задаваемые вопросы (RU)
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {service.faq_ru}
                  </p>
                </div>
              </div>
            )}

            {service.faq && !service.faq_ru && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  FAQ
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {service.faq}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Disadvantages */}
            {service.disadvantages && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">
                  Недостатки
                </h3>
                <p className="text-red-700 text-sm leading-relaxed whitespace-pre-line">
                  {service.disadvantages}
                </p>
              </div>
            )}

            {/* Service Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Информация о сервисе
              </h3>
              
              <div className="space-y-3 text-sm">
                {service.categories && (
                  <div>
                    <span className="text-gray-600">Категория:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {service.categories.name}
                    </span>
                  </div>
                )}
                
                {service.price && (
                  <div>
                    <span className="text-gray-600">Цена:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {service.price}
                    </span>
                  </div>
                )}
                
                <div>
                  <span className="text-gray-600">Статус:</span>
                  <span className="ml-2 font-medium text-green-600">
                    Активен
                  </span>
                </div>

                {service.created_at && (
                  <div>
                    <span className="text-gray-600">Добавлен:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {new Date(service.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Быстрые действия
              </h3>
              
              <div className="space-y-3">
                {service.service_url && (
                  <a
                    href={service.service_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Открыть сайт
                  </a>
                )}
                
                <Link
                  href="/ai-services"
                  className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Все сервисы
                </Link>
                
                {service.categories && (
                  <Link
                    href={`/ai-services?category=${service.categories.id}`}
                    className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Сервисы категории
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 