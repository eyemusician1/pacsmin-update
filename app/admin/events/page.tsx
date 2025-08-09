"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin, Users, Clock, Filter } from "lucide-react"
import { useAppStore } from "@/lib/store"
import type { Event } from "@/lib/store"

export default function EventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const EventForm = ({ event, onClose }: { event?: Event; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      title: event?.title || "",
      date: event?.date || "",
      endDate: event?.endDate || "",
      time: event?.time || "",
      location: event?.location || "",
      maxAttendees: event?.maxAttendees || 100,
      registrationFee: event?.registrationFee || "",
      organizer: event?.organizer || "",
      description: event?.description || "",
      category: event?.category || "",
      status: event?.status || ("Draft" as const),
    })

    const handleSubmit = (status: "Draft" | "Published") => {
      const eventData = {
        ...formData,
        attendees: event?.attendees || 0,
        status,
        image: event?.image || "/placeholder.svg?height=300&width=300",
      }

      if (event) {
        updateEvent(event.id, eventData)
      } else {
        addEvent(eventData)
      }
      onClose()
    }

    return (
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <Label htmlFor="title" className="text-sm font-medium">
            Event Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate" className="text-sm font-medium">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-sm font-medium">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="time" className="text-sm font-medium">
            Time
          </Label>
          <Input
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="e.g., 9:00 AM - 5:00 PM"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxAttendees" className="text-sm font-medium">
              Max Attendees
            </Label>
            <Input
              id="maxAttendees"
              type="number"
              value={formData.maxAttendees}
              onChange={(e) => setFormData({ ...formData, maxAttendees: Number.parseInt(e.target.value) })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="registrationFee" className="text-sm font-medium">
              Registration Fee
            </Label>
            <Input
              id="registrationFee"
              value={formData.registrationFee}
              onChange={(e) => setFormData({ ...formData, registrationFee: e.target.value })}
              placeholder="e.g., ₱1,500"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="organizer" className="text-sm font-medium">
              Organizer
            </Label>
            <Input
              id="organizer"
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Symposium">Symposium</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Competition">Competition</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="mt-1"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSubmit("Draft")}>
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit("Published")} className="bg-navy-600 hover:bg-navy-700">
            Publish Event
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Events Management</h1>
          <p className="text-lg text-gray-600">Manage PACSMIN events and workshops</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-navy-600 hover:bg-navy-700">
              <Plus className="mr-2 h-5 w-5" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Event</DialogTitle>
            </DialogHeader>
            <EventForm onClose={() => setIsCreateModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search events by title, location, or organizer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12"
              />
            </div>

            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 h-12">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="lg">
                Export Events
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">All Events ({filteredEvents.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-900 py-4">Event Details</TableHead>
                  <TableHead className="font-semibold text-gray-900">Date & Time</TableHead>
                  <TableHead className="font-semibold text-gray-900">Location</TableHead>
                  <TableHead className="font-semibold text-gray-900">Registration</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="py-4">
                      <div className="max-w-xs">
                        <p className="font-semibold text-gray-900 mb-1">{event.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          {event.date} {event.endDate !== event.date && `- ${event.endDate}`}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-2 h-4 w-4 text-gray-400" />
                          {event.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{event.location}</p>
                          <p className="text-gray-500 text-xs">{event.organizer}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-gray-400" />
                          {event.attendees}/{event.maxAttendees}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-navy-500 to-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">{event.registrationFee}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={event.status === "Published" ? "default" : "secondary"}
                        className={event.status === "Published" ? "bg-green-100 text-green-800" : ""}
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Dialog
                          open={isEditModalOpen && selectedEvent?.id === event.id}
                          onOpenChange={(open) => {
                            setIsEditModalOpen(open)
                            if (!open) setSelectedEvent(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedEvent(event)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">Edit Event</DialogTitle>
                            </DialogHeader>
                            <EventForm
                              event={selectedEvent || undefined}
                              onClose={() => {
                                setIsEditModalOpen(false)
                                setSelectedEvent(null)
                              }}
                            />
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
