"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Star, Target, Zap, Crown } from 'lucide-react'

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-navy-800 mb-6">
            Our Achievements
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating the incredible accomplishments of our PACSMIN community and the impact we've made together!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <Card key={index} className={`achievement-card ${achievement.bgColor}/50 backdrop-blur-sm border-2 border-white/50 hover:shadow-2xl group overflow-hidden relative`}>
              <CardContent className="p-8 text-center relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-float`}>
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-navy-800 mb-4 group-hover:text-navy-900 transition-colors">
                  {achievement.title}
                </h3>
                
                <p className="text-navy-600 leading-relaxed text-lg group-hover:text-navy-700 transition-colors">
                  {achievement.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-navy-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-navy-400 to-blue-500 rounded-full animate-pulse animation-delay-1000"></div>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const achievements = [
  {
    icon: Crown,
    title: "National Champions",
    description: "1st Place in Philippine Chemistry Olympiad 2023",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Trophy,
    title: "Research Excellence",
    description: "Best Research Paper Award - ASEAN Chemistry Conference",
    color: "from-blue-500 to-navy-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Medal,
    title: "Innovation Award",
    description: "Outstanding Innovation in Green Chemistry Solutions",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Star,
    title: "Community Impact",
    description: "Most Active Student Organization - Philippines 2023",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Target,
    title: "Academic Excellence",
    description: "Highest GPA Average Among Chemistry Organizations",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Zap,
    title: "Leadership Recognition",
    description: "Outstanding Leadership in STEM Education",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50"
  }
]
