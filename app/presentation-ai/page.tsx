'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, CheckCircle, Users, ExternalLink, Presentation, Sparkles, TrendingUp, Clock, BarChart3, FileText, Palette, Zap } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'

const presentationCapabilities = [
  {
    icon: Presentation,
    title: "Автогенерация слайдов",
    description: "Создание полных презентаций из текстового описания за считанные минуты"
  },
  {
    icon: Palette,
    title: "Дизайн и стили",
    description: "Автоматический подбор цветов, шрифтов и визуальных элементов"
  },
  {
    icon: BarChart3,
    title: "Графики и диаграммы",
    description: "Создание информативных графиков и визуализации данных"
  },
  {
    icon: Zap,
    title: "Быстрое редактирование",
    description: "Изменение контента и дизайна простыми текстовыми командами"
  }
]

const topPresentationServices = [
  {
    name: "Gamma",
    description: "Революционная платформа для создания презентаций с помощью ИИ. Создает полные презентации из краткого описания с профессиональным дизайном.",
    category: "Презентации",
    pricing: "Freemium",
    features: ["Автогенерация", "Веб-интерфейс", "Шаблоны", "Экспорт"],
    url: "https://gamma.app",
    rating: 4.8,
    monthlyPrice: "$0-20",
    pros: ["Очень простое использование", "Отличный дизайн", "Быстрая генерация"],
    cons: ["Ограничения в бесплатной версии", "Мало кастомизации"]
  },
  {
    name: "Beautiful.AI",
    description: "ИИ-платформа с умными шаблонами, которые автоматически адаптируются под ваш контент. Идеально для корпоративных презентаций.",
    category: "Корпоративные",
    pricing: "Платная", 
    features: ["Умные шаблоны", "Брендинг", "Командная работа", "Аналитика"],
    url: "https://beautiful.ai",
    rating: 4.6,
    monthlyPrice: "$12-40",
    pros: ["Профессиональные шаблоны", "Автоматическое форматирование", "Командные функции"],
    cons: ["Только платная версия", "Высокая цена"]
  },
  {
    name: "Tome",
    description: "Генеративная платформа для создания презентаций и документов. Создает интерактивные истории из простых промптов.",
    category: "Сторителлинг",
    pricing: "Freemium",
    features: ["Генеративный ИИ", "Интерактивность", "3D контент", "Веб-презентации"],
    url: "https://tome.app",
    rating: 4.5,
    monthlyPrice: "$0-20",
    pros: ["Инновационный подход", "Интерактивные элементы", "Бесплатная версия"],
    cons: ["Сложность для новичков", "Ограниченный экспорт"]
  },
  {
    name: "Decktopus",
    description: "ИИ-помощник для создания презентаций с фокусом на продажи и питчи. Готовые структуры для разных типов презентаций.",
    category: "Продажи",
    pricing: "Freemium",
    features: ["Питч-шаблоны", "ИИ-контент", "Формы лидов", "Аналитика"],
    url: "https://decktopus.com",
    rating: 4.4,
    monthlyPrice: "$0-30",
    pros: ["Специализация на продажах", "Готовые структуры", "Встроенная аналитика"],
    cons: ["Узкая специализация", "Мало общих шаблонов"]
  },
  {
    name: "Slides AI",
    description: "Дополнение для Google Slides, которое создает презентации с помощью ИИ прямо в привычном интерфейсе Google.",
    category: "Google Workspace",
    pricing: "Freemium",
    features: ["Google Slides", "Автотекст", "Изображения", "Интеграция"],
    url: "https://slidesai.io",
    rating: 4.2,
    monthlyPrice: "$0-20",
    pros: ["Интеграция с Google", "Привычный интерфейс", "Доступная цена"],
    cons: ["Ограниченная функциональность", "Зависимость от Google"]
  },
  {
    name: "Simplified",
    description: "Многофункциональная дизайн-платформа с ИИ-функциями для создания презентаций, постов и других визуальных материалов.",
    category: "Дизайн",
    pricing: "Freemium",
    features: ["Мультиформат", "ИИ-дизайн", "Библиотека", "Командная работа"],
    url: "https://simplified.com",
    rating: 4.3,
    monthlyPrice: "$0-30",
    pros: ["Универсальность", "Большая библиотека", "Доступная цена"],
    cons: ["Перегруженный интерфейс", "Фокус не только на презентациях"]
  }
]

const useCases = [
  {
    title: "Бизнес-презентации",
    description: "Питчи для инвесторов, отчеты, планы развития и корпоративные презентации",
    tools: ["Beautiful.AI", "Decktopus", "Gamma"],
    icon: "💼",
    examples: ["Питч-деки", "Квартальные отчеты", "Планы развития", "Презентации продукта"]
  },
  {
    title: "Образование и обучение",
    description: "Лекции, курсы, вебинары и образовательные материалы",
    tools: ["Gamma", "Tome", "Slides AI"],
    icon: "🎓",
    examples: ["Онлайн-курсы", "Лекции", "Учебные материалы", "Вебинары"]
  },
  {
    title: "Маркетинг и продажи",
    description: "Презентации продуктов, клиентские предложения и маркетинговые материалы",
    tools: ["Decktopus", "Beautiful.AI", "Simplified"],
    icon: "📈",
    examples: ["Продуктовые презентации", "Клиентские предложения", "Кейс-стади", "Демо"]
  },
  {
    title: "Креативные проекты",
    description: "Портфолио, творческие презентации и интерактивные истории",
    tools: ["Tome", "Gamma", "Simplified"],
    icon: "🎨",
    examples: ["Портфолио дизайнера", "Творческие проекты", "Интерактивные истории", "Концепции"]
  }
]

const benefits = [
  {
    title: "Экономия времени",
    description: "Создание презентации за 5-10 минут вместо нескольких часов",
    icon: "⏱️"
  },
  {
    title: "Профессиональный дизайн",
    description: "ИИ подбирает цвета, шрифты и компоновку на уровне дизайнера",
    icon: "🎨"
  },
  {
    title: "Умный контент",
    description: "Автоматическая генерация текста, заголовков и структуры",
    icon: "🧠"
  },
  {
    title: "Адаптивность",
    description: "Легкие изменения и адаптация под разные аудитории",
    icon: "🔄"
  }
]

const faqData = [
  {
    question: "Какая нейросеть лучше всего создает презентации?",
    answer: "Gamma считается лидером благодаря простоте использования и качеству результата. Beautiful.AI лучше для корпоративных презентаций, Tome — для интерактивных историй, а Decktopus специализируется на продажах и питчах."
  },
  {
    question: "Можно ли создать полную презентацию только с помощью ИИ?",
    answer: "Да, современные ИИ могут создать полную презентацию из краткого описания: структуру, контент, дизайн и даже изображения. Gamma и Tome генерируют готовые презентации за несколько минут."
  },
  {
    question: "Качественные ли получаются презентации от нейросетей?",
    answer: "Качество очень высокое — многие ИИ-презентации неотличимы от работы профессиональных дизайнеров. Особенно хороши Beautiful.AI и Gamma в плане визуального дизайна и типографики."
  },
  {
    question: "Есть ли бесплатные нейросети для презентаций?",
    answer: "Да! Gamma, Tome, Decktopus и Slides AI предлагают бесплатные версии. Ограничения обычно в количестве презентаций в месяц или доступе к премиум-шаблонам."
  },
  {
    question: "Можно ли редактировать ИИ-презентации?",
    answer: "Конечно! Все сервисы позволяют редактировать контент, менять дизайн, добавлять слайды. Многие поддерживают редактирование через текстовые команды или визуальные редакторы."
  },
  {
    question: "Поддерживают ли ИИ-сервисы русский язык?",
    answer: "Большинство топовых сервисов поддерживают русский: Gamma, Tome, Beautiful.AI хорошо работают с русским текстом. Некоторые могут иметь ограничения в ИИ-генерации контента на русском."
  },
  {
    question: "Можно ли экспортировать презентации в PowerPoint?",
    answer: "Да, большинство платформ поддерживают экспорт в PPTX, PDF или веб-формате. Beautiful.AI и Gamma позволяют скачать презентации для редактирования в PowerPoint."
  }
]

export default function PresentationAIPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchPresentationServices()
  }, [searchTerm])

  const fetchPresentationServices = async () => {
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
            "name": "Нейросети для презентаций — ИИ для создания слайдов",
            "description": "Лучшие нейросети для создания презентаций и слайдов",
            "url": "https://gighub.ru/presentation-ai",
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
            <li><span className="text-text-primary">Нейросети для презентаций</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Presentation className="w-8 h-8 text-blue-500" />
                <span className="text-blue-500 font-semibold">
                  ИИ для презентаций
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Нейросети для <span className="text-gradient bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">презентаций</span> —<br className="hidden md:block" />
                создавайте слайды за минуты
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Откройте для себя мощные ИИ-инструменты для создания профессиональных презентаций. 
                От Gamma до Beautiful.AI — создавайте впечатляющие слайды за считанные минуты, не тратя часы на дизайн.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Presentation className="w-4 h-4 text-blue-500" />
                  <span>Автогенерация слайдов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-500" />
                  <span>Профессиональный дизайн</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>За 5-10 минут</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                  Смотреть сервисы
                </Link>
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-colors font-semibold">
                  Полный каталог
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
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
                Почему выбирают <span className="text-blue-500">ИИ для презентаций</span>?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Искусственный интеллект революционизирует создание презентаций
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Services Section */}
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
                Лучшие <span className="text-blue-500">нейросети</span> для презентаций 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Детальное сравнение топовых ИИ-инструментов для создания слайдов
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {topPresentationServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text-primary">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.pricing === 'Freemium' 
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
                    <span className="text-sm font-medium text-blue-600">
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
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Попробовать <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                Смотреть все сервисы
              </Link>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
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
                Сферы применения <span className="text-blue-500">ИИ-презентаций</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Узнайте, какие нейросети лучше всего подходят для ваших задач
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
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
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Примеры задач:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {useCase.examples.map((example, idx) => (
                        <span key={idx} className="text-sm text-gray-600">• {example}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Catalog Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Полный каталог <span className="text-blue-500">ИИ для презентаций</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите идеальную нейросеть для создания презентаций из нашей коллекции
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск ИИ для презентаций..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                <Link href="/ai-services" className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
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
                Вопросы о <span className="text-blue-500">ИИ-презентациях</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о создании презентаций с помощью ИИ
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
                    className="w-full px-8 py-6 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
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
                        <CheckCircle className={`w-6 h-6 ${openFAQ === index ? 'text-blue-500' : 'text-gray-400'}`} />
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
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Создавайте <span className="text-blue-500">впечатляющие презентации</span> за минуты
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Тысячи спикеров и бизнесменов уже используют ИИ для создания презентаций. 
                Присоединяйтесь и сократите время на создание слайдов в 10 раз.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                  Открыть каталог
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-colors font-semibold">
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