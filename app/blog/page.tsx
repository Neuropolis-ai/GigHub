'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Users, Lightbulb } from 'lucide-react'

const featuredArticles = [
  {
    title: "Что такое нейросеть: простое объяснение для начинающих",
    excerpt: "Разбираемся в основах нейросетей и искусственного интеллекта простыми словами. От истории создания до современных применений.",
    slug: "chto-takoe-neyroset",
    date: "2025-01-02",
    readTime: "8 мин",
    category: "Основы ИИ",
    featured: true,
    image: "/blog/neural-network-basics.jpg"
  },
  {
    title: "Как выбрать нейросеть для генерации изображений в 2025",
    excerpt: "Сравниваем Midjourney, DALL-E, Stable Diffusion и другие ИИ-генераторы. Практические советы по выбору лучшего инструмента.",
    slug: "kak-vybrat-neyroset-dlya-kartinok",
    date: "2025-01-01",
    readTime: "12 мин",
    category: "Гайды",
    featured: true,
    image: "/blog/ai-image-generators.jpg"
  },
  {
    title: "Лучшие нейросети для создания текста в 2025 году",
    excerpt: "Обзор топовых ИИ-писателей: ChatGPT, Claude, Jasper и другие. Тестируем качество генерации и даем практические рекомендации.",
    slug: "luchshie-neyroseti-dlya-teksta",
    date: "2024-12-30",
    readTime: "15 мин",
    category: "Обзоры",
    featured: false,
    image: "/blog/ai-text-generators.jpg"
  },
  {
    title: "Нейросети для бизнеса: как автоматизировать рабочие процессы",
    excerpt: "Практические кейсы внедрения ИИ в бизнес-процессы. От автоматизации клиентского сервиса до анализа данных.",
    slug: "neyroseti-dlya-biznesa",
    date: "2024-12-28",
    readTime: "10 мин",
    category: "Бизнес",
    featured: false,
    image: "/blog/ai-for-business.jpg"
  },
  {
    title: "ChatGPT vs другие ИИ-чаты: подробное сравнение 2025",
    excerpt: "Сравниваем ChatGPT с Claude, Bard, Bing Chat и другими чат-ботами. Что выбрать для разных задач?",
    slug: "chatgpt-vs-drugie-ii-chaty",
    date: "2024-12-25",
    readTime: "14 мин",
    category: "Сравнения",
    featured: false,
    image: "/blog/chatgpt-comparison.jpg"
  }
]

const categories = [
  { name: "Основы ИИ", count: 12, icon: "📚" },
  { name: "Гайды", count: 18, icon: "🔧" },
  { name: "Обзоры", count: 24, icon: "📝" },
  { name: "Новости", count: 8, icon: "📰" },
  { name: "Бизнес", count: 15, icon: "💼" },
  { name: "Сравнения", count: 9, icon: "⚖️" }
]

export default function BlogPage() {
  const featuredPosts = featuredArticles.filter(article => article.featured)
  const recentPosts = featuredArticles.filter(article => !article.featured)

  return (
    <>
      {/* JSON-LD разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Блог о нейросетях и ИИ - GigHub",
            "description": "Актуальные статьи о нейросетях и искусственном интеллекте",
            "url": "https://gighub.ru/blog",
            "publisher": {
              "@type": "Organization",
              "name": "GigHub",
              "url": "https://gighub.ru"
            },
            "blogPost": featuredArticles.map(article => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.excerpt,
              "datePublished": article.date,
              "url": `https://gighub.ru/blog/${article.slug}`,
              "author": {
                "@type": "Organization",
                "name": "GigHub"
              }
            }))
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <nav className="container mx-auto px-6 py-4">
          <ol className="flex items-center space-x-2 text-sm text-text-secondary">
            <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
            <li className="mx-2">/</li>
            <li><span className="text-text-primary">Блог</span></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
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
            </motion.div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Рекомендуемые <span className="text-blue-500">статьи</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Самые популярные и полезные материалы о нейросетях
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Категории <span className="text-purple-500">статей</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Найдите интересующие вас темы
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} статей
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Последние <span className="text-blue-500">публикации</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Свежие материалы о нейросетях и ИИ-технологиях
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
                    <p className="text-text-secondary mb-4 leading-relaxed line-clamp-2 text-sm">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-600 font-medium transition-colors text-sm"
                    >
                      Читать далее <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Изучайте нейросети <span className="text-blue-500">эффективно</span>
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                Подписывайтесь на обновления и получайте свежие статьи о нейросетях, 
                гайды по использованию ИИ-инструментов и эксклюзивные материалы.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-services" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                  Каталог нейросетей
                </Link>
                <Link href="/free-neural-networks" className="inline-flex items-center px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-colors font-semibold">
                  Бесплатные ИИ
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 