"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.testimonial-card')
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in')
              }, index * 200)
            })
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

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Chemistry Major, UP Diliman",
      image: "/placeholder.svg?height=80&width=80",
      content: "PACSMIN has been incredible! The networking opportunities and research collaborations have shaped my academic journey. The community is so supportive! 🧪✨",
      rating: 5
    },
    {
      name: "John Dela Cruz",
      role: "Graduate Student, Ateneo",
      image: "/placeholder.svg?height=80&width=80",
      content: "The workshops and seminars are top-notch. I've learned so much from industry experts and made lifelong connections with fellow chemistry enthusiasts! 🔬",
      rating: 5
    },
    {
      name: "Sarah Kim",
      role: "Research Assistant, DLSU",
      image: "/placeholder.svg?height=80&width=80",
      content: "Being part of PACSMIN opened doors I never knew existed. The mentorship program connected me with amazing professionals in the field! 🌟",
      rating: 5
    }
  ]

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 to-navy-50/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-navy-800 mb-6">
            What Students Say 💬
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our amazing community of chemistry students who are making their mark in the field!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card opacity-0 translate-y-10 transition-all duration-700 bg-white/90 backdrop-blur-md border-blue-100 hover:shadow-2xl group overflow-hidden">
              <CardContent className="p-8 relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-200 group-hover:text-blue-300 transition-colors" />
                
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image || "/placeholder.svg"} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-200 transition-colors"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-navy-800 group-hover:text-blue-700 transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-navy-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-navy-700 leading-relaxed text-lg group-hover:text-navy-800 transition-colors">
                  "{testimonial.content}"
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-navy-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
