'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, MessageCircle, Copy, Check } from 'lucide-react'
import { AIServiceWithCategory } from '@/lib/supabase'
import useAnalytics from '@/app/hooks/useAnalytics'

interface SocialShareProps {
  service: AIServiceWithCategory
}

const SocialShare = ({ service }: SocialShareProps) => {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { trackShare, trackCopyLink } = useAnalytics()

  const shareUrl = `https://gighub.ru/ai-services/${service.slug || service.id}`
  const shareTitle = `${service.title} - лучший ИИ-сервис | GigHub`
  const shareText = service.short_description_ru || `Открой для себя ${service.title} - инновационный ИИ-сервис на GigHub`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      // Отслеживаем копирование ссылки
      trackCopyLink({
        service_name: service.title,
        service_id: service.slug || service.id.toString()
      })
    } catch (err) {
      console.error('Ошибка копирования:', err)
    }
  }

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
    
    // Отслеживаем шеринг в Telegram
    trackShare({
      service_name: service.title,
      service_id: service.slug || service.id.toString(),
      share_method: 'telegram'
    })
  }

  const shareToVK = () => {
    const url = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&description=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
    
    // Отслеживаем шеринг ВКонтакте
    trackShare({
      service_name: service.title,
      service_id: service.slug || service.id.toString(),
      share_method: 'vk'
    })
  }

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`
    window.open(url, '_blank', 'width=600,height=400')
    
    // Отслеживаем шеринг в WhatsApp
    trackShare({
      service_name: service.title,
      service_id: service.slug || service.id.toString(),
      share_method: 'whatsapp'
    })
  }

  const shareButtons = [
    {
      name: 'Telegram',
      icon: '📱',
      onClick: shareToTelegram,
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      name: 'ВКонтакте',
      icon: '🌐',
      onClick: shareToVK,
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      onClick: shareToWhatsApp,
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Поделиться</span>
      </motion.button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[280px] z-50"
          >
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Поделиться сервисом
            </h4>
            
            {/* Social Buttons */}
            <div className="space-y-2 mb-3">
              {shareButtons.map((button) => (
                <motion.button
                  key={button.name}
                  onClick={button.onClick}
                  className={`w-full flex items-center gap-3 px-3 py-2 ${button.bgColor} ${button.hoverColor} text-white rounded-xl transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{button.icon}</span>
                  <span className="text-sm font-medium">{button.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                />
                <motion.button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    copied 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Копировать</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default SocialShare 