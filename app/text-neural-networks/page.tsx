'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, CheckCircle, Users, ExternalLink, Grid, Sparkles, TrendingUp, Clock, FileText, Edit3, MessageSquare, Zap } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'

const textCapabilities = [
  {
    icon: Edit3,
    title: "Создание контента",
    description: "Статьи, посты, описания товаров, сценарии и любой другой текстовый контент"
  },
  {
    icon: MessageSquare,
    title: "Диалоги и чаты",
    description: "Умные собеседники, помощники, консультанты и чат-боты"
  },
  {
    icon: FileText,
    title: "Редактирование",
    description: "Улучшение стиля, исправление ошибок, рерайт и адаптация текста"
  },
  {
    icon: Zap,
    title: "Автоматизация",
    description: "Переводы, резюме, анализ тональности и обработка больших объемов"
  }
]

const topTextServices = [
  {
    name: "ChatGPT",
    description: "Самая популярная нейросеть для генерации текста. Отвечает на вопросы, пишет статьи, помогает с кодом и творческими задачами.",
    category: "Универсальный ИИ",
    pricing: "Freemium",
    features: ["Диалоги", "Статьи", "Код", "Переводы"],
    url: "https://chat.openai.com",
    rating: 4.8
  },
  {
    name: "Claude",
    description: "Продвинутый ИИ-ассистент от Anthropic. Отлично работает с длинными документами, анализирует контекст до 200К токенов.",
    category: "Аналитический ИИ",
    pricing: "Freemium",
    features: ["Длинные тексты", "Анализ", "Безопасность", "Этика"],
    url: "https://claude.ai",
    rating: 4.7
  },
  {
    name: "Jasper",
    description: "Специализированная нейросеть для маркетингового копирайтинга. Шаблоны для рекламы, email-рассылок и контент-маркетинга.",
    category: "Маркетинг",
    pricing: "Платная",
    features: ["Копирайтинг", "Реклама", "Email", "SEO"],
    url: "https://jasper.ai",
    rating: 4.5
  },
  {
    name: "Copy.ai",
    description: "ИИ-помощник для создания продающих текстов. Генерирует заголовки, описания, посты для соцсетей и рекламные материалы.",
    category: "Копирайтинг",
    pricing: "Freemium",
    features: ["Заголовки", "Соцсети", "Реклама", "Продажи"],
    url: "https://copy.ai",
    rating: 4.4
  },
  {
    name: "Writesonic",
    description: "Универсальная платформа для создания контента. От статей до рекламных текстов с поддержкой 25+ языков.",
    category: "Контент",
    pricing: "Freemium",
    features: ["Статьи", "Блоги", "Реклама", "25+ языков"],
    url: "https://writesonic.com",
    rating: 4.3
  },
  {
    name: "Notion AI",
    description: "ИИ-помощник встроенный в Notion. Помогает писать, редактировать и структурировать заметки прямо в рабочем пространстве.",
    category: "Продуктивность",
    pricing: "Freemium",
    features: ["Заметки", "Планирование", "Редактирование", "Структура"],
    url: "https://notion.so",
    rating: 4.6
  }
]

const useCases = [
  {
    title: "Копирайтинг и маркетинг",
    description: "Создание продающих текстов, рекламных материалов, email-рассылок",
    tools: ["Jasper", "Copy.ai", "Writesonic"],
    icon: "📝"
  },
  {
    title: "Контент для блогов",
    description: "Статьи, обзоры, гайды и другой информационный контент",
    tools: ["ChatGPT", "Claude", "Writesonic"],
    icon: "📰"
  },
  {
    title: "Социальные сети",
    description: "Посты, подписи к фото, хештеги и контент для SMM",
    tools: ["Copy.ai", "Jasper", "ChatGPT"],
    icon: "📱"
  },
  {
    title: "Деловая переписка",
    description: "Письма, предложения, отчеты и официальная документация",
    tools: ["Claude", "ChatGPT", "Notion AI"],
    icon: "💼"
  },
  {
    title: "Творческое письмо",
    description: "Рассказы, сценарии, стихи и художественные тексты",
    tools: ["ChatGPT", "Claude", "Writesonic"],
    icon: "🎭"
  },
  {
    title: "Переводы и локализация",
    description: "Перевод текстов с сохранением стиля и контекста",
    tools: ["ChatGPT", "Claude", "DeepL"],
    icon: "🌍"
  }
]

const faqData = [
  {
    question: "Какая нейросеть лучше всего подходит для создания текста?",
    answer: "Для универсальных задач лучше всего подходит ChatGPT — он бесплатный, понимает русский язык и справляется с большинством текстовых задач. Для длинных документов выбирайте Claude, для маркетинга — Jasper или Copy.ai."
  },
  {
    question: "Можно ли использовать нейросети для коммерческих текстов?",
    answer: "Да, большинство нейросетей разрешают коммерческое использование сгенерированного контента. Однако рекомендуется проверять лицензионные соглашения конкретного сервиса и всегда редактировать ИИ-тексты перед публикацией."
  },
  {
    question: "Как нейросети понимают русский язык?",
    answer: "Современные нейросети обучены на многоязычных данных и хорошо понимают русский. ChatGPT, Claude и другие топовые модели свободно генерируют тексты на русском, сохраняя грамматику и стилистику."
  },
  {
    question: "Нужно ли проверять тексты от нейросетей на уникальность?",
    answer: "Да, обязательно. Хотя нейросети генерируют уникальный контент, рекомендуется проверять тексты на плагиат и всегда редактировать их перед публикацией для улучшения качества и добавления экспертности."
  },
  {
    question: "Какие ограничения есть у бесплатных версий?",
    answer: "Бесплатные версии обычно имеют лимиты на количество запросов в день, длину текста или доступ к продвинутым функциям. ChatGPT дает 40 сообщений в 3 часа, Claude — около 5 сообщений в час."
  },
  {
    question: "Можно ли обучить нейросеть своему стилю письма?",
    answer: "Да, многие сервисы позволяют настраивать стиль через промпты или загрузку примеров. Некоторые платформы предлагают fine-tuning для создания персонализированных моделей под ваш бренд или стиль."
  }
]

export default function TextNeuralNetworksPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchTextServices()
  }, [searchTerm, selectedCategory])

  const fetchTextServices = async () => {
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
            "name": "Нейросети для текста — ИИ-генераторы текста",
            "description": "Лучшие нейросети для создания и обработки текста",
            "url": "https://gighub.ru/text-neural-networks",
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
            <li><span className="text-text-primary">Нейросети для текста</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <div
              className="text-center max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <FileText className="w-8 h-8 text-green-500" />
                <span className="text-green-500 font-semibold">
                  ИИ для текста
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Нейросети для <span className="text-gradient bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">текста</span> —<br className="hidden md:block" />
                создавайте контент с помощью ИИ
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Откройте для себя мощные нейросети для создания, редактирования и обработки текста. 
                От ChatGPT до специализированных ИИ-копирайтеров — найдите идеальный инструмент для ваших задач.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-green-500" />
                  <span>Создание контента</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span>Диалоги и чаты</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span>Автоматизация</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#services" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold">
                  Смотреть сервисы
                </Link>
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-colors font-semibold">
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
                Возможности <span className="text-green-500">текстовых ИИ</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Современные нейросети умеют работать с текстом на профессиональном уровне
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {textCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <capability.icon className="w-8 h-8 text-green-500" />
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
                Лучшие <span className="text-green-500">нейросети</span> для текста 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Проверенные ИИ-инструменты для создания качественного контента
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {topTextServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text-primary">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.pricing === 'Freemium' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {service.pricing}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{service.rating}</span>
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
                  
                  <a 
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 font-medium"
                  >
                    Попробовать <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold">
                Смотреть все сервисы
              </Link>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Сферы применения <span className="text-green-500">текстовых ИИ</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Узнайте, какие нейросети лучше всего подходят для ваших задач
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {useCase.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Рекомендуемые инструменты:</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Catalog Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Полный каталог <span className="text-green-500">текстовых ИИ</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите идеальную нейросеть для работы с текстом из нашей коллекции
              </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск текстовых нейросетей..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
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
                <Link href="/ai-services" className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                  Открыть каталог
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Вопросы о <span className="text-green-500">текстовых нейросетях</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о работе с ИИ для создания текста
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-text-primary pr-4">
                        {faq.question}
                      </h3>
                      <div
                        className="flex-shrink-0"
                      >
                        <CheckCircle className={`w-6 h-6 ${openFAQ === index ? 'text-green-500' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </button>
                  
                  {openFAQ === index && (
                    <div
                    >
                      <div className="px-8 pb-6 border-t border-gray-200">
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
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="container mx-auto px-6 text-center">
            <div
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Начните создавать <span className="text-green-500">контент</span> с ИИ
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Миллионы авторов уже используют нейросети для создания качественного контента. 
                Присоединяйтесь и ускорьте свою работу с текстом в 10 раз.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold">
                  Открыть каталог
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-colors font-semibold">
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