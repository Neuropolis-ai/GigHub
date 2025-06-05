'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'
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
  ],
  legal: [
    { name: 'Условия использования', href: '/terms' },
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Cookie', href: '/cookies' },
    { name: 'Контакты', href: '/contact' }
  ]
}

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-gray-900' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-500' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-700' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@aihorizon.com', color: 'hover:text-red-500' }
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="mb-6">
                <Logo variant="light" size="md" animate={true} />
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Мы объединяем лучшие ИИ-инструменты мира в одной платформе, 
                чтобы помочь вам создавать будущее уже сегодня.
              </p>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Подпишитесь на обновления</h4>
                <div className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-accent-primary focus:bg-white/5 transition-all"
                  />
                  <button className="px-6 py-3 bg-accent-primary hover:bg-accent-primary/90 rounded-xl font-semibold transition-colors">
                    Подписаться
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Нейросети */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
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
              </motion.div>

              {/* ИИ-инструменты */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
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
              </motion.div>

              {/* Категории */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
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
              </motion.div>

              {/* Legal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h4 className="text-lg font-semibold mb-6">Правовая информация</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 GigHub. Создано с</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>для будущего ИИ</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">🌍 Русский</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 