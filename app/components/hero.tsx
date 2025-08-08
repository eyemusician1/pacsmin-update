"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, BookOpen, Play, Sparkles } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    // Trigger entrance animations
    setTimeout(() => setIsLoaded(true), 100)
    
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-navy-500 rounded-full opacity-20 blur-sm animate-float"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-navy-400 to-blue-600 rounded-full opacity-15 blur-sm animate-float-delayed"></div>
        <div className="floating-element absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-blue-500 to-navy-400 rounded-full opacity-25 blur-sm animate-float-slow"></div>
        <div className="floating-element absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-navy-500 to-blue-500 rounded-full opacity-20 blur-sm animate-float"></div>
        <div className="floating-element absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-r from-blue-300 to-navy-300 rounded-full opacity-30 blur-sm animate-float-delayed"></div>
        <div className="floating-element absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-navy-300 to-blue-400 rounded-full opacity-10 blur-md animate-float-slow"></div>
      </div>

      {/* Interactive cursor follower */}
      <div 
        className="fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50 opacity-50 blur-sm transition-all duration-300"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced title with gradient and glow effect */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-navy-800 mb-8 leading-tight relative transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
            }`}
          >
            <span className="relative inline-block">
              Philippine Association of{" "}
              <span className="bg-gradient-to-r from-blue-600 via-navy-600 to-blue-800 bg-clip-text text-transparent relative">
                Chemistry Students
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-navy-600 to-blue-800 bg-clip-text text-transparent blur-lg opacity-30 -z-10">
                  Chemistry Students
                </div>
              </span>
            </span>
          </h1>
          
          {/* Enhanced subtitle with better typography */}
          <p 
            className={`text-2xl sm:text-3xl text-navy-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Empowering the next generation of chemists through{" "}
            <span className="font-semibold text-blue-700">innovation</span>,{" "}
            <span className="font-semibold text-navy-700">collaboration</span>, and{" "}
            <span className="font-semibold text-blue-800">scientific excellence</span>{" "}
            across the Philippines.
          </p>

          {/* Enhanced buttons with better styling */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white px-10 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group"
            >
              <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Explore Programs
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white px-10 py-6 text-xl rounded-2xl shadow-xl hover:shadow-navy-500/25 transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm bg-white/80"
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced stats cards with better design */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="group bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-blue-100/50 hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up">
              <div className="relative">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-navy-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-4xl font-bold text-navy-800 mb-2 group-hover:text-blue-700 transition-colors">5,000+</div>
              <div className="text-navy-600 font-medium text-lg">Active Members</div>
              <div className="text-sm text-navy-500 mt-2">Growing every day</div>
            </div>
            
            <div className="group bg-gradient-to-br from-white/90 to-navy-50/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-navy-100/50 hover:shadow-navy-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-200">
              <div className="relative">
                <Award className="h-12 w-12 text-navy-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-4xl font-bold text-navy-800 mb-2 group-hover:text-navy-700 transition-colors">150+</div>
              <div className="text-navy-600 font-medium text-lg">Awards Won</div>
              <div className="text-sm text-navy-500 mt-2">Excellence recognized</div>
            </div>
            
            <div className="group bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-blue-100/50 hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-400">
              <div className="relative">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-4xl font-bold text-navy-800 mb-2 group-hover:text-blue-700 transition-colors">200+</div>
              <div className="text-navy-600 font-medium text-lg">Research Papers</div>
              <div className="text-sm text-navy-500 mt-2">Knowledge shared</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
