"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "../components/header"
import MoleculeBackground from "../components/molecule-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from 'lucide-react'

export default function EventsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".event-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const events = [
    {
      title: "National Chemistry Symposium 2024",
      date: "March 15-17, 2024",
      location: "University of the Philippines Diliman",
      attendees: "500+ Expected",
      time: "9:00 AM - 5:00 PM",
      description: "Join the biggest chemistry event of the year featuring renowned speakers and cutting-edge research presentations."
    },
    {
      title: "Organic Chemistry Workshop",
      date: "April 8, 2024",
      location: "Ateneo de Manila University",
      attendees: "100 Students",
      time: "1:00 PM - 6:00 PM",
      description: "Hands-on workshop focusing on advanced organic synthesis techniques and laboratory best practices."
    },
    {
      title: "Chemistry Quiz Bowl Championship",
      date: "May 20, 2024",
      location: "De La Salle University",
      attendees: "200+ Participants",
      time: "10:00 AM - 4:00 PM",
      description: "Test your chemistry knowledge in this exciting competition with prizes and recognition for winners."
    }
  ]

  return (
    <div ref={pageRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MoleculeBackground />
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6">
              Upcoming Events
            </h1>
            <p className="text-lg sm:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
              Discover exciting chemistry events, workshops, and competitions happening across the Philippines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card key={index} className="event-card bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-navy-800 mb-4">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-navy-600">
                    <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-navy-600">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-navy-600">
                    <Users className="h-5 w-5 mr-3 text-blue-600" />
                    {event.attendees}
                  </div>
                  <div className="flex items-center text-navy-600">
                    <Clock className="h-5 w-5 mr-3 text-blue-600" />
                    {event.time}
                  </div>
                  <p className="text-navy-600 leading-relaxed mt-4">
                    {event.description}
                  </p>
                  <Button className="w-full mt-6 bg-navy-600 hover:bg-navy-700 text-white">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
