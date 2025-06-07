'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Star, Check, X, Monitor, Smartphone, Users, Zap, Palette } from 'lucide-react';

interface ExampleWork {
  image: string;
  prompt: string;
  style: string;
}

interface AIToolDetail {
  id: string;
  name: string;
  description: string;
  examples: ExampleWork[];
  pros: string[];
  cons: string[];
  characteristics: {
    price: string;
    platform: string;
    complexity: string;
    bestFor: string;
    rating: number;
    languages: string[];
  };
  ctaText: string;
  ctaUrl: string;
  gradientColors: string;
  bgColors: string;
}

const aiToolsData: AIToolDetail[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Революционная нейросеть, которая устанавливает новые стандарты качества в генерации изображений. Специализируется на создании высокодетализированных фотореалистичных и художественных изображений через Discord-интерфейс.',
    examples: [
      {
        image: '/images/midjourney-v5-4.jpg',
        prompt: 'портрет молодой женщины, фотореализм, мягкое освещение, детализированно --v 6',
        style: 'Фотореализм'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'fantasy landscape, magical forest, golden hour lighting, cinematic composition --ar 16:9',
        style: 'Фэнтези пейзаж'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'modern architecture building, minimalist design, concrete and glass --style 4',
        style: 'Архитектура'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'anime character, studio ghibli style, detailed eyes, colorful hair --niji 6',
        style: 'Аниме стиль'
      }
    ],
    pros: [
      'Непревзойденное качество изображений',
      'Понимание сложных художественных концепций',
      'Активное сообщество с миллионами примеров',
      'Регулярные обновления и улучшения',
      'Специальный режим Niji для аниме'
    ],
    cons: [
      'Отсутствие бесплатного тарифа',
      'Интерфейс только через Discord',
      'Очереди в часы пиковой нагрузки',
      'Работает только на английском языке'
    ],
    characteristics: {
      price: 'От $10/месяц',
      platform: 'Discord, Web',
      complexity: 'Средний уровень',
      bestFor: 'Фотореализм, концепт-арт',
      rating: 4.9,
      languages: ['Английский']
    },
    ctaText: 'Попробовать Midjourney',
    ctaUrl: 'https://midjourney.com',
    gradientColors: 'from-purple-600 to-pink-600',
    bgColors: 'from-purple-50 to-pink-50'
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    description: 'Самая интуитивная нейросеть от OpenAI с интеграцией в ChatGPT. Понимает естественный язык на русском, создает качественные изображения и умеет генерировать текст на изображениях лучше конкурентов.',
    examples: [
      {
        image: '/images/image-125-1024x683.webp',
        prompt: 'робот в стиле Pixar, добрые глаза, мягкие цвета, детская анимация',
        style: 'Pixar стиль'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'логотип компании "TechStart", минимализм, синие тона, современный дизайн',
        style: 'Логотип'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'кот в костюме космонавта, реалистично, звездное небо на фоне',
        style: 'Фотореализм'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'инфографика "5 шагов к успеху", современный дизайн, яркие цвета',
        style: 'Инфографика'
      }
    ],
    pros: [
      'Понимает русский язык',
      'Интеграция с ChatGPT для улучшения промптов',
      'Отличная генерация текста на изображениях',
      'Простой и интуитивный интерфейс',
      'Высокий уровень безопасности контента'
    ],
    cons: [
      'Требует подписку ChatGPT Plus ($20/мес)',
      'Ограничения в бесплатной версии',
      'Менее художественный стиль по сравнению с Midjourney',
      'Лимиты на количество изображений'
    ],
    characteristics: {
      price: 'От $20/месяц (ChatGPT Plus)',
      platform: 'Web, API',
      complexity: 'Для новичков',
      bestFor: 'Универсальные задачи, текст на изображениях',
      rating: 4.8,
      languages: ['Русский', 'Английский', '50+ языков']
    },
    ctaText: 'Попробовать DALL-E 3',
    ctaUrl: 'https://openai.com/dall-e-3',
    gradientColors: 'from-green-500 to-teal-600',
    bgColors: 'from-green-50 to-teal-50'
  },
  {
    id: 'stablediffusion',
    name: 'Stable Diffusion 3',
    description: 'Революционная open-source нейросеть, предоставляющая полную свободу творчества. Работает локально на вашем компьютере, поддерживает тысячи кастомных моделей и не имеет ограничений на использование.',
    examples: [
      {
        image: '/images/cc63dc4316f1de29e5640d4d7f9a5e0c.jpg',
        prompt: 'beautiful woman, renaissance painting style, oil on canvas, detailed brushwork',
        style: 'Живопись'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'cyberpunk city, neon lights, rain, blade runner style, high detail',
        style: 'Киберпанк'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'cute anime girl, kawaii style, pastel colors, big eyes, school uniform',
        style: 'Аниме'
      },
      {
        image: '/images/ai-placeholder.svg',
        prompt: 'abstract art, fluid shapes, vibrant colors, modern art style',
        style: 'Абстракция'
      }
    ],
    pros: [
      'Полностью бесплатно и открытый код',
      'Тысячи специализированных моделей',
      'Работа без интернета (локально)',
      'Полный контроль над всеми параметрами',
      'Активное сообщество разработчиков'
    ],
    cons: [
      'Требует мощный компьютер (8GB+ VRAM)',
      'Сложность установки для новичков',
      'Необходимы технические знания',
      'Нет официальной поддержки'
    ],
    characteristics: {
      price: 'Бесплатно',
      platform: 'Windows, Mac, Linux, Colab',
      complexity: 'Для продвинутых',
      bestFor: 'Экспериментирование, кастомизация',
      rating: 4.6,
      languages: ['Английский', 'Все языки (зависит от модели)']
    },
    ctaText: 'Скачать Stable Diffusion',
    ctaUrl: 'https://stability.ai/stable-diffusion',
    gradientColors: 'from-orange-500 to-red-600',
    bgColors: 'from-orange-50 to-red-50'
  }
];

const ImageGallery: React.FC<{ examples: ExampleWork[], name: string }> = ({ examples, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <div className="relative mb-6">
      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
        <img
          src={examples[currentIndex].image}
          alt={`${name} пример ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/ai-placeholder.svg';
          }}
        />
        
        {/* Навигационные кнопки */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Индикаторы */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {examples.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Информация о текущем изображении */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">
            {examples[currentIndex].style}
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {currentIndex + 1} из {examples.length}
          </span>
        </div>
        <p className="text-sm text-gray-700 italic">
          <strong>Промпт:</strong> "{examples[currentIndex].prompt}"
        </p>
      </div>
    </div>
  );
};

const ProsConsTable: React.FC<{ pros: string[], cons: string[] }> = ({ pros, cons }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Плюсы */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-3 flex items-center">
          <Check className="w-5 h-5 mr-2" />
          Преимущества
        </h4>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start text-sm text-green-700">
              <span className="text-green-500 mr-2 mt-0.5">+</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Минусы */}
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <h4 className="font-semibold text-red-800 mb-3 flex items-center">
          <X className="w-5 h-5 mr-2" />
          Недостатки
        </h4>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start text-sm text-red-700">
              <span className="text-red-500 mr-2 mt-0.5">−</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CharacteristicsTable: React.FC<{ characteristics: AIToolDetail['characteristics'] }> = ({ characteristics }) => {
  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'Для новичков': return <Users className="w-4 h-4 text-green-600" />;
      case 'Средний уровень': return <Zap className="w-4 h-4 text-yellow-600" />;
      case 'Для продвинутых': return <Palette className="w-4 h-4 text-red-600" />;
      default: return <Monitor className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('Discord')) return '💬';
    if (platform.includes('Web')) return '🌐';
    if (platform.includes('App')) return '📱';
    return '💻';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Ключевые характеристики
        </h4>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">💰 Цена</span>
            <span className="text-sm font-semibold text-gray-900">{characteristics.price}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              {getPlatformIcon(characteristics.platform)} Платформа
            </span>
            <span className="text-sm font-semibold text-gray-900">{characteristics.platform}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              {getComplexityIcon(characteristics.complexity)}
              <span className="ml-1">Сложность</span>
            </span>
            <span className="text-sm font-semibold text-gray-900">{characteristics.complexity}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">🎯 Лучше для</span>
            <span className="text-sm font-semibold text-gray-900">{characteristics.bestFor}</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            Рейтинг
          </span>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(characteristics.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">{characteristics.rating}/5.0</span>
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm font-medium text-gray-700 block mb-2">🌍 Поддерживаемые языки:</span>
          <div className="flex flex-wrap gap-2">
            {characteristics.languages.map((lang, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailedAIToolsReview: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Полный обзор и сравнение AI-генераторов изображений
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Детальный анализ каждой нейросети с примерами работ, промптами, 
            преимуществами и ключевыми характеристиками
          </p>
        </div>

        {/* Карточки детального обзора */}
        <div className="space-y-16">
          {aiToolsData.map((tool, index) => (
            <div
              key={tool.id}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${tool.bgColors} border border-gray-200 shadow-xl`}
              style={{
                animationDelay: `${index * 0.3}s`,
                animation: 'slideInUp 0.8s ease-out forwards'
              }}
            >
              {/* Декоративные элементы */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <div className={`w-full h-full bg-gradient-to-br ${tool.gradientColors} rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3`}></div>
              </div>

              <div className="relative p-8 lg:p-12">
                {/* Заголовок карточки */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradientColors} flex items-center justify-center text-white font-bold text-2xl shadow-lg mr-4`}>
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {tool.name}
                      </h3>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(tool.characteristics.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-lg font-semibold text-gray-700">
                          {tool.characteristics.rating}/5.0
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 bg-gradient-to-r ${tool.gradientColors} text-white rounded-full text-sm font-semibold`}>
                      {tool.characteristics.price}
                    </span>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-4xl">
                  {tool.description}
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Левая колонка - Галерея */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      🎨 Примеры работ и промпты
                    </h4>
                    <ImageGallery examples={tool.examples} name={tool.name} />
                  </div>

                  {/* Правая колонка - Характеристики */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      📊 Характеристики и оценка
                    </h4>
                    <CharacteristicsTable characteristics={tool.characteristics} />
                  </div>
                </div>

                {/* Таблица плюсов и минусов */}
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    ⚖️ Объективная оценка
                  </h4>
                  <ProsConsTable pros={tool.pros} cons={tool.cons} />
                </div>

                {/* CTA кнопка */}
                <div className="text-center mt-8">
                  <a
                    href={tool.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-3 bg-gradient-to-r ${tool.gradientColors} hover:shadow-xl text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <span>{tool.ctaText}</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
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

export default DetailedAIToolsReview; 