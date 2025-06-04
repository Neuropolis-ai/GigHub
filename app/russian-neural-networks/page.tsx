'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, CheckCircle, ExternalLink, Flag, Users, Star, Globe } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросети на русском языке — ИИ-сервисы с поддержкой русского 2025',
  description: 'Подборка нейросетей с полной поддержкой русского языка. ИИ-чаты, генераторы текста и изображений, понимающие русский. Отечественные и зарубежные сервисы.',
  keywords: 'нейросети на русском, русские нейросети, ии на русском языке, нейросеть русский язык, yandex gpt, gigachat, kandinsky',
  openGraph: {
    title: 'Нейросети на русском — ИИ с поддержкой русского языка',
    description: 'ТОП русскоязычных нейросетей и ИИ-сервисов. YandexGPT, GigaChat, Kandinsky и другие.',
    url: 'https://gighub.ru/russian-neural-networks',
    images: [
      {
        url: 'https://gighub.ru/og-russian-neural-networks.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросети на русском языке - ИИ для российских пользователей',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросети на русском — ИИ с поддержкой русского языка',
    description: 'ТОП русскоязычных нейросетей и ИИ-сервисов',
  },
}

const russianAdvantages = [
  {
    icon: Flag,
    title: "Понимание культуры",
    description: "Русскоязычные ИИ лучше понимают российские реалии, культурные особенности и контекст"
  },
  {
    icon: Globe,
    title: "Локальные данные",
    description: "Обучение на российских данных обеспечивает более точные и релевантные ответы"
  },
  {
    icon: Users,
    title: "Поддержка на русском",
    description: "Техническая поддержка и документация на родном языке"
  },
  {
    icon: Star,
    title: "Соответствие законам",
    description: "Соблюдение российского законодательства и требований регуляторов"
  }
]

const domesticServices = [
  {
    name: "YandexGPT",
    company: "Яндекс",
    description: "Мощная языковая модель от Яндекса с глубоким пониманием русского языка и российских реалий.",
    category: "Текст",
    pricing: "Freemium",
    features: ["Русский язык", "Поиск Яндекса", "API", "Бизнес-интеграция"],
    url: "https://yandex.cloud/services/yandexgpt",
    rating: 4.6,
    pros: ["Отличное понимание русского", "Интеграция с Яндекс.Поиском", "Российская разработка"],
    cons: ["Ограниченный функционал", "Требует регистрации в Яндекс.Облаке"]
  },
  {
    name: "GigaChat",
    company: "Сбер",
    description: "Российский аналог ChatGPT от Сбера с поддержкой русского языка и мультимодальными возможностями.",
    category: "Чат-бот",
    pricing: "Freemium",
    features: ["Русский язык", "Изображения", "Код", "Безопасность"],
    url: "https://gigachat.ru",
    rating: 4.4,
    pros: ["Полностью на русском", "Мультимодальность", "Российские серверы"],
    cons: ["Новая разработка", "Ограниченный доступ"]
  },
  {
    name: "Kandinsky",
    company: "Сбер",
    description: "Российская нейросеть для генерации изображений с пониманием русских промптов и культурного контекста.",
    category: "Изображения",
    pricing: "Бесплатная",
    features: ["Русские промпты", "Культурный контекст", "Бесплатно", "API"],
    url: "https://fusionbrain.ai",
    rating: 4.2,
    pros: ["Понимает русский", "Бесплатная", "Российская культура"],
    cons: ["Меньше стилей", "Развивающийся проект"]
  }
]

const internationalServices = [
  {
    name: "ChatGPT",
    company: "OpenAI",
    description: "Лидер среди ИИ-чатботов с хорошей поддержкой русского языка и возможностью общения на русском.",
    category: "Универсальный",
    pricing: "Freemium",
    features: ["Русский язык", "GPT-4", "Плагины", "API"],
    rating: 4.8,
    pros: ["Лучшее качество", "Широкий функционал", "Активное развитие"],
    cons: ["Платная подписка", "Блокировки в РФ"]
  },
  {
    name: "Claude",
    company: "Anthropic",
    description: "Безопасный ИИ-ассистент с отличным пониманием русского языка и этичным поведением.",
    category: "Ассистент",
    pricing: "Freemium",
    features: ["Русский язык", "Безопасность", "Длинный контекст", "Анализ"],
    rating: 4.7,
    pros: ["Безопасность", "Этичность", "Качественные ответы"],
    cons: ["Ограниченный доступ", "Консервативность"]
  }
]

const faqData = [
  {
    question: "Какие российские нейросети лучше всего понимают русский язык?",
    answer: "YandexGPT и GigaChat специально разработаны для русского языка и показывают лучшее понимание российских реалий. YandexGPT интегрирован с поиском Яндекса, а GigaChat от Сбера поддерживает мультимодальность. Kandinsky отлично генерирует изображения по русским описаниям."
  },
  {
    question: "Можно ли использовать зарубежные нейросети на русском языке?",
    answer: "Да, ChatGPT, Claude и другие зарубежные ИИ хорошо понимают русский язык. Однако они могут хуже понимать российские реалии, культурные особенности и актуальную информацию о России. Также возможны ограничения доступа."
  },
  {
    question: "Есть ли бесплатные русскоязычные нейросети?",
    answer: "Да! Kandinsky полностью бесплатна для генерации изображений. GigaChat и YandexGPT предлагают бесплатные тарифы с ограничениями. Многие зарубежные сервисы также имеют бесплатные планы с поддержкой русского языка."
  },
  {
    question: "Безопасно ли использовать российские нейросети для бизнеса?",
    answer: "Российские нейросети соответствуют местному законодательству и требованиям по защите данных. Данные обрабатываются на территории РФ, что важно для соблюдения 152-ФЗ. Для критически важных данных рекомендуется изучить политики конфиденциальности."
  },
  {
    question: "Какая нейросеть лучше для создания контента на русском языке?",
    answer: "Для текстового контента лучше всего подходят YandexGPT и GigaChat - они понимают российские реалии и создают естественный русский текст. Для изображений используйте Kandinsky. ChatGPT также хорош, но может требовать более детальных промптов на русском."
  }
]

export default function RussianNeuralNetworksPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchRussianServices()
  }, [searchTerm])

  const fetchRussianServices = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: '1',
        limit: '20',
        sort: 'bookmarks_count',
        order: 'desc'
      })

      if (searchTerm) params.append('search', searchTerm)

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
            "name": "Нейросети на русском языке — ИИ-сервисы с поддержкой русского",
            "description": "Подборка нейросетей с полной поддержкой русского языка",
            "url": "https://gighub.ru/russian-neural-networks",
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
            <li><span className="text-text-primary">Нейросети на русском</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-blue-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Flag className="w-8 h-8 text-red-500" />
                <span className="text-red-500 font-semibold">
                  ИИ на русском языке
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Нейросети на <span className="text-gradient bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">русском языке</span> —<br className="hidden md:block" />
                ИИ для российских пользователей
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Откройте для себя нейросети с полной поддержкой русского языка. От отечественных разработок 
                до зарубежных сервисов — найдите ИИ, который понимает российские реалии и культуру.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-red-500" />
                  <span>Российские ИИ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Русская локализация</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>Поддержка на русском</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#domestic" className="inline-flex items-center px-8 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold">
                  Российские ИИ
                </Link>
                <Link href="#international" className="inline-flex items-center px-8 py-4 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors font-semibold">
                  Зарубежные с русским
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Преимущества <span className="text-red-500">русскоязычных ИИ</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Почему стоит выбирать нейросети с поддержкой русского языка
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {russianAdvantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Domestic Services Section */}
        <section id="domestic" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Российские <span className="text-red-500">нейросети</span> 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Отечественные разработки с глубоким пониманием русского языка
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domesticServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">{service.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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

                  <div className="space-y-2 mb-4">
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
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                  >
                    Попробовать <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* International Services Section */}
        <section id="international" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Зарубежные ИИ с <span className="text-blue-500">русским языком</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Лучшие международные сервисы с поддержкой русского языка
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internationalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">{service.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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

                  <div className="space-y-2">
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Catalog Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Полный каталог <span className="text-red-500">русскоязычных ИИ</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите идеальную нейросеть с поддержкой русского языка
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск русскоязычных ИИ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    {...service}
                    index={index}
                  />
                ))}
              </motion.div>
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
                <Link href="/ai-services" className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                  Открыть каталог
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Вопросы о <span className="text-red-500">русскоязычных ИИ</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о нейросетях с поддержкой русского языка
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-text-primary pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <CheckCircle className={`w-6 h-6 ${openFAQ === index ? 'text-red-500' : 'text-gray-400'}`} />
                      </motion.div>
                    </div>
                  </button>
                  
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 border-t border-gray-200">
                        <p className="text-text-secondary leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-blue-50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Начните использовать <span className="text-red-500">русскоязычные ИИ</span> уже сегодня
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Миллионы российских пользователей уже используют нейросети на родном языке. 
                Присоединяйтесь и получите максимум от ИИ с пониманием русской культуры.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold">
                  Открыть каталог
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors font-semibold">
                  Бесплатные ИИ
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 