'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
    description: 'AI-художники и генераторы визуала',
    icon: Image,
    count: '400+',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 7,
    name: 'Чат-боты и ассистенты',
    description: 'Умные помощники для любых задач',
    icon: MessageSquare,
    count: '250+',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 12,
    name: 'Музыка и аудио',
    description: 'Создание и обработка звука',
    icon: Music,
    count: '180+',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 9,
    name: 'Видео редакторы',
    description: 'Монтаж и создание видеоконтента',
    icon: Video,
    count: '150+',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 17,
    name: 'Автоматизация',
    description: 'Workflow и бизнес-процессы',
    icon: Zap,
    count: '320+',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: 11,
    name: 'Обработка текста',
    description: 'Письмо и редактирование',
    icon: FileText,
    count: '280+',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 3,
    name: 'Анализ данных',
    description: 'Аналитика и машинное обучение',
    icon: BarChart,
    count: '200+',
    gradient: 'from-teal-500 to-green-500'
  },
  {
    id: 8,
    name: 'Кодирование',
    description: 'ИИ-помощники для разработчиков',
    icon: Code,
    count: '120+',
    gradient: 'from-slate-500 to-gray-500'
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Найдите инструмент для
            <span className="text-gradient"> любой задачи</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Исследуйте категории и откройте для себя идеальные ИИ-решения для творчества, бизнеса и повседневных задач
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <Link href={`/ai-services?category=${category.id}`}>
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-accent-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full cursor-pointer">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                          {category.description}
                        </p>
                      </div>

                      {/* Count */}
                      <div className="flex items-center justify-between">
                        <span className="text-accent-primary font-semibold">
                          {category.count} сервисов
                        </span>
                        <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
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