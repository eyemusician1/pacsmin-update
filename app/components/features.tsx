"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ShoppingBag, BookOpen, Users, Award, Microscope } from 'lucide-react'

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy-800 mb-6">
            What We Offer
          </h2>
          <p className="text-lg sm:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Discover the comprehensive range of services and opportunities available 
            to PACSMIN members across the Philippines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-2xl group">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-navy-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-navy-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <Button variant="outline" className="border-navy-600 text-navy-600 hover:bg-navy-50 group-hover:bg-navy-600 group-hover:text-white transition-all duration-300">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Calendar,
    title: "Events & Workshops",
    description: "Join exciting chemistry events, workshops, and seminars led by industry experts.",
    color: "bg-blue-500"
  },
  {
    icon: ShoppingBag,
    title: "PACSMIN Store",
    description: "Get exclusive merchandise, lab equipment, and educational materials.",
    color: "bg-navy-500"
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access comprehensive study materials, research papers, and educational content.",
    color: "bg-blue-600"
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with fellow chemistry students and professionals across the Philippines.",
    color: "bg-navy-600"
  },
  {
    icon: Award,
    title: "Competitions",
    description: "Participate in chemistry competitions and showcase your scientific skills.",
    color: "bg-blue-700"
  },
  {
    icon: Microscope,
    title: "Research Opportunities",
    description: "Collaborate on cutting-edge research projects with leading institutions.",
    color: "bg-navy-700"
  }
]
