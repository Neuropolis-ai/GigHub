'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Crown, 
  Zap, 
  Users, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  Heart, 
  CheckCircle2,
  XCircle,
  DollarSign,
  Globe,
  Clock,
  Shield,
  Sparkles,
  ChevronLeft,
  ExternalLink,
  Palette,
  Camera,
  Settings,
  Cpu,
  Languages,
  Target
} from 'lucide-react'

interface AITool {
  id: string
  name: string
  rating: number
  price: string
  isFree: boolean
  description: string
  platform: string
  complexity: string
  bestFor: string
  languages: string[]
  examples: {
    image: string
    title: string
    prompt: string
  }[]
  characteristics: {
    price: string
    platform: string
    complexity: string
    bestFor: string
    rating: string
    languages: string[]
  }
  pros: string[]
  cons: string[]
  gradient: string
  bgGradient: string
  icon: string
  tryLink: string
}

const aiTools: AITool[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    rating: 4.9,
    price: 'От $10/месяц',
    isFree: false,
    description: 'Революционная нейросеть, которая устанавливает новые стандарты качества в генерации изображений. Специализируется на создании высокодетализированных фотореалистичных и художественных изображений через Discord-интерфейс.',
    platform: 'Discord, Web',
    complexity: 'Средний уровень',
    bestFor: 'Фотореализм, концепт-арт',
    languages: ['Английский'],
    examples: [
      {
        image: '/images/midjourney-example.jpg',
        title: 'Фотореализм',
        prompt: 'портрет молодой женщины, фотореализм, мягкое освещение, детализированно --v 6'
      },
      {
        image: '/images/midjourney-example.jpg',
        title: 'Концепт-арт',
        prompt: 'futuristic city, cyberpunk style, neon lights, detailed architecture --v 6'
      },
      {
        image: '/images/midjourney-example.jpg',
        title: 'Художественный стиль',
        prompt: 'oil painting of a forest, impressionist style, warm colors --v 6'
      },
      {
        image: '/images/midjourney-example.jpg',
        title: 'Аниме (Niji)',
        prompt: 'anime girl, beautiful eyes, soft lighting --niji 6'
      }
    ],
    characteristics: {
      price: 'От $10/месяц',
      platform: 'Discord, Web',
      complexity: 'Средний уровень',
      bestFor: 'Фотореализм, концепт-арт',
      rating: '4.9/5.0',
      languages: ['Английский']
    },
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
    gradient: 'from-accent-primary to-purple-600',
    bgGradient: 'from-accent-primary/10 to-purple-100/50',
    icon: 'M',
    tryLink: 'https://midjourney.com'
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    rating: 4.8,
    price: 'От $20/месяц (ChatGPT Plus)',
    isFree: true,
    description: 'Самая интуитивная нейросеть от OpenAI с интеграцией в ChatGPT. Понимает естественный язык на русском, создает качественные изображения и умеет генерировать текст на изображениях лучше конкурентов.',
    platform: 'Web, API',
    complexity: 'Для новичков',
    bestFor: 'Универсальные задачи, текст на изображениях',
    languages: ['Русский', 'Английский', '50+ языков'],
    examples: [
      {
        image: '/images/dalle-example.webp',
        title: 'Pixar стиль',
        prompt: 'робот в стиле Pixar, добрые глаза, мягкие цвета, детская анимация'
      },
      {
        image: '/images/dalle-example.webp',
        title: 'Текст на изображении',
        prompt: 'красивая вывеска кафе "Утренний кофе", винтажный стиль'
      },
      {
        image: '/images/dalle-example.webp',
        title: 'Фотореализм',
        prompt: 'профессиональное фото еды, стейк с гарниром, ресторанная подача'
      },
      {
        image: '/images/dalle-example.webp',
        title: 'Иллюстрация',
        prompt: 'детская книжная иллюстрация, дружелюбный дракон в лесу'
      }
    ],
    characteristics: {
      price: 'От $20/месяц (ChatGPT Plus)',
      platform: 'Web, API',
      complexity: 'Для новичков',
      bestFor: 'Универсальные задачи, текст на изображениях',
      rating: '4.8/5.0',
      languages: ['Русский', 'Английский', '50+ языков']
    },
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
    gradient: 'from-accent-secondary to-green-600',
    bgGradient: 'from-accent-secondary/10 to-green-100/50',
    icon: 'D',
    tryLink: 'https://chat.openai.com'
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion 3',
    rating: 4.6,
    price: 'Бесплатно',
    isFree: true,
    description: 'Революционная open-source нейросеть, предоставляющая полную свободу творчества. Работает локально на вашем компьютере, поддерживает тысячи кастомных моделей и не имеет ограничений на использование.',
    platform: 'Windows, Mac, Linux, Colab',
    complexity: 'Для продвинутых',
    bestFor: 'Экспериментирование, кастомизация',
    languages: ['Английский', 'Все языки (зависит от модели)'],
    examples: [
      {
        image: '/images/stable-diffusion-example.webp',
        title: 'Живопись',
        prompt: 'beautiful woman, renaissance painting style, oil on canvas, detailed brushwork'
      },
      {
        image: '/images/stable-diffusion-example.webp',
        title: 'Аниме',
        prompt: 'anime style, magical girl, flowing hair, starry background'
      },
      {
        image: '/images/stable-diffusion-example.webp',
        title: 'Фотография',
        prompt: 'portrait photography, professional lighting, shallow depth of field'
      },
      {
        image: '/images/stable-diffusion-example.webp',
        title: 'Абстракция',
        prompt: 'abstract art, flowing colors, digital painting, vibrant'
      }
    ],
    characteristics: {
      price: 'Бесплатно',
      platform: 'Windows, Mac, Linux, Colab',
      complexity: 'Для продвинутых',
      bestFor: 'Экспериментирование, кастомизация',
      rating: '4.6/5.0',
      languages: ['Английский', 'Все языки (зависит от модели)']
    },
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
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-100/50 to-red-100/50',
    icon: 'S',
    tryLink: 'https://stability.ai'
  }
]

const DetailedAIToolsReview = () => {
  const [selectedTool, setSelectedTool] = useState<string>('midjourney')
  const [activeImageIndex, setActiveImageIndex] = useState<{[key: string]: number}>({
    'midjourney': 0,
    'dalle3': 0,
    'stable-diffusion': 0
  })

  const handleImageNext = (toolId: string) => {
    const tool = aiTools.find(t => t.id === toolId)
    if (!tool) return
    
    setActiveImageIndex(prev => ({
      ...prev,
      [toolId]: (prev[toolId] + 1) % tool.examples.length
    }))
  }

  const handleImagePrev = (toolId: string) => {
    const tool = aiTools.find(t => t.id === toolId)
    if (!tool) return
    
    setActiveImageIndex(prev => ({
      ...prev,
      [toolId]: prev[toolId] === 0 ? tool.examples.length - 1 : prev[toolId] - 1
    }))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent-primary/5 to-accent-secondary/5" id="detailed-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-accent-primary/20 mb-8 shadow-lg">
            <Sparkles className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-bold">ДЕТАЛЬНЫЙ АНАЛИЗ</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Полный обзор и сравнение{' '}
            <span className="text-gradient bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              AI-генераторов
            </span>
            {' '}изображений
          </h2>
          
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Детальный анализ каждой нейросети с примерами работ, промптами, преимуществами и ключевыми характеристиками
          </p>
        </motion.div>

        {/* Tools */}
        <div className="space-y-20">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${tool.bgGradient} border border-white/20 shadow-2xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-8 lg:p-12">
                {/* Tool Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white font-bold text-3xl shadow-xl`}>
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-4xl font-bold text-text-primary">{tool.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-lg font-semibold text-text-primary">{tool.rating}/5.0</span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-accent-primary mb-3">{tool.price}</p>
                    <p className="text-text-secondary leading-relaxed max-w-4xl">{tool.description}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Examples Section */}
                  <div>
                    <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                      <Palette className="w-6 h-6 text-accent-primary" />
                      Примеры работ и промпты
                    </h4>
                    
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
                      <div className="relative h-80">
                        <Image
                          src={tool.examples[activeImageIndex[tool.id] || 0]?.image || '/images/placeholder.jpg'}
                          alt={tool.examples[activeImageIndex[tool.id] || 0]?.title || 'Example'}
                          fill
                          className="object-cover"
                        />
                        
                        {/* Navigation buttons */}
                        <button
                          onClick={() => handleImagePrev(tool.id)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleImageNext(tool.id)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Image info */}
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                          <div className="font-semibold">{tool.examples[activeImageIndex[tool.id] || 0]?.title}</div>
                          <div className="text-sm text-gray-300">
                            {(activeImageIndex[tool.id] || 0) + 1} из {tool.examples.length}
                          </div>
                        </div>
                      </div>

                      {/* Prompt */}
                      <div className="p-6">
                        <p className="text-sm text-text-secondary mb-2">Промпт:</p>
                        <code className="block bg-gray-100 p-4 rounded-lg text-sm text-text-primary break-all">
                          "{tool.examples[activeImageIndex[tool.id] || 0]?.prompt}"
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Characteristics Section */}
                  <div>
                    <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                      <Settings className="w-6 h-6 text-accent-primary" />
                      Характеристики и оценка
                    </h4>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6">
                      <h5 className="text-lg font-bold text-text-primary mb-4">Ключевые характеристики</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-accent-primary" />
                          <span className="text-text-secondary">Цена</span>
                        </div>
                        <div className="font-medium text-text-primary">{tool.characteristics.price}</div>
                        
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-accent-primary" />
                          <span className="text-text-secondary">Платформа</span>
                        </div>
                        <div className="font-medium text-text-primary">{tool.characteristics.platform}</div>
                        
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-accent-primary" />
                          <span className="text-text-secondary">Сложность</span>
                        </div>
                        <div className="font-medium text-text-primary">{tool.characteristics.complexity}</div>
                        
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-accent-primary" />
                          <span className="text-text-secondary">Лучше для</span>
                        </div>
                        <div className="font-medium text-text-primary">{tool.characteristics.bestFor}</div>
                        
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-accent-primary" />
                          <span className="text-text-secondary">Рейтинг</span>
                        </div>
                        <div className="font-medium text-text-primary">{tool.characteristics.rating}</div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Languages className="w-4 h-4 text-accent-primary" />
                          <span className="text-text-secondary font-medium">Поддерживаемые языки:</span>
                        </div>
                        <div className="text-sm text-text-primary">
                          {tool.characteristics.languages.join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Objective Assessment */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                      <h5 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent-primary" />
                        Объективная оценка
                      </h5>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Pros */}
                        <div>
                          <h6 className="font-semibold text-green-600 mb-3">Преимущества</h6>
                          <ul className="space-y-2">
                            {tool.pros.map((pro, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-green-500 font-bold">+</span>
                                <span className="text-text-secondary">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cons */}
                        <div>
                          <h6 className="font-semibold text-red-600 mb-3">Недостатки</h6>
                          <ul className="space-y-2">
                            {tool.cons.map((con, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-red-500 font-bold">−</span>
                                <span className="text-text-secondary">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Try Button */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <a
                          href={tool.tryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${tool.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                        >
                          Попробовать {tool.name}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DetailedAIToolsReview 