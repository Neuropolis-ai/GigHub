'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Search, Command } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5" />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent-secondary/10 to-accent-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/60 text-sm text-text-secondary shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
            Открой мир искусственного интеллекта
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          >
            <span className="text-text-primary">Платформа, где собраны</span>
            <br />
            <span className="text-gradient">лучшие ИИ-инструменты</span>
            <br />
            <span className="text-text-primary">мира</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Откройте для себя более 25 качественных ИИ-сервисов для генерации изображений, 
            текста, музыки, автоматизации и решения бизнес-задач
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex items-center px-6 py-4">
                  <Search className="w-5 h-5 text-text-secondary mr-4 flex-shrink-0" />
                  
                  <input
                    type="text"
                    placeholder="Найти ИИ-инструмент... например, 'генерация изображений'"
                    className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-secondary text-base"
                  />
                  
                  <div className="flex items-center gap-1 ml-4 px-2 py-1 bg-gray-100/80 rounded-lg text-xs text-text-secondary font-medium">
                    <Command className="w-3 h-3" />
                    <span>K</span>
                  </div>
                </div>
                
                {/* Search suggestions */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {['Midjourney', 'ChatGPT', 'Stable Diffusion', 'Runway ML'].map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                        className="px-3 py-1 bg-gray-50/80 hover:bg-accent-primary/10 text-text-secondary hover:text-accent-primary text-sm rounded-lg transition-colors duration-200"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-accent-primary text-white rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Начать исследование
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/90 backdrop-blur-sm text-text-primary rounded-xl font-medium text-base border border-gray-200/60 hover:border-accent-primary/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Посмотреть каталог
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Improved Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-text-secondary">
          <span className="text-xs font-medium">Прокрутите вниз</span>
          <div className="w-5 h-8 border border-gray-300/60 rounded-full flex justify-center relative overflow-hidden">
            <motion.div 
              className="w-0.5 h-2 bg-accent-primary rounded-full absolute top-1.5"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
} 