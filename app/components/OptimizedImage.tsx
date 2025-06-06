'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  className?: string
  sizes?: string
  quality?: number
  fallbackSrc?: string
  onError?: () => void
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  loading = 'lazy',
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  fallbackSrc,
  onError
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  const handleError = () => {
    setHasError(true)
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    } else if (onError) {
      onError()
    }
  }

  // Генерируем srcSet для различных форматов
  const generateSrcSet = (originalSrc: string) => {
    if (!originalSrc) return undefined
    
    // Проверяем если это уже WebP
    if (originalSrc.includes('.webp')) {
      return originalSrc
    }

    // Для Next.js Image компонент автоматически оптимизирует изображения
    return originalSrc
  }

  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-gray-500 text-sm text-center px-4">
          Изображение не найдено
        </div>
      </div>
    )
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={loading}
      className={className}
      sizes={sizes}
      quality={quality}
      onError={handleError}
      // Оптимизации для производительности
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      style={{
        objectFit: 'cover',
        objectPosition: 'center'
      }}
    />
  )
}

export default OptimizedImage 