'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Brain, 
  Sparkles, 
  Users, 
  Target, 
  Globe, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Zap,
  Shield,
  Award,
  Lightbulb
} from 'lucide-react'

const stats = [
  { icon: Users, label: 'Активных пользователей', value: '50,000+', color: 'text-blue-500' },
  { icon: Brain, label: 'ИИ-сервисов в каталоге', value: '12,000+', color: 'text-purple-500' },
  { icon: Globe, label: 'Стран мира', value: '150+', color: 'text-green-500' },
  { icon: TrendingUp, label: 'Рост ежемесячно', value: '+25%', color: 'text-orange-500' }
]

const features = [
  {
    icon: Target,
    title: 'Тщательный отбор',
    description: 'Каждый ИИ-сервис проходит строгую проверку качества и эффективности'
  },
  {
    icon: Shield,
    title: 'Безопасность данных',
    description: 'Мы работаем только с проверенными поставщиками, гарантирующими защиту ваших данных'
  },
  {
    icon: Zap,
    title: 'Быстрый доступ',
    description: 'Все инструменты доступны в одном месте без сложных интеграций'
  },
  {
    icon: Award,
    title: 'Экспертные оценки',
    description: 'Подробные обзоры и рейтинги от специалистов в области ИИ'
  }
]

const benefits = [
  'Экономия времени на поиске подходящих ИИ-решений',
  'Доступ к новейшим технологиям искусственного интеллекта',
  'Сравнение возможностей различных платформ',
  'Обучающие материалы и гайды по использованию',
  'Сообщество экспертов и энтузиастов ИИ',
  'Регулярные обновления каталога новыми сервисами'
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
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-primary/5 via-white to-accent-secondary/5 pt-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Наша <span className="text-gradient">миссия</span>
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                Сделать искусственный интеллект доступным каждому
              </p>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  В современном мире, где <strong>искусственный интеллект</strong> становится неотъемлемой частью нашей повседневной жизни, 
                  мы предлагаем уникальное решение для всех, кто стремится оставаться на переднем крае технологического прогресса. 
                  <strong>GigHub</strong> является крупнейшим агрегатором онлайн-сервисов с искусственным интеллектом, предлагая вам 
                  беспрецедентный доступ к самым последним и мощным ИИ-инструментам в одном месте.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  Наша платформа объединяет в себе широкий спектр ИИ-сервисов — от <strong>автоматизированного машинного перевода</strong> 
                  и <strong>аналитики данных</strong> до продвинутых решений в области <strong>компьютерного зрения</strong> и 
                  <strong>обработки естественного языка</strong>. Мы тщательно отбираем каждый сервис, чтобы вы могли наслаждаться 
                  надежными и эффективными инструментами, которые помогут вам решить любую задачу — будь то бизнес-анализ, 
                  творческие проекты или академические исследования.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <p className="text-lg text-text-secondary leading-relaxed">
                  Мы также стремимся создать <strong>сообщество экспертов и энтузиастов</strong> искусственного интеллекта, 
                  где каждый может обмениваться опытом, идеями и лучшими практиками. В GigHub вы можете соединиться с другими 
                  профессионалами, обсуждать новейшие тенденции в области ИИ, давать и получать советы, 
                  а также сотрудничать над совместными проектами.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Почему выбирают <span className="text-gradient">GigHub</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Мы создали платформу, которая делает работу с ИИ простой, безопасной и эффективной
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Что вы <span className="text-gradient">получите</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Присоединяйтесь к тысячам пользователей, которые уже открыли для себя мир возможностей ИИ
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-3 bg-white p-6 rounded-2xl shadow-sm"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lightbulb className="w-8 h-8 text-accent-primary" />
              <span className="text-accent-primary font-semibold">Начните сегодня</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Готовы изменить свою жизнь с помощью <span className="text-gradient">ИИ</span>?
            </h2>
            
            <p className="text-xl text-text-secondary mb-8">
              Не пропустите возможность стать частью ведущей платформы ИИ-сервисов. 
              GigHub ждет вас, чтобы помочь в реализации ваших самых амбициозных идей и проектов.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/ai-services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent-primary text-white rounded-2xl font-semibold text-lg hover:bg-accent-primary/90 transition-colors shadow-lg"
                >
                  Исследовать ИИ-сервисы
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link href="/categories">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent-primary text-accent-primary rounded-2xl font-semibold text-lg hover:bg-accent-primary hover:text-white transition-colors"
                >
                  Просмотреть категории
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 