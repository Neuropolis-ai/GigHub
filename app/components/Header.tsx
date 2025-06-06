'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Home, 
  Grid3X3, 
  Search, 
  Sparkles,
  Plus
} from 'lucide-react'
import Logo from './Logo'

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
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
              <Logo variant="dark" size="md" animate={true} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 touch-manipulation min-h-[44px] ${
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
            </nav>

            {/* Right side actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/about"
                className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-xl text-sm font-medium hover:bg-accent-primary/90 transition-colors group shadow-lg min-h-[44px] touch-manipulation"
              >
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>О проекте</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-3 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors touch-manipulation tap-highlight-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white md:hidden safe-area-inset"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header in mobile menu */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Logo variant="dark" size="md" animate={true} />
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Navigation */}
            <div className="p-6 pt-8">
              <nav className="space-y-4">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-4 py-4 px-6 text-xl font-medium min-h-[64px] rounded-2xl transition-all duration-200 touch-manipulation ${
                          isActive(item.href)
                            ? 'bg-accent-primary text-white shadow-lg'
                            : 'text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-6 h-6" />
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
              
              {/* About section in mobile menu */}
              <motion.div
                className="mt-8 pt-8 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Link
                  href="/about"
                  className="flex items-center gap-4 py-4 px-6 bg-accent-primary text-white rounded-2xl text-xl font-medium hover:bg-accent-primary/90 transition-colors min-h-[64px] touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="w-6 h-6" />
                  <span>О проекте</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 