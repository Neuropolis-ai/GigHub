import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero gradient-text mb-6 animate-fade-in-up">
              GigHub
            </h1>
            <p className="text-lead mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Платформа лучших ИИ-инструментов и нейросетей
            </p>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Откройте для себя тысячи ИИ-сервисов, организованных по категориям. 
              Найдите идеальный инструмент для любой задачи.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Link href="/ai-services" className="btn-primary">
                Исследовать сервисы
              </Link>
              <Link href="/categories" className="btn-secondary">
                Просмотреть категории
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что вас ждет
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Полная экосистема для работы с искусственным интеллектом
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/categories" className="service-card group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2-2 2m0 8l2 2-2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Категории
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Просмотрите все доступные категории ИИ-сервисов, от генерации текста до обработки изображений
              </p>
            </Link>

            <Link href="/ai-services" className="service-card group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ИИ-Сервисы
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Изучите тысячи ИИ-инструментов с подробными описаниями и возможностями
              </p>
            </Link>

            <Link href="/ai-services" className="service-card group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Умный поиск
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Найдите идеальный ИИ-инструмент с помощью продвинутых фильтров и поиска
              </p>
            </Link>

            <Link href="/ai-services" className="service-card group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Новинки
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Откройте для себя последние ИИ-инновации и трендовые инструменты
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="glass-effect rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">200K+</div>
              <div className="text-lg opacity-90">ИИ-сервисов</div>
            </div>
            <div className="glass-effect rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-lg opacity-90">Категорий</div>
            </div>
            <div className="glass-effect rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Обновления</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Готовы начать?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам пользователей, которые уже используют наши ИИ-инструменты
          </p>
          <Link href="/ai-services" className="btn-primary text-lg px-8 py-4">
            Начать исследование
          </Link>
        </div>
      </section>
    </div>
  )
} 