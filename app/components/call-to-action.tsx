"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Rocket } from 'lucide-react'

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden opacity-0 scale-95 transition-all duration-1000">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-700 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Join the{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Chemistry Revolution?
            </span>
          </h2>
          
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            🚀 Be part of the most dynamic chemistry community in the Philippines! 
            Connect, learn, and innovate with thousands of passionate students.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-navy-700 hover:bg-blue-50 px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 group font-semibold"
            >
              <Users className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Join PACSMIN Now
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-navy-700 px-12 py-6 text-xl rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 group font-semibold backdrop-blur-sm"
            >
              <Rocket className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Explore Programs
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Free</div>
              <div className="text-blue-200">Membership</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">Community Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Unlimited</div>
              <div className="text-blue-200">Learning Resources</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
