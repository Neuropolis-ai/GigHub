'use client'

import HeroSection from './components/HeroSection'
import CategoryGrid from './components/CategoryGrid'
import FeaturedTools from './components/FeaturedTools'
import UseCasesShowcase from './components/UseCasesShowcase'
import FAQSection from './components/FAQSection'
import StatsSection from './components/StatsSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CategoryGrid />
      <FeaturedTools />
      <UseCasesShowcase />
      <FAQSection />
      <StatsSection />
    </main>
  )
} 