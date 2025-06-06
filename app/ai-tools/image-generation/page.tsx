'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Интерфейсы для типизации
interface AITool {
  id: number
  name: string
  rating: number
  price: string
  isFree: boolean
  languages: string[]
  features: string[]
  bestFor: string
  pros: string[]
  cons: string[]
  logo?: string
}

// Данные нейросетей
const aiTools: AITool[] = [
  {
    id: 1,
    name: "Midjourney",
    rating: 9.8,
    price: "$10-120/месяц",
    isFree: false,
    languages: ["Английский"],
    features: ["Художественная генерация", "V6 фотореализм", "Инструменты редактирования", "Аниме стиль --niji"],
    bestFor: "Художники, дизайнеры, концепт-арты",
    pros: ["Непревзойденное качество", "Высокая детализация", "Активное сообщество"],
    cons: ["Нет бесплатного доступа", "Интерфейс Discord"],
  },
  {
    id: 2,
    name: "DALL-E 3",
    rating: 9.5,
    price: "$20/месяц",
    isFree: true,
    languages: ["Русский", "Английский"],
    features: ["Интеграция с ChatGPT", "Генерация текста", "Редактирование через диалог"],
    bestFor: "Пользователи ChatGPT, маркетологи",
    pros: ["Понимание сложных промптов", "Диалоговое улучшение", "Качественный текст на изображениях"],
    cons: ["Требует подписку Plus", "Ограничения в бесплатной версии"],
  },
  {
    id: 3,
    name: "Stable Diffusion 3",
    rating: 9.3,
    price: "Бесплатно",
    isFree: true,
    languages: ["Русский", "Английский"],
    features: ["Открытый код", "Кастомные модели", "ControlNet", "Локальная установка"],
    bestFor: "Энтузиасты ИИ, разработчики",
    pros: ["Полностью бесплатно", "Максимальный контроль", "Огромное сообщество"],
    cons: ["Сложность установки", "Требует мощный ПК"],
  },
  {
    id: 4,
    name: "Kandinsky 3.1",
    rating: 8.9,
    price: "Бесплатно",
    isFree: true,
    languages: ["Русский"],
    features: ["Русский язык", "Художественная генерация", "Веб-интерфейс"],
    bestFor: "Русскоязычные пользователи",
    pros: ["Бесплатно", "Понимает русский", "Хорошее качество"],
    cons: ["Очереди в пиковые часы", "Ограниченные стили"],
  },
  {
    id: 5,
    name: "Leonardo AI",
    rating: 8.7,
    price: "$10-48/месяц",
    isFree: true,
    languages: ["Русский", "Английский"],
    features: ["Real-time генерация", "Готовые модели", "Редактирование", "Игровая графика"],
    bestFor: "Геймдев, универсальные задачи",
    pros: ["150 токенов/день бесплатно", "Множество моделей", "Простой интерфейс"],
    cons: ["Ограниченные модели в free", "Очереди"],
  }
]

// Компонент карточки нейросети
const AIToolCard = ({ tool }: { tool: AITool }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="p-6">
      {/* Заголовок и рейтинг */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
          <span className="text-yellow-600 mr-1">⭐</span>
          <span className="font-semibold text-yellow-700">{tool.rating}/10</span>
        </div>
      </div>

      {/* Цена и статус */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900">{tool.price}</span>
          {tool.isFree && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              Бесплатно
            </span>
          )}
        </div>
        <div className="flex space-x-1">
          {tool.languages.map((lang, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Возможности */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Возможности:</h4>
        <div className="space-y-1">
          {tool.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-600">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Лучше всего для */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-purple-700">Лучше всего для:</span>
        <p className="text-sm text-gray-600 mt-1">{tool.bestFor}</p>
      </div>

      {/* Кнопка действия */}
      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
        Попробовать {tool.name}
      </button>
    </div>
  </div>
)

// Компонент сравнительной таблицы
const ComparisonTable = () => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left font-semibold text-gray-900">Задача</th>
          <th className="px-6 py-4 text-left font-semibold text-gray-900">Лучший выбор</th>
          <th className="px-6 py-4 text-left font-semibold text-gray-900">Альтернатива</th>
          <th className="px-6 py-4 text-left font-semibold text-gray-900">Бесплатный вариант</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {[
          ["Фотореализм", "Midjourney V6", "DALL-E 3", "Stable Diffusion"],
          ["Художественные стили", "Midjourney", "Leonardo AI", "Kandinsky 3.1"],
          ["Быстрое создание", "Leonardo AI", "Playground AI", "Craiyon"],
          ["Профессиональный дизайн", "Adobe Firefly", "Midjourney", "Stable Diffusion"],
          ["Русский язык", "Kandinsky 3.1", "DALL-E 3", "Bing Creator"],
        ].map(([task, best, alt, free], idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">{task}</td>
            <td className="px-6 py-4 text-green-600 font-medium">{best}</td>
            <td className="px-6 py-4 text-blue-600">{alt}</td>
            <td className="px-6 py-4 text-purple-600">{free}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Компонент FAQ
const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "Какая нейросеть лучше всего подходит для начинающих?",
      answer: "Для новичков рекомендуем Leonardo AI или Playground AI — они имеют простой интерфейс и хорошее бесплатное предложение."
    },
    {
      question: "Можно ли использовать изображения коммерчески?",
      answer: "Зависит от сервиса. Midjourney, Adobe Firefly и Leonardo AI разрешают коммерческое использование на платных планах."
    },
    {
      question: "Какие нейросети поддерживают русский язык?",
      answer: "Лучше всего с русским работают: Kandinsky 3.1, DALL-E 3, Bing Creator и Canva AI."
    },
    {
      question: "Сколько времени занимает генерация?",
      answer: "Обычно 10-30 секунд для большинства сервисов. Leonardo AI и Runway предлагают real-time генерацию."
    },
    {
      question: "Нужен ли мощный компьютер?",
      answer: "Только для локальной установки Stable Diffusion. Онлайн-сервисы работают на любом устройстве."
    }
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 flex justify-between items-center"
            onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
          >
            <span>{faq.question}</span>
            <span className={`transform transition-transform ${openFAQ === idx ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </button>
          {openFAQ === idx && (
            <div className="px-6 py-4 bg-gray-50 text-gray-700">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Главный компонент страницы
export default function ImageGenerationPage() {
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all')

  const filteredTools = aiTools.filter(tool => {
    if (filter === 'free') return tool.isFree
    if (filter === 'paid') return !tool.isFree
    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/ai-tools" className="hover:text-purple-600">ИИ-инструменты</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Нейросети для изображений</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero секция */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            🎨 <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Лучшие нейросети
            </span>
            <br />
            для изображений 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Полный обзор <strong>ТОП-15 ИИ-генераторов картинок</strong>: Midjourney, DALL-E 3, Stable Diffusion и другие. 
            Создавайте уникальные изображения за секунды с помощью <strong>нейросетей для фото</strong> и художественной генерации.
          </p>
          
          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: "Нейросетей", value: "15+" },
              { label: "Бесплатных", value: "8" },
              { label: "Стилей", value: "50+" },
              { label: "Языков", value: "10+" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { key: 'all', label: 'Все нейросети' },
              { key: 'free', label: 'Бесплатные' },
              { key: 'paid', label: 'Платные' }
            ].map((filterItem) => (
              <button
                key={filterItem.key}
                onClick={() => setFilter(filterItem.key as any)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  filter === filterItem.key
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {filterItem.label}
              </button>
            ))}
          </div>
        </div>

        {/* ТОП-15 нейросетей */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🏆 ТОП-{filteredTools.length} лучших нейросетей для изображений
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <AIToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Сравнительная таблица */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🎯 Как выбрать идеальную нейросеть для ваших задач?
          </h2>
          <ComparisonTable />
        </section>

        {/* Лучшие практики */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            💡 Лучшие практики работы с нейросетями для изображений
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Секреты промптов */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">🎨 Секреты эффективных промптов</h3>
              <div className="space-y-4">
                {[
                  'Будьте конкретными: "Фотореалистичный портрет" лучше "портрет"',
                  'Указывайте стиль: "в стиле Pixar", "цифровая живопись"',
                  'Добавляйте детали: освещение, цвета, композицию',
                  'Используйте качественные теги: "высокое разрешение"'
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Примеры промптов */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">📝 Примеры успешных промптов</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-purple-600 mb-2">Для портретов:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    "Фотореалистичный портрет молодой женщины с карими глазами, 
                    мягкое освещение, профессиональная студийная съемка"
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Для пейзажей:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    "Волшебный лес на рассвете, солнечные лучи сквозь туман, 
                    цифровая живопись, фэнтези стиль"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ❓ Часто задаваемые вопросы
          </h2>
          <div className="max-w-4xl mx-auto">
            <FAQSection />
          </div>
        </section>

        {/* Заключение */}
        <section className="text-center bg-white rounded-xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🎯 Заключение: Выбираем лучшую нейросеть для изображений
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            <strong>Нейросети для генерации изображений</strong> в 2025 году достигли невероятного уровня развития. 
            Будущее создания визуального контента уже здесь — выбирайте подходящий инструмент и творите без границ!
          </p>
          
          {/* Наши рекомендации */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🎨", title: "Для художников", tool: "Midjourney", desc: "Непревзойденное качество" },
              { icon: "💼", title: "Для бизнеса", tool: "Adobe Firefly", desc: "Профессиональные инструменты" },
              { icon: "🆓", title: "Для экономии", tool: "Stable Diffusion", desc: "Бесплатно и мощно" },
              { icon: "🇷🇺", title: "Для русских", tool: "Kandinsky 3.1", desc: "Понимает наш язык" },
              { icon: "👶", title: "Для новичков", tool: "Leonardo AI", desc: "Просто и эффективно" },
              { icon: "⚡", title: "Для скорости", tool: "DALL-E 3", desc: "Быстро и качественно" }
            ].map((rec, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{rec.icon}</div>
                <div className="font-semibold text-gray-900">{rec.title}</div>
                <div className="text-purple-600 font-medium">{rec.tool}</div>
                <div className="text-sm text-gray-600">{rec.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/ai-tools" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
              Смотреть все ИИ-инструменты
            </Link>
            <Link href="/ai-tools?category=free" className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-all">
              Только бесплатные
            </Link>
          </div>
        </section>

        {/* Полезные ресурсы */}
        <section className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">📚 Полезные ресурсы:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="#" className="text-purple-600 hover:underline">Промптинг гид для начинающих</Link>
            <Link href="#" className="text-purple-600 hover:underline">Сравнение всех ИИ-генераторов</Link>
            <Link href="#" className="text-purple-600 hover:underline">Лучшие практики создания промптов</Link>
            <Link href="#" className="text-purple-600 hover:underline">Юридические аспекты ИИ-изображений</Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">*Последнее обновление: Январь 2025</p>
        </section>
      </div>
    </main>
  )
} 