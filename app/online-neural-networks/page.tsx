'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, CheckCircle, Users, ExternalLink, Grid, Sparkles, TrendingUp, Clock, Globe, Zap, Shield } from 'lucide-react'
import ServiceCard from '@/app/components/ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'

const advantages = [
  {
    icon: Globe,
    title: "Работа в браузере",
    description: "Никаких установок — просто откройте браузер и начните работать с ИИ"
  },
  {
    icon: Zap,
    title: "Мгновенный доступ",
    description: "Секунды до начала работы вместо часов на установку и настройку"
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Данные обрабатываются на серверах, не занимают место на вашем устройстве"
  },
  {
    icon: Users,
    title: "Мультиплатформенность",
    description: "Работает на любом устройстве: компьютер, планшет, смартфон"
  }
]

const topOnlineServices = [
  {
    name: "ChatGPT",
    description: "Самый популярный ИИ-чат для генерации текста, ответов на вопросы и решения задач",
    category: "Текст",
    pricing: "Freemium",
    url: "https://chat.openai.com"
  },
  {
    name: "Claude",
    description: "Продвинутый ИИ-ассистент от Anthropic для длинных документов и сложных задач",
    category: "Текст",
    pricing: "Freemium",
    url: "https://claude.ai"
  },
  {
    name: "Midjourney",
    description: "Лидер в генерации изображений с помощью текстовых описаний",
    category: "Изображения",
    pricing: "Платная",
    url: "https://midjourney.com"
  },
  {
    name: "Leonardo AI",
    description: "Мощный генератор изображений с бесплатным тарифом",
    category: "Изображения",
    pricing: "Freemium",
    url: "https://leonardo.ai"
  },
  {
    name: "Runway",
    description: "Создание и редактирование видео с помощью искусственного интеллекта",
    category: "Видео",
    pricing: "Freemium",
    url: "https://runway.com"
  },
  {
    name: "ElevenLabs",
    description: "Синтез речи и клонирование голоса с реалистичным качеством",
    category: "Аудио",
    pricing: "Freemium",
    url: "https://elevenlabs.io"
  }
]

const faqData = [
  {
    question: "Что значит нейросеть онлайн?",
    answer: "Онлайн нейросеть — это ИИ-сервис, который работает через веб-браузер без необходимости установки программ на ваше устройство. Все вычисления происходят на удаленных серверах, а вы получаете результат через интернет."
  },
  {
    question: "Какие преимущества у онлайн нейросетей?",
    answer: "Главные преимущества: мгновенный доступ без установки, работа на любых устройствах, автоматические обновления, экономия места на диске, профессиональное качество обработки за счет мощных серверов."
  },
  {
    question: "Безопасно ли использовать нейросети онлайн?",
    answer: "Популярные онлайн сервисы используют современные системы безопасности и шифрование. Однако не рекомендуется загружать конфиденциальные данные в бесплатные версии. Для бизнеса выбирайте сервисы с коммерческими лицензиями."
  },
  {
    question: "Нужен ли быстрый интернет для работы с онлайн ИИ?",
    answer: "Для текстовых задач достаточно обычного интернета. Для работы с изображениями и видео лучше иметь стабильное соединение от 10 Мбит/с. Большинство сервисов оптимизированы для работы на разных скоростях."
  },
  {
    question: "Есть ли бесплатные онлайн нейросети?",
    answer: "Да, многие сервисы предлагают бесплатные версии: ChatGPT, Claude, Leonardo AI, Stable Diffusion Online, Google Bard. Обычно есть ограничения по количеству запросов или функциям."
  }
]

export default function OnlineNeuralNetworksPage() {
  const [services, setServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    fetchOnlineServices()
  }, [searchTerm, selectedCategory])

  const fetchOnlineServices = async () => {
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
            "name": "Нейросети онлайн — ИИ-сервисы в браузере",
            "description": "Лучшие онлайн нейросети без установки программ",
            "url": "https://gighub.ru/online-neural-networks",
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
            <li><span className="text-text-primary">Нейросети онлайн</span></li>
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
                <Globe className="w-8 h-8 text-blue-500" />
                <span className="text-blue-500 font-semibold">
                  Онлайн ИИ-сервисы
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Нейросети <span className="text-gradient bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">онлайн</span> —<br className="hidden md:block" />
                работайте с ИИ прямо в браузере
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Откройте для себя мощные нейросети, которые работают онлайн без установки программ. 
                Генерация изображений, обработка текста, создание видео и решение задач — всё в вашем браузере.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>Мгновенный доступ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Безопасность данных</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>Любые устройства</span>
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
                Почему выбирают онлайн <span className="text-blue-500">нейросети</span>?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Онлайн ИИ-сервисы революционизируют работу с искусственным интеллектом
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-8 h-8 text-blue-500" />
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
                Топ онлайн <span className="text-blue-500">нейросетей</span> 2025
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Самые популярные и эффективные ИИ-сервисы, работающие в браузере
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {topOnlineServices.map((service, index) => (
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
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {service.description}
                  </p>
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
                Полный каталог онлайн <span className="text-blue-500">ИИ-сервисов</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите идеальную нейросеть для ваших задач из нашей коллекции
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск онлайн нейросетей..."
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
                Вопросы об онлайн <span className="text-blue-500">нейросетях</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Ответы на популярные вопросы о работе с ИИ в браузере
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
                      <div className="px-8 pb-6 border-t border-gray-100">
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
                Начните работать с <span className="text-blue-500">ИИ</span> прямо сейчас
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Тысячи пользователей уже используют онлайн нейросети для творчества и работы. 
                Присоединяйтесь и откройте новые возможности искусственного интеллекта.
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