'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, Calendar, Clock, Users, TrendingUp, Lightbulb, ArrowRight, Star } from 'lucide-react'

// Мок-данные для статей
const featuredPosts = [
  {
    slug: 'ai-tools-2025',
    title: 'Лучшие ИИ-инструменты 2025: Полный гид по нейросетям',
    excerpt: 'Подробный обзор самых эффективных нейросетей для работы, творчества и бизнеса. Узнайте, какие ИИ-инструменты стоит изучить в этом году.',
    category: 'Обзоры',
    date: '2025-01-15',
    readTime: '15 мин'
  },
  {
    slug: 'neural-networks-basics',
    title: 'Нейросети для начинающих: Как использовать ИИ без технических знаний',
    excerpt: 'Простое введение в мир искусственного интеллекта. Изучите основы работы с ChatGPT, Claude и другими популярными нейросетями.',
    category: 'Основы ИИ',
    date: '2025-01-12',
    readTime: '10 мин'
  }
]

const recentPosts = [
  {
    slug: 'midjourney-vs-dalle',
    title: 'Midjourney vs DALL-E 3: Какую нейросеть выбрать для генерации изображений',
    excerpt: 'Сравниваем популярные ИИ-генераторы изображений по качеству, цене и удобству использования.',
    category: 'Обзоры',
    date: '2025-01-10',
    readTime: '12 мин',
    rating: 4.8
  },
  {
    slug: 'ai-business-automation',
    title: 'Автоматизация бизнеса с ИИ: 10 способов увеличить эффективность',
    excerpt: 'Практические примеры внедрения нейросетей в бизнес-процессы для экономии времени и ресурсов.',
    category: 'Бизнес',
    date: '2025-01-08',
    readTime: '18 мин',
    rating: 4.9
  },
  {
    slug: 'ai-ethics-guide',
    title: 'Этика ИИ: Как использовать нейросети ответственно',
    excerpt: 'Важные принципы этичного применения искусственного интеллекта в работе и жизни.',
    category: 'Этика',
    date: '2025-01-05',
    readTime: '8 мин',
    rating: 4.7
  }
]

const categories = [
  { name: 'Обзоры', icon: '📝', count: 45 },
  { name: 'Гайды', icon: '📚', count: 32 },
  { name: 'Бизнес', icon: '💼', count: 28 },
  { name: 'Творчество', icon: '🎨', count: 23 },
  { name: 'Этика', icon: '⚖️', count: 15 },
  { name: 'Новости', icon: '🔥', count: 38 }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <span className="text-blue-500 font-semibold">
                Блог о нейросетях
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Все о <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">нейросетях</span><br className="hidden md:block" />
              и искусственном интеллекте
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
              Актуальные статьи, подробные гайды и экспертные обзоры лучших ИИ-инструментов. 
              Изучайте нейросети вместе с нами и будьте в курсе последних тенденций.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>Еженедельные обновления</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Экспертные обзоры</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span>Практические советы</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Рекомендуемые <span className="text-blue-500">статьи</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Самые популярные и полезные материалы о нейросетях
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((article, index) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-purple-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">
                      {article.category === 'Основы ИИ' ? '📚' : '🔧'}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-4 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                  >
                    Читать статью <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Категории <span className="text-purple-500">статей</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Найдите интересующие вас темы
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} статей
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Последние <span className="text-blue-500">публикации</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Свежие материалы о нейросетях и ИИ-технологиях
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((article, index) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl opacity-20">
                      {article.category === 'Обзоры' ? '📝' : 
                       article.category === 'Бизнес' ? '💼' : '⚖️'}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{article.rating}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                  >
                    Читать статью <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Будьте в курсе новинок ИИ
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Подпишитесь на нашу рассылку и получайте еженедельный дайджест 
              лучших статей о нейросетях прямо на почту
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Подписаться
              </button>
            </div>
            
            <p className="text-sm opacity-75 mt-4">
              Никакого спама. Отписаться можно в любой момент.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 