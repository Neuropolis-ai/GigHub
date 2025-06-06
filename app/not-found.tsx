'use client'

import Link from 'next/link'
import { Search, Home, ArrowLeft, Sparkles, Bot, Brain } from 'lucide-react'
import { motion } from 'framer-motion'

const popularPages = [
  {
    title: "Каталог нейросетей",
    description: "2000+ проверенных ИИ-инструментов",
    href: "/ai-services",
    icon: "🤖"
  },
  {
    title: "Категории ИИ", 
    description: "Все типы нейросетей по категориям",
    href: "/categories",
    icon: "🗂️"
  },
  {
    title: "Бесплатные нейросети",
    description: "Лучшие бесплатные ИИ-инструменты",
    href: "/free-neural-networks",
    icon: "🆓"
  },
  {
    title: "ИИ для изображений",
    description: "Генерация и редактирование изображений",
    href: "/image-neural-networks",
    icon: "🎨"
  }
]

export default function NotFound() {
  return (
    <div className="min-h-screen-mobile bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 sm:py-20 safe-area-inset">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Большая 404 с анимацией */}
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-gradient bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-accent-primary" />
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent-primary" />
                </motion.div>
              </div>
            </motion.div>

            {/* Основное сообщение */}
            <motion.div
              className="mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 px-4">
                Даже ИИ не может найти эту страницу
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
                Возможно, страница была перемещена, удалена или вы ввели неправильный адрес. 
                Но не переживайте — у нас есть много других интересных нейросетей!
              </p>
            </motion.div>

            {/* Кнопки действий с улучшенными touch targets */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[56px] bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors font-semibold shadow-lg hover:shadow-xl touch-manipulation"
                >
                  <Home className="w-5 h-5" />
                  На главную
                </motion.button>
              </Link>
              <Link href="/ai-services">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[56px] border-2 border-accent-primary text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white transition-colors font-semibold touch-manipulation"
                >
                  <Search className="w-5 h-5" />
                  Каталог нейросетей
                </motion.button>
              </Link>
            </motion.div>

            {/* Популярные страницы */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="px-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8">
                Популярные разделы
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {popularPages.map((page, index) => (
                  <motion.div
                    key={page.href}
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={page.href}
                      className="flex flex-col h-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 min-h-[140px] touch-manipulation"
                    >
                      <div className="text-3xl sm:text-4xl mb-3">{page.icon}</div>
                      <h4 className="text-base sm:text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                        {page.title}
                      </h4>
                      <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                        {page.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 