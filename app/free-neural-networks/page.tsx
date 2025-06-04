'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Gift, CheckCircle, ArrowRight, Star, Users } from 'lucide-react'
import { AIServiceWithCategory } from '@/lib/supabase'
import ServiceCard from '@/app/components/ServiceCard'

export default function FreeNeuralNetworksPage() {
  const [freeServices, setFreeServices] = useState<AIServiceWithCategory[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFreeServices = async () => {
    try {
      setLoading(true)
      // Фильтруем только бесплатные сервисы
      const response = await fetch('/api/ai-services?free=true&limit=50')
      if (!response.ok) throw new Error('Ошибка загрузки данных')
      
      const data = await response.json()
      setFreeServices(data.data || [])
    } catch (error) {
      console.error('Ошибка:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFreeServices()
  }, [])

  const faqData = [
    {
      question: "Какие нейросети полностью бесплатные?",
      answer: "Полностью бесплатные нейросети включают ChatGPT (базовая версия), Claude (с ограничениями), Google Bard, Stable Diffusion, DALL-E mini и многие другие. Они предоставляют основной функционал без оплаты."
    },
    {
      question: "Есть ли ограничения у бесплатных нейросетей?",
      answer: "Да, у большинства есть ограничения: лимит запросов в день, очереди при высокой нагрузке, базовое качество генерации. Freemium модели предлагают расширенные возможности за плату."
    },
    {
      question: "Нужна ли регистрация для использования бесплатных ИИ?",
      answer: "Большинство требует регистрацию для контроля использования и предотвращения злоупотреблений. Но есть сервисы, работающие без регистрации с базовым функционалом."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm text-text-secondary">
          <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
          <li className="mx-2">/</li>
          <li><span className="text-text-primary">Бесплатные нейросети</span></li>
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
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Gift className="w-8 h-8 text-green-500" />
              <span className="text-green-600 font-semibold">Бесплатные ИИ-сервисы</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Бесплатные <span className="text-gradient">нейросети</span> — ТОП ИИ без оплаты
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Подборка лучших бесплатных нейросетей для генерации изображений, текста и решения задач. 
              Полнофункциональные ИИ-инструменты без регистрации и платы в 2025 году.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>100% бесплатно</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Проверено пользователями</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Только качественные сервисы</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl h-80"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Найдено {freeServices.length} бесплатных нейросетей
              </h2>
              <p className="text-text-secondary">
                Все сервисы проверены нашей командой и действительно предоставляют бесплатный доступ к ИИ-функциям
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Часто задаваемые вопросы о бесплатных нейросетях
            </h2>
            <p className="text-text-secondary">
              Ответы на популярные вопросы о бесплатных ИИ-сервисах
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-accent-primary to-accent-secondary rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Не нашли подходящую нейросеть?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Посмотрите полный каталог из 2000+ ИИ-сервисов
            </p>
            <Link
              href="/ai-services"
              className="inline-flex items-center gap-2 bg-white text-accent-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Открыть каталог
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 