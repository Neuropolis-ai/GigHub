'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Crown, Zap, Users, Award, TrendingUp, ChevronRight, Heart, Bookmark, Clock, BarChart3, Shield } from 'lucide-react'

interface AITool {
  id: number
  name: string
  rating: number
  price: string
  isFree: boolean
  description: string
  features: string[]
  pros: string[]
  cons: string[]
  logo: string
  gradient: string
  iconBg: string
  badgeColor: string
  userCount: string
  monthlyGrowth: string
}

const topTools: AITool[] = [
  {
    id: 1,
    name: "Midjourney",
    rating: 9.8,
    price: "$10-120/месяц",
    isFree: false,
    description: "Лидер фотореалистичной генерации с непревзойденным качеством и художественными возможностями",
    features: ["V6 фотореализм", "Художественные стили", "--niji для аниме", "Discord интеграция"],
    pros: ["Лучшее качество на рынке", "Огромное сообщество", "Постоянные обновления"],
    cons: ["Нет бесплатного доступа", "Только Discord интерфейс", "Очереди в пиковые часы"],
    logo: "/images/midjourney-example.jpg",
    gradient: "from-purple-500 to-pink-500",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    userCount: "15M+",
    monthlyGrowth: "+25%"
  },
  {
    id: 2,
    name: "DALL-E 3",
    rating: 9.5,
    price: "$20/месяц",
    isFree: true,
    description: "Интегрирован с ChatGPT, лучше всех понимает сложные промпты и русский язык",
    features: ["ChatGPT интеграция", "Русский язык", "Качественный текст", "Диалоговые промпты"],
    pros: ["Понимание контекста", "Простота использования", "Высокое качество текста"],
    cons: ["Ограничения бесплатной версии", "Требует подписку Plus", "Медленная генерация"],
    logo: "/images/dalle-example.webp",
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    userCount: "100M+",
    monthlyGrowth: "+40%"
  },
  {
    id: 3,
    name: "Stable Diffusion",
    rating: 9.3,
    price: "Бесплатно",
    isFree: true,
    description: "Открытая модель для локального использования с полной свободой творчества и настроек",
    features: ["Открытый исходный код", "Локальная генерация", "Множество моделей", "Полная настройка"],
    pros: ["Полностью бесплатно", "Локальная работа", "Настраиваемость", "Активное сообщество"],
    cons: ["Требует мощную видеокарту", "Сложная настройка", "Нужны технические знания"],
    logo: "/images/stable-diffusion-example.webp",
    gradient: "from-amber-600 to-orange-500",
    iconBg: "bg-gradient-to-br from-amber-600 to-orange-500",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    userCount: "2M+",
    monthlyGrowth: "+80%"
  }
]

const TopAIToolsRecommendations = () => {
  const [selectedTool, setSelectedTool] = useState<number>(1)
  const [bookmarkedTools, setBookmarkedTools] = useState<Set<number>>(new Set())

  const toggleBookmark = (toolId: number) => {
    const newBookmarks = new Set(bookmarkedTools)
    if (newBookmarks.has(toolId)) {
      newBookmarks.delete(toolId)
    } else {
      newBookmarks.add(toolId)
    }
    setBookmarkedTools(newBookmarks)
  }

  return (
    <section id="top-ai-tools" className="py-20 bg-gradient-to-br from-accent-primary/5 via-background to-accent-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-full border border-accent-primary/20 mb-6">
            <Crown className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-semibold text-sm">ТОП-3 ВЫБОРА ЭКСПЕРТОВ</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-tight">
            Лучшие нейросети для{' '}
            <span className="text-gradient bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              создания изображений
            </span>
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Проверенные лидеры рынка с миллионами пользователей и высочайшим качеством генерации
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {topTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/5 hover:border-accent-primary/30 cursor-pointer ${
                selectedTool === tool.id ? 'ring-2 ring-accent-primary/30 shadow-lg' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedTool(tool.id)}
              whileHover={{ y: -3 }}
            >
              {/* Position Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md' :
                  index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-sm' :
                  'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm'
                }`}>
                  {index === 0 && <Crown className="w-3 h-3" />}
                  #{index + 1}
                </div>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleBookmark(tool.id)
                }}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
              >
                <Bookmark 
                  className={`w-4 h-4 transition-colors ${
                    bookmarkedTools.has(tool.id) 
                      ? 'text-accent-primary fill-current' 
                      : 'text-gray-400 hover:text-accent-primary'
                  }`} 
                />
              </button>

              {/* Hero Image */}
              <div className="relative h-40 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-80`} />
                <Image
                  src={tool.logo}
                  alt={`${tool.name} example`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                    <Users className="w-3 h-3 text-accent-primary" />
                    <span className="text-xs font-medium text-text-primary">{tool.userCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-green-600">{tool.monthlyGrowth}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                      {tool.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-bold text-yellow-700">{tool.rating}</span>
                      </div>
                      {tool.isFree && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-medium border border-green-200">
                          Есть бесплатно
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent-primary">{tool.price}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-accent-primary" />
                    Ключевые возможности:
                  </h4>
                  <div className="space-y-1.5">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-primary flex-shrink-0" />
                        <span className="text-xs text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl text-sm font-semibold hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg group flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Попробовать {tool.name}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Info Section */}
        <AnimatePresence mode="wait">
          {selectedTool && (
            <motion.div
              key={selectedTool}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 shadow-lg mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {(() => {
                const tool = topTools.find(t => t.id === selectedTool)
                if (!tool) return null

                return (
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Pros */}
                    <div>
                      <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                          <Heart className="w-4 h-4 text-green-600" />
                        </div>
                        Преимущества {tool.name}
                      </h4>
                      <div className="space-y-3">
                        {tool.pros.map((pro, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-green-50/50 rounded-xl border border-green-100"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            </div>
                            <span className="text-sm text-text-secondary">{pro}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                          <Award className="w-4 h-4 text-amber-600" />
                        </div>
                        Ограничения и особенности
                      </h4>
                      <div className="space-y-3">
                        {tool.cons.map((con, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            </div>
                            <span className="text-sm text-text-secondary">{con}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Section - перенесен после detailed info */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 shadow-lg">
            <h3 className="text-xl font-bold text-text-primary mb-8 text-center">
              Почему стоит доверять нашему выбору?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-primary/10 to-accent-primary/20 flex items-center justify-center group-hover:from-accent-primary/20 group-hover:to-accent-primary/30 transition-all duration-300">
                  <Clock className="w-8 h-8 text-accent-primary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">50+ часов тестирования</h4>
                <p className="text-sm text-text-secondary">Детальный анализ каждого инструмента</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-secondary/10 to-accent-secondary/20 flex items-center justify-center group-hover:from-accent-secondary/20 group-hover:to-accent-secondary/30 transition-all duration-300">
                  <Shield className="w-8 h-8 text-accent-secondary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Экспертная оценка</h4>
                <p className="text-sm text-text-secondary">Команда профессиональных дизайнеров</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Актуальные данные</h4>
                <p className="text-sm text-text-secondary">Регулярное обновление рейтингов</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TopAIToolsRecommendations