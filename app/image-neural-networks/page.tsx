'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, CheckCircle, Users, ExternalLink, Grid, Sparkles, TrendingUp, Clock, Image as ImageIcon, Palette, Camera, Wand2 } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'
import type { Metadata } from 'next'

const imageCapabilities = [
  {
    icon: Palette,
    title: "Генерация арта",
    description: "Создание уникальных художественных работ, иллюстраций и концепт-артов из текстового описания"
  },
  {
    icon: Camera,
    title: "Фотореализм",
    description: "Генерация реалистичных фотографий людей, природы, архитектуры и объектов"
  },
  {
    icon: Wand2,
    title: "Редактирование",
    description: "Улучшение качества, удаление фона, изменение стиля и обработка существующих изображений"
  },
  {
    icon: ImageIcon,
    title: "Стилизация",
    description: "Применение художественных стилей, фильтров и превращение фото в арт разных направлений"
  }
]

const topImageServices = [
  {
    name: "Midjourney",
    description: "Безусловный лидер в создании художественных изображений. Превосходное качество, уникальный стиль и активное сообщество художников.",
    category: "Арт",
    pricing: "Платная",
    features: ["Высокое качество", "Стили", "Сообщество", "V6 модель"],
    url: "https://midjourney.com",
    rating: 4.9,
    monthlyPrice: "$10-60",
    pros: ["Лучшее качество", "Уникальные стили", "Активное сообщество"],
    cons: ["Только платная", "Работа через Discord"]
  },
  {
    name: "DALL-E 3",
    description: "Самая продвинутая модель от OpenAI. Отлично понимает сложные текстовые описания и создает точные изображения.",
    category: "Универсальный",
    pricing: "Freemium",
    features: ["Точность", "ChatGPT интеграция", "Высокое разрешение", "Безопасность"],
    url: "https://openai.com/dall-e-3",
    rating: 4.8,
    monthlyPrice: "$20",
    pros: ["Точное понимание", "Интеграция с ChatGPT", "Безопасность"],
    cons: ["Ограничения контента", "Дорогая"]
  },
  {
    name: "Stable Diffusion",
    description: "Открытая модель с огромными возможностями кастомизации. Бесплатная, с множеством стилей и моделей.",
    category: "Open Source",
    pricing: "Бесплатная",
    features: ["Открытый код", "Кастомизация", "Модели", "Локальная работа"],
    url: "https://stability.ai",
    rating: 4.6,
    monthlyPrice: "Бесплатно",
    pros: ["Бесплатная", "Гибкость", "Множество моделей"],
    cons: ["Сложная настройка", "Нужны навыки"]
  },
  {
    name: "Leonardo AI",
    description: "Мощная платформа для создания изображений с бесплатным тарифом. Фокус на игровом арте и дизайне.",
    category: "Геймдев",
    pricing: "Freemium",
    features: ["Игровой арт", "3D", "Анимация", "Бесплатный план"],
    url: "https://leonardo.ai",
    rating: 4.5,
    monthlyPrice: "$10-48",
    pros: ["Бесплатный план", "Игровая специализация", "3D возможности"],
    cons: ["Ограничения в бесплатной версии", "Меньше стилей"]
  },
  {
    name: "Adobe Firefly",
    description: "ИИ-генератор от Adobe, интегрированный с Creative Suite. Безопасен для коммерческого использования.",
    category: "Дизайн",
    pricing: "Freemium",
    features: ["Adobe интеграция", "Коммерческая лицензия", "Фотошоп", "Безопасность"],
    url: "https://firefly.adobe.com",
    rating: 4.4,
    monthlyPrice: "$5-23",
    pros: ["Интеграция с Adobe", "Коммерческая лицензия", "Безопасность"],
    cons: ["Требует подписку Adobe", "Ограниченные стили"]
  },
  {
    name: "Kandinsky",
    description: "Российская нейросеть от Сбера для генерации изображений. Понимает русский язык и российскую культуру.",
    category: "Российский ИИ",
    pricing: "Freemium",
    features: ["Русский язык", "Культурный контекст", "Бесплатно", "Локальные данные"],
    url: "https://fusionbrain.ai",
    rating: 4.2,
    monthlyPrice: "Бесплатно",
    pros: ["Русский язык", "Бесплатная", "Понимает культуру"],
    cons: ["Меньше возможностей", "Новая разработка"]
  }
]

const useCases = [
  {
    title: "Маркетинг и реклама",
    description: "Создание баннеров, постеров, обложек для соцсетей и рекламных материалов",
    tools: ["Midjourney", "DALL-E 3", "Leonardo AI"],
    icon: "📢",
    examples: ["Баннеры для сайта", "Обложки для постов", "Рекламные креативы", "Логотипы"]
  },
  {
    title: "Дизайн и арт",
    description: "Художественные работы, концепт-арты, иллюстрации и творческие проекты",
    tools: ["Midjourney", "Stable Diffusion", "Leonardo AI"],
    icon: "🎨",
    examples: ["Концепт-арт", "Иллюстрации", "Арт для NFT", "Обложки книг"]
  },
  {
    title: "Контент для блогов",
    description: "Изображения для статей, превью видео, инфографика и визуальный контент",
    tools: ["DALL-E 3", "Adobe Firefly", "Leonardo AI"],
    icon: "📝",
    examples: ["Обложки статей", "Превью видео", "Инфографика", "Иконки"]
  },
  {
    title: "E-commerce",
    description: "Фото товаров, презентационные изображения и визуалы для интернет-магазинов",
    tools: ["Adobe Firefly", "DALL-E 3", "Stable Diffusion"],
    icon: "🛒",
    examples: ["Фото товаров", "Каталожные снимки", "Lifestyle фото", "Варианты упаковки"]
  },
  {
    title: "Геймдев",
    description: "Персонажи, локации, текстуры и игровые ассеты для разработки игр",
    tools: ["Leonardo AI", "Midjourney", "Stable Diffusion"],
    icon: "🎮",
    examples: ["Персонажи", "Локации", "Текстуры", "UI элементы"]
  },
  {
    title: "Архитектура и дизайн",
    description: "Визуализация интерьеров, экстерьеров и архитектурных концепций",
    tools: ["Midjourney", "Stable Diffusion", "DALL-E 3"],
    icon: "🏢",
    examples: ["Интерьеры", "Экстерьеры", "Ландшафт", "3D визуализация"]
  }
]

const styleCategories = [
  {
    name: "Фотореализм",
    description: "Реалистичные изображения, неотличимые от фотографий",
    examples: ["Портреты", "Пейзажи", "Продукты", "Архитектура"]
  },
  {
    name: "Художественные стили",
    description: "Классические и современные художественные направления",
    examples: ["Импрессионизм", "Сюрреализм", "Аниме", "Поп-арт"]
  },
  {
    name: "3D и рендеринг",
    description: "Объемные изображения и 3D-рендеры",
    examples: ["3D модели", "Изометрия", "Blender стиль", "Cinema 4D"]
  },
  {
    name: "Мультипликация",
    description: "Мультяшные и стилизованные изображения",
    examples: ["Пиксар стиль", "Дисней", "Аниме", "Комиксы"]
  }
]

const faqData = [
  {
    question: "Какая нейросеть лучше всего создает изображения?",
    answer: "Midjourney считается лучшей для художественных работ, DALL-E 3 - для точного следования описанию, а Stable Diffusion - для экспериментов и кастомизации. Выбор зависит от ваших задач: для профессионального арта - Midjourney, для точных изображений - DALL-E 3, для обучения и экспериментов - Stable Diffusion."
  },
  {
    question: "Можно ли использовать сгенерированные изображения коммерчески?",
    answer: "Да, большинство сервисов разрешают коммерческое использование. Midjourney и DALL-E дают полные права на созданные изображения при платной подписке. Adobe Firefly специально создан для коммерческого использования. Всегда проверяйте лицензионные соглашения конкретного сервиса."
  },
  {
    question: "Какое качество изображений можно получить?",
    answer: "Современные нейросети создают изображения высокого качества: до 1024x1024 пикселей в стандартном режиме, до 2048x2048 в премиум версиях. Midjourney и DALL-E 3 производят изображения, практически неотличимые от работ профессиональных художников и фотографов."
  },
  {
    question: "Есть ли бесплатные нейросети для создания изображений?",
    answer: "Да! Stable Diffusion полностью бесплатна, Leonardo AI предлагает 150 изображений в день бесплатно, Kandinsky от Сбера тоже бесплатна. DALL-E 3 дает несколько бесплатных генераций через Bing Image Creator. Adobe Firefly предлагает 25 изображений в месяц бесплатно."
  },
  {
    question: "Как написать хороший промпт для генерации изображений?",
    answer: "Эффективный промпт должен включать: основной объект, стиль (фотореализм, арт, мультипликация), детали (освещение, ракурс, цвета), качество (4K, высокое разрешение). Пример: 'Портрет женщины в стиле Ренессанса, мягкое освещение, детализированно, масляная живопись, 4K'. Изучайте примеры промптов в сообществах."
  },
  {
    question: "Можно ли редактировать сгенерированные изображения?",
    answer: "Да, многие сервисы предлагают функции редактирования: inpainting (замена частей изображения), outpainting (расширение изображения), upscaling (увеличение разрешения). DALL-E 3 и Adobe Firefly имеют встроенные редакторы. Также можно дорабатывать изображения в Photoshop или других графических редакторах."
  },
  {
    question: "Сколько времени занимает генерация изображения?",
    answer: "Современные нейросети работают очень быстро: Midjourney - 1-2 минуты, DALL-E 3 - 10-30 секунд, Stable Diffusion - от нескольких секунд до минуты в зависимости от настроек. Leonardo AI и Adobe Firefly также генерируют изображения за 10-60 секунд."
  },
  {
    question: "Какие ограничения есть у ИИ-генераторов изображений?",
    answer: "Основные ограничения: запрет на создание изображений реальных людей без согласия, ограничения на NSFW контент, иногда проблемы с текстом в изображениях, ограничения на создание логотипов известных брендов. Каждый сервис имеет свои правила использования."
  }
]

export default function ImageNeuralNetworksPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchImageServices()
  }, [searchTerm, selectedCategory])

  const fetchImageServices = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: '1',
        limit: '20',
        sort: 'bookmarks_count',
        order: 'desc'
      })

      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory) params.append('category_id', selectedCategory)

      const response = await fetch(`/api/ai-services?${params}`)
      if (!response.ok) throw new Error('Ошибка загрузки данных')

      const data = await response.json()
      setServices(data.data || [])
    } catch (error) {
      console.error('Ошибка:', error)
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* JSON-LD разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Нейросети для изображений — ИИ-генераторы картинок",
            "description": "Лучшие нейросети для создания и обработки изображений",
            "url": "https://gighub.ru/image-neural-networks",
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": faqData.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <nav className="container mx-auto px-6 py-4">
          <ol className="flex items-center space-x-2 text-sm text-text-secondary">
            <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
            <li className="mx-2">/</li>
            <li><span className="text-text-primary">Нейросети для изображений</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <div
              className="text-center max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <ImageIcon className="w-8 h-8 text-purple-500" />
                <span className="text-purple-500 font-semibold">
                  ИИ для изображений
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Нейросети для <span className="text-gradient bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">изображений</span> —<br className="hidden md:block" />
                создавайте арт с помощью ИИ
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Откройте для себя мощные нейросети для создания уникальных изображений, фото и арта. 
                От Midjourney до Stable Diffusion — найдите идеальный ИИ-художник для ваших творческих задач.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-500" />
                  <span>Художественный арт</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-pink-500" />
                  <span>Фотореализм</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-blue-500" />
                  <span>Редактирование</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#services" className="inline-flex items-center px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold">
                  Смотреть сервисы
                </Link>
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-colors font-semibold">
                  Полный каталог
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Возможности <span className="text-purple-500">ИИ-художников</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Современные нейросети превзошли многих художников в скорости и качестве
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {imageCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <capability.icon className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Лучшие <span className="text-purple-500">нейросети</span> для изображений 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Детальное сравнение топовых ИИ-генераторов изображений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {topImageServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text-primary">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.pricing === 'Freemium' 
                          ? 'bg-blue-100 text-blue-700'
                          : service.pricing === 'Бесплатная'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {service.pricing}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{service.rating}</span>
                    </div>
                    <span className="text-sm font-medium text-purple-600">
                      {service.monthlyPrice}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">✅ Плюсы:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.pros.map((pro, idx) => (
                          <li key={idx}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-600 mb-1">❌ Минусы:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.cons.map((con, idx) => (
                          <li key={idx}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <a 
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-600 font-medium"
                  >
                    Попробовать <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold">
                Смотреть все сервисы
              </Link>
            </div>
          </div>
        </section>

        {/* Style Categories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Стили и категории <span className="text-purple-500">изображений</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                От фотореализма до мультипликации — создавайте в любом стиле
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {styleCategories.map((style, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {style.name}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {style.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Примеры:</p>
                    <div className="flex flex-wrap gap-2">
                      {style.examples.map((example, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Сферы применения <span className="text-purple-500">ИИ-изображений</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Узнайте, какие нейросети лучше всего подходят для ваших задач
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {useCase.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-700">Рекомендуемые инструменты:</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Примеры задач:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {useCase.examples.map((example, idx) => (
                        <span key={idx} className="text-sm text-gray-600">• {example}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Catalog Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Полный каталог <span className="text-purple-500">ИИ-генераторов</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите идеальную нейросеть для создания изображений из нашей коллекции
              </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск генераторов изображений..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Services Grid */}
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
            ) : services.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    {...service}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Сервисы не найдены
                </h3>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  Попробуйте изменить запрос или вернитесь к полному каталогу
                </p>
                <Link href="/ai-services" className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
                  Открыть каталог
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Вопросы о <span className="text-purple-500">нейросетях изображений</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о создании изображений с помощью ИИ
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-text-primary pr-4">
                        {faq.question}
                      </h3>
                      <div
                        className="flex-shrink-0"
                      >
                        <CheckCircle className={`w-6 h-6 ${openFAQ === index ? 'text-purple-500' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </button>
                  
                  {openFAQ === index && (
                    <div
                    >
                      <div className="px-8 pb-6 border-t border-gray-100">
                        <p className="text-text-secondary leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-6 text-center">
            <div
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Начните создавать <span className="text-purple-500">уникальные изображения</span> с ИИ
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Миллионы художников и дизайнеров уже используют нейросети для создания потрясающих изображений. 
                Присоединяйтесь и воплотите свои идеи в реальность за минуты.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold">
                  Открыть каталог
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-colors font-semibold">
                  Бесплатные ИИ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 