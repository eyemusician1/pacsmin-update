"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Users, Plus, Search, Edit, Trash2, Eye, RefreshCw, TrendingUp, Clock } from "lucide-react"
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "../../appwrite/database"
import type { Event } from "../../appwrite/types"

interface EventStats {
  total: number
  published: number
  draft: number
  totalAttendees: number
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [stats, setStats] = useState<EventStats>({
    total: 0,
    published: 0,
    draft: 0,
    totalAttendees: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    location: "",
    registrationRequired: false,
    maxAttendees: 0,
    currentAttendees: 0,
  })

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const { events: fetchedEvents, total } = await getAllEvents(100, 0)
      setEvents(fetchedEvents)
      setFilteredEvents(fetchedEvents)

      // Calculate statistics - Note: Appwrite Event type doesn't have status field
      // You may need to add a status field to your Event interface if needed
      const totalAttendees = fetchedEvents.reduce((sum, event) => sum + (event.currentAttendees || 0), 0)

      setStats({
        total,
        published: total, // Assuming all fetched events are published
        draft: 0, // No draft status in current Event interface
        totalAttendees,
      })
    } catch (error) {
      console.error("Error fetching events:", error)
      // Keep empty state on error
      setEvents([])
      setFilteredEvents([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleCreateEvent = async () => {
    try {
      if (!newEvent.title || !newEvent.date || !newEvent.location) {
        alert("Please fill in all required fields")
        return
      }

      await createEvent({
        title: newEvent.title,
        description: newEvent.description || "",
        date: newEvent.date,
        location: newEvent.location,
        registrationRequired: newEvent.registrationRequired || false,
        maxAttendees: newEvent.maxAttendees || 0,
        currentAttendees: 0,
        imageUrl: newEvent.imageUrl,
      })

      setIsCreateDialogOpen(false)
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        registrationRequired: false,
        maxAttendees: 0,
        currentAttendees: 0,
      })

      // Refresh events list
      await fetchEvents()
    } catch (error) {
      console.error("Error creating event:", error)
      alert("Failed to create event. Please try again.")
    }
  }

  const handleUpdateEvent = async () => {
    try {
      if (!selectedEvent || !selectedEvent.title) {
        alert("Please fill in all required fields")
        return
      }

      await updateEvent(selectedEvent.$id, {
        title: selectedEvent.title,
        description: selectedEvent.description,
        date: selectedEvent.date,
        location: selectedEvent.location,
        registrationRequired: selectedEvent.registrationRequired,
        maxAttendees: selectedEvent.maxAttendees,
        imageUrl: selectedEvent.imageUrl,
      })

      setIsEditDialogOpen(false)
      setSelectedEvent(null)

      // Refresh events list
      await fetchEvents()
    } catch (error) {
      console.error("Error updating event:", error)
      alert("Failed to update event. Please try again.")
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return
    }

    try {
      await deleteEvent(eventId)

      // Refresh events list
      await fetchEvents()
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Failed to delete event. Please try again.")
    }
  }

  useEffect(() => {
    let filtered = events

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Note: Status filtering removed since Event interface doesn't have status field
    // You may want to add a status field to your Event interface if needed

    setFilteredEvents(filtered)
  }, [events, searchTerm, filterStatus])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Events Management</h1>
          <p className="text-navy-600 mt-1">Create and manage PACSMIN events</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchEvents} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Add a new event to the PACSMIN calendar</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={newEvent.location || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Enter event location"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Enter event description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={newEvent.maxAttendees || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: Number.parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={newEvent.imageUrl || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="registrationRequired"
                    checked={newEvent.registrationRequired || false}
                    onChange={(e) => setNewEvent({ ...newEvent, registrationRequired: e.target.checked })}
                  />
                  <Label htmlFor="registrationRequired">Registration Required</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEvent}>Create Event</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Events</p>
                <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Published</p>
                <p className="text-3xl font-bold text-green-900">{stats.published}</p>
              </div>
              <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Draft Events</p>
                <p className="text-3xl font-bold text-purple-900">{stats.draft}</p>
              </div>
              <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Total Attendees</p>
                <p className="text-3xl font-bold text-orange-900">{stats.totalAttendees}</p>
              </div>
              <div className="h-12 w-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events by title, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-navy-800">Events ({filteredEvents.length})</CardTitle>
          <CardDescription>Manage all PACSMIN events</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms" : "Create your first event to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date & Location</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.$id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-semibold text-navy-800">{event.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Users className="h-3 w-3 mr-1" />
                            {event.currentAttendees || 0}
                            {event.maxAttendees && event.maxAttendees > 0 && ` / ${event.maxAttendees}`}
                          </div>
                          {event.maxAttendees && event.maxAttendees > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${Math.min(((event.currentAttendees || 0) / event.maxAttendees) * 100, 100)}%`,
                                }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.registrationRequired ? "default" : "secondary"}>
                          {event.registrationRequired ? "Required" : "Open"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(event)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Event Details</DialogTitle>
                                <DialogDescription>Complete information for {event.title}</DialogDescription>
                              </DialogHeader>
                              {selectedEvent && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                                    <p className="text-gray-600">{selectedEvent.description}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Date</Label>
                                      <p className="text-sm text-gray-900">{formatDate(selectedEvent.date)}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Location</Label>
                                      <p className="text-sm text-gray-900">{selectedEvent.location}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Current Attendees</Label>
                                      <p className="text-sm text-gray-900">{selectedEvent.currentAttendees || 0}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Max Attendees</Label>
                                      <p className="text-sm text-gray-900">
                                        {selectedEvent.maxAttendees || "Unlimited"}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Registration Required</Label>
                                      <p className="text-sm text-gray-900">
                                        {selectedEvent.registrationRequired ? "Yes" : "No"}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium text-gray-700">Created</Label>
                                      <p className="text-sm text-gray-900">
                                        {new Date(selectedEvent.$createdAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedEvent(event)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Event</DialogTitle>
                                <DialogDescription>Update event information</DialogDescription>
                              </DialogHeader>
                              {selectedEvent && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-title">Event Title *</Label>
                                      <Input
                                        id="edit-title"
                                        value={selectedEvent.title}
                                        onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-date">Date *</Label>
                                      <Input
                                        id="edit-date"
                                        type="date"
                                        value={selectedEvent.date}
                                        onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-location">Location *</Label>
                                    <Input
                                      id="edit-location"
                                      value={selectedEvent.location}
                                      onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Textarea
                                      id="edit-description"
                                      value={selectedEvent.description}
                                      onChange={(e) =>
                                        setSelectedEvent({ ...selectedEvent, description: e.target.value })
                                      }
                                      rows={3}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-maxAttendees">Max Attendees</Label>
                                      <Input
                                        id="edit-maxAttendees"
                                        type="number"
                                        value={selectedEvent.maxAttendees || ""}
                                        onChange={(e) =>
                                          setSelectedEvent({
                                            ...selectedEvent,
                                            maxAttendees: Number.parseInt(e.target.value) || 0,
                                          })
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-imageUrl">Image URL</Label>
                                      <Input
                                        id="edit-imageUrl"
                                        value={selectedEvent.imageUrl || ""}
                                        onChange={(e) =>
                                          setSelectedEvent({ ...selectedEvent, imageUrl: e.target.value })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="edit-registrationRequired"
                                      checked={selectedEvent.registrationRequired}
                                      onChange={(e) =>
                                        setSelectedEvent({
                                          ...selectedEvent,
                                          registrationRequired: e.target.checked,
                                        })
                                      }
                                    />
                                    <Label htmlFor="edit-registrationRequired">Registration Required</Label>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleUpdateEvent}>Update Event</Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.$id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
