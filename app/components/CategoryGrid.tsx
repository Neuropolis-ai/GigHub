'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Image, 
  MessageSquare, 
  Music, 
  Video, 
  Zap, 
  FileText,
  Brain,
  Code,
  PenTool,
  Mic,
  Camera,
  BarChart
} from 'lucide-react'

const categories = [
  {
    id: 10,
    name: 'Генерация изображений',
    slug: 'images',
    description: 'AI-художники и генераторы визуала',
    icon: Image,
    count: '400+',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 7,
    name: 'Чат-боты и ассистенты',
    slug: 'chatbots',
    description: 'Умные помощники для любых задач',
    icon: MessageSquare,
    count: '250+',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 12,
    name: 'Музыка и аудио',
    slug: 'audio',
    description: 'Создание и обработка звука',
    icon: Music,
    count: '180+',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 9,
    name: 'Видео редакторы',
    slug: 'video',
    description: 'Монтаж и создание видеоконтента',
    icon: Video,
    count: '150+',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 17,
    name: 'Автоматизация',
    slug: 'automation',
    description: 'Workflow и бизнес-процессы',
    icon: Zap,
    count: '320+',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: 11,
    name: 'Обработка текста',
    slug: 'text',
    description: 'Письмо и редактирование',
    icon: FileText,
    count: '280+',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 3,
    name: 'Анализ данных',
    slug: 'analytics',
    description: 'Аналитика и машинное обучение',
    icon: BarChart,
    count: '200+',
    gradient: 'from-teal-500 to-green-500'
  },
  {
    id: 8,
    name: 'Кодирование',
    slug: 'development',
    description: 'ИИ-помощники для разработчиков',
    icon: Code,
    count: '120+',
    gradient: 'from-slate-500 to-gray-500'
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Найдите инструмент для
            <span className="text-gradient"> любой задачи</span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Исследуйте категории и откройте для себя идеальные ИИ-решения для творчества, бизнеса и повседневных задач
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <Link href={`/ai-services?category=${category.slug}`}>
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-gray-200 hover:border-accent-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 h-full cursor-pointer min-h-[160px] sm:min-h-[180px] touch-manipulation">
                    
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl sm:rounded-3xl`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon с адаптивным размером */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                          {category.name}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
                          {category.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-accent-primary font-semibold text-sm">
                          {category.count} сервисов
                        </span>
                        <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary transition-all duration-300">
                          <span className="text-accent-primary group-hover:text-white text-sm">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 