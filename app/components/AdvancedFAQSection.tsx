'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Star, CheckCircle, AlertCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'legal' | 'technical' | 'pricing' | 'usage' | 'quality';
  tags: string[];
  isPopular?: boolean;
}

const faqData: FAQItem[] = [
  // Популярные вопросы
  {
    id: 'commercial-use',
    question: 'Можно ли продавать картинки из нейросетей?',
    answer: 'Да, большинство нейросетей позволяют коммерческое использование сгенерированных изображений. Midjourney и DALL-E 3 разрешают продажу при наличии платной подписки. Stable Diffusion полностью свободен для коммерческого использования. Leonardo AI разрешает продажу на платных планах. Всегда проверяйте актуальные условия использования конкретного сервиса.',
    category: 'legal',
    tags: ['коммерция', 'продажа', 'авторские права'],
    isPopular: true
  },
  {
    id: 'photo-generation',
    question: 'Какая нейросеть лучше рисует по фото?',
    answer: 'Для работы с фотографиями лучше всего подходят: Midjourney (отличный фотореализм), DALL-E 3 (хорошо понимает описания), Stable Diffusion с ControlNet (точное управление позой и композицией). Для простых задач попробуйте Leonardo AI или Playground AI.',
    category: 'usage',
    tags: ['фотореализм', 'обработка фото', 'ControlNet'],
    isPopular: true
  },
  {
    id: 'free-options',
    question: 'Нужно ли платить за все нейросети?',
    answer: 'Нет! Есть отличные бесплатные варианты: Stable Diffusion (полностью бесплатен), Kandinsky 3.1 (бесплатно с ограничениями), Leonardo AI (150 токенов/день), Playground AI (500 изображений/день), Bing Image Creator (15 изображений/день). Для начала попробуйте бесплатные версии.',
    category: 'pricing',
    tags: ['бесплатно', 'цены', 'лимиты'],
    isPopular: true
  },

  // Технические вопросы
  {
    id: 'gpu-requirements',
    question: 'Какая видеокарта нужна для Stable Diffusion?',
    answer: 'Минимум: GTX 1060 6GB или RTX 2060. Рекомендуется: RTX 3070/4070 8GB+ для комфортной работы. Для профессионального использования: RTX 4080/4090 12GB+. Можно использовать и без мощной карты через облачные сервисы Google Colab или Hugging Face.',
    category: 'technical',
    tags: ['железо', 'видеокарта', 'требования']
  },
  {
    id: 'prompt-language',
    question: 'На каком языке писать промпты?',
    answer: 'Большинство нейросетей лучше понимают английский язык. Исключения: Kandinsky 3.1 (создан для русского), DALL-E 3 (хорошо понимает русский через ChatGPT). Для лучших результатов используйте английские промпты или переводчик.',
    category: 'usage',
    tags: ['язык', 'промпты', 'русский']
  },
  {
    id: 'generation-time',
    question: 'Сколько времени занимает создание одного изображения?',
    answer: 'Время генерации зависит от сервиса: DALL-E 3 (10-30 сек), Leonardo AI (5-15 сек), Midjourney (30-60 сек), Stable Diffusion локально (5-30 сек в зависимости от настроек). Онлайн-сервисы могут работать медленнее в пиковые часы.',
    category: 'technical',
    tags: ['скорость', 'время', 'производительность']
  },

  // Вопросы качества
  {
    id: 'improve-quality',
    question: 'Как улучшить качество генерируемых изображений?',
    answer: 'Советы для лучшего качества: 1) Используйте детальные промпты с техническими терминами 2) Добавляйте "highly detailed, 4K, masterpiece" 3) Указывайте стиль освещения 4) Экспериментируйте с разными seed значениями 5) Используйте upscaler для увеличения разрешения.',
    category: 'quality',
    tags: ['качество', 'улучшение', 'детализация']
  },
  {
    id: 'style-consistency',
    question: 'Как сохранить единый стиль в серии изображений?',
    answer: 'Для единообразия стиля: 1) Используйте одинаковые seed значения 2) Сохраняйте базовую структуру промпта 3) В Midjourney используйте --style параметр 4) В Stable Diffusion применяйте LoRA модели 5) Создайте шаблон промпта и меняйте только ключевые детали.',
    category: 'quality',
    tags: ['стиль', 'консистентность', 'серия']
  },

  // Правовые вопросы
  {
    id: 'copyright-issues',
    question: 'Могут ли возникнуть проблемы с авторскими правами?',
    answer: 'Возможные риски: 1) Не используйте имена живых людей без разрешения 2) Избегайте копирования стиля конкретных художников 3) Не генерируйте изображения торговых марок 4) Проверяйте лицензии сервисов 5) При коммерческом использовании консультируйтесь с юристом.',
    category: 'legal',
    tags: ['авторские права', 'риски', 'торговые марки']
  },
  {
    id: 'ai-detection',
    question: 'Можно ли определить, что изображение создано нейросетью?',
    answer: 'Да, существуют методы обнаружения: 1) AI-детекторы (AI or Not, Hive Moderation) 2) Анализ артефактов (странные руки, текст, симметрия) 3) Метаданные файлов 4) Технический анализ шума. Качественные изображения становится все сложнее отличить от реальных фотографий.',
    category: 'technical',
    tags: ['детекция', 'распознавание', 'артефакты']
  },

  // Практические вопросы
  {
    id: 'batch-generation',
    question: 'Можно ли генерировать много изображений сразу?',
    answer: 'Да, многие сервисы поддерживают пакетную генерацию: Midjourney (до 4 вариантов), Leonardo AI (до 8 изображений), Stable Diffusion (неограниченно локально). Комфайны позволяют автоматизировать процесс создания больших серий изображений.',
    category: 'usage',
    tags: ['пакетная генерация', 'автоматизация', 'серия']
  },
  {
    id: 'mobile-generation',
    question: 'Можно ли создавать изображения на телефоне?',
    answer: 'Да! Мобильные варианты: приложения Leonardo AI и Playground AI, веб-версии всех сервисов, Telegram-боты (@MidjourneyBot), мобильные приложения Stable Diffusion. Качество может быть ниже из-за ограничений мощности устройства.',
    category: 'technical',
    tags: ['мобильные', 'телефон', 'приложения']
  },

  // Специализированные вопросы
  {
    id: 'anime-generation',
    question: 'Какая нейросеть лучше всего рисует аниме?',
    answer: 'Лучшие для аниме стиля: Midjourney с параметром --niji, Stable Diffusion с аниме-моделями (Anything, Novel AI), Leonardo AI с Anime Diffusion моделью, Waifu Diffusion. Используйте промпты: "anime style", "manga", "cel shading".',
    category: 'usage',
    tags: ['аниме', 'манга', 'стиль']
  },
  {
    id: 'architecture-generation',
    question: 'Подходят ли нейросети для архитектурной визуализации?',
    answer: 'Да, но с ограничениями. Лучшие варианты: Midjourney (концептуальная архитектура), Stable Diffusion с ControlNet (точные планы), Leonardo AI (интерьерный дизайн). Для технических чертежей лучше использовать специализированное ПО + AI как вспомогательный инструмент.',
    category: 'usage',
    tags: ['архитектура', 'дизайн', 'визуализация']
  }
];

const AdvancedFAQSection: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'Все вопросы', icon: '📋' },
    { key: 'legal', label: 'Правовые', icon: '⚖️' },
    { key: 'technical', label: 'Технические', icon: '🔧' },
    { key: 'pricing', label: 'Цены', icon: '💰' },
    { key: 'usage', label: 'Использование', icon: '🎨' },
    { key: 'quality', label: 'Качество', icon: '⭐' }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const popularQuestions = faqData.filter(item => item.isPopular);

  const getCategoryColor = (category: string) => {
    const colors = {
      'legal': 'bg-red-100 text-red-800 border-red-200',
      'technical': 'bg-blue-100 text-blue-800 border-blue-200',
      'pricing': 'bg-green-100 text-green-800 border-green-200',
      'usage': 'bg-purple-100 text-purple-800 border-purple-200',
      'quality': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'legal': <AlertCircle className="w-4 h-4" />,
      'technical': <HelpCircle className="w-4 h-4" />,
      'pricing': <Star className="w-4 h-4" />,
      'usage': <MessageCircle className="w-4 h-4" />,
      'quality': <CheckCircle className="w-4 h-4" />
    };
    return icons[category as keyof typeof icons] || <HelpCircle className="w-4 h-4" />;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ответы на частые вопросы
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Собрали ответы на самые важные вопросы о нейросетях для генерации изображений. 
            Не нашли ответ? Напишите в комментариях!
          </p>
        </div>

        {/* Популярные вопросы */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            Самые популярные вопросы
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {popularQuestions.map((item) => (
              <div
                key={item.id}
                onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
                className="bg-white rounded-xl p-6 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                    {getCategoryIcon(item.category)}
                    <span className="ml-1 capitalize">{item.category}</span>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.question}
                </h4>
                
                {openQuestion === item.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end mt-3">
                  {openQuestion === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Поиск */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Поиск по вопросам и ответам..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Категории */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Показано <span className="font-semibold text-blue-600">{filteredFAQ.length}</span> из{' '}
              <span className="font-semibold">{faqData.length}</span> вопросов
            </p>
          </div>
        </div>

        {/* Основной список вопросов */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                        {getCategoryIcon(item.category)}
                        <span className="ml-1 capitalize">{item.category}</span>
                      </div>
                      {item.isPopular && (
                        <div className="flex items-center text-yellow-600">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-xs font-medium ml-1">Популярный</span>
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.question}
                    </h4>
                  </div>
                  <div className="ml-4">
                    {openQuestion === item.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {openQuestion === item.id && (
                <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {item.answer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                          onClick={() => setSearchQuery(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Пустое состояние */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Вопросы не найдены
            </h3>
            <p className="text-gray-600 mb-4">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Призыв к действию */}
        <div className="mt-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 text-center border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Не нашли ответ на свой вопрос?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Задайте его в комментариях ниже! Наши эксперты обязательно ответят и добавят ваш вопрос в этот раздел.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              💬 Задать вопрос в комментариях
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              📧 Написать в поддержку
            </button>
          </div>
        </div>
      </div>

      {/* Микроразметка Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AdvancedFAQSection; 