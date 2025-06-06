'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, CheckCircle, ExternalLink, MessageCircle, Brain, Zap, Shield, Users, Star, Clock, Lightbulb, Target } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'

const helpCapabilities = [
  {
    icon: MessageCircle,
    title: "Умные диалоги",
    description: "ИИ-ассистенты понимают контекст и ведут естественные диалоги, помогая решать сложные задачи"
  },
  {
    icon: Brain,
    title: "Анализ и решения",
    description: "Нейросети анализируют информацию, предлагают решения и помогают принимать обоснованные решения"
  },
  {
    icon: Zap,
    title: "Быстрые ответы",
    description: "Мгновенные ответы на вопросы, объяснения сложных тем и помощь в реальном времени"
  },
  {
    icon: Shield,
    title: "Надежная помощь",
    description: "Проверенные ИИ-помощники с высокой точностью ответов и безопасным использованием"
  }
]

const topAssistants = [
  {
    name: "ChatGPT",
    company: "OpenAI",
    description: "Самый популярный ИИ-помощник в мире. Отвечает на вопросы, помогает с работой, учебой и творчеством.",
    category: "Универсальный",
    pricing: "Freemium",
    features: ["Диалоги", "Анализ", "Код", "Творчество"],
    url: "https://chat.openai.com",
    rating: 4.8,
    pros: ["Лучшее качество ответов", "Широкий функционал", "Постоянные обновления"],
    cons: ["Платная подписка для GPT-4", "Ограничения в бесплатной версии"]
  },
  {
    name: "Claude",
    company: "Anthropic",
    description: "Безопасный и этичный ИИ-ассистент с отличными аналитическими способностями и длинным контекстом.",
    category: "Ассистент",
    pricing: "Freemium",
    features: ["Безопасность", "Анализ", "Длинный контекст", "Этичность"],
    url: "https://claude.ai",
    rating: 4.7,
    pros: ["Высокая безопасность", "Отличный анализ", "Этичные ответы"],
    cons: ["Ограниченный доступ", "Консервативность в ответах"]
  },
  {
    name: "Google Gemini",
    company: "Google",
    description: "Мультимодальный ИИ-помощник от Google с интеграцией поиска и работой с изображениями.",
    category: "Мультимодальный",
    pricing: "Freemium",
    features: ["Поиск Google", "Изображения", "Мультимодальность", "Интеграция"],
    url: "https://gemini.google.com",
    rating: 4.5,
    pros: ["Интеграция с Google", "Актуальная информация", "Работа с изображениями"],
    cons: ["Новая разработка", "Меньше возможностей чем ChatGPT"]
  },
  {
    name: "Microsoft Copilot",
    company: "Microsoft",
    description: "ИИ-помощник от Microsoft с интеграцией в Office и поиском Bing для актуальной информации.",
    category: "Офисный",
    pricing: "Freemium",
    features: ["Office интеграция", "Поиск Bing", "Изображения", "Код"],
    url: "https://copilot.microsoft.com",
    rating: 4.4,
    pros: ["Интеграция с Office", "Бесплатный доступ", "Актуальная информация"],
    cons: ["Ограниченный функционал", "Зависимость от Microsoft"]
  },
  {
    name: "Perplexity AI",
    company: "Perplexity",
    description: "ИИ-поисковик и помощник, который предоставляет ответы с источниками и актуальной информацией.",
    category: "Поиск",
    pricing: "Freemium",
    features: ["Поиск с источниками", "Актуальность", "Цитирование", "Исследования"],
    url: "https://perplexity.ai",
    rating: 4.3,
    pros: ["Актуальная информация", "Источники", "Качественный поиск"],
    cons: ["Узкая специализация", "Меньше творческих возможностей"]
  },
  {
    name: "Character.AI",
    company: "Character.AI",
    description: "Платформа для создания и общения с персонализированными ИИ-персонажами и помощниками.",
    category: "Персонажи",
    pricing: "Freemium",
    features: ["Персонажи", "Ролевые игры", "Обучение", "Развлечения"],
    url: "https://character.ai",
    rating: 4.2,
    pros: ["Персонализация", "Развлекательный контент", "Разнообразие персонажей"],
    cons: ["Меньше практической пользы", "Фокус на развлечения"]
  }
]

const helpCategories = [
  {
    title: "Работа и бизнес",
    description: "Помощь в составлении документов, анализе данных, планировании и принятии решений",
    examples: ["Написание писем", "Анализ отчетов", "Планирование проектов", "Исследование рынка"],
    tools: ["ChatGPT", "Claude", "Microsoft Copilot"]
  },
  {
    title: "Учеба и образование", 
    description: "Объяснение сложных тем, помощь с домашними заданиями и подготовка к экзаменам",
    examples: ["Решение задач", "Объяснение теории", "Подготовка к экзаменам", "Написание эссе"],
    tools: ["ChatGPT", "Claude", "Perplexity AI"]
  },
  {
    title: "Творчество и контент",
    description: "Генерация идей, написание текстов, создание сценариев и творческих проектов",
    examples: ["Написание статей", "Генерация идей", "Создание сценариев", "Редактирование текстов"],
    tools: ["ChatGPT", "Claude", "Character.AI"]
  },
  {
    title: "Повседневные задачи",
    description: "Планирование дня, поиск информации, решение бытовых вопросов и личная помощь",
    examples: ["Планирование поездок", "Рецепты блюд", "Советы по здоровью", "Поиск информации"],
    tools: ["Google Gemini", "Perplexity AI", "Microsoft Copilot"]
  }
]

const useCases = [
  {
    icon: Target,
    title: "Решение рабочих задач",
    description: "ИИ-помощники анализируют проблемы, предлагают решения и помогают оптимизировать рабочие процессы.",
    examples: [
      "Анализ данных и составление отчетов",
      "Планирование проектов и управление задачами", 
      "Написание деловых писем и документов",
      "Исследование конкурентов и рынка"
    ],
    recommendedTools: ["ChatGPT Plus", "Claude Pro", "Microsoft Copilot"],
    tips: "Четко формулируйте задачу и предоставляйте контекст для получения наиболее точных решений."
  },
  {
    icon: Lightbulb,
    title: "Обучение и развитие",
    description: "Персональные ИИ-наставники объясняют сложные темы, помогают с учебой и развитием навыков.",
    examples: [
      "Объяснение сложных концепций простым языком",
      "Помощь с домашними заданиями и проектами",
      "Подготовка к экзаменам и собеседованиям",
      "Изучение новых языков и навыков"
    ],
    recommendedTools: ["ChatGPT", "Claude", "Perplexity AI"],
    tips: "Просите ИИ объяснить тему пошагово и приводить примеры для лучшего понимания."
  },
  {
    icon: Clock,
    title: "Экономия времени",
    description: "Автоматизация рутинных задач и быстрое получение нужной информации без долгого поиска.",
    examples: [
      "Быстрый поиск и анализ информации",
      "Автоматическое составление планов и списков",
      "Генерация шаблонов и документов",
      "Суммаризация длинных текстов"
    ],
    recommendedTools: ["Perplexity AI", "Google Gemini", "ChatGPT"],
    tips: "Используйте конкретные запросы и просите структурированные ответы для экономии времени."
  },
  {
    icon: Users,
    title: "Персональная помощь",
    description: "ИИ как личный ассистент для планирования, организации жизни и решения повседневных вопросов.",
    examples: [
      "Планирование поездок и мероприятий",
      "Составление меню и списков покупок",
      "Поиск рекомендаций и советов",
      "Организация расписания и напоминаний"
    ],
    recommendedTools: ["Google Gemini", "Microsoft Copilot", "ChatGPT"],
    tips: "Делитесь предпочтениями и контекстом для получения персонализированных рекомендаций."
  }
]

const faqData = [
  {
    question: "Какая нейросеть лучше всего подходит для получения помощи в работе?",
    answer: "ChatGPT и Claude считаются лучшими для рабочих задач. ChatGPT отлично справляется с анализом, написанием текстов и решением проблем. Claude превосходен в аналитических задачах и работе с большими объемами информации. Microsoft Copilot идеален для интеграции с Office приложениями."
  },
  {
    question: "Можно ли доверять ответам ИИ-помощников?",
    answer: "ИИ-помощники очень полезны, но их ответы нужно проверять, особенно для важных решений. Они могут ошибаться или предоставлять устаревшую информацию. Лучше использовать ИИ как первичный источник идей и решений, а затем проверять критически важную информацию из других источников."
  },
  {
    question: "Какие задачи лучше всего решают нейросети-помощники?",
    answer: "ИИ-помощники отлично справляются с анализом информации, написанием текстов, решением математических задач, программированием, переводом, планированием и творческими задачами. Они менее эффективны в задачах, требующих эмоционального интеллекта или физического взаимодействия."
  },
  {
    question: "Сколько стоят лучшие ИИ-помощники?",
    answer: "Многие ИИ-помощники предлагают бесплатные базовые версии. Премиум-подписки обычно стоят $10-20 в месяц. ChatGPT Plus стоит $20/мес, Claude Pro — $20/мес, Google Gemini Advanced — $20/мес. Некоторые сервисы как Perplexity предлагают более доступные планы от $10/мес."
  },
  {
    question: "Какой ИИ-помощник лучше для изучения новых тем?",
    answer: "Для обучения отлично подходят ChatGPT и Claude — они умеют объяснять сложные темы простым языком и адаптируются под ваш уровень знаний. Perplexity AI полезен для исследования актуальных тем с источниками. Character.AI может быть интересен для интерактивного обучения через ролевые игры."
  },
  {
    question: "Можно ли использовать ИИ-помощников для бизнеса?",
    answer: "Да, многие компании успешно используют ИИ-помощников для анализа данных, написания контента, поддержки клиентов и автоматизации процессов. Важно учитывать политику конфиденциальности и не передавать критически важную корпоративную информацию."
  }
]

export default function AIHelpPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const fetchHelpServices = async () => {
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

  useEffect(() => {
    fetchHelpServices()
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm text-text-secondary">
          <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
          <li className="mx-2">/</li>
          <li><Link href="/ai-services" className="hover:text-accent-primary">Каталог</Link></li>
          <li className="mx-2">/</li>
          <li><span className="text-text-primary">ИИ-помощники</span></li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="w-8 h-8 text-blue-500" />
              <span className="text-blue-500 font-semibold">ИИ-помощники</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ИИ-помощники</span> —<br className="hidden md:block" />
              умные нейросети для решения задач
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
              Откройте для себя мир ИИ-ассистентов, которые помогают в работе, учебе и повседневной жизни. 
              От ChatGPT до Claude — выбирайте лучших цифровых помощников для любых задач.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Быстрые решения</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>Умный анализ</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Надежная помощь</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                Смотреть помощников
              </Link>
              <Link href="/ai-services" className="inline-flex items-center px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-colors font-semibold">
                Полный каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Возможности <span className="text-blue-500">ИИ-помощников</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Откройте для себя безграничные возможности искусственного интеллекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCapabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Top Assistants Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Лучшие <span className="text-blue-500">ИИ-помощники</span> 2025
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Сравнение топовых ИИ-ассистентов для разных задач и потребностей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {topAssistants.map((assistant, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">
                      {assistant.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{assistant.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {assistant.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      assistant.pricing === 'Freemium' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {assistant.pricing}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(assistant.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{assistant.rating}</span>
                </div>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {assistant.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {assistant.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">✅ Плюсы:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {assistant.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600 mb-1">❌ Минусы:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {assistant.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <a 
                    href={assistant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Попробовать <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
              Смотреть все сервисы
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Сферы применения <span className="text-blue-500">ИИ-помощников</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Узнайте, какие ИИ-ассистенты лучше всего подходят для ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  {category.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Примеры задач:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {category.examples.map((example, idx) => (
                        <span key={idx} className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded-lg">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-2">Рекомендуемые инструменты:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool, idx) => (
                        <span key={idx} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Как использовать <span className="text-blue-500">ИИ-помощников</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Практические советы и реальные примеры применения ИИ в различных сферах
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {useCase.title}
                    </h3>
                  </div>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">Примеры применения:</p>
                      <ul className="space-y-2">
                        {useCase.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-2">Рекомендуемые инструменты:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {useCase.recommendedTools.map((tool, idx) => (
                          <span key={idx} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-blue-600">{useCase.tips}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Все <span className="text-blue-500">ИИ-помощники</span> в каталоге
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Полный список проверенных ИИ-ассистентов с подробными описаниями
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск ИИ-помощников..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Link href="/ai-services" className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                Открыть каталог
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Вопросы об <span className="text-blue-500">ИИ-помощниках</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Ответы на популярные вопросы о ИИ-ассистентах и их использовании
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
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-primary pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <CheckCircle className={`w-6 h-6 transform transition-transform ${openFAQ === index ? 'rotate-180 text-blue-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </button>
                
                {openFAQ === index && (
                  <div className="px-8 pb-6 border-t border-gray-200">
                    <p className="text-text-secondary leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Начните использовать ИИ-помощников уже сегодня
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Миллионы людей уже используют ИИ-ассистентов для работы, учебы и повседневных задач. 
              Присоединяйтесь и откройте новые возможности умных технологий.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-services">
                <button className="bg-white text-blue-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                  Открыть каталог
                </button>
              </Link>
              <Link href="/categories">
                <button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  Все категории
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 