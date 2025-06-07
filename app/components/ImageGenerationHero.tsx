'use client'

import { ArrowRight, Sparkles, Play, Award, TrendingUp, Users, Star, BookOpen, Search, MessageCircle, Shield } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ImageGenerationHero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent-primary/5 via-background to-accent-secondary/5">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent-secondary/20 to-accent-primary/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-accent-primary/20 text-sm text-text-secondary shadow-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Award className="w-5 h-5 text-accent-primary" />
                <span className="font-semibold">ТОП-5 нейросетей 2025 года</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-text-primary">Лучшие нейросети</span>
                <br />
                <span className="text-text-primary">для генерации</span>
                <br />
                <span className="text-gradient bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  изображений 2025
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Полный гид по 15+ лучшим ИИ-инструментам для создания изображений. 
                Сравнения, цены, примеры и экспертные рекомендации от профессионалов.
              </motion.p>

              {/* Stats Row */}
              <motion.div 
                className="grid grid-cols-3 gap-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-accent-primary">15+</div>
                  <div className="text-sm text-text-secondary">Нейросетей</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-accent-secondary">50M+</div>
                  <div className="text-sm text-text-secondary">Пользователей</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-green-500">95%</div>
                  <div className="text-sm text-text-secondary">Точность</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Link href="#top-ai-tools">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 min-h-[56px] bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      Смотреть рейтинг
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
                
                <Link href="#comparison-table">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 min-h-[56px] bg-white/90 backdrop-blur-sm text-text-primary rounded-xl font-semibold text-lg border border-gray-200/60 hover:border-accent-primary/40 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Play className="w-5 h-5 text-accent-primary" />
                      Сравнить сервисы
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                className="flex items-center justify-center lg:justify-start gap-6 mt-10 text-sm text-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent-primary" />
                  <span>100К+ читателей</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 рейтинг</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Обновляется еженедельно</span>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="relative">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Main Image Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Midjourney Example */}
                  <motion.div 
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-70" />
                    <Image
                      src="/images/midjourney-example.jpg"
                      alt="Midjourney AI art example"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
                        <div className="font-bold text-purple-600">Midjourney</div>
                        <div className="text-sm text-gray-600">Фотореализм 10/10</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* DALL-E Example */}
                  <motion.div 
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl mt-8"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-500 opacity-70" />
                    <Image
                      src="/images/dalle-example.webp"
                      alt="DALL-E 3 AI art example"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
                        <div className="font-bold text-emerald-600">DALL-E 3</div>
                        <div className="text-sm text-gray-600">Понимание 10/10</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Leonardo Example */}
                  <motion.div 
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl -mt-4"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-500 opacity-70" />
                    <Image
                      src="/images/leonardo-example.jpg"
                      alt="Leonardo AI art example"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
                        <div className="font-bold text-orange-600">Leonardo AI</div>
                        <div className="text-sm text-gray-600">Скорость 10/10</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stable Diffusion Example */}
                  <motion.div 
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-500 opacity-70" />
                    <Image
                      src="/images/stable-diffusion-example.webp"
                      alt="Stable Diffusion AI art example"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
                        <div className="font-bold text-blue-600">Stable Diffusion</div>
                        <div className="text-sm text-gray-600">Свобода 10/10</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav 
            className="flex items-center justify-center gap-2 sm:gap-4 py-4 overflow-x-auto scrollbar-hide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="#top-ai-tools">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-accent-primary/10 hover:to-accent-primary/5 hover:text-accent-primary border border-transparent hover:border-accent-primary/20 hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-4 h-4" />
                <span>Топ-3 нейросети</span>
              </motion.button>
            </a>

            <a href="#detailed-reviews">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-accent-primary/10 hover:to-accent-primary/5 hover:text-accent-primary border border-transparent hover:border-accent-primary/20 hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4" />
                <span>Детальные обзоры</span>
              </motion.button>
            </a>

            <a href="#comparison-table">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-accent-secondary/10 hover:to-accent-secondary/5 hover:text-accent-secondary border border-transparent hover:border-accent-secondary/20 hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Сравнение</span>
              </motion.button>
            </a>

            <a href="#prompt-guide">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-accent-secondary/10 hover:to-accent-secondary/5 hover:text-accent-secondary border border-transparent hover:border-accent-secondary/20 hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-4 h-4" />
                <span>Гайд по промптам</span>
              </motion.button>
            </a>

            <a href="#faq">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-accent-primary/10 hover:to-accent-primary/5 hover:text-accent-primary border border-transparent hover:border-accent-primary/20 hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Вопросы и ответы</span>
              </motion.button>
            </a>

            <a href="#expert-reviews">
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-gray-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-accent-primary/10 hover:to-accent-primary/5 hover:text-accent-primary border border-transparent hover:border-accent-primary/20 hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-4 h-4" />
                <span>Экспертное мнение</span>
              </motion.button>
            </a>
          </motion.nav>
        </div>
      </section>
    </>
  )
}