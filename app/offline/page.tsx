'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { WifiOff, RefreshCw, Home, ArrowLeft } from 'lucide-react'

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Иконка оффлайн */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <WifiOff className="w-16 h-16 text-gray-400" />
            </div>
          </motion.div>

          {/* Основное сообщение */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Вы офлайн
            </h1>
            <p className="text-xl text-text-secondary max-w-xl mx-auto leading-relaxed mb-8">
              Отсутствует подключение к интернету. Проверьте соединение и попробуйте снова.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-800 font-medium">
                💡 GigHub работает частично офлайн благодаря кэшированию. 
                Некоторые страницы могут быть доступны без интернета.
              </p>
            </div>
          </motion.div>

          {/* Кнопки действий */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold"
            >
              <RefreshCw className="w-5 h-5" />
              Обновить страницу
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              На главную
            </Link>
          </motion.div>

          {/* Доступные офлайн страницы */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Возможно, доступны офлайн:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Главная', href: '/' },
                { name: 'Каталог', href: '/ai-services' },
                { name: 'Бесплатные', href: '/free-neural-networks' },
                { name: 'Блог', href: '/blog' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Страницы кэшируются автоматически при первом посещении
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 