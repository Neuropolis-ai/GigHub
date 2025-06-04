'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, CheckCircle, ExternalLink, MessageCircle, Brain, Zap, Shield, Users, Star, Clock, Lightbulb, Target } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросеть помощь — ИИ-ассистенты и помощники для решения задач 2025',
  description: 'Лучшие нейросети-помощники для работы, учебы и повседневных задач. ChatGPT, Claude, Gemini и другие ИИ-ассистенты. Получите помощь от искусственного интеллекта.',
  keywords: 'нейросеть помощь, ии помощник, нейросеть ассистент, chatgpt помощь, ии для помощи, искусственный интеллект помощник, нейросеть для решения задач',
  openGraph: {
    title: 'Нейросеть помощь — ИИ-ассистенты и помощники',
    description: 'ТОП нейросетей-помощников для работы и учебы. ChatGPT, Claude, Gemini и 500+ ИИ-ассистентов.',
    url: 'https://gighub.ru/ai-help',
    images: [
      {
        url: 'https://gighub.ru/og-ai-help.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросеть помощь - ИИ-ассистенты для решения задач',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросеть помощь — ИИ-ассистенты и помощники',
    description: 'ТОП нейросетей-помощников для работы и учебы',
  },
}

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
    answer: "ИИ-помощники отлично справляются с: анализом и структурированием информации, написанием и редактированием текстов, объяснением сложных концепций, генерацией идей и решений, планированием и организацией задач. Они особенно эффективны для творческих и аналитических задач."
  },
  {
    question: "Есть ли бесплатные нейросети для получения помощи?",
    answer: "Да! ChatGPT, Claude, Google Gemini и Microsoft Copilot предлагают бесплатные версии. Бесплатные планы имеют ограничения по количеству запросов и функциям, но их достаточно для большинства повседневных задач. Для профессионального использования рекомендуются платные подписки."
  },
  {
    question: "Как правильно формулировать запросы к ИИ-помощникам?",
    answer: "Для лучших результатов: будьте конкретными в формулировке задачи, предоставляйте контекст и дополнительную информацию, указывайте желаемый формат ответа, разбивайте сложные задачи на части, просите примеры и пояснения при необходимости. Чем детальнее запрос, тем точнее ответ."
  },
  {
    question: "Могут ли ИИ-помощники заменить человеческую помощь?",
    answer: "ИИ-помощники отлично дополняют человеческую помощь, но не заменяют её полностью. Они превосходны для быстрого анализа, генерации идей и рутинных задач. Однако для эмоциональной поддержки, сложных межличностных вопросов и критически важных решений лучше обращаться к людям."
  },
  {
    question: "Безопасно ли делиться личной информацией с ИИ-помощниками?",
    answer: "Избегайте передачи конфиденциальной информации (пароли, номера карт, личные документы) ИИ-помощникам. Для общих вопросов и задач они безопасны. Читайте политики конфиденциальности сервисов и используйте анонимизированные данные для примеров при необходимости."
  }
]

export default function AIHelpPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchHelpServices()
  }, [searchTerm])

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

  return (
    <>
      {/* JSON-LD разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Нейросеть помощь — ИИ-ассистенты и помощники для решения задач",
            "description": "Лучшие нейросети-помощники для работы, учебы и повседневных задач",
            "url": "https://gighub.ru/ai-help",
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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="text-text-primary">Нейросеть</span>
                <br />
                <span className="text-gradient">помощь</span>
                <br />
                <span className="text-text-primary">для любых задач</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
                Получите помощь от лучших ИИ-ассистентов в работе, учебе и повседневной жизни. 
                ChatGPT, Claude, Gemini и 500+ умных помощников для решения любых задач.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl">
                  Найти ИИ-помощника
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold text-lg">
                  Бесплатные помощники
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities Section */}
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
                Возможности <span className="text-blue-500">ИИ-помощников</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Современные нейросети умеют гораздо больше, чем просто отвечать на вопросы
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <capability.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {capability.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Assistants Section */}
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
                Лучшие <span className="text-blue-500">ИИ-помощники</span> 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Проверенные нейросети-ассистенты для работы, учебы и повседневных задач
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topAssistants.map((assistant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">
                        {assistant.name}
                      </h3>
                      <p className="text-sm text-text-secondary">{assistant.company}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{assistant.rating}</span>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {assistant.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {assistant.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4 mb-6">
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

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {assistant.pricing}
                    </span>
                    <a
                      href={assistant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Попробовать
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories Section */}
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
                Сферы применения <span className="text-blue-500">ИИ-помощи</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Нейросети помогают в самых разных областях жизни и работы
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {helpCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8"
                >
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    {category.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-text-primary mb-3">Примеры задач:</h4>
                    <ul className="space-y-2">
                      {category.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-3">Рекомендуемые инструменты:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
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
                Как получить <span className="text-blue-500">максимум пользы</span> от ИИ
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Практические советы по эффективному использованию нейросетей-помощников
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <useCase.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {useCase.title}
                    </h3>
                  </div>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {useCase.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-text-primary mb-3">Примеры применения:</h4>
                    <ul className="space-y-2">
                      {useCase.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-text-primary mb-3">Рекомендуемые инструменты:</h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.recommendedTools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-blue-700 mb-2">💡 Совет:</h4>
                    <p className="text-sm text-blue-600">{useCase.tips}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Catalog Section */}
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
                Полный каталог <span className="text-blue-500">ИИ-помощников</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите идеального ИИ-ассистента для ваших задач
              </p>
            </motion.div>

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
                Вопросы об <span className="text-blue-500">ИИ-помощниках</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о нейросетях-помощниках
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
                    className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
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
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Получите <span className="text-blue-500">помощь от ИИ</span> уже сегодня
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Миллионы людей уже используют ИИ-помощников для решения рабочих и личных задач. 
                Присоединяйтесь и получите персонального цифрового ассистента.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                  Найти помощника
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