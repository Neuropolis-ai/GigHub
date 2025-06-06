'use client'

import React, { useState, useEffect } from 'react'
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
  BarChart3,
  Search,
  Briefcase,
  Palette,
  Database,
  Globe,
  BookOpen,
  Users,
  Shield,
  Smartphone,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShoppingCart,
  Mail,
  Building2,
  Bot,
  User,
  MoreHorizontal,
  Heart,
  DollarSign,
  Target,
  Smile,
  LifeBuoy,
  CheckSquare,
  Gamepad2,
  PartyPopper,
  Type,
  Presentation,
  UserPlus,
  Package,
  Rocket,
  Coffee,
  UserCheck,
  Layers
} from 'lucide-react'

// Маппинг иконок для категорий
const iconMapping = {
  // Основные категории по slug
  'e-commerce': ShoppingCart,
  'email': Mail,
  'автоматизация': Zap,
  'data-analytics': BarChart3,
  'architecture-interior-design': Building2,
  'audio': Music,
  'security': Shield,
  'business-startups': Rocket,
  'large-language-models': Bot,
  'video': Video,
  'virtual-avatars': UserCheck,
  'документы': FileText,
  'drugoe': MoreHorizontal,
  'health-fitness': Heart,
  'images': Image,
  'investitsii-i-finansy': DollarSign,
  'marketing-sales': Target,
  'lifestyle': Coffee,
  'customer-support': LifeBuoy,
  'education-coaching': BookOpen,
  'productivity': CheckSquare,
  'razvlecheniya': Gamepad2,
  'развлечения-и-lifestyle': PartyPopper,
  'razrabotka-i-it': Code,
  'sozdanie-kontenta': PenTool,
  'sozdanie-prezentatsiy': Presentation,
  'sotsialnye-seti': Users,
  'text': Type,
  'трудоустройство-и-hr': UserPlus,
  'управление-продуктами': Package,
  'чат-боты': MessageSquare,
  
  // Дополнительные англоязычные категории
  'chatbots': MessageSquare,
  'automation': Zap,
  'analytics': BarChart3,
  'development': Code,
  'design': Palette,
  'data': Database,
  'web': Globe,
  'education': BookOpen,
  'social': Users,
  'mobile': Smartphone,
  'business': Briefcase,
  'search': Search,
  'creativity': PenTool,
  'voice': Mic,
  'photo': Camera,
  'ai': Brain,
  'presentations': Presentation,
  'documents': FileText,
  
  // Fallback
  'default': Brain
}

// Градиенты для категорий
const gradientMapping = {
  // Основные категории по slug
  'e-commerce': 'from-blue-600 to-indigo-700',
  'email': 'from-red-400 to-rose-500',
  'автоматизация': 'from-yellow-600 to-orange-600',
  'data-analytics': 'from-teal-500 to-green-500',
  'architecture-interior-design': 'from-stone-600 to-gray-700',
  'audio': 'from-green-500 to-emerald-500',
  'security': 'from-gray-500 to-slate-500',
  'business-startups': 'from-emerald-600 to-green-700',
  'large-language-models': 'from-purple-500 to-blue-500',
  'video': 'from-red-500 to-orange-500',
  'virtual-avatars': 'from-indigo-500 to-blue-600',
  'документы': 'from-sky-600 to-blue-700',
  'drugoe': 'from-gray-400 to-gray-600',
  'health-fitness': 'from-pink-400 to-fuchsia-500',
  'images': 'from-purple-500 to-blue-500',
  'investitsii-i-finansy': 'from-green-600 to-emerald-700',
  'marketing-sales': 'from-orange-400 to-amber-500',
  'lifestyle': 'from-amber-400 to-yellow-500',
  'customer-support': 'from-teal-400 to-cyan-500',
  'education-coaching': 'from-orange-500 to-red-500',
  'productivity': 'from-sky-500 to-cyan-500',
  'razvlecheniya': 'from-purple-500 to-blue-500',
  'развлечения-и-lifestyle': 'from-pink-500 to-rose-400',
  'razrabotka-i-it': 'from-slate-500 to-gray-500',
  'sozdanie-kontenta': 'from-rose-500 to-pink-500',
  'sozdanie-prezentatsiy': 'from-indigo-400 to-blue-500',
  'sotsialnye-seti': 'from-emerald-500 to-teal-500',
  'text': 'from-purple-500 to-blue-500',
  'трудоустройство-и-hr': 'from-blue-500 to-indigo-600',
  'управление-продуктами': 'from-amber-500 to-orange-500',
  'чат-боты': 'from-blue-500 to-cyan-500',
  
  // Дополнительные англоязычные категории
  'chatbots': 'from-blue-500 to-cyan-500',
  'automation': 'from-yellow-500 to-amber-500',
  'analytics': 'from-teal-500 to-green-500',
  'development': 'from-slate-500 to-gray-500',
  'design': 'from-pink-500 to-rose-500',
  'data': 'from-violet-500 to-indigo-500',
  'web': 'from-cyan-500 to-blue-500',
  'education': 'from-orange-500 to-red-500',
  'social': 'from-emerald-500 to-teal-500',
  'mobile': 'from-purple-500 to-blue-500',
  'business': 'from-amber-500 to-yellow-500',
  'search': 'from-lime-500 to-green-500',
  'creativity': 'from-rose-500 to-pink-500',
  'voice': 'from-green-400 to-emerald-400',
  'photo': 'from-blue-400 to-indigo-400',
  'ai': 'from-purple-500 to-blue-500',
  'presentations': 'from-indigo-400 to-blue-500',
  'documents': 'from-sky-600 to-blue-700',
  
  // Fallback
  'default': 'from-gray-400 to-gray-500'
}

function getIconForCategory(categoryName, slug) {
  // Сначала проверяем точное соответствие slug
  if (slug && iconMapping[slug]) {
    return iconMapping[slug]
  }
  
  // Затем проверяем название категории
  const name = categoryName.toLowerCase()
  
  if (name.includes('изображен') || name.includes('картин') || name.includes('фото')) return Image
  if (name.includes('чат') || name.includes('бот') || name.includes('ассистент')) return MessageSquare
  if (name.includes('музык') || name.includes('аудио') || name.includes('звук')) return Music
  if (name.includes('видео') || name.includes('монтаж')) return Video
  if (name.includes('автомат') || name.includes('workflow')) return Zap
  if (name.includes('текст') || name.includes('письм')) return Type
  if (name.includes('данн') || name.includes('аналит')) return BarChart3
  if (name.includes('код') || name.includes('разраб')) return Code
  if (name.includes('дизайн') || name.includes('творч')) return Palette
  if (name.includes('бизнес') && name.includes('стартап')) return Rocket
  if (name.includes('бизнес') || name.includes('продукт')) return Briefcase
  if (name.includes('поиск')) return Search
  if (name.includes('образован') || name.includes('обучен') || name.includes('коучинг')) return BookOpen
  if (name.includes('социальн')) return Users
  if (name.includes('безопасн')) return Shield
  if (name.includes('мобильн')) return Smartphone
  if (name.includes('голос') || name.includes('речь')) return Mic
  if (name.includes('камер')) return Camera
  if (name.includes('email') || name.includes('почт')) return Mail
  if (name.includes('коммерц') || name.includes('торговл')) return ShoppingCart
  if (name.includes('здоровь') || name.includes('фитнес')) return Heart
  if (name.includes('архитектур') || name.includes('интерьер')) return Building2
  if (name.includes('презентац')) return Presentation
  if (name.includes('документ')) return FileText
  if (name.includes('поддержк')) return LifeBuoy
  if (name.includes('финанс') || name.includes('инвестиц')) return DollarSign
  if (name.includes('маркетинг') || name.includes('продаж')) return Target
  if (name.includes('продуктивн')) return CheckSquare
  if (name.includes('развлечен') && name.includes('lifestyle')) return PartyPopper
  if (name.includes('развлечен')) return Gamepad2
  if (name.includes('образ жизни') || (name.includes('lifestyle') && !name.includes('развлечен'))) return Coffee
  if (name.includes('контент')) return PenTool
  if (name.includes('трудоустройство') || name.includes('hr')) return UserPlus
  if (name.includes('управление продуктами')) return Package
  if (name.includes('виртуальн') && name.includes('аватар')) return UserCheck
  if (name.includes('языковые модели') || name.includes('llm')) return Bot
  if (name.includes('другое')) return MoreHorizontal
  
  // Fallback
  return iconMapping['default'] || Brain
}

function getGradientForCategory(categoryName, slug) {
  // Сначала проверяем точное соответствие slug
  if (slug && gradientMapping[slug]) {
    return gradientMapping[slug]
  }
  
  // Затем проверяем название категории
  const name = categoryName.toLowerCase()
  
  if (name.includes('изображен') || name.includes('картин') || name.includes('фото')) return 'from-purple-500 to-blue-500'
  if (name.includes('чат') || name.includes('бот') || name.includes('ассистент')) return 'from-blue-500 to-cyan-500'
  if (name.includes('музык') || name.includes('аудио') || name.includes('звук')) return 'from-green-500 to-emerald-500'
  if (name.includes('видео') || name.includes('монтаж')) return 'from-red-500 to-orange-500'
  if (name.includes('автомат') || name.includes('workflow')) return 'from-yellow-600 to-orange-600'
  if (name.includes('текст') || name.includes('письм')) return 'from-purple-500 to-blue-500'
  if (name.includes('данн') || name.includes('аналит')) return 'from-teal-500 to-green-500'
  if (name.includes('код') || name.includes('разраб')) return 'from-slate-500 to-gray-500'
  if (name.includes('дизайн') || name.includes('творч')) return 'from-pink-500 to-rose-500'
  if (name.includes('бизнес') && name.includes('стартап')) return 'from-emerald-600 to-green-700'
  if (name.includes('бизнес') || name.includes('продукт')) return 'from-amber-500 to-yellow-500'
  if (name.includes('поиск')) return 'from-lime-500 to-green-500'
  if (name.includes('образован') || name.includes('обучен') || name.includes('коучинг')) return 'from-orange-500 to-red-500'
  if (name.includes('социальн')) return 'from-emerald-500 to-teal-500'
  if (name.includes('безопасн')) return 'from-gray-500 to-slate-500'
  if (name.includes('мобильн')) return 'from-purple-500 to-blue-500'
  if (name.includes('голос') || name.includes('речь')) return 'from-green-400 to-emerald-400'
  if (name.includes('камер')) return 'from-blue-400 to-indigo-400'
  if (name.includes('email') || name.includes('почт')) return 'from-red-400 to-rose-500'
  if (name.includes('коммерц') || name.includes('торговл')) return 'from-blue-600 to-indigo-700'
  if (name.includes('здоровь') || name.includes('фитнес')) return 'from-pink-400 to-fuchsia-500'
  if (name.includes('архитектур') || name.includes('интерьер')) return 'from-stone-600 to-gray-700'
  if (name.includes('презентац')) return 'from-indigo-400 to-blue-500'
  if (name.includes('документ')) return 'from-sky-600 to-blue-700'
  if (name.includes('поддержк')) return 'from-teal-400 to-cyan-500'
  if (name.includes('финанс') || name.includes('инвестиц')) return 'from-green-600 to-emerald-700'
  if (name.includes('маркетинг') || name.includes('продаж')) return 'from-orange-400 to-amber-500'
  if (name.includes('продуктивн')) return 'from-sky-500 to-cyan-500'
  if (name.includes('развлечен') && name.includes('lifestyle')) return 'from-pink-500 to-rose-400'
  if (name.includes('развлечен')) return 'from-purple-500 to-blue-500'
  if (name.includes('образ жизни') || name.includes('lifestyle')) return 'from-amber-400 to-yellow-500'
  if (name.includes('контент')) return 'from-rose-500 to-pink-500'
  if (name.includes('трудоустройство') || name.includes('hr')) return 'from-blue-500 to-indigo-600'
  if (name.includes('управление продуктами')) return 'from-amber-500 to-orange-500'
  if (name.includes('виртуальн') && name.includes('аватар')) return 'from-indigo-500 to-blue-600'
  if (name.includes('языковые модели') || name.includes('llm')) return 'from-purple-500 to-blue-500'
  if (name.includes('другое')) return 'from-gray-400 to-gray-600'
  
  // Fallback
  return gradientMapping['default'] || 'from-gray-400 to-gray-500'
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) {
          throw new Error('Ошибка при загрузке категорий')
        }
        const result = await response.json()
        setCategories(result.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full mx-auto mb-6 animate-spin"></div>
          <p className="text-text-secondary text-lg">Загружаем категории...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Ошибка загрузки</h2>
            <p className="text-text-secondary mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-4 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* JSON-LD разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Категории ИИ-сервисов — GigHub",
            "description": "Полный каталог категорий нейросетей и ИИ-инструментов",
            "url": "https://gighub.ru/categories"
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <nav className="container mx-auto px-6 py-4">
          <ol className="flex items-center space-x-2 text-sm text-text-secondary">
            <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
            <li className="mx-2">/</li>
            <li><span className="text-text-primary">Категории</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <div className="text-center max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Brain className="w-8 h-8 text-accent-primary" />
                <span className="text-accent-primary font-semibold">Категории ИИ</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                Все категории <span className="text-gradient bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">ИИ-сервисов</span>
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-4xl mx-auto">
                Исследуйте полный каталог категорий и найдите идеальные ИИ-решения для творчества, бизнеса и повседневных задач
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-primary" />
                  <span>{categories.length} категорий</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>2000+ сервисов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-green-500" />
                  <span>Все типы ИИ</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors font-semibold shadow-lg hover:shadow-xl">
                  Смотреть все сервисы
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-accent-primary text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white transition-colors font-semibold">
                  Бесплатные ИИ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories.map((category, index) => {
                const Icon = getIconForCategory(category.name, category.slug)
                const gradient = getGradientForCategory(category.name, category.slug)
                
                return (
                  <div
                    key={category.id}
                    className="group relative"
                  >
                    <Link href={`/ai-services?category=${category.slug || category.id}`}>
                      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-accent-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full cursor-pointer min-h-[220px] hover:scale-105 hover:-translate-y-2">
                        {/* Gradient background on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />
                        
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Icon */}
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <Icon className="w-full h-full text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors line-clamp-2 leading-tight">
                              {category.name}
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                              {category.description || `Откройте для себя лучшие ИИ-инструменты категории "${category.name}"`}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <span className="text-accent-primary font-semibold text-sm">
                              Исследовать →
                            </span>
                            <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary transition-all duration-300">
                              <ArrowRight className="w-4 h-4 text-accent-primary group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Не нашли нужную <span className="text-accent-primary">категорию</span>?
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Изучите полный каталог ИИ-сервисов или воспользуйтесь поиском для быстрого поиска инструментов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors font-semibold shadow-lg hover:shadow-xl">
                  Открыть каталог
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/ai-services?search=" className="inline-flex items-center px-8 py-4 border-2 border-accent-primary text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white transition-colors font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Поиск по сайту
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 