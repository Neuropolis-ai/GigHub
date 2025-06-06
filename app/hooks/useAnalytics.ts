'use client'

import { useCallback } from 'react'

// Типы событий для аналитики
export type AnalyticsEvent = 
  | 'view_item'
  | 'click_external_link'
  | 'share_service'
  | 'copy_link'
  | 'view_category'

interface ServiceViewEventData {
  item_id: string
  item_name: string
  item_category: string
  price?: string
  currency?: string
}

interface ExternalLinkEventData {
  service_name: string
  service_url: string
  source_page: string
}

interface ShareEventData {
  service_name: string
  service_id: string
  share_method: 'telegram' | 'vk' | 'whatsapp' | 'copy'
}

export const useAnalytics = () => {
  // Google Analytics 4
  const trackGA4Event = useCallback((event: AnalyticsEvent, data: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        ;(window as any).gtag('event', event, data)
        console.log('GA4 Event:', event, data)
      } catch (error) {
        console.error('GA4 tracking error:', error)
      }
    }
  }, [])

  // Яндекс.Метрика
  const trackYandexEvent = useCallback((event: string, data?: any) => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      try {
        const metrikaId = 12345678 // Заменить на реальный ID
        ;(window as any).ym(metrikaId, 'reachGoal', event, data)
        console.log('Yandex Event:', event, data)
      } catch (error) {
        console.error('Yandex tracking error:', error)
      }
    }
  }, [])

  // Просмотр сервиса
  const trackServiceView = useCallback((serviceData: ServiceViewEventData) => {
    // Google Analytics 4
    trackGA4Event('view_item', {
      currency: serviceData.currency || 'USD',
      value: serviceData.price === 'Бесплатно' ? 0 : parseFloat(serviceData.price || '0'),
      items: [{
        item_id: serviceData.item_id,
        item_name: serviceData.item_name,
        item_category: serviceData.item_category,
        price: serviceData.price === 'Бесплатно' ? 0 : parseFloat(serviceData.price || '0'),
        quantity: 1
      }]
    })

    // Яндекс.Метрика
    trackYandexEvent('service_view', {
      service_id: serviceData.item_id,
      service_name: serviceData.item_name,
      category: serviceData.item_category
    })
  }, [trackGA4Event, trackYandexEvent])

  // Клик по внешней ссылке
  const trackExternalLink = useCallback((linkData: ExternalLinkEventData) => {
    // Google Analytics 4
    trackGA4Event('click_external_link', {
      link_url: linkData.service_url,
      link_text: linkData.service_name,
      source_page: linkData.source_page
    })

    // Яндекс.Метрика
    trackYandexEvent('external_click', {
      service_name: linkData.service_name,
      target_url: linkData.service_url,
      source: linkData.source_page
    })
  }, [trackGA4Event, trackYandexEvent])

  // Шаринг сервиса
  const trackShare = useCallback((shareData: ShareEventData) => {
    // Google Analytics 4
    trackGA4Event('share_service', {
      method: shareData.share_method,
      content_type: 'service',
      item_id: shareData.service_id,
      content_name: shareData.service_name
    })

    // Яндекс.Метрика
    trackYandexEvent('service_share', {
      service_name: shareData.service_name,
      service_id: shareData.service_id,
      method: shareData.share_method
    })
  }, [trackGA4Event, trackYandexEvent])

  // Копирование ссылки
  const trackCopyLink = useCallback((serviceData: { service_name: string, service_id: string }) => {
    // Google Analytics 4
    trackGA4Event('copy_link', {
      service_name: serviceData.service_name,
      service_id: serviceData.service_id
    })

    // Яндекс.Метрика  
    trackYandexEvent('link_copy', {
      service_name: serviceData.service_name,
      service_id: serviceData.service_id
    })
  }, [trackGA4Event, trackYandexEvent])

  // Просмотр категории
  const trackCategoryView = useCallback((category: string) => {
    // Google Analytics 4
    trackGA4Event('view_category', {
      category_name: category
    })

    // Яндекс.Метрика
    trackYandexEvent('category_view', {
      category: category
    })
  }, [trackGA4Event, trackYandexEvent])

  return {
    trackServiceView,
    trackExternalLink, 
    trackShare,
    trackCopyLink,
    trackCategoryView
  }
}

export default useAnalytics 