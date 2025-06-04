'use client'

import { motion } from 'framer-motion'
import { Search, Command } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const suggestions = [
    'Генерация изображений',
    'Чат-боты',
    'Музыка и аудио',
    'Видео редакторы',
    'Автоматизация',
    'Обработка текста'
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className={`relative overflow-hidden rounded-3xl bg-white shadow-xl border-2 transition-all duration-300 ${
            isFocused ? 'border-accent-primary shadow-2xl scale-105' : 'border-gray-200'
          }`}>
            <div className="flex items-center px-6 py-4">
              <Search className="w-6 h-6 text-text-secondary mr-4" />
              <input
                type="text"
                placeholder="Найдите идеальный ИИ-инструмент..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 text-lg text-text-primary placeholder-text-secondary outline-none bg-transparent"
              />
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-sm text-text-secondary">
                <Command className="w-4 h-4" />
                <span>K</span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 flex flex-wrap gap-3 justify-center"
          >
            <span className="text-text-secondary text-sm font-medium">Популярные категории:</span>
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchValue(suggestion)}
                className="px-4 py-2 bg-white/80 hover:bg-accent-primary/10 border border-gray-200 hover:border-accent-primary/30 rounded-2xl text-sm text-text-secondary hover:text-accent-primary transition-all duration-200"
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 