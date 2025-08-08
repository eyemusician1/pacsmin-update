"use client"

import { useEffect, useRef } from "react"
import Header from "./components/header"
import Hero from "./components/hero"
import About from "./components/about"
import Features from "./components/features"
import LatestUpdateImage from "./components/latest-update-image" // New import
import Footer from "./components/footer"
import MoleculeBackground from "./components/molecule-background"
import FeaturedPosts from "./components/featured-posts"

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          } else {
            // Optional: remove animate-in when out of view to allow re-animation on scroll back up
            // entry.target.classList.remove('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={mainRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MoleculeBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <FeaturedPosts />
        <LatestUpdateImage /> {/* New component added here */}
      </main>
      <Footer />
    </div>
  )
}
