'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Home, ArrowLeft, Sparkles, Bot, Brain } from 'lucide-react'

const popularPages = [
  {
    title: "Бесплатные нейросети",
    description: "Лучшие бесплатные ИИ-инструменты для всех задач",
    href: "/free-neural-networks",
    icon: "🆓"
  },
  {
    title: "Нейросети для изображений", 
    description: "ИИ для создания картинок и фото",
    href: "/image-neural-networks",
    icon: "🎨"
  },
  {
    title: "Нейросети для текста",
    description: "ИИ для создания и редактирования текста",
    href: "/text-neural-networks", 
    icon: "✍️"
  },
  {
    title: "GPT нейросети",
    description: "ChatGPT и другие GPT-модели",
    href: "/gpt-neural-networks",
    icon: "🤖"
  }
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Большая 404 с анимацией */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-8xl md:text-9xl font-bold text-gradient bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Brain className="w-8 h-8 text-purple-500 animate-pulse" />
                <Bot className="w-8 h-8 text-blue-500 animate-bounce" />
                <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
              </div>
            </motion.div>

            {/* Основное сообщение */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Даже ИИ не может найти эту страницу
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Возможно, страница была перемещена, удалена или вы ввели неправильный адрес. 
                Но не переживайте — у нас есть много других интересных нейросетей!
              </p>
            </motion.div>

            {/* Кнопки действий */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold"
              >
                <Home className="w-5 h-5" />
                На главную
              </Link>
              <Link
                href="/ai-services"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-colors font-semibold"
              >
                <Search className="w-5 h-5" />
                Каталог нейросетей
              </Link>
            </motion.div>

            {/* Популярные страницы */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-text-primary mb-8">
                Популярные разделы
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularPages.map((page, index) => (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    className="h-full"
                  >
                    <Link
                      href={page.href}
                      className="flex flex-col h-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="text-4xl mb-3">{page.icon}</div>
                      <h4 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
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