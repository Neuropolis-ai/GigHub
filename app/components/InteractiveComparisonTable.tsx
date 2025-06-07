'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Filter, X, Star, ExternalLink, Search } from 'lucide-react';

interface AIToolTableData {
  id: string;
  name: string;
  logo: string;
  hasFreeVersion: 'да' | 'нет' | 'триал';
  minPrice: number; // для сортировки в долларах
  minPriceDisplay: string; // для отображения
  rating: number;
  primaryUse: string;
  url: string;
  category: 'платформа' | 'специализированный' | 'open-source';
}

const aiToolsTableData: AIToolTableData[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    logo: '/images/midjourney-logo.svg',
    hasFreeVersion: 'нет',
    minPrice: 10,
    minPriceDisplay: '$10/мес',
    rating: 4.9,
    primaryUse: 'Фотореализм, концепт-арт',
    url: 'https://midjourney.com',
    category: 'платформа'
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    logo: '/images/dalle-logo.svg',
    hasFreeVersion: 'триал',
    minPrice: 20,
    minPriceDisplay: '$20/мес',
    rating: 4.8,
    primaryUse: 'Универсальные задачи',
    url: 'https://openai.com/dall-e-3',
    category: 'платформа'
  },
  {
    id: 'flux',
    name: 'Flux.1 Pro',
    logo: '/images/flux-logo.svg',
    hasFreeVersion: 'триал',
    minPrice: 5,
    minPriceDisplay: '$5/мес',
    rating: 4.7,
    primaryUse: 'Высокое качество',
    url: 'https://replicate.com/black-forest-labs/flux-pro',
    category: 'платформа'
  },
  {
    id: 'stablediffusion',
    name: 'Stable Diffusion 3',
    logo: '/images/stablediffusion-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 0,
    minPriceDisplay: 'Бесплатно',
    rating: 4.6,
    primaryUse: 'Экспериментирование',
    url: 'https://stability.ai/stable-diffusion',
    category: 'open-source'
  },
  {
    id: 'ideogram',
    name: 'Ideogram 2.0',
    logo: '/images/ideogram-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 8,
    minPriceDisplay: '$8/мес',
    rating: 4.5,
    primaryUse: 'Текст в изображениях',
    url: 'https://ideogram.ai',
    category: 'платформа'
  },
  {
    id: 'leonardo',
    name: 'Leonardo AI',
    logo: '/images/leonardo-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 10,
    minPriceDisplay: '$10/мес',
    rating: 4.4,
    primaryUse: 'Игровая графика',
    url: 'https://leonardo.ai',
    category: 'платформа'
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    logo: '/images/firefly-logo.svg',
    hasFreeVersion: 'триал',
    minPrice: 23,
    minPriceDisplay: '$23/мес',
    rating: 4.3,
    primaryUse: 'Профессиональный дизайн',
    url: 'https://firefly.adobe.com',
    category: 'платформа'
  },
  {
    id: 'kandinsky',
    name: 'Kandinsky 3.1',
    logo: '/images/kandinsky-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 0,
    minPriceDisplay: 'Бесплатно',
    rating: 4.2,
    primaryUse: 'Русскоязычный контент',
    url: 'https://fusionbrain.ai',
    category: 'платформа'
  },
  {
    id: 'runway',
    name: 'Runway ML',
    logo: '/images/runway-logo.svg',
    hasFreeVersion: 'триал',
    minPrice: 12,
    minPriceDisplay: '$12/мес',
    rating: 4.1,
    primaryUse: 'Видео + изображения',
    url: 'https://runwayml.com',
    category: 'специализированный'
  },
  {
    id: 'playground',
    name: 'Playground AI',
    logo: '/images/playground-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 15,
    minPriceDisplay: '$15/мес',
    rating: 4.0,
    primaryUse: 'Социальные сети',
    url: 'https://playground.com',
    category: 'платформа'
  },
  {
    id: 'nightcafe',
    name: 'NightCafe Studio',
    logo: '/images/nightcafe-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 5,
    minPriceDisplay: '$5/мес',
    rating: 3.9,
    primaryUse: 'Художественные стили',
    url: 'https://nightcafe.studio',
    category: 'платформа'
  },
  {
    id: 'artbreeder',
    name: 'Artbreeder',
    logo: '/images/artbreeder-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 8,
    minPriceDisplay: '$8/мес',
    rating: 3.8,
    primaryUse: 'Мутация изображений',
    url: 'https://artbreeder.com',
    category: 'специализированный'
  },
  {
    id: 'craiyon',
    name: 'Craiyon (DALL-E mini)',
    logo: '/images/craiyon-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 5,
    minPriceDisplay: '$5/мес',
    rating: 3.7,
    primaryUse: 'Простая генерация',
    url: 'https://craiyon.com',
    category: 'платформа'
  },
  {
    id: 'starryai',
    name: 'StarryAI',
    logo: '/images/starryai-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 12,
    minPriceDisplay: '$12/мес',
    rating: 3.6,
    primaryUse: 'Мобильное приложение',
    url: 'https://starryai.com',
    category: 'платформа'
  },
  {
    id: 'wombo-dream',
    name: 'WOMBO Dream',
    logo: '/images/wombo-logo.svg',
    hasFreeVersion: 'да',
    minPrice: 10,
    minPriceDisplay: '$10/мес',
    rating: 3.5,
    primaryUse: 'Быстрая генерация',
    url: 'https://dream.ai',
    category: 'платформа'
  }
];

type SortField = 'name' | 'hasFreeVersion' | 'minPrice' | 'rating' | 'primaryUse';
type SortDirection = 'asc' | 'desc';

const InteractiveComparisonTable: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [freeVersionFilter, setFreeVersionFilter] = useState<'all' | 'да' | 'нет' | 'триал'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'платформа' | 'специализированный' | 'open-source'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Обработчик сортировки
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Функция сортировки
  const sortData = (data: AIToolTableData[]) => {
    return [...data].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Специальная обработка для разных типов данных
      if (sortField === 'hasFreeVersion') {
        const order = { 'да': 3, 'триал': 2, 'нет': 1 };
        aValue = order[aValue as keyof typeof order];
        bValue = order[bValue as keyof typeof order];
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Фильтрация и сортировка данных
  const filteredAndSortedData = useMemo(() => {
    let filtered = aiToolsTableData;

    // Фильтр по бесплатной версии
    if (freeVersionFilter !== 'all') {
      filtered = filtered.filter(item => item.hasFreeVersion === freeVersionFilter);
    }

    // Фильтр по категории
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.primaryUse.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortData(filtered);
  }, [sortField, sortDirection, freeVersionFilter, categoryFilter, searchQuery]);

  // Получение иконки сортировки
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  // Функция для получения цвета бесплатной версии
  const getFreeVersionColor = (hasFree: string) => {
    switch (hasFree) {
      case 'да': return 'bg-green-100 text-green-800 border-green-200';
      case 'триал': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'нет': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Сброс всех фильтров
  const clearFilters = () => {
    setFreeVersionFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = freeVersionFilter !== 'all' || categoryFilter !== 'all' || searchQuery !== '';

  return (
    <section id="comparison-table" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Сравните все нейросети в одной таблице
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Интерактивная таблица с возможностью сортировки и фильтрации 
            для быстрого сравнения всех ИИ-инструментов
          </p>
        </div>

        {/* Панель фильтров */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-8 border-2 border-accent-primary/20 hover:border-accent-primary/30 transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              {/* Поиск */}
              <div className="relative flex-1 min-w-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-accent-primary" />
                </div>
                <input
                  type="text"
                  placeholder="Поиск по названию или назначению..."
                  className="block w-full pl-12 pr-4 py-4 border-2 border-accent-primary/20 rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary text-sm bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 font-medium placeholder-text-secondary/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Фильтр по бесплатной версии */}
              <select
                value={freeVersionFilter}
                onChange={(e) => setFreeVersionFilter(e.target.value as any)}
                className="px-4 py-3 border-2 border-accent-primary/20 rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary text-sm bg-white/90 backdrop-blur-sm min-w-[160px] shadow-sm hover:shadow-md transition-all duration-300 font-medium text-text-primary hover:border-accent-primary/40 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23667eea' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="all">Все тарифы</option>
                <option value="да">Есть бесплатно</option>
                <option value="триал">Есть триал</option>
                <option value="нет">Только платно</option>
              </select>

              {/* Фильтр по категории */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="px-4 py-3 border-2 border-accent-primary/20 rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary text-sm bg-white/90 backdrop-blur-sm min-w-[160px] shadow-sm hover:shadow-md transition-all duration-300 font-medium text-text-primary hover:border-accent-primary/40 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23667eea' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="all">Все категории</option>
                <option value="платформа">Платформы</option>
                <option value="специализированный">Специализированные</option>
                <option value="open-source">Open Source</option>
              </select>
            </div>

            {/* Кнопка сброса фильтров */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <X className="w-4 h-4" />
                <span>Сбросить</span>
              </button>
            )}
          </div>

          {/* Статистика */}
          <div className="mt-6 pt-6 border-t border-accent-primary/20">
            <p className="text-sm text-text-secondary">
              Показано <span className="font-semibold text-accent-primary">{filteredAndSortedData.length}</span> из{' '}
              <span className="font-semibold">{aiToolsTableData.length}</span> нейросетей
            </p>
          </div>
        </div>

        {/* Таблица */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Desktop версия */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">Логотип</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      <span>Название</span>
                      {getSortIcon('name')}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('hasFreeVersion')}
                      className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      <span>Бесплатная версия</span>
                      {getSortIcon('hasFreeVersion')}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('minPrice')}
                      className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      <span>Минимальная цена</span>
                      {getSortIcon('minPrice')}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('rating')}
                      className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      <span>Наша оценка</span>
                      {getSortIcon('rating')}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('primaryUse')}
                      className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      <span>Основное назначение</span>
                      {getSortIcon('primaryUse')}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-gray-900">Действия</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAndSortedData.map((tool, index) => (
                  <tr 
                    key={tool.id} 
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInRow 0.5s ease-out forwards'
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {tool.name.charAt(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 text-lg">{tool.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getFreeVersionColor(tool.hasFreeVersion)}`}>
                        {tool.hasFreeVersion}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{tool.minPriceDisplay}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(tool.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 ml-2">
                          {tool.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{tool.primaryUse}</span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        <span>Перейти</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile версия - карточки */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredAndSortedData.map((tool, index) => (
              <div 
                key={tool.id} 
                className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInRow 0.5s ease-out forwards'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{tool.name}</h3>
                      <p className="text-sm text-gray-600">{tool.primaryUse}</p>
                    </div>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 block mb-1">Бесплатная версия:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getFreeVersionColor(tool.hasFreeVersion)}`}>
                      {tool.hasFreeVersion}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 block mb-1">Цена:</span>
                    <span className="font-semibold text-gray-900">{tool.minPriceDisplay}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600 block mb-1">Рейтинг:</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
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
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {tool.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Подсказки по использованию */}
        <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            Как использовать таблицу:
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
            <div className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span><strong>Кликайте</strong> на заголовки колонок для сортировки</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span><strong>Фильтруйте</strong> по тарифам и категориям</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span><strong>Ищите</strong> нужные инструменты по названию</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <span><strong>Переходите</strong> на сайты прямо из таблицы</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInRow {
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

export default InteractiveComparisonTable; 