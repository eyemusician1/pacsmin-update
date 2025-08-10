"use client"

import { useEffect, useRef, Suspense, lazy } from "react"
import Header from "./components/header"
import Hero from "./components/hero"
import MoleculeBackground from "./components/molecule-background"

// Lazy load components that are below the fold
const About = lazy(() => import("./components/about"))
const Features = lazy(() => import("./components/features"))
const FeaturedPosts = lazy(() => import("./components/featured-posts"))
const LatestUpdateImage = lazy(() => import("./components/latest-update-image"))
const Footer = lazy(() => import("./components/footer"))

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="py-16 sm:py-24 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
  </div>
)

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Optimized Intersection Observer with better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Use setTimeout to avoid blocking initial render
    const timer = setTimeout(() => {
      const fadeElements = document.querySelectorAll(".fade-in")
      fadeElements.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={mainRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MoleculeBackground />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FeaturedPosts />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LatestUpdateImage />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  )
}
