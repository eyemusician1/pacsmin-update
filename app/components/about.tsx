"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Atom, Users, Lightbulb, Target } from 'lucide-react'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy-800 mb-6">
            About PACSMIN
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            The Philippine Association of Chemistry Students is dedicated to fostering 
            scientific excellence, innovation, and community among chemistry students nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="about-card bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-navy-600 leading-relaxed">
                  {feature.description}
                </p>
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
    icon: Atom,
    title: "Scientific Excellence",
    description: "Advancing chemistry education through cutting-edge research and innovative learning methodologies."
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Connecting chemistry students across the Philippines to foster collaboration and knowledge sharing."
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Promoting creative solutions to real-world problems through chemistry and scientific innovation."
  },
  {
    icon: Target,
    title: "Career Development",
    description: "Providing resources, mentorship, and opportunities for professional growth in chemistry fields."
  }
]
