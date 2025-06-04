'use client'

import HeroSection from './components/HeroSection'
import SearchBar from './components/SearchBar'
import CategoryGrid from './components/CategoryGrid'
import FeaturedTools from './components/FeaturedTools'
import UseCasesShowcase from './components/UseCasesShowcase'
import StatsSection from './components/StatsSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SearchBar />
      <CategoryGrid />
      <FeaturedTools />
      <UseCasesShowcase />
      <StatsSection />
    </main>
  )
} 