'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Share2, Twitter, MessageCircle, Link2, Check } from 'lucide-react'
import { AIServiceWithCategory } from '@/lib/supabase'
import useAnalytics from '@/app/hooks/useAnalytics'

interface SocialShareProps {
  service: AIServiceWithCategory
}

const SocialShare = ({ service }: SocialShareProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { trackShare, trackCopyLink } = useAnalytics()

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const shareUrl = `https://gighub.ru/ai-services/${service.slug || service.id}`
  const shareTitle = `${service.title} - лучший ИИ-сервис | GigHub`
  const shareText = service.short_description_ru || `Открой для себя ${service.title} - инновационный ИИ-сервис на GigHub`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      // Отслеживаем копирование ссылки
      trackCopyLink({
        service_name: service.title,
        service_id: service.slug || service.id.toString()
      })
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      name: 'Скопировать ссылку',
      icon: copied ? Check : Link2,
      onClick: handleCopyLink,
      color: copied ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50 hover:text-gray-700'
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
      >
        <Share2 className="w-4 h-4" />
        <span className="font-medium">Поделиться</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-10 py-2">
          {shareOptions.map((option) => {
            const Icon = option.icon
            
            if (option.onClick) {
              return (
                <button
                  key={option.name}
                  onClick={option.onClick}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${option.color}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{option.name}</span>
                  {copied && option.name === 'Скопировать ссылку' && (
                    <span className="text-sm text-green-600 ml-auto">Скопировано!</span>
                  )}
                </button>
              )
            }

            return (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${option.color}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{option.name}</span>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SocialShare 