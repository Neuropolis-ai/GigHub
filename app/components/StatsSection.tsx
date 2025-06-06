'use client'

import { useRef, useEffect, useState } from 'react'
import { Users, Bot, ThumbsUp, Globe } from 'lucide-react'

const stats = [
  {
    id: 1,
    icon: Bot,
    value: 2000,
    suffix: '+',
    label: 'ИИ-сервисов',
    description: 'В нашем каталоге'
  },
  {
    id: 2,
    icon: Users,
    value: 150000,
    suffix: '+',
    label: 'Пользователей',
    description: 'Доверяют нам'
  },
  {
    id: 3,
    icon: ThumbsUp,
    value: 95,
    suffix: '%',
    label: 'Удовлетворенности',
    description: 'Рейтинг качества'
  },
  {
    id: 4,
    icon: Globe,
    value: 150,
    suffix: '+',
    label: 'Стран',
    description: 'Используют платформу'
  }
]

const AnimatedCounter = ({ value, suffix = '', inView }: { value: number; suffix?: string; inView: boolean }) => {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!inView || !mounted) return

    const timer = setTimeout(() => {
      const increment = value / 100
      const interval = setInterval(() => {
        setCount(prev => {
          const next = prev + increment
          if (next >= value) {
            clearInterval(interval)
            return value
          }
          return next
        })
      }, 20)

      return () => clearInterval(interval)
    }, 200)

    return () => clearTimeout(timer)
  }, [value, inView, mounted])

  // На сервере и до монтирования показываем конечное значение
  if (!mounted) {
    return <span>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{suffix}</span>
  }

  return (
    <span>
      {Math.floor(count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-primary/5 via-white to-accent-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Цифры, которые говорят
            <span className="text-gradient"> сами за себя</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Наша платформа стала домом для тысяч инновационных ИИ-решений и миллионов пользователей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className="relative group transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-accent-primary/30">
                  {/* Icon */}
                  <div className="relative mx-auto w-16 h-16 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl group-hover:scale-110 transition-transform duration-300" />
                    <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center m-1">
                      <Icon className="w-8 h-8 text-accent-primary" />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="text-4xl sm:text-5xl font-bold text-text-primary mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm">
                    {stat.description}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent-primary/20 rounded-full group-hover:scale-150 transition-transform duration-300" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent-secondary/20 rounded-full group-hover:scale-200 transition-transform duration-300" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-text-secondary text-sm">
              Данные обновляются в реальном времени
            </span>
          </div>
        </div>
      </div>
    </section>
  )
} 