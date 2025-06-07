'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Crown, 
  Zap, 
  Users, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  Heart, 
  CheckCircle2,
  XCircle,
  DollarSign,
  Globe,
  Clock,
  Shield,
  Sparkles
} from 'lucide-react'

interface DetailedTool {
  id: number
  name: string
  rating: number
  price: string
  isFree: boolean
  description: string
  shortDescription: string
  features: string[]
  pros: string[]
  cons: string[]
  logo: string
  gradient: string
  userCount: string
  monthlyGrowth: string
  supportedLanguages: string[]
  generationTime: string
  pricing: {
    plan: string
    price: string
    features: string[]
  }[]
  specialty: string
  trustScore: number
}

const detailedTools: DetailedTool[] = [
  {
    id: 1,
    name: "Midjourney",
    rating: 9.8,
    price: "$10-120/месяц",
    isFree: false,
    description: "Абсолютный лидер в области генерации изображений с помощью ИИ. Midjourney v6 устанавливает новые стандарты фотореализма и художественной выразительности.",
    shortDescription: "Лучшее качество генерации на рынке",
    features: ["V6 архитектура", "Фотореализм 8K", "Аниме режим --niji", "Discord интеграция", "Инструменты редактирования"],
    pros: ["Непревзойденное качество", "Огромное сообщество художников", "Постоянные обновления", "Лучший фотореализм"],
    cons: ["Нет бесплатного доступа", "Только Discord интерфейс", "Очереди в пиковые часы", "Высокая стоимость"],
    logo: "/images/midjourney-example.jpg",
    gradient: "from-purple-600 via-pink-500 to-rose-400",
    userCount: "15M+",
    monthlyGrowth: "+25%",
    supportedLanguages: ["Английский"],
    generationTime: "30-60 секунд",
    specialty: "Художественная генерация",
    trustScore: 98,
    pricing: [
      {
        plan: "Basic",
        price: "$10/месяц",
        features: ["~200 изображений", "Базовые функции", "Доступ к галерее"]
      },
      {
        plan: "Standard", 
        price: "$30/месяц",
        features: ["~900 изображений", "Приватные галереи", "Fast mode"]
      },
      {
        plan: "Pro",
        price: "$60/месяц", 
        features: ["~1800 изображений", "Скрытые промпты", "Максимальная скорость"]
      }
    ]
  },
  {
    id: 2,
    name: "DALL-E 3",
    rating: 9.5,
    price: "$20/месяц",
    isFree: true,
    description: "Самая умная нейросеть от OpenAI, интегрированная с ChatGPT. Лучше всех понимает сложные промпты и создает качественный текст на изображениях.",
    shortDescription: "Самое умное понимание промптов",
    features: ["ChatGPT интеграция", "Русский язык", "Качественный текст", "Диалоговые промпты", "Безопасная генерация"],
    pros: ["Понимание контекста", "Простота использования", "Высокое качество текста", "Интеграция с ChatGPT"],
    cons: ["Ограничения бесплатной версии", "Требует подписку Plus", "Медленная генерация", "Строгая модерация"],
    logo: "/images/dalle-example.webp",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    userCount: "100M+",
    monthlyGrowth: "+40%",
    supportedLanguages: ["Русский", "Английский", "Более 50 языков"],
    generationTime: "10-30 секунд",
    specialty: "Понимание промптов",
    trustScore: 95,
    pricing: [
      {
        plan: "Бесплатно",
        price: "0₽",
        features: ["2 изображения в день", "Базовое качество", "Bing Image Creator"]
      },
      {
        plan: "ChatGPT Plus",
        price: "$20/месяц",
        features: ["50 изображений/час", "Высокое качество", "Полный доступ"]
      }
    ]
  },
  {
    id: 3,
    name: "Stable Diffusion 3",
    rating: 9.3,
    price: "Бесплатно",
    isFree: true,
    description: "Революционная открытая модель, которая дает полный контроль над процессом генерации. Тысячи кастомных моделей и бесконечные возможности.",
    shortDescription: "Полная свобода и контроль",
    features: ["Открытый код", "Кастомные модели", "ControlNet", "Локальная установка", "Неограниченная генерация"],
    pros: ["Полностью бесплатно", "Максимальный контроль", "Огромное сообщество", "Кастомные модели"],
    cons: ["Сложность установки", "Требует мощный ПК", "Нужны технические знания", "Нестабильное качество"],
    logo: "/images/stable-diffusion-example.webp",
    gradient: "from-orange-600 via-red-500 to-pink-400",
    userCount: "50M+",
    monthlyGrowth: "+60%",
    supportedLanguages: ["Русский", "Английский", "Все языки"],
    generationTime: "5-30 секунд",
    specialty: "Открытые возможности",
    trustScore: 93,
    pricing: [
      {
        plan: "Локально",
        price: "Бесплатно",
        features: ["Неограниченная генерация", "Все модели", "Полный контроль"]
      },
      {
        plan: "Cloud",
        price: "От $0.10",
        features: ["Облачные вычисления", "Готовая настройка", "API доступ"]
      }
    ]
  }
]

const DetailedAIToolsReview = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'comparison'>('overview')
  const [selectedTool, setSelectedTool] = useState<number>(1)

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: Star },
    { id: 'pricing', label: 'Тарифы', icon: DollarSign },
    { id: 'comparison', label: 'Сравнение', icon: Award }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent-primary/5 to-accent-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-accent-primary/20 mb-8 shadow-lg">
            <Sparkles className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-bold">ЭКСПЕРТНЫЙ АНАЛИЗ</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-8 leading-tight">
            Детальные{' '}
            <span className="text-gradient bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              обзоры
            </span>
            {' '}нейросетей
          </h2>
          
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Глубокий анализ возможностей, цен и особенностей каждой платформы от экспертов 
            с 5+ летним опытом в области ИИ
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg'
                      : 'text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'overview' && <OverviewTab tools={detailedTools} />}
            {activeTab === 'pricing' && <PricingTab tools={detailedTools} />}
            {activeTab === 'comparison' && <ComparisonTab tools={detailedTools} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// Overview Tab Component
const OverviewTab = ({ tools }: { tools: DetailedTool[] }) => (
  <div className="space-y-12">
    {tools.map((tool, index) => (
      <motion.div
        key={tool.id}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 overflow-hidden shadow-2xl hover:shadow-accent-primary/20 transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-80 lg:h-auto">
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-90`} />
            <Image
              src={tool.logo}
              alt={`${tool.name} showcase`}
              fill
              className="object-cover"
            />
            
            {/* Overlays */}
            <div className="absolute top-6 left-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                <Crown className="w-5 h-5 text-accent-primary" />
                <span className="font-bold text-accent-primary">TOP {index + 1}</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                  <Users className="w-5 h-5 text-accent-primary" />
                  <span className="font-bold text-text-primary">{tool.userCount} пользователей</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-green-600">{tool.monthlyGrowth}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-3xl font-bold text-text-primary">{tool.name}</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-xl border border-yellow-200">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-yellow-700">{tool.rating}</span>
                </div>
              </div>
              
              <p className="text-accent-primary font-semibold mb-4">{tool.shortDescription}</p>
              <p className="text-text-secondary leading-relaxed">{tool.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-xl border border-accent-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-accent-primary" />
                  <span className="text-sm font-semibold text-text-secondary">Скорость</span>
                </div>
                <span className="font-bold text-text-primary">{tool.generationTime}</span>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-text-secondary">Надёжность</span>
                </div>
                <span className="font-bold text-green-600">{tool.trustScore}%</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-accent-primary" />
                Ключевые возможности
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {tool.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-accent-primary mb-1">{tool.price}</div>
                {tool.isFree && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium border border-green-200">
                    <CheckCircle2 className="w-4 h-4" />
                    Есть бесплатно
                  </span>
                )}
              </div>
              
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Попробовать сейчас
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)

// Pricing Tab Component  
const PricingTab = ({ tools }: { tools: DetailedTool[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {tools.map((tool, index) => (
      <motion.div
        key={tool.id}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        {/* Header */}
        <div className={`p-6 bg-gradient-to-br ${tool.gradient} text-white`}>
          <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
          <p className="opacity-90">{tool.shortDescription}</p>
        </div>

        {/* Pricing Options */}
        <div className="p-6 space-y-4">
          {tool.pricing.map((plan, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-xl hover:border-accent-primary/30 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-text-primary">{plan.plan}</span>
                <span className="text-xl font-bold text-accent-primary">{plan.price}</span>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
)

// Comparison Tab Component
const ComparisonTab = ({ tools }: { tools: DetailedTool[] }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 overflow-hidden shadow-xl">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border-b border-gray-200">
            <th className="p-6 text-left font-bold text-text-primary">Характеристика</th>
            {tools.map((tool) => (
              <th key={tool.id} className="p-6 text-center font-bold text-text-primary min-w-[200px]">
                {tool.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[
            { label: 'Рейтинг', key: 'rating' },
            { label: 'Цена', key: 'price' },
            { label: 'Бесплатно', key: 'isFree' },
            { label: 'Пользователи', key: 'userCount' },
            { label: 'Время генерации', key: 'generationTime' },
            { label: 'Специализация', key: 'specialty' },
            { label: 'Надёжность', key: 'trustScore' }
          ].map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-6 font-semibold text-text-primary">{row.label}</td>
              {tools.map((tool) => (
                <td key={tool.id} className="p-6 text-center">
                  {row.key === 'rating' && (
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold">{tool.rating}</span>
                    </div>
                  )}
                  {row.key === 'isFree' && (
                    tool.isFree ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                    )
                  )}
                  {row.key === 'trustScore' && (
                    <span className="font-bold text-green-600">{tool.trustScore}%</span>
                  )}
                  {row.key === 'price' && (
                    <span className="text-text-secondary">{tool.price}</span>
                  )}
                  {row.key === 'userCount' && (
                    <span className="text-text-secondary">{tool.userCount}</span>
                  )}
                  {row.key === 'generationTime' && (
                    <span className="text-text-secondary">{tool.generationTime}</span>
                  )}
                  {row.key === 'specialty' && (
                    <span className="text-text-secondary">{tool.specialty}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default DetailedAIToolsReview