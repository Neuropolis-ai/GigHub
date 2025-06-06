'use client'

import { ArrowRight, Sparkles, Mouse, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5" />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent-secondary/10 to-accent-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/60 text-sm text-text-secondary shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
            Открой мир искусственного интеллекта
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-text-primary">Каталог лучших</span>
            <br />
            <span className="text-gradient">ИИ-инструментов</span>
            <br />
            <span className="text-text-primary">и нейросетей 2025</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Откройте для себя 2000+ проверенных нейросетей и AI-сервисов для генерации 
            изображений, текста, музыки и автоматизации бизнеса. Бесплатные и платные 
            инструменты искусственного интеллекта с поддержкой русского языка.
          </p>

          {/* Enhanced Scroll Indicator - Moved to center */}
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex flex-col items-center gap-3 text-text-secondary animate-bounce">
              <span className="text-sm font-medium">Прокрутите вниз</span>
              <div className="flex items-center gap-2">
                <Mouse className="w-6 h-6 text-accent-primary" />
                <ChevronDown className="w-5 h-5 text-accent-primary" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/ai-services">
              <button className="group relative px-8 py-4 bg-accent-primary text-white rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Начать исследование
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            
            <Link href="/ai-services">
              <button className="px-8 py-4 bg-white/90 backdrop-blur-sm text-text-primary rounded-xl font-medium text-base border border-gray-200/60 hover:border-accent-primary/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95">
                Посмотреть каталог
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 