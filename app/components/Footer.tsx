'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import Logo from './Logo'

const footerLinks = {
  neyroseti: [
    { name: 'Бесплатные нейросети', href: '/free-neural-networks' },
    { name: 'Нейросети онлайн', href: '/online-neural-networks' },
    { name: 'ИИ на русском', href: '/russian-neural-networks' },
    { name: 'Нейросети для текста', href: '/text-neural-networks' },
    { name: 'Нейросети для изображений', href: '/image-neural-networks' }
  ],
  ai_tools: [
    { name: 'GPT нейросети', href: '/gpt-neural-networks' },
    { name: 'ИИ для презентаций', href: '/presentation-ai' },
    { name: 'ИИ чат-боты', href: '/ai-chat' },
    { name: 'ИИ помощники', href: '/ai-help' },
    { name: 'Каталог ИИ', href: '/ai-services' }
  ],
  categories: [
    { name: 'Категории ИИ', href: '/categories' },
    { name: 'Генерация изображений', href: '/ai-services?category=image' },
    { name: 'Обработка текста', href: '/ai-services?category=text' },
    { name: 'Чат-боты', href: '/ai-services?category=chat' },
    { name: 'Музыка и аудио', href: '/ai-services?category=audio' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div>
              {/* Logo */}
              <div className="mb-6">
                <Logo variant="light" size="md" animate={true} />
              </div>

              <p className="text-gray-300 text-base leading-relaxed max-w-lg">
                Мы объединяем лучшие ИИ-инструменты мира в одной платформе, 
                чтобы помочь вам создавать будущее уже сегодня.
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Нейросети */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Нейросети</h4>
                <ul className="space-y-3">
                  {footerLinks.neyroseti.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-accent-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ИИ-инструменты */}
              <div>
                <h4 className="text-lg font-semibold mb-6">ИИ-инструменты</h4>
                <ul className="space-y-3">
                  {footerLinks.ai_tools.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-accent-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Категории */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Категории</h4>
                <ul className="space-y-3">
                  {footerLinks.categories.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-accent-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2025 GigHub. Создано с</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>для будущего ИИ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 