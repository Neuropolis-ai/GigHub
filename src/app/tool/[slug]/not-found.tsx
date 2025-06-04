'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Number */}
          <div className="text-8xl sm:text-9xl font-bold text-gradient opacity-20">
            404
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Инструмент не найден
          </h1>

          {/* Description */}
          <p className="text-lg text-text-secondary max-w-lg mx-auto">
            К сожалению, запрашиваемый ИИ-инструмент не найден в нашей базе данных. 
            Возможно, он был удален или переименован.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Вернуться на главную
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-text-primary rounded-xl font-medium hover:border-accent-primary/40 transition-colors"
            >
              <Search className="w-4 h-4" />
              Поиск инструментов
            </motion.button>
          </div>

          {/* Suggestion */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-text-secondary text-sm mb-4">
              Возможно, вас заинтересуют эти популярные инструменты:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['MidJourney', 'ChatGPT', 'Stable Diffusion', 'Runway ML'].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-gray-100 text-text-secondary text-sm rounded-lg hover:bg-accent-primary/10 hover:text-accent-primary transition-colors cursor-pointer"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 