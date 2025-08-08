"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function LatestUpdateImage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden fade-in">
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=800&width=1600"
          alt="Latest Chemistry Update"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm"></div>
      </div>
      <div className="container mx-auto text-center relative z-10 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Discover Our Latest Breakthroughs
          </h2>
          <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the most recent advancements and exciting news from the world of chemistry and PACSMIN.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-xl rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group"
          >
            Read All Updates
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
