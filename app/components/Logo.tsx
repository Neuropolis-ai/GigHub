'use client'

import { Brain } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  href?: string
  className?: string
  animate?: boolean
}

const sizeVariants = {
  sm: {
    container: 'w-8 h-8',
    icon: 'w-4 h-4',
    text: 'text-lg'
  },
  md: {
    container: 'w-10 h-10',
    icon: 'w-6 h-6',
    text: 'text-2xl'
  },
  lg: {
    container: 'w-12 h-12',
    icon: 'w-8 h-8',
    text: 'text-3xl'
  }
}

const colorVariants = {
  light: {
    container: 'bg-gradient-to-br from-accent-primary to-accent-secondary',
    icon: 'text-white',
    text: 'text-white'
  },
  dark: {
    container: 'bg-gradient-to-br from-accent-primary to-accent-secondary',
    icon: 'text-white',
    text: 'text-text-primary'
  }
}

export default function Logo({ 
  size = 'md', 
  variant = 'dark', 
  href = '/', 
  className = '',
  animate = false 
}: LogoProps) {
  const sizeClasses = sizeVariants[size]
  const colorClasses = colorVariants[variant]

  const logoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${sizeClasses.container} ${colorClasses.container} rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 ${animate ? 'hover:scale-105' : ''}`}
      >
        <Brain className={`${sizeClasses.icon} ${colorClasses.icon}`} />
      </div>
      <span 
        className={`${sizeClasses.text} font-bold ${colorClasses.text} transition-transform duration-200 ${animate ? 'hover:scale-105' : ''}`}
      >
        GigHub
      </span>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group">
        {logoContent}
      </Link>
    )
  }

  return logoContent
} 