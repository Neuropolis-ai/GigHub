'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, CheckCircle, Users, ExternalLink, MessageCircle, Sparkles, TrendingUp, Clock, Bot, Zap, Brain, Heart } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'

const chatCapabilities = [
  {
    icon: MessageCircle,
    title: "Естественное общение",
    description: "Общение на человеческом языке с пониманием контекста и эмоций"
  },
  {
    icon: Brain,
    title: "Глубокие знания",
    description: "Доступ к обширной базе знаний и способность анализировать информацию"
  },
  {
    icon: Zap,
    title: "Мгновенные ответы",
    description: "Быстрые и точные ответы на любые вопросы 24/7"
  },
  {
    icon: Bot,
    title: "Специализация",
    description: "Чат-боты для разных задач: поддержка, обучение, развлечения"
  }
]

const topChatServices = [
  {
    name: "ChatGPT",
    description: "Самый популярный ИИ-чат в мире от OpenAI. Отвечает на любые вопросы, помогает с работой, учебой и творчеством.",
    category: "Универсальный",
    pricing: "Freemium",
    features: ["GPT-4", "Веб-поиск", "Анализ файлов", "Кодирование"],
    url: "https://chat.openai.com",
    rating: 4.8,
    monthlyPrice: "$0-20",
    pros: ["Лучшее качество ответов", "Огромная популярность", "Постоянные обновления"],
    cons: ["Очереди в бесплатной версии", "Иногда неточная информация"]
  },
  {
    name: "Claude",
    description: "ИИ-помощник от Anthropic с фокусом на безопасность и этичность. Отлично понимает контекст и нюансы.",
    category: "Этичный ИИ",
    pricing: "Freemium",
    features: ["Большой контекст", "Анализ документов", "Безопасность", "Честность"],
    url: "https://claude.ai",
    rating: 4.7,
    monthlyPrice: "$0-20",
    pros: ["Очень честные ответы", "Отличное понимание контекста", "Высокая безопасность"],
    cons: ["Меньше известен", "Более консервативный"]
  },
  {
    name: "Character.AI",
    description: "Платформа для создания и общения с персонализированными ИИ-персонажами. Идеально для ролевых игр и развлечений.",
    category: "Развлечения",
    pricing: "Freemium",
    features: ["Создание персонажей", "Ролевые игры", "Групповые чаты", "Персонализация"],
    url: "https://character.ai",
    rating: 4.5,
    monthlyPrice: "$0-10",
    pros: ["Уникальные персонажи", "Креативные диалоги", "Развлекательный контент"],
    cons: ["Фокус на развлечения", "Менее полезен для работы"]
  },
  {
    name: "Poe",
    description: "Платформа от Quora, объединяющая множество ИИ-моделей в одном интерфейсе. Доступ к GPT-4, Claude, Gemini и другим.",
    category: "Мультимодель",
    pricing: "Freemium",
    features: ["Множество моделей", "Создание ботов", "API", "Сравнение ответов"],
    url: "https://poe.com",
    rating: 4.4,
    monthlyPrice: "$0-20",
    pros: ["Доступ ко многим моделям", "Удобное сравнение", "Создание своих ботов"],
    cons: ["Сложность выбора", "Не все модели бесплатны"]
  },
  {
    name: "Google Bard",
    description: "ИИ-чат от Google на основе модели Gemini. Интегрирован с сервисами Google и имеет доступ к актуальной информации.",
    category: "Поисковый",
    pricing: "Бесплатно",
    features: ["Актуальная информация", "Интеграция с Google", "Веб-поиск", "Изображения"],
    url: "https://bard.google.com",
    rating: 4.3,
    monthlyPrice: "Бесплатно",
    pros: ["Полностью бесплатный", "Актуальная информация", "Интеграция с Google"],
    cons: ["Меньше творческих способностей", "Региональные ограничения"]
  },
  {
    name: "Bing Chat",
    description: "ИИ-чат от Microsoft, интегрированный в поисковик Bing. Использует GPT-4 и имеет доступ к интернету.",
    category: "Поисковый",
    pricing: "Бесплатно",
    features: ["GPT-4", "Веб-поиск", "Изображения", "Интеграция с Edge"],
    url: "https://bing.com/chat",
    rating: 4.2,
    monthlyPrice: "Бесплатно",
    pros: ["Бесплатный GPT-4", "Веб-поиск", "Генерация изображений"],
    cons: ["Ограничения на запросы", "Привязка к экосистеме Microsoft"]
  }
]

const useCases = [
  {
    title: "Бизнес и работа",
    description: "Помощь в решении рабочих задач, составлении документов и анализе данных",
    tools: ["ChatGPT", "Claude", "Poe"],
    icon: "💼",
    examples: ["Написание писем", "Анализ данных", "Составление отчетов", "Планирование задач"]
  },
  {
    title: "Образование и обучение",
    description: "Объяснение сложных тем, помощь с домашними заданиями и изучением языков",
    tools: ["ChatGPT", "Claude", "Google Bard"],
    icon: "🎓",
    examples: ["Решение задач", "Объяснение концепций", "Изучение языков", "Подготовка к экзаменам"]
  },
  {
    title: "Творчество и контент",
    description: "Создание текстов, идей для контента и креативных проектов",
    tools: ["ChatGPT", "Character.AI", "Poe"],
    icon: "🎨",
    examples: ["Написание статей", "Генерация идей", "Создание сценариев", "Поэзия и проза"]
  },
  {
    title: "Развлечения и общение",
    description: "Casual-беседы, игры, ролевые диалоги и развлекательный контент",
    tools: ["Character.AI", "ChatGPT", "Poe"],
    icon: "🎮",
    examples: ["Ролевые игры", "Интересные беседы", "Игры в слова", "Шутки и анекдоты"]
  }
]

const benefits = [
  {
    title: "Доступность 24/7",
    description: "ИИ-чаты работают круглосуточно без выходных и отпусков",
    icon: "🕒"
  },
  {
    title: "Безграничные знания",
    description: "Доступ к огромным объемам информации из разных областей",
    icon: "🧠"
  },
  {
    title: "Персональный подход",
    description: "Адаптируются под ваш стиль общения и потребности",
    icon: "👤"
  },
  {
    title: "Мультиязычность",
    description: "Поддержка десятков языков включая русский",
    icon: "🌍"
  }
]

const faqData = [
  {
    question: "Какой ИИ-чат лучше всего для работы?",
    answer: "ChatGPT и Claude считаются лучшими для профессиональных задач. ChatGPT более универсален и креативен, Claude более точен и этичен. Для специфических задач можно использовать Poe для доступа к разным моделям."
  },
  {
    question: "Безопасно ли делиться личной информацией с ИИ-чатами?",
    answer: "Не рекомендуется делиться конфиденциальной информацией (пароли, номера карт, личные данные). Большинство сервисов используют данные для обучения моделей. Всегда читайте политику конфиденциальности."
  },
  {
    question: "Могут ли ИИ-чаты заменить человеческое общение?",
    answer: "ИИ-чаты отлично дополняют человеческое общение, но не заменяют его полностью. Они идеальны для получения информации, помощи в работе и casual-общения, но человеческая эмпатия и понимание остаются уникальными."
  },
  {
    question: "Какие ИИ-чаты бесплатные?",
    answer: "Полностью бесплатны: Google Bard и Bing Chat. Частично бесплатны с ограничениями: ChatGPT (GPT-3.5), Claude, Character.AI, Poe. Premium-версии обычно стоят $10-20/месяц."
  },
  {
    question: "Понимают ли ИИ-чаты русский язык?",
    answer: "Да, все популярные ИИ-чаты отлично понимают и говорят на русском языке. ChatGPT, Claude, Bard показывают высокое качество русского текста, понимают культурные особенности и сленг."
  },
  {
    question: "Можно ли использовать ИИ-чаты для обучения детей?",
    answer: "Да, но под присмотром взрослых. ИИ-чаты отлично объясняют учебные материалы, помогают с домашними заданиями. Важно проверять информацию и следить за безопасностью общения."
  },
  {
    question: "Как выбрать лучший ИИ-чат для своих задач?",
    answer: "Для работы и учебы - ChatGPT или Claude. Для развлечений - Character.AI. Для актуальной информации - Google Bard или Bing Chat. Для экспериментов с разными моделями - Poe."
  }
]

export default function AIChatPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchChatServices()
  }, [searchTerm])

  const fetchChatServices = async () => {
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
            "name": "ИИ чат-боты — лучшие нейросети для общения",
            "description": "Топ чат-ботов на основе ИИ для бизнеса, обучения и развлечений",
            "url": "https://gighub.ru/ai-chat",
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
            <li><span className="text-text-primary">ИИ чат-боты</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <MessageCircle className="w-8 h-8 text-green-500" />
                <span className="text-green-500 font-semibold">
                  ИИ чат-боты
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                ИИ <span className="text-gradient bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">чат-боты</span> —<br className="hidden md:block" />
                лучшие нейросети для общения
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Откройте для себя мир умных собеседников. От ChatGPT до Character.AI — 
                выбирайте лучшие ИИ-чаты для работы, учебы, развлечений и решения любых задач.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-green-500" />
                  <span>Умные ответы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Мгновенно 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>Понимают эмоции</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#services" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold">
                  Смотреть чат-боты
                </Link>
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-colors font-semibold">
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
                Почему выбирают <span className="text-green-500">ИИ чат-боты</span>?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Современные ИИ-чаты становятся незаменимыми помощниками в работе и жизни
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
                Лучшие <span className="text-green-500">ИИ чат-боты</span> 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Сравнение топовых чат-ботов для разных задач и потребностей
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {topChatServices.map((service, index) => (
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
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {service.category}
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
                    <span className="text-sm font-medium text-green-600">
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
                    className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 font-medium"
                  >
                    Попробовать <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Сферы применения <span className="text-green-500">ИИ чат-ботов</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Узнайте, какие чат-боты лучше всего подходят для ваших задач
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
                    <p className="text-sm font-medium text-gray-700">Рекомендуемые чат-боты:</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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
                Полный каталог <span className="text-green-500">ИИ чат-ботов</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите идеального ИИ-собеседника из нашей коллекции
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск ИИ чат-ботов..."
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Вопросы об <span className="text-green-500">ИИ чат-ботах</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о ИИ-чатах и их использовании
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
                    className="w-full px-8 py-6 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
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
                        <CheckCircle className={`w-6 h-6 ${openFAQ === index ? 'text-green-500' : 'text-gray-400'}`} />
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
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Начните общение с <span className="text-green-500">лучшими ИИ</span> уже сегодня
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Миллионы людей уже используют ИИ-чаты для работы, учебы и развлечений. 
                Присоединяйтесь и откройте новые возможности умного общения.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold">
                  Открыть каталог
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-colors font-semibold">
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