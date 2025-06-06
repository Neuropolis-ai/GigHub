'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { AIServiceWithCategory } from '@/lib/supabase'

interface BreadcrumbsProps {
  service: AIServiceWithCategory
}

const Breadcrumbs = ({ service }: BreadcrumbsProps) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      href: '/',
      icon: Home,
    },
    {
      name: 'Каталог ИИ',
      href: '/ai-services',
    },
  ]

  // Добавляем категорию если есть
  if (service.categories) {
    breadcrumbs.push({
      name: service.categories.name,
      href: `/ai-services?category=${service.categories.slug}`,
    })
  }

  // Добавляем текущий сервис
  breadcrumbs.push({
    name: service.title,
    href: `/ai-services/${service.slug || service.id}`,
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        const Icon = breadcrumb.icon

        return (
          <div key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            )}
            
            {isLast ? (
              <span className="text-gray-900 font-medium line-clamp-1 max-w-xs">
                {Icon && <Icon className="w-4 h-4 inline mr-1" />}
                {breadcrumb.name}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="hover:text-accent-primary transition-colors flex items-center"
              >
                {Icon && <Icon className="w-4 h-4 mr-1" />}
                {breadcrumb.name}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs 