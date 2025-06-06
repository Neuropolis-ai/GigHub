'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Users, Globe, Zap, Shield, TrendingUp, Award, Target, Heart, Star, Clock, CheckCircle } from 'lucide-react'

const stats = [
  { icon: Globe, value: '2,000+', label: 'ИИ-сервисов', color: 'text-blue-500' },
  { icon: Users, value: '50K+', label: 'Пользователей', color: 'text-green-500' },
  { icon: TrendingUp, value: '1M+', label: 'Посещений в месяц', color: 'text-purple-500' },
  { icon: Award, value: '99%', label: 'Довольных клиентов', color: 'text-orange-500' }
]

const features = [
  {
    icon: Shield,
    title: 'Проверенное качество',
    description: 'Каждый сервис проходит строгую модерацию нашей команды экспертов'
  },
  {
    icon: Zap,
    title: 'Быстрый поиск',
    description: 'Умные фильтры и категории помогут найти подходящий инструмент за минуты'
  },
  {
    icon: Globe,
    title: 'Глобальное покрытие',
    description: 'Собираем лучшие ИИ-инструменты со всего мира в одном месте'
  },
  {
    icon: Target,
    title: 'Точные рекомендации',
    description: 'Персонализированные советы на основе ваших потребностей и задач'
  }
]

const benefits = [
  {
    title: 'Экономия времени',
    description: 'Не тратьте часы на поиск подходящего инструмента',
    icon: Clock
  },
  {
    title: 'Экспертные обзоры',
    description: 'Детальные описания от наших специалистов',
    icon: Star
  },
  {
    title: 'Актуальная информация',
    description: 'Регулярно обновляемые данные о возможностях и ценах',
    icon: CheckCircle
  },
  {
    title: 'Сообщество',
    description: 'Делитесь опытом с другими пользователями ИИ',
    icon: Heart
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm text-text-secondary">
          <li><Link href="/" className="hover:text-accent-primary">Главная</Link></li>
          <li className="mx-2">/</li>
          <li><span className="text-text-primary">О проекте</span></li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-accent-primary" />
              <span className="text-accent-primary font-semibold">О проекте GigHub</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Ведущая платформа 
              <span className="text-gradient"> искусственного интеллекта</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Крупнейший агрегатор онлайн-сервисов с ИИ. Объединяем лучшие инструменты 
              искусственного интеллекта для решения любых задач.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Запущено в 2024</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>50,000+ пользователей</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>12,000+ ИИ-сервисов</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Наша <span className="text-gradient">миссия</span>
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                Сделать искусственный интеллект доступным каждому
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  В современном мире, где <strong>искусственный интеллект</strong> становится неотъемлемой частью нашей повседневной жизни, 
                  мы предлагаем уникальное решение для всех, кто стремится оставаться на переднем крае технологического прогресса. 
                  <strong>GigHub</strong> является крупнейшим агрегатором онлайн-сервисов с искусственным интеллектом, предлагая вам 
                  беспрецедентный доступ к самым последним и мощным ИИ-инструментам в одном месте.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  Наша платформа объединяет в себе широкий спектр ИИ-сервисов — от <strong>автоматизированного машинного перевода</strong> 
                  и <strong>аналитики данных</strong> до продвинутых решений в области <strong>компьютерного зрения</strong> и 
                  <strong>обработки естественного языка</strong>. Мы тщательно отбираем каждый сервис, чтобы вы могли наслаждаться 
                  надежными и эффективными инструментами, которые помогут вам решить любую задачу — будь то бизнес-анализ, 
                  творческие проекты или академические исследования.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <p className="text-lg text-text-secondary leading-relaxed">
                  Мы также стремимся создать <strong>сообщество экспертов и энтузиастов</strong> искусственного интеллекта, 
                  где каждый может обмениваться опытом, идеями и лучшими практиками. В GigHub вы можете соединиться с другими 
                  профессионалами, обсуждать новейшие тенденции в области ИИ, давать и получать советы, 
                  а также сотрудничать над совместными проектами.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Почему выбирают <span className="text-gradient">GigHub</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Мы создали платформу, которая делает работу с ИИ простой, безопасной и эффективной
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Что вы <span className="text-gradient">получите</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Присоединяйтесь к тысячам пользователей, которые уже открыли для себя мир возможностей ИИ
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">{benefit.title}</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-8 h-8 text-red-500" />
                <span className="text-red-500 font-semibold">Сообщество</span>
              </div>
              
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Станьте частью <span className="text-gradient">ИИ-революции</span>
              </h2>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Присоединяйтесь к GigHub, и получите доступ к нашей обширной библиотеке ИИ-инструментов, 
                которые не только ускорят ваши текущие задачи, но и откроют новые горизонты для вашего бизнеса, 
                образовательного процесса или творческих начинаний.
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
                <span className="text-text-secondary ml-2">4.9/5 от 2,500+ отзывов</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent-primary to-accent-secondary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Готовы исследовать мир ИИ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Присоединяйтесь к нашему сообществу и откройте для себя безграничные возможности искусственного интеллекта
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-services">
                <button className="bg-white text-accent-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                  Исследовать каталог
                </button>
              </Link>
              <Link href="/categories">
                <button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  Просмотреть категории
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 