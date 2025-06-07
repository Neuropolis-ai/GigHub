'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Star, CheckCircle, AlertCircle, Search, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

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
    { id: 'all', name: 'Все вопросы', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'legal', name: 'Правовые', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'technical', name: 'Технические', icon: <Settings className="w-4 h-4" /> },
    { id: 'pricing', name: 'Цены', icon: <Star className="w-4 h-4" /> },
    { id: 'usage', name: 'Использование', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'quality', name: 'Качество', icon: <CheckCircle className="w-4 h-4" /> }
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
      'technical': 'bg-accent-primary/10 text-accent-primary border-accent-primary/30',
      'pricing': 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/30',
      'usage': 'bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary border-accent-primary/30',
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
    <section className="py-16 bg-gradient-to-br from-background via-accent-primary/5 to-accent-secondary/5">
      <div className="container mx-auto px-6">
        {/* Hero Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-accent-primary/20 mb-8 shadow-lg">
            <HelpCircle className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-bold">ЭКСПЕРТНЫЕ ОТВЕТЫ</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-8 leading-tight">
            Часто задаваемые{' '}
            <span className="text-gradient bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              вопросы
            </span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Исчерпывающие ответы на самые популярные вопросы о нейросетях для генерации изображений от экспертов с 5+ летним опытом
          </p>
        </motion.div>

        {/* Popular Questions */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold text-text-primary mb-8 text-center flex items-center justify-center gap-3">
            <Star className="w-8 h-8 text-accent-primary" />
            ТОП-3 самых популярных вопросов
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularQuestions.map((faq, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-accent-primary/20 p-8 shadow-xl hover:shadow-2xl hover:shadow-accent-primary/20 transition-all duration-300 hover:border-accent-primary/40"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-secondary to-accent-primary flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-text-primary mb-4 group-hover:text-accent-primary transition-colors">
                  {faq.question}
                </h4>
                
                <p className="text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {faq.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary rounded-lg text-sm font-medium border border-accent-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-accent-primary/20 p-8 mb-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Поиск по вопросам, ответам и тегам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-accent-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary transition-all text-lg shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg'
                      : 'bg-white/80 text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary border border-accent-primary/20'
                  }`}
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Основной список вопросов */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-accent-primary/20 overflow-hidden hover:shadow-lg hover:border-accent-primary/40 transition-all"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
                className="w-full p-6 text-left hover:bg-accent-primary/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                        {getCategoryIcon(item.category)}
                        <span className="ml-1 capitalize">{item.category}</span>
                      </div>
                      {item.isPopular && (
                        <div className="flex items-center text-accent-secondary">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-xs font-medium ml-1">Популярный</span>
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-text-primary mb-1">
                      {item.question}
                    </h4>
                  </div>
                  <div className="ml-4">
                    {openQuestion === item.id ? (
                      <ChevronUp className="w-5 h-5 text-accent-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    )}
                  </div>
                </div>
              </button>

              {openQuestion === item.id && (
                <div className="px-6 pb-6 border-t border-accent-primary/20 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5">
                  <div className="pt-4">
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {item.answer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-accent-primary px-3 py-1 rounded-full text-sm border border-accent-primary/30 hover:border-accent-primary/60 transition-colors cursor-pointer font-medium"
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
            <HelpCircle className="w-16 h-16 text-accent-primary/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Вопросы не найдены
            </h3>
            <p className="text-text-secondary mb-4">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Призыв к действию */}
        <div className="mt-12 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-2xl p-8 text-center border border-accent-primary/20">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Не нашли ответ на свой вопрос?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Задайте его в комментариях ниже! Наши эксперты обязательно ответят и добавят ваш вопрос в этот раздел.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 transform hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Задать вопрос в комментариях
            </button>
            <button className="border-2 border-accent-primary text-accent-primary px-6 py-3 rounded-lg hover:bg-accent-primary/5 transition-colors font-medium flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Написать в поддержку
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