'use client'

import { ArrowRight, Sparkles, Mouse, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen-mobile flex items-center justify-center overflow-hidden safe-area-inset">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5" />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent-secondary/10 to-accent-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 sm:space-y-8 py-12 sm:py-20">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/60 text-sm text-text-secondary shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-accent-primary" />
            Открой мир искусственного интеллекта
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-text-primary">Каталог лучших</span>
            <br />
            <span className="text-gradient">ИИ-инструментов</span>
            <br />
            <span className="text-text-primary">и нейросетей 2025</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Откройте для себя 2000+ проверенных нейросетей и AI-сервисов для генерации 
            изображений, текста, музыки и автоматизации бизнеса. Бесплатные и платные 
            инструменты искусственного интеллекта с поддержкой русского языка.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col gap-4 justify-center pt-6 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/ai-services">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 min-h-[56px] bg-accent-primary text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation group"
              >
                <span className="flex items-center justify-center gap-2">
                  Начать исследование
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
            
            <Link href="/ai-services">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 min-h-[56px] bg-white/90 backdrop-blur-sm text-text-primary rounded-xl font-medium text-lg border border-gray-200/60 hover:border-accent-primary/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md touch-manipulation"
              >
                Посмотреть каталог
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Scroll Indicator - Hidden on mobile to save space */}
          <motion.div 
            className="hidden sm:flex flex-col items-center gap-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div 
              className="flex flex-col items-center gap-3 text-text-secondary"
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-sm font-medium">Прокрутите вниз</span>
              <div className="flex items-center gap-2">
                <Mouse className="w-6 h-6 text-accent-primary" />
                <ChevronDown className="w-5 h-5 text-accent-primary" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 