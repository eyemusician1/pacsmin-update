"use client"

import { useEffect, useRef } from "react"
import Header from "../components/header"
import MoleculeBackground from "../components/molecule-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, DollarSign } from "lucide-react"
import { useAppStore } from "@/lib/store"

export default function EventsPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { getPublishedEvents } = useAppStore()
  const events = getPublishedEvents()

  useEffect(() => {
    // Simple fade-in animation for event cards
    const eventCards = document.querySelectorAll(".event-card")
    eventCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("opacity-100", "translate-y-0")
        card.classList.remove("opacity-0", "translate-y-10")
      }, index * 200)
    })
  }, [events])

  // Fallback events if store is empty
  const fallbackEvents = [
    {
      id: 1,
      title: "National Chemistry Symposium 2024",
      date: "2024-03-15",
      endDate: "2024-03-17",
      time: "9:00 AM - 5:00 PM",
      location: "University of the Philippines Diliman",
      attendees: 450,
      maxAttendees: 600,
      status: "Published" as const,
      description:
        "Join the biggest chemistry event of the year featuring renowned speakers and cutting-edge research presentations.",
      registrationFee: "₱1,500",
      organizer: "PACSMIN National",
      category: "Symposium",
      image: "/placeholder.svg?height=200&width=400&text=Chemistry+Symposium",
    },
    {
      id: 2,
      title: "Organic Chemistry Workshop",
      date: "2024-04-08",
      endDate: "2024-04-08",
      time: "1:00 PM - 6:00 PM",
      location: "Ateneo de Manila University",
      attendees: 75,
      maxAttendees: 100,
      status: "Published" as const,
      description: "Hands-on workshop focusing on advanced organic synthesis techniques and laboratory best practices.",
      registrationFee: "₱800",
      organizer: "PACSMIN Manila",
      category: "Workshop",
      image: "/placeholder.svg?height=200&width=400&text=Organic+Chemistry",
    },
    {
      id: 3,
      title: "Chemistry Quiz Bowl Championship",
      date: "2024-05-20",
      endDate: "2024-05-20",
      time: "10:00 AM - 4:00 PM",
      location: "De La Salle University",
      attendees: 150,
      maxAttendees: 200,
      status: "Published" as const,
      description:
        "Test your chemistry knowledge in this exciting competition with prizes and recognition for winners.",
      registrationFee: "₱500",
      organizer: "PACSMIN South",
      category: "Competition",
      image: "/placeholder.svg?height=200&width=400&text=Quiz+Bowl",
    },
  ]

  // Use store events if available, otherwise use fallback
  const displayEvents = events.length > 0 ? events : fallbackEvents

  return (
    <div ref={pageRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MoleculeBackground />
      <Header />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6">Upcoming Events</h1>
            <p className="text-lg sm:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
              Discover exciting chemistry events, workshops, and competitions happening across the Philippines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayEvents.map((event, index) => (
              <Card
                key={event.id}
                className="event-card opacity-0 translate-y-10 bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-xl transition-all duration-500 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={event.image || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(event.title)}`}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-navy-600 text-white">{event.category || "Event"}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-navy-700">
                      {event.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl text-navy-800 mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center text-navy-600">
                    <Calendar className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      {event.date}
                      {event.endDate && event.endDate !== event.date && ` - ${event.endDate}`}
                    </span>
                  </div>

                  <div className="flex items-center text-navy-600">
                    <Clock className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{event.time}</span>
                  </div>

                  <div className="flex items-start text-navy-600">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm sm:text-base">
                      <p className="font-medium">{event.location}</p>
                      <p className="text-gray-500 text-sm">{event.organizer}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-navy-600">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="text-sm sm:text-base">
                        {event.attendees}/{event.maxAttendees} registered
                      </span>
                    </div>
                    {event.registrationFee && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">{event.registrationFee}</span>
                      </div>
                    )}
                  </div>

                  {/* Registration Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-navy-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>

                  <p className="text-navy-600 leading-relaxed text-sm sm:text-base line-clamp-3">{event.description}</p>

                  <Button className="w-full mt-6 bg-navy-600 hover:bg-navy-700 text-white py-3 rounded-xl shadow-lg hover:shadow-navy-500/25 transition-all duration-300 transform hover:scale-105">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Debug info - remove in production */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {displayEvents.length} events
            {events.length === 0 && " (using fallback data)"}
          </div>
        </div>
      </main>
    </div>
  )
}
