'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Типы для навигации
interface NavigationItem {
  id: string
  title: string
  description: string
  icon: string
}

// Данные для навигации по странице
const navigationItems: NavigationItem[] = [
  {
    id: 'top-ai-tools',
    title: 'ТОП-5 нейросетей',
    description: 'Лучшие ИИ-генераторы 2025',
    icon: '🏆'
  },
  {
    id: 'comparison-table',
    title: 'Сравнительная таблица',
    description: 'Все характеристики в одном месте',
    icon: '📊'
  },
  {
    id: 'free-tools',
    title: 'Бесплатные сервисы',
    description: 'Генерация без платной подписки',
    icon: '💚'
  },
  {
    id: 'prompt-guide',
    title: 'Как писать промпты',
    description: 'Секреты эффективных запросов',
    icon: '💡'
  },
  {
    id: 'interactive-tools',
    title: 'Интерактивные инструменты',
    description: 'Калькуляторы и генераторы',
    icon: '🛠️'
  },
  {
    id: 'faq',
    title: 'Частые вопросы',
    description: 'Ответы на популярные вопросы',
    icon: '❓'
  }
]

// Данные для демонстрационных изображений
const demoImages = [
  {
    url: '/images/midjourney-example.jpg',
    alt: 'Пример изображения Midjourney',
    watermark: 'Midjourney',
    style: 'Фотореализм'
  },
  {
    url: '/images/dalle-example.jpg', 
    alt: 'Пример изображения DALL-E 3',
    watermark: 'DALL-E 3',
    style: 'Концепт-арт'
  },
  {
    url: '/images/stable-diffusion-example.jpg',
    alt: 'Пример изображения Stable Diffusion',
    watermark: 'Stable Diffusion',
    style: 'Аниме'
  },
  {
    url: '/images/leonardo-example.jpg',
    alt: 'Пример изображения Leonardo AI',
    watermark: 'Leonardo AI',
    style: 'Игровая графика'
  }
]

const ImageGenerationHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Автоматическая смена изображений
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % demoImages.length)
        setIsAnimating(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Функция для скрола к разделу
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-200 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-100 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Левая колонка - текстовый контент */}
          <div className="text-center lg:text-left space-y-8">
            
            {/* H1 Заголовок */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Лучшие нейросети</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  для генерации изображений 2025
                </span>
              </h1>
              
              {/* Анимированная полоска под заголовком */}
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto lg:mx-0 animate-pulse" />
            </div>

            {/* Лид-абзац */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                Полный обзор <strong className="text-blue-600">ТОП-5 ИИ-генераторов картинок</strong>: 
                Midjourney, DALL-E 3, Stable Diffusion и другие.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Создавайте уникальные изображения за секунды с помощью 
                <strong className="text-purple-600"> нейросетей для фото</strong> и художественной генерации.
              </p>
            </div>

            {/* Быстрые статистики */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-600">Лучших ИИ</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Бесплатных</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-pink-600">50+</div>
                <div className="text-sm text-gray-600">Стилей</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-indigo-600">10+</div>
                <div className="text-sm text-gray-600">Языков</div>
              </div>
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('top-ai-tools')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                🚀 Смотреть ТОП-5
              </button>
              <button
                onClick={() => scrollToSection('free-tools')}
                className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                💚 Бесплатные варианты
              </button>
            </div>
          </div>

          {/* Правая колонка - визуальный якорь */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              
              {/* Главное изображение с эффектом карусели */}
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <div 
                  className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                >
                  <Image
                    src={demoImages[currentImageIndex]?.url || '/images/ai-placeholder.jpg'}
                    alt={demoImages[currentImageIndex]?.alt || 'Пример ИИ изображения'}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Водяной знак */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                    <div className="text-sm font-semibold">
                      {demoImages[currentImageIndex]?.watermark}
                    </div>
                    <div className="text-xs text-gray-300">
                      {demoImages[currentImageIndex]?.style}
                    </div>
                  </div>
                </div>

                {/* Индикаторы изображений */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {demoImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white shadow-lg' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Плавающие мини-карточки */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-1000">
                <div className="text-2xl">🎨</div>
                <div className="text-xs font-semibold text-gray-600">Арт</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-2000">
                <div className="text-2xl">📸</div>
                <div className="text-xs font-semibold text-gray-600">Фото</div>
              </div>
            </div>
          </div>
        </div>

        {/* Блок навигации / Оглавление */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              🗺️ Навигация по странице
            </h2>
            <p className="text-gray-600">
              Быстро перейдите к интересующему разделу
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Стрелка вниз для скрола */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('top-ai-tools')}
          className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default ImageGenerationHero 