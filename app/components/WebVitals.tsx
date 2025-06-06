'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (event: string, name: string, params: Record<string, any>) => void
    ym?: (id: number, event: string, params?: Record<string, any>) => void
  }
}

export function WebVitals() {
  useEffect(() => {
    // Мониторинг производительности с помощью Performance API
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Логирование метрик производительности
        console.log(`Performance metric: ${entry.name}`, entry)
        
        // Отправка в аналитику (если нужно)
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'performance_metric', {
            event_category: 'Performance',
            event_label: entry.name,
            value: Math.round(entry.duration || 0),
            non_interaction: true,
          })
        }
      })
    })

    // Наблюдение за различными типами метрик
    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })
    } catch (e) {
      console.log('Performance Observer not supported')
    }

    // Простой мониторинг времени загрузки
    const measureLoadTime = () => {
      if (document.readyState === 'complete') {
        const loadTime = performance.now()
        console.log('Page load time:', loadTime)
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'page_load_time', {
            event_category: 'Performance',
            value: Math.round(loadTime),
            non_interaction: true,
          })
        }
      }
    }

    // Измерение времени загрузки
    if (document.readyState === 'complete') {
      measureLoadTime()
    } else {
      window.addEventListener('load', measureLoadTime)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('load', measureLoadTime)
    }
  }, [])

  return null // Этот компонент только для мониторинга
}

export default WebVitals 