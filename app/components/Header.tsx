'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  Home, 
  Grid3X3, 
  Search, 
  Sparkles,
  ExternalLink,
  Github
} from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Главная', href: '/', icon: Home },
    { name: 'Каталог', href: '/ai-services', icon: Search },
    { name: 'Категории', href: '/categories', icon: Grid3X3 },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                  GigHub
                </span>
                <span className="text-xs text-text-secondary -mt-1">
                  ИИ-сервисы
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-accent-primary text-white shadow-lg'
                      : 'text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </motion.nav>

          {/* Right side actions */}
          <motion.div 
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://github.com/Neuropolis-ai/GigHub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-accent-primary transition-colors group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-accent-primary text-white shadow-lg'
                        : 'text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="https://github.com/Neuropolis-ai/GigHub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-accent-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
} 