'use client';

import React from 'react';
import { Star, ExternalLink, ChevronRight, Trophy, Rocket, Settings } from 'lucide-react';

interface RecommendationCard {
  id: string;
  name: string;
  logo: string;
  badge: string;
  badgeIcon: React.ReactNode;
  description: string;
  detailsAnchor: string;
  externalUrl: string;
  rating: number;
  features: string[];
  gradientColors: string;
}

const topAITools: RecommendationCard[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    logo: '/images/midjourney-logo.svg',
    badge: 'Лучшее качество',
    badgeIcon: <Trophy className="w-4 h-4" />,
    description: 'Непревзойденный фотореализм и художественная выразительность для профессионалов.',
    detailsAnchor: '#midjourney-review',
    externalUrl: 'https://midjourney.com',
    rating: 4.9,
    features: ['Фотореализм', 'Художественный стиль', 'Discord интеграция'],
    gradientColors: 'from-purple-600 to-pink-600'
  },
  {
    id: 'dalle',
    name: 'DALL-E 3',
    logo: '/images/dalle-logo.svg',
    badge: 'Самый простой старт',
    badgeIcon: <Rocket className="w-4 h-4" />,
    description: 'Интуитивный интерфейс и понимание естественного языка для быстрого старта.',
    detailsAnchor: '#dalle-review',
    externalUrl: 'https://openai.com/dall-e-3',
    rating: 4.8,
    features: ['ChatGPT интеграция', 'Понимание текста', 'Безопасность'],
    gradientColors: 'from-green-500 to-teal-600'
  },
  {
    id: 'stablediffusion',
    name: 'Stable Diffusion 3',
    logo: '/images/stablediffusion-logo.svg',
    badge: 'Полная свобода',
    badgeIcon: <Settings className="w-4 h-4" />,
    description: 'Открытый код и полный контроль над процессом генерации для энтузиастов ИИ.',
    detailsAnchor: '#stablediffusion-review',
    externalUrl: 'https://stability.ai/stable-diffusion',
    rating: 4.6,
    features: ['Открытый код', 'Локальная установка', 'Кастомные модели'],
    gradientColors: 'from-orange-500 to-red-600'
  }
];

const TopAIToolsRecommendations: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-primary/10 rounded-full px-4 py-2 mb-6">
            <Star className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-medium">Выбор экспертов GigHub</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Топ-3 нейросети 2025
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Мы протестировали десятки ИИ-инструментов и выбрали лучшие решения 
            для разных задач и уровней опыта
          </p>
        </div>

        {/* Карточки топ-3 инструментов */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {topAITools.map((tool, index) => (
            <div
              key={tool.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: 'slideInUp 0.8s ease-out forwards'
              }}
            >
              {/* Градиентная полоса сверху */}
              <div className={`h-1 bg-gradient-to-r ${tool.gradientColors}`}></div>
              
              <div className="p-8">
                {/* Заголовок карточки */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {/* Логотип-плейсхолдер */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradientColors} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {tool.name.charAt(0)}
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {tool.name}
                      </h3>
                      
                      {/* Рейтинг */}
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(tool.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {tool.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Номинация */}
                <div className="mb-4">
                  <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${tool.gradientColors} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    {tool.badgeIcon}
                    <span>{tool.badge}</span>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {tool.description}
                </p>

                {/* Ключевые особенности */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Кнопки CTA */}
                <div className="space-y-3">
                  <a
                    href={tool.detailsAnchor}
                    className="group w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 border-transparent hover:border-gray-300"
                  >
                    <span>Подробный обзор</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  
                  <a
                    href={tool.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${tool.gradientColors} hover:shadow-lg text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105`}
                  >
                    <span>Перейти на сайт</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Декоративный блик */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:animate-shine pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-2xl p-8 border border-accent-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Почему стоит доверять нашему выбору?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-accent-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-accent-primary" />
                </div>
                <h4 className="font-semibold text-gray-900">50+ часов тестирования</h4>
                <p className="text-gray-600 text-sm">Детальный анализ каждого инструмента</p>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-accent-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-accent-secondary" />
                </div>
                <h4 className="font-semibold text-gray-900">Экспертная оценка</h4>
                <p className="text-gray-600 text-sm">Команда профессиональных дизайнеров</p>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-purple-500" />
                </div>
                <h4 className="font-semibold text-gray-900">Актуальные данные</h4>
                <p className="text-gray-600 text-sm">Регулярное обновление рейтингов</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(300%) skewX(-12deg);
          }
        }

        .animate-shine {
          animation: shine 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TopAIToolsRecommendations; 