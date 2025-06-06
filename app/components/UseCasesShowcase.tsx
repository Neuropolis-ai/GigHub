'use client'

import React from 'react'
import { Palette, FileText, Zap, Camera, Music, Code } from 'lucide-react'
import Link from 'next/link'

const useCases = [
  {
    id: 1,
    title: 'Создай логотип',
    description: 'Сгенерируй уникальный логотип для своего бренда за несколько минут',
    icon: Palette,
    tools: ['MidJourney', 'DALL-E', 'Looka'],
    gradient: 'from-purple-500 to-pink-500',
    hoverColorClass: 'group-hover:text-purple-600',
    categorySlug: 'generation-images'
  },
  {
    id: 2,
    title: 'Напиши сценарий',
    description: 'Создай захватывающий сценарий для видео, подкаста или презентации',
    icon: FileText,
    tools: ['ChatGPT', 'Jasper', 'Copy.ai'],
    gradient: 'from-blue-500 to-cyan-500',
    hoverColorClass: 'group-hover:text-blue-600',
    categorySlug: 'text'
  },
  {
    id: 3,
    title: 'Автоматизируй рассылки',
    description: 'Настрой умные email-рассылки с персонализированным контентом',
    icon: Zap,
    tools: ['Mailchimp AI', 'ConvertKit', 'Sendgrid'],
    gradient: 'from-yellow-500 to-orange-500',
    hoverColorClass: 'group-hover:text-yellow-600',
    categorySlug: 'automation'
  },
  {
    id: 4,
    title: 'Обработай фото',
    description: 'Улучши качество изображений и удали фон одним кликом',
    icon: Camera,
    tools: ['Remove.bg', 'Topaz', 'Photosonic'],
    gradient: 'from-green-500 to-emerald-500',
    hoverColorClass: 'group-hover:text-green-600',
    categorySlug: 'images'
  },
  {
    id: 5,
    title: 'Создай музыку',
    description: 'Сгенерируй уникальные треки для контента или просто для души',
    icon: Music,
    tools: ['Mubert', 'AIVA', 'Amper Music'],
    gradient: 'from-red-500 to-pink-500',
    hoverColorClass: 'group-hover:text-red-600',
    categorySlug: 'music'
  },
  {
    id: 6,
    title: 'Напиши код',
    description: 'Ускорь разработку с помощью ИИ-ассистентов программирования',
    icon: Code,
    tools: ['GitHub Copilot', 'Tabnine', 'CodeT5'],
    gradient: 'from-indigo-500 to-purple-500',
    hoverColorClass: 'group-hover:text-indigo-600',
    categorySlug: 'development-it'
  }
]

export default function UseCasesShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            От идеи до реализации
            <span className="text-gradient"> за считанные минуты</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Узнайте, как искусственный интеллект может решить ваши ежедневные задачи быстрее и эффективнее
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <div
                key={useCase.id}
                className="group relative cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <Link href={`/ai-services?category=${useCase.categorySlug}`} className="block h-full">
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-accent-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />
                    
                    <div className="relative z-10 text-center">
                      {/* Icon */}
                      <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl font-semibold mb-3 text-text-primary ${useCase.hoverColorClass} transition-colors duration-300`}>
                        {useCase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {useCase.description}
                      </p>

                      {/* Tools */}
                      <div className="space-y-3">
                        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                          Рекомендуемые инструменты
                        </span>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {useCase.tools.map((tool, toolIndex) => (
                            <span
                              key={toolIndex}
                              className="px-3 py-1 bg-gray-100 text-text-secondary text-xs rounded-full transition-all duration-300 font-medium group-hover:bg-gray-200 group-hover:text-text-primary"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-accent-primary flex items-center justify-center group-hover:text-white transition-all duration-300">
                        <span className="text-sm">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-8">
            Не нашли подходящий сценарий? У нас есть инструменты для любых задач!
          </p>
          <Link href="/ai-services">
            <button className="group px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 transform active:scale-95">
              <span className="flex items-center gap-2">
                Исследовать все возможности
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
} 