"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, BookOpen, Play, Sparkles } from "lucide-react"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })

    // Only add mouse tracking on desktop for performance
    let handleMouseMove: ((e: MouseEvent) => void) | null = null
    if (!isMobile) {
      handleMouseMove = (e: MouseEvent) => {
        // Throttle mouse updates for performance
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
        })
      }
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100)

    return () => {
      window.removeEventListener("resize", checkMobile)
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      clearTimeout(timer)
    }
  }, [isMobile])

  return (
    <section
      ref={heroRef}
      className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center"
    >
      {/* Simplified floating elements for mobile performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Reduce number of floating elements on mobile */}
        <div className="floating-element absolute top-20 left-10 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-400 to-navy-500 rounded-full opacity-20 blur-sm animate-float"></div>
        <div className="floating-element absolute top-40 right-20 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-navy-400 to-blue-600 rounded-full opacity-15 blur-sm animate-float-delayed"></div>
        {/* Hide complex elements on mobile */}
        <div className="floating-element hidden sm:block absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-blue-500 to-navy-400 rounded-full opacity-25 blur-sm animate-float-slow"></div>
        <div className="floating-element hidden sm:block absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-navy-500 to-blue-500 rounded-full opacity-20 blur-sm animate-float"></div>
        <div className="floating-element hidden md:block absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-r from-blue-300 to-navy-300 rounded-full opacity-30 blur-sm animate-float-delayed"></div>
        <div className="floating-element hidden lg:block absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-navy-300 to-blue-400 rounded-full opacity-10 blur-md animate-float-slow"></div>
      </div>

      {/* Interactive cursor follower - desktop only */}
      {!isMobile && (
        <div
          className="fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50 opacity-50 blur-sm transition-all duration-300 will-change-transform"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          }}
        />
      )}

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Mobile-optimized title */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-navy-800 mb-6 sm:mb-8 leading-tight relative transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            <span className="relative inline-block">
              Philippine Association of{" "}
              <span className="bg-gradient-to-r from-blue-600 via-navy-600 to-blue-800 bg-clip-text text-transparent relative">
                Chemistry Students
                {/* Remove blur effect on mobile for performance */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-blue-600 via-navy-600 to-blue-800 bg-clip-text text-transparent blur-lg opacity-30 -z-10">
                  Chemistry Students
                </div>
              </span>
            </span>
          </h1>

          {/* Mobile-optimized subtitle */}
          <p
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-navy-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Empowering the next generation of chemists through{" "}
            <span className="font-semibold text-blue-700">innovation</span>,{" "}
            <span className="font-semibold text-navy-700">collaboration</span>, and{" "}
            <span className="font-semibold text-blue-800">scientific excellence</span> across the Philippines.
          </p>

          {/* Mobile-optimized buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 group touch-manipulation"
            >
              <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Explore Programs
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 group backdrop-blur-sm bg-white/80 touch-manipulation"
            >
              <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Watch Demo
            </Button>
          </div>

          {/* Mobile-optimized stats cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="group bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100/50 transition-all duration-300">
              <div className="relative">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-400 to-navy-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-navy-800 mb-2">5,000+</div>
              <div className="text-navy-600 font-medium text-base sm:text-lg">Active Members</div>
              <div className="text-sm text-navy-500 mt-1 sm:mt-2">Growing every day</div>
            </div>

            <div className="group bg-gradient-to-br from-white/90 to-navy-50/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-100/50 transition-all duration-300">
              <div className="relative">
                <Award className="h-10 w-10 sm:h-12 sm:w-12 text-navy-600 mx-auto mb-3 sm:mb-4" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-navy-800 mb-2">150+</div>
              <div className="text-navy-600 font-medium text-base sm:text-lg">Awards Won</div>
              <div className="text-sm text-navy-500 mt-1 sm:mt-2">Excellence recognized</div>
            </div>

            <div className="group bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100/50 transition-all duration-300 sm:col-span-1 col-span-1">
              <div className="relative">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-navy-800 mb-2">200+</div>
              <div className="text-navy-600 font-medium text-base sm:text-lg">Research Papers</div>
              <div className="text-sm text-navy-500 mt-1 sm:mt-2">Knowledge shared</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
