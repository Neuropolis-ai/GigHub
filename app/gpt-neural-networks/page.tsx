'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, CheckCircle, Users, ExternalLink, Brain, Sparkles, TrendingUp, Clock, Bot, Zap, History, Star } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'

const gptCapabilities = [
  {
    icon: Brain,
    title: "Генеративный ИИ",
    description: "Создание осмысленного текста на основе обучения на огромных массивах данных"
  },
  {
    icon: Zap,
    title: "Контекстное понимание",
    description: "Глубокое понимание контекста и способность поддерживать логичные диалоги"
  },
  {
    icon: Bot,
    title: "Мультизадачность",
    description: "Решение широкого спектра задач: от написания кода до создания контента"
  },
  {
    icon: Sparkles,
    title: "Творческие способности",
    description: "Генерация креативного контента, идей и решений нестандартных задач"
  }
]

const gptEvolution = [
  {
    version: "GPT-1 (2018)",
    parameters: "117M параметров",
    description: "Первая модель, доказавшая эффективность трансформерной архитектуры для генерации текста",
    achievements: ["Базовая генерация текста", "Понимание простых инструкций"],
    icon: "🌱"
  },
  {
    version: "GPT-2 (2019)",
    parameters: "1.5B параметров",
    description: "Значительное улучшение качества текста, способность к более длинным и связным текстам",
    achievements: ["Качественная генерация", "Лучшее понимание контекста", "Zero-shot задачи"],
    icon: "🌿"
  },
  {
    version: "GPT-3 (2020)",
    parameters: "175B параметров",
    description: "Революционный прорыв в ИИ, способность выполнять сложные задачи без дообучения",
    achievements: ["Few-shot обучение", "Многозадачность", "Высококачественный код"],
    icon: "🌳"
  },
  {
    version: "GPT-4 (2023)",
    parameters: "~1.7T параметров",
    description: "Мультимодальная модель с возможностью обработки изображений и улучшенным пониманием",
    achievements: ["Мультимодальность", "Улучшенная логика", "Профессиональный уровень"],
    icon: "🏆"
  }
]

const topGPTServices = [
  {
    name: "ChatGPT",
    description: "Оригинальный и самый популярный GPT-сервис от OpenAI. Доступны GPT-3.5 и GPT-4 модели для любых задач.",
    developer: "OpenAI",
    model: "GPT-4 / GPT-3.5",
    pricing: "Freemium",
    features: ["Веб-интерфейс", "API", "Плагины", "Кодирование"],
    url: "https://chat.openai.com",
    rating: 4.9,
    monthlyPrice: "$0-20",
    pros: ["Лучшее качество ответов", "Постоянные обновления", "Огромное сообщество"],
    cons: ["Очереди в бесплатной версии", "Ограничения использования"]
  },
  {
    name: "GPT-4 API",
    description: "Прямой доступ к GPT-4 через API OpenAI для разработчиков и интеграции в собственные приложения.",
    developer: "OpenAI",
    model: "GPT-4",
    pricing: "Pay-per-use",
    features: ["REST API", "Streaming", "Функции", "Embeddings"],
    url: "https://platform.openai.com",
    rating: 4.8,
    monthlyPrice: "$0.03/1K токенов",
    pros: ["Максимальная гибкость", "Лучшая модель", "Быстрая интеграция"],
    cons: ["Требует программирования", "Высокая стоимость при больших объемах"]
  },
  {
    name: "AutoGPT",
    description: "Автономный ИИ-агент на базе GPT-4, способный самостоятельно планировать и выполнять сложные задачи.",
    developer: "Open Source",
    model: "GPT-4",
    pricing: "Бесплатно",
    features: ["Автономность", "Планирование", "Веб-поиск", "Файловые операции"],
    url: "https://autogpt.net",
    rating: 4.4,
    monthlyPrice: "Бесплатно + API",
    pros: ["Полная автономность", "Открытый код", "Сложные задачи"],
    cons: ["Требует технических знаний", "Может быть непредсказуемым"]
  },
  {
    name: "GPT-3.5 Turbo",
    description: "Более быстрая и экономичная версия GPT-3.5, оптимизированная для чат-интерфейсов и диалогов.",
    developer: "OpenAI",
    model: "GPT-3.5 Turbo",
    pricing: "Pay-per-use",
    features: ["Высокая скорость", "Низкая цена", "Чат-оптимизация", "API"],
    url: "https://platform.openai.com",
    rating: 4.6,
    monthlyPrice: "$0.002/1K токенов",
    pros: ["Очень быстрый", "Доступная цена", "Хорошее качество"],
    cons: ["Уступает GPT-4", "Ограниченный контекст"]
  },
  {
    name: "Bing Chat (GPT-4)",
    description: "Бесплатный доступ к GPT-4 через поисковик Bing с возможностями веб-поиска и актуальной информации.",
    developer: "Microsoft",
    model: "GPT-4",
    pricing: "Бесплатно",
    features: ["Бесплатный GPT-4", "Веб-поиск", "Изображения", "Интеграция"],
    url: "https://bing.com/chat",
    rating: 4.3,
    monthlyPrice: "Бесплатно",
    pros: ["Бесплатный GPT-4", "Актуальная информация", "Веб-интеграция"],
    cons: ["Ограничения на запросы", "Менее гибкий интерфейс"]
  },
  {
    name: "Perplexity AI",
    description: "GPT-модель, оптимизированная для поиска и анализа информации с цитированием источников.",
    developer: "Perplexity AI",
    model: "GPT-4 / GPT-3.5",
    pricing: "Freemium",
    features: ["Поиск с источниками", "Анализ", "Citations", "Pro модели"],
    url: "https://perplexity.ai",
    rating: 4.5,
    monthlyPrice: "$0-20",
    pros: ["Цитирование источников", "Качественный поиск", "Актуальная информация"],
    cons: ["Фокус только на поиске", "Ограниченная креативность"]
  }
]

const gptUseCases = [
  {
    title: "Программирование и разработка",
    description: "Написание кода, отладка, code review и создание документации",
    tools: ["ChatGPT", "GPT-4 API", "GitHub Copilot"],
    icon: "💻",
    examples: ["Написание функций", "Исправление багов", "Код-ревью", "Документация API"],
    difficulty: "Продвинутый"
  },
  {
    title: "Контент и копирайтинг",
    description: "Создание статей, постов в соцсетях, email-рассылок и рекламных текстов",
    tools: ["ChatGPT", "GPT-3.5 Turbo", "Claude"],
    icon: "✍️",
    examples: ["Статьи для блога", "Посты в соцсетях", "Email-кампании", "Продающие тексты"],
    difficulty: "Начинающий"
  },
  {
    title: "Исследования и анализ",
    description: "Анализ данных, составление отчетов и исследование сложных тем",
    tools: ["Perplexity AI", "ChatGPT", "GPT-4"],
    icon: "🔍",
    examples: ["Анализ рынка", "Научные исследования", "Бизнес-отчеты", "Сбор информации"],
    difficulty: "Средний"
  },
  {
    title: "Автоматизация задач",
    description: "Создание автономных агентов для выполнения сложных многоэтапных задач",
    tools: ["AutoGPT", "GPT-4 API", "LangChain"],
    icon: "🤖",
    examples: ["Автоматические воркфлоу", "Планирование проектов", "Мониторинг", "Агенты"],
    difficulty: "Эксперт"
  }
]

const benefits = [
  {
    title: "Передовые технологии",
    description: "GPT представляет новейшие достижения в области искусственного интеллекта",
    icon: "🚀"
  },
  {
    title: "Универсальность",
    description: "Одна модель для множества задач: от творчества до программирования",
    icon: "🔧"
  },
  {
    title: "Постоянное развитие",
    description: "Регулярные обновления и улучшения возможностей моделей",
    icon: "📈"
  },
  {
    title: "Открытая экосистема",
    description: "Множество сервисов и интеграций на базе GPT-технологий",
    icon: "🌐"
  }
]

const faqData = [
  {
    question: "В чем разница между GPT-3.5 и GPT-4?",
    answer: "GPT-4 значительно превосходит GPT-3.5 по качеству ответов, логике и понимаю контекста. GPT-4 может обрабатывать изображения, имеет больший контекст (32K против 4K токенов) и лучше справляется со сложными задачами. Однако GPT-3.5 работает быстрее и стоит дешевле."
  },
  {
    question: "Можно ли использовать GPT бесплатно?",
    answer: "Да! ChatGPT предлагает бесплатный доступ к GPT-3.5. Bing Chat дает бесплатный доступ к GPT-4 с ограничениями. AutoGPT бесплатен, но требует API-ключ OpenAI. Для коммерческого использования обычно нужна платная подписка."
  },
  {
    question: "Безопасно ли использовать GPT для конфиденциальных данных?",
    answer: "OpenAI заявляет, что данные пользователей API не используются для обучения, но для веб-интерфейса это не гарантируется. Для конфиденциальных данных лучше использовать API с соответствующими настройками или локальные решения."
  },
  {
    question: "Какой GPT-сервис лучше для программирования?",
    answer: "Для программирования лучше всего GPT-4 через ChatGPT Plus или API. GitHub Copilot специально оптимизирован для кода. GPT-3.5 Turbo подходит для простых задач программирования и стоит дешевле."
  },
  {
    question: "Может ли GPT заменить человека в работе?",
    answer: "GPT может автоматизировать многие рутинные задачи и значительно повысить продуктивность, но полностью заменить человека в большинстве профессий не может. GPT лучше рассматривать как мощного помощника, который дополняет человеческие способности."
  },
  {
    question: "Какие ограничения у современных GPT-моделей?",
    answer: "Основные ограничения: могут генерировать неточную информацию, ограниченный объем контекста, отсутствие доступа к актуальной информации (кроме специальных версий), сложности с логическими и математическими задачами высокой сложности."
  },
  {
    question: "Стоит ли изучать работу с GPT?",
    answer: "Абсолютно! Умение эффективно работать с GPT становится важным навыком во многих профессиях. Это инвестиция в будущее, которая уже сейчас может значительно повысить вашу продуктивность в работе и творчестве."
  }
]

export default function GPTNeuralNetworksPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchGPTServices()
  }, [searchTerm])

  const fetchGPTServices = async () => {
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
            "name": "GPT нейросети — полный гид по ChatGPT и GPT-моделям",
            "description": "Полный гид по GPT нейросетям и ChatGPT",
            "url": "https://gighub.ru/gpt-neural-networks",
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
            <li><span className="text-text-primary">GPT нейросети</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Brain className="w-8 h-8 text-purple-500" />
                <span className="text-purple-500 font-semibold">
                  GPT нейросети
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                <span className="text-gradient bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">GPT нейросети</span> —<br className="hidden md:block" />
                революция искусственного интеллекта
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Полный гид по генеративным моделям GPT: от ChatGPT до AutoGPT. 
                Изучите историю развития, сравните версии и найдите лучшие GPT-сервисы для ваших задач.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span>Генеративный ИИ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>175B+ параметров</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Топ-технология</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#services" className="inline-flex items-center px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold">
                  Смотреть GPT-сервисы
                </Link>
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-colors font-semibold">
                  Полный каталог
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* GPT Evolution Timeline */}
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
                <span className="text-purple-500">История развития</span> GPT
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                От первых экспериментов до революционного GPT-4
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gptEvolution.map((version, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{version.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {version.version}
                  </h3>
                  <div className="text-sm font-medium text-purple-600 mb-3">
                    {version.parameters}
                  </div>
                  <p className="text-text-secondary mb-4 leading-relaxed text-sm">
                    {version.description}
                  </p>
                  <div className="space-y-1">
                    {version.achievements.map((achievement, idx) => (
                      <div key={idx} className="text-xs text-gray-600 bg-white rounded-lg px-2 py-1">
                        {achievement}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
                Почему выбирают <span className="text-purple-500">GPT технологии</span>?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Преимущества генеративных моделей GPT для бизнеса и творчества
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

        {/* Top GPT Services Section */}
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
                Лучшие <span className="text-purple-500">GPT-сервисы</span> 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Сравнение топовых платформ на базе GPT для разных задач
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {topGPTServices.map((service, index) => (
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
                      <p className="text-sm text-gray-500">{service.developer}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium block mb-1">
                        {service.model}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.pricing === 'Freemium' 
                          ? 'bg-blue-100 text-blue-700'
                          : service.pricing === 'Бесплатно'
                          ? 'bg-emerald-100 text-emerald-700'
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
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold">
                Смотреть все сервисы
              </Link>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
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
                Применение <span className="text-purple-500">GPT</span> в работе
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Практические кейсы использования GPT-моделей в разных сферах
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gptUseCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">Уровень сложности:</p>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        useCase.difficulty === 'Начинающий' ? 'bg-green-100 text-green-700' :
                        useCase.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-700' :
                        useCase.difficulty === 'Продвинутый' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {useCase.difficulty}
                      </span>
                    </div>
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
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Каталог <span className="text-purple-500">GPT-сервисов</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите лучший GPT-инструмент для ваших задач
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск GPT-сервисов..."
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Вопросы о <span className="text-purple-500">GPT</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о GPT-моделях и их использовании
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
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <CheckCircle className={`w-6 h-6 ${openFAQ === index ? 'text-purple-500' : 'text-gray-400'}`} />
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
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Станьте частью <span className="text-purple-500">GPT-революции</span>
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Миллионы людей уже используют GPT для повышения продуктивности. 
                Начните использовать возможности искусственного интеллекта уже сегодня.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold">
                  Открыть каталог
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-colors font-semibold">
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