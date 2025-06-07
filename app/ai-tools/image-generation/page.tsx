'use client'

import { useState, useMemo, useCallback, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { NextSeo, ArticleJsonLd, FAQPageJsonLd } from 'next-seo'

// SEO конфигурация
const seoConfig = {
  title: "Лучшие нейросети для изображений 2025 — ТОП-15 ИИ-генераторов картинок",
  description: "Полный обзор ТОП-15 ИИ-генераторов картинок: Midjourney, DALL-E 3, Stable Diffusion и другие. Сравнение возможностей, цен, примеры работ. Бесплатные и платные варианты для создания уникальных изображений.",
  canonical: "https://gighub.ru/ai-tools/image-generation",
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'нейросети для изображений, AI генератор картинок, Midjourney, DALL-E, Stable Diffusion, генерация изображений, искусственный интеллект, ИИ художник, нейросеть рисует'
    },
    {
      name: 'author',
      content: 'GigHub Team'
    },
    {
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
    },
    {
      property: 'article:published_time',
      content: '2025-01-01T00:00:00Z'
    },
    {
      property: 'article:modified_time',
      content: '2025-01-15T12:00:00Z'
    },
    {
      property: 'article:section',
      content: 'AI Tools'
    },
    {
      property: 'article:tag',
      content: 'нейросети, генерация изображений, Midjourney, DALL-E, Stable Diffusion'
    }
  ],
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    url: 'https://gighub.ru/ai-tools/image-generation',
    title: 'ТОП-15 лучших нейросетей для генерации изображений 2025',
    description: 'Подробный обзор и сравнение AI-генераторов изображений: Midjourney, DALL-E 3, Stable Diffusion и других. Выбирайте лучший инструмент для создания уникальных картинок.',
    images: [
      {
        url: 'https://gighub.ru/images/ai-image-generation-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросети для генерации изображений - обзор лучших AI-инструментов 2025',
        type: 'image/jpeg'
      }
    ],
    siteName: 'GigHub - Каталог ИИ-инструментов',
    article: {
      publishedTime: '2025-01-01T00:00:00Z',
      modifiedTime: '2025-01-15T12:00:00Z',
      section: 'AI Tools',
      authors: ['https://gighub.ru/authors/gighub-team'],
      tags: ['нейросети', 'генерация изображений', 'AI', 'Midjourney', 'DALL-E', 'Stable Diffusion']
    }
  },
  twitter: {
    handle: '@gighub_ru',
    site: '@gighub_ru',
    cardType: 'summary_large_image'
  }
};

// FAQ данные для JSON-LD
const faqData = [
  {
    questionName: "Какая нейросеть лучше всего подходит для начинающих?",
    acceptedAnswerText: "Для начинающих рекомендуется Leonardo AI или DALL-E 3. Leonardo AI предоставляет 150 бесплатных токенов в день и имеет простой интерфейс, а DALL-E 3 интегрирован с ChatGPT и понимает русский язык."
  },
  {
    questionName: "Можно ли использовать изображения коммерчески?",
    acceptedAnswerText: "Да, большинство нейросетей позволяют коммерческое использование сгенерированных изображений. Однако условия различаются: Midjourney и DALL-E 3 разрешают коммерческое использование при наличии подписки, Stable Diffusion полностью свободен для любого использования."
  },
  {
    questionName: "Какие нейросети поддерживают русский язык?",
    acceptedAnswerText: "Русский язык поддерживают: Kandinsky 3.1 (разработан в России), DALL-E 3 (через ChatGPT), Leonardo AI и Stable Diffusion. Midjourney работает только с английскими промптами, но можно использовать переводчик."
  },
  {
    questionName: "Сколько времени занимает генерация изображения?",
    acceptedAnswerText: "Время генерации зависит от нейросети: DALL-E 3 - 10-30 секунд, Leonardo AI - 5-15 секунд, Midjourney - 30-60 секунд, Stable Diffusion - 5-30 секунд в зависимости от настроек и мощности компьютера."
  },
  {
    questionName: "Нужен ли мощный компьютер для работы с нейросетями?",
    acceptedAnswerText: "Для большинства онлайн-сервисов (Midjourney, DALL-E 3, Leonardo AI) мощный компьютер не нужен - все вычисления происходят на серверах. Мощная видеокарта нужна только для локального запуска Stable Diffusion."
  }
];

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

// Функция отслеживания кликов
const trackEvent = (eventName: string, parameters: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
}

// Компонент системы оценок
const RatingSystem = ({ toolId, initialRating }: { toolId: number, initialRating: number }) => {
  const [userRating, setUserRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [averageRating, setAverageRating] = useState(initialRating)

  const handleRating = (rating: number) => {
    setUserRating(rating)
    setHasRated(true)
    // Симуляция обновления среднего рейтинга
    setAverageRating((prev) => ((prev * 100 + rating) / 101))
  }

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Ваша оценка:</span>
        <span className="text-xs text-gray-500">
          {hasRated ? 'Спасибо за оценку!' : 'Оцените этот сервис'}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !hasRated && handleRating(star)}
            disabled={hasRated}
            className={`text-2xl transition-colors ${
              star <= (userRating || Math.round(averageRating))
                ? 'text-yellow-400'
                : 'text-gray-300'
            } ${!hasRated ? 'hover:text-yellow-400 cursor-pointer' : 'cursor-default'}`}
          >
            ⭐
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600">
          {averageRating.toFixed(1)}/5.0
        </span>
      </div>
    </div>
  )
}

// Модернизированный компонент карточки нейросети
const AIToolCard = ({ tool }: { tool: AITool }) => {
  
  const handleToolClick = () => {
    trackEvent('view_ai_tool', {
      tool_name: tool.name.toLowerCase().replace(/\s+/g, '_'),
      tool_category: 'image_generation',
      tool_price: tool.price,
      tool_rating: tool.rating,
      event_category: 'engagement'
    });
  }

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden animate-fadeInUp">
      {/* Градиентный фон при hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Контент карточки */}
      <div className="relative p-6">
        {/* Заголовок с логотипом */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              {tool.name[0]}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {tool.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
                  <span className="text-yellow-600 mr-1">⭐</span>
                  <span className="font-semibold text-yellow-700 text-sm">{tool.rating}/10</span>
                </div>
                {tool.isFree && (
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-2 py-1 rounded-lg text-xs font-medium border border-green-200">
                    Бесплатно
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Цена и языки */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">{tool.price}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {tool.languages.map((lang, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium border border-blue-200">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Возможности с иконками */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Возможности:
          </h4>
          <div className="space-y-2">
            {tool.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span className="flex-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Лучше всего для */}
        <div className="mb-6 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
          <span className="text-sm font-semibold text-purple-700 flex items-center mb-1">
            🎯 Лучше всего для:
          </span>
          <p className="text-sm text-gray-700 font-medium">{tool.bestFor}</p>
        </div>

        {/* Кнопка действия с современным дизайном */}
        <button 
          onClick={handleToolClick}
          className="btn-modern w-full mb-4"
        >
          <span className="relative z-10">
            🚀 Попробовать {tool.name}
          </span>
        </button>

        {/* Система оценок */}
        <RatingSystem toolId={tool.id} initialRating={tool.rating} />
      </div>
    </div>
  )
}

// Адаптивный компонент сравнительной таблицы
const ComparisonTable = () => {
  const comparisonData = [
    { task: "Фотореализм", best: "Midjourney V6", alt: "DALL-E 3", free: "Stable Diffusion" },
    { task: "Художественные стили", best: "Midjourney", alt: "Leonardo AI", free: "Kandinsky 3.1" },
    { task: "Быстрое создание", best: "Leonardo AI", alt: "Playground AI", free: "Craiyon" },
    { task: "Профессиональный дизайн", best: "Adobe Firefly", alt: "Midjourney", free: "Stable Diffusion" },
    { task: "Русский язык", best: "Kandinsky 3.1", alt: "DALL-E 3", free: "Bing Creator" }
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-xl">
      {/* Desktop версия */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                <span className="flex items-center">
                  🎯 Задача
                </span>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                <span className="flex items-center">
                  🏆 Лучший выбор
                </span>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                <span className="flex items-center">
                  🔄 Альтернатива
                </span>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">
                <span className="flex items-center">
                  🆓 Бесплатный вариант
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comparisonData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200">
                <td className="px-6 py-4 font-semibold text-gray-900">{item.task}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    {item.best}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {item.alt}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    {item.free}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile версия - карточки */}
      <div className="lg:hidden space-y-4 p-4">
        {comparisonData.map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              🎯 {item.task}
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">🏆 Лучший:</span>
                <span className="font-medium text-green-600 bg-green-100 px-2 py-1 rounded-lg text-sm">
                  {item.best}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">🔄 Альтернатива:</span>
                <span className="font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-lg text-sm">
                  {item.alt}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">🆓 Бесплатный:</span>
                <span className="font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-lg text-sm">
                  {item.free}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

// Улучшенный компонент генератора промптов
const PromptGenerator = () => {
  const [selectedStyle, setSelectedStyle] = useState('фотореализм')
  const [selectedSubject, setSelectedSubject] = useState('портрет')
  const [selectedMood, setSelectedMood] = useState('яркий')
  const [selectedQuality, setSelectedQuality] = useState('высокое качество')
  const [selectedLighting, setSelectedLighting] = useState('естественное освещение')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const styles = [
    'фотореализм', 'аниме', 'цифровое искусство', 'живопись маслом', 
    'акварель', 'карандашный эскиз', '3D рендер', 'пиксель-арт'
  ]
  const subjects = [
    'портрет', 'пейзаж', 'животное', 'архитектура', 'фэнтези', 
    'автомобиль', 'еда', 'космос', 'подводный мир', 'город'
  ]
  const moods = [
    'яркий', 'темный', 'мечтательный', 'драматичный', 'спокойный',
    'мистический', 'романтичный', 'энергичный', 'меланхоличный'
  ]
  const qualities = [
    'высокое качество', '4K', '8K', 'гиперреалистично', 'детализированно',
    'кинематографично', 'профессиональное фото', 'студийное качество'
  ]
  const lightings = [
    'естественное освещение', 'студийное освещение', 'золотой час', 
    'синий час', 'неоновое освещение', 'драматичные тени', 'мягкий свет'
  ]

  const generatePrompt = async () => {
    setIsGenerating(true)
    
    // Симуляция AI-генерации с задержкой
    setTimeout(() => {
      const prompt = `${selectedSubject} в стиле ${selectedStyle}, ${selectedMood} настроение, ${selectedQuality}, ${selectedLighting}, детализированно, профессиональная работа, мастерски выполнено`
      setGeneratedPrompt(prompt)
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const promptExamples = [
    "портрет девушки в стиле аниме, мечтательное настроение",
    "пейзаж космоса в стиле цифрового искусства, драматичное настроение",
    "автомобиль в стиле фотореализма, энергичное настроение"
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50 shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        🎨 Умный генератор промптов
        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">AI-powered</span>
      </h3>
      
      {/* Параметры генерации */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            🎭 Стиль
          </label>
          <select 
            value={selectedStyle} 
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          >
            {styles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            🖼️ Предмет
          </label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            🎭 Настроение
          </label>
          <select 
            value={selectedMood} 
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          >
            {moods.map(mood => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            ⭐ Качество
          </label>
          <select 
            value={selectedQuality} 
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          >
            {qualities.map(quality => (
              <option key={quality} value={quality}>{quality}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            💡 Освещение
          </label>
          <select 
            value={selectedLighting} 
            onChange={(e) => setSelectedLighting(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          >
            {lightings.map(lighting => (
              <option key={lighting} value={lighting}>{lighting}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Сгенерированный промпт */}
      <div className="bg-white rounded-xl p-4 mb-4 border-2 border-dashed border-gray-200 min-h-[80px] flex items-center">
        {generatedPrompt ? (
          <div className="w-full">
            <p className="text-gray-800 italic mb-2">"{generatedPrompt}"</p>
            <div className="flex space-x-2">
              <button 
                onClick={copyToClipboard}
                className={`text-sm px-3 py-1 rounded-lg transition-all ${
                  copied 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                {copied ? '✓ Скопировано!' : '📋 Скопировать'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic w-full text-center">
            {isGenerating ? '🔄 Генерируем промпт...' : "Выберите параметры и нажмите 'Сгенерировать'"}
          </p>
        )}
      </div>

      {/* Кнопка генерации */}
      <button 
        onClick={generatePrompt}
        disabled={isGenerating}
        className="btn-modern w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10">
          {isGenerating ? '🔄 Генерируем...' : '🎯 Сгенерировать промпт'}
        </span>
      </button>

      {/* Примеры промптов */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Примеры популярных промптов:</h4>
        <div className="space-y-2">
          {promptExamples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setGeneratedPrompt(example)}
              className="w-full text-left p-2 text-xs text-gray-600 bg-white/50 rounded-lg hover:bg-white/80 transition-all border border-gray-200 hover:border-purple-300"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Компонент калькулятора стоимости
const CostCalculator = () => {
  const [imagesPerMonth, setImagesPerMonth] = useState(100)
  const [selectedTool, setSelectedTool] = useState('midjourney')
  
  const pricing = {
    midjourney: { basic: 10, standard: 30, pro: 60 },
    dalle: { basic: 0, standard: 20, pro: 20 },
    leonardo: { basic: 0, standard: 10, pro: 48 },
    stable: { basic: 0, standard: 0, pro: 0 }
  }

  const calculateCost = () => {
    const tool = pricing[selectedTool as keyof typeof pricing]
    if (imagesPerMonth <= 25) return tool.basic
    if (imagesPerMonth <= 200) return tool.standard
    return tool.pro
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">💰 Калькулятор стоимости</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Изображений в месяц: {imagesPerMonth}
          </label>
          <input 
            type="range" 
            min="10" 
            max="1000" 
            step="10"
            value={imagesPerMonth}
            onChange={(e) => setImagesPerMonth(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Нейросеть</label>
          <select 
            value={selectedTool} 
            onChange={(e) => setSelectedTool(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="midjourney">Midjourney</option>
            <option value="dalle">DALL-E 3</option>
            <option value="leonardo">Leonardo AI</option>
            <option value="stable">Stable Diffusion</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg text-center">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          ${calculateCost()}/месяц
        </div>
        <div className="text-sm text-gray-600">
          {calculateCost() === 0 ? 'Бесплатно!' : `Примерно $${(calculateCost() / imagesPerMonth).toFixed(2)} за изображение`}
        </div>
      </div>
    </div>
  )
}

// Lazy loading для тяжелых компонентов
const QuizComponent = dynamic(() => Promise.resolve(memo(() => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)

  const questions = [
    {
      question: "Какой у вас опыт работы с ИИ?",
      options: ["Новичок", "Средний", "Продвинутый", "Эксперт"]
    },
    {
      question: "Какие изображения вам нужны?",
      options: ["Фотореализм", "Художественные", "Концепт-арты", "Логотипы"]
    },
    {
      question: "Какой бюджет?",
      options: ["Бесплатно", "До $20/мес", "До $50/мес", "Без ограничений"]
    }
  ]

  const handleAnswer = useCallback((answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResult(newAnswers)
    }
  }, [answers, currentStep])

  const calculateResult = useCallback((allAnswers: string[]) => {
    if (allAnswers[0] === "Новичок" && allAnswers[2] === "Бесплатно") {
      setResult("Kandinsky 3.1 — идеально для начала!")
    } else if (allAnswers[1] === "Фотореализм") {
      setResult("Midjourney — лучший фотореализм!")
    } else if (allAnswers[2] === "Бесплатно") {
      setResult("Stable Diffusion — мощно и бесплатно!")
    } else {
      setResult("DALL-E 3 — универсальный выбор!")
    }
  }, [])

  const resetQuiz = useCallback(() => {
    setCurrentStep(0)
    setAnswers([])
    setResult(null)
  }, [])

  if (result) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Ваш результат:</h3>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
          <div className="text-2xl font-bold text-purple-600 mb-2">{result}</div>
        </div>
        <button 
          onClick={resetQuiz}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          🔄 Пройти заново
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        🧩 Тест: Какая нейросеть вам подходит?
      </h3>
      
      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          {questions.map((_, idx) => (
            <div 
              key={idx}
              className={`flex-1 h-2 rounded ${
                idx <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Вопрос {currentStep + 1} из {questions.length}
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {questions[currentStep].question}
        </h4>
        <div className="space-y-3">
          {questions[currentStep].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})), { loading: () => <div className="bg-white rounded-xl shadow-lg p-8 text-center">Загрузка теста...</div> })

// Главный компонент страницы
export default function ImageGenerationPage() {
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all')

  // Мемоизация фильтрованных данных
  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      if (filter === 'free') return tool.isFree
      if (filter === 'paid') return !tool.isFree
      return true
    })
  }, [filter])

  // Мемоизация статистики
  const stats = useMemo(() => ({
    total: aiTools.length,
    free: aiTools.filter(tool => tool.isFree).length,
    styles: 50,
    languages: 10
  }), [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-accent-primary/5 via-background to-accent-secondary/5">
      <NextSeo {...seoConfig} />
      <ArticleJsonLd
        url="https://gighub.ru/ai-tools/image-generation"
        title="Лучшие нейросети для изображений 2025 — ТОП-15 ИИ-генераторов картинок"
        images={['https://gighub.ru/images/ai-image-generation-cover.jpg']}
        datePublished="2025-01-01T00:00:00Z"
        dateModified="2025-01-15T12:00:00Z"
        authorName="GigHub Team"
        publisherName="GigHub"
        publisherLogo="https://gighub.ru/logo.png"
        description="Полный обзор лучших ИИ-инструментов для генерации изображений: Midjourney, DALL-E 3, Stable Diffusion и другие"
        isAccessibleForFree={true}
      />
      <FAQPageJsonLd mainEntity={faqData} />

      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-text-secondary">
            <Link href="/" className="hover:text-accent-primary">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/ai-tools" className="hover:text-accent-primary">ИИ-инструменты</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Нейросети для изображений</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero секция - оптимизирована для LCP */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            🎨 <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Лучшие нейросети
            </span>
            <br />
            для изображений 2025
          </h1>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto mb-8 leading-relaxed">
            Полный обзор <strong>ТОП-5 ИИ-генераторов картинок</strong>: Midjourney, DALL-E 3, Stable Diffusion и другие. 
            Создавайте уникальные изображения за секунды с помощью <strong>нейросетей для фото</strong> и художественной генерации.
          </p>
          
          {/* Статистика - мемоизированная */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-primary">{stats.total}+</div>
              <div className="text-sm text-text-secondary">Нейросетей</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-primary">{stats.free}</div>
              <div className="text-sm text-text-secondary">Бесплатных</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-primary">{stats.styles}+</div>
              <div className="text-sm text-text-secondary">Стилей</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-primary">{stats.languages}+</div>
              <div className="text-sm text-text-secondary">Языков</div>
            </div>
          </div>
        </div>

        {/* Фильтры - оптимизированные */}
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

        {/* ТОП нейросетей - мемоизированный список */}
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

        {/* Интерактивные инструменты */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🛠️ Интерактивные инструменты
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PromptGenerator />
            <CostCalculator />
          </div>
          <div className="max-w-2xl mx-auto">
            <QuizComponent />
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