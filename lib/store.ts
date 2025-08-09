"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types
export interface Event {
  id: number
  title: string
  date: string
  endDate?: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  status: "Published" | "Draft"
  description: string
  registrationFee: string
  organizer: string
  category?: string
  image?: string
}

export interface Story {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  status: "Published" | "Draft"
  views: string
  likes: string
  comments?: string
  readTime?: string
  image?: string
  content?: string
  isFeatured?: boolean
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  university: string
  role: "Student" | "Admin" | "Moderator"
  status: "Active" | "Inactive" | "Suspended"
  joinDate: string
  lastLogin: string
}

interface AppStore {
  // Events
  events: Event[]
  addEvent: (event: Omit<Event, "id">) => void
  updateEvent: (id: number, event: Partial<Event>) => void
  deleteEvent: (id: number) => void
  getPublishedEvents: () => Event[]

  // Stories
  stories: Story[]
  addStory: (story: Omit<Story, "id">) => void
  updateStory: (id: number, story: Partial<Story>) => void
  deleteStory: (id: number) => void
  getFeaturedStories: () => Story[]
  getMoreStories: () => Story[]

  // Users
  users: User[]
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: number, user: Partial<User>) => void
  deleteUser: (id: number) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial Events Data
      events: [
        {
          id: 1,
          title: "National Chemistry Symposium 2024",
          date: "2024-03-15",
          endDate: "2024-03-17",
          time: "9:00 AM - 5:00 PM",
          location: "University of the Philippines Diliman",
          attendees: 450,
          maxAttendees: 600,
          status: "Published",
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
          status: "Published",
          description:
            "Hands-on workshop focusing on advanced organic synthesis techniques and laboratory best practices.",
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
          status: "Published",
          description:
            "Test your chemistry knowledge in this exciting competition with prizes and recognition for winners.",
          registrationFee: "₱500",
          organizer: "PACSMIN South",
          category: "Competition",
          image: "/placeholder.svg?height=200&width=400&text=Quiz+Bowl",
        },
      ],

      // Initial Stories Data
      stories: [
        {
          id: 1,
          title: "Revolutionary Green Chemistry Breakthrough: PACSMIN Students Develop Eco-Friendly Catalyst",
          excerpt:
            "A groundbreaking discovery by PACSMIN researchers has led to the development of a new biodegradable catalyst that could transform industrial chemical processes.",
          author: "Dr. Maria Santos",
          date: "2024-01-15",
          category: "Research",
          status: "Published",
          views: "2.1k",
          likes: "156",
          comments: "23",
          readTime: "5 min read",
          isFeatured: true,
          image: "/placeholder.svg?height=400&width=600&text=Green+Chemistry",
        },
        {
          id: 2,
          title: "PACSMIN's Annual Research Summit Highlights Student Innovations",
          excerpt:
            "This year's summit showcased incredible student-led research projects, pushing the boundaries of chemical science and technology.",
          author: "Prof. David Lee",
          date: "2024-01-10",
          category: "Event",
          status: "Published",
          views: "1.8k",
          likes: "120",
          comments: "18",
          readTime: "7 min read",
          isFeatured: true,
          image: "/placeholder.svg?height=400&width=600&text=Research+Summit",
        },
        {
          id: 3,
          title: "PACSMIN Wins National Chemistry Competition 2024",
          excerpt:
            "Our team secured first place in the prestigious National Chemistry Olympiad, showcasing exceptional talent and dedication.",
          author: "John Dela Cruz",
          date: "2024-01-12",
          category: "Achievement",
          status: "Published",
          views: "1.5k",
          likes: "89",
          readTime: "3 min read",
          isFeatured: false,
          image: "/placeholder.svg?height=250&width=400&text=Chemistry+Competition",
        },
        {
          id: 4,
          title: "New Laboratory Facilities Open at Partner Universities",
          excerpt:
            "State-of-the-art chemistry labs equipped with cutting-edge technology are now available to PACSMIN members.",
          author: "Sarah Kim",
          date: "2024-01-08",
          category: "News",
          status: "Published",
          views: "1.2k",
          likes: "67",
          readTime: "4 min read",
          isFeatured: false,
          image: "/placeholder.svg?height=250&width=400&text=Laboratory+Facilities",
        },
      ],

      // Initial Users Data
      users: [
        {
          id: 1,
          name: "Maria Santos",
          email: "maria.santos@email.com",
          phone: "+63 912 345 6789",
          university: "University of the Philippines",
          role: "Student",
          status: "Active",
          joinDate: "2024-01-15",
          lastLogin: "2024-01-20",
        },
        {
          id: 2,
          name: "John Dela Cruz",
          email: "john.delacruz@email.com",
          phone: "+63 923 456 7890",
          university: "Ateneo de Manila University",
          role: "Admin",
          status: "Active",
          joinDate: "2023-08-10",
          lastLogin: "2024-01-20",
        },
        {
          id: 3,
          name: "Sarah Kim",
          email: "sarah.kim@email.com",
          phone: "+63 934 567 8901",
          university: "De La Salle University",
          role: "Student",
          status: "Active",
          joinDate: "2023-12-05",
          lastLogin: "2024-01-18",
        },
      ],

      // Event Actions
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: Date.now() }],
        })),

      updateEvent: (id, updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)),
        })),

      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),

      getPublishedEvents: () => get().events.filter((event) => event.status === "Published"),

      // Story Actions
      addStory: (story) =>
        set((state) => ({
          stories: [...state.stories, { ...story, id: Date.now() }],
        })),

      updateStory: (id, updatedStory) =>
        set((state) => ({
          stories: state.stories.map((story) => (story.id === id ? { ...story, ...updatedStory } : story)),
        })),

      deleteStory: (id) =>
        set((state) => ({
          stories: state.stories.filter((story) => story.id !== id),
        })),

      getFeaturedStories: () => get().stories.filter((story) => story.isFeatured && story.status === "Published"),

      getMoreStories: () => get().stories.filter((story) => !story.isFeatured && story.status === "Published"),

      // User Actions
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, { ...user, id: Date.now() }],
        })),

      updateUser: (id, updatedUser) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
    }),
    {
      name: "pacsmin-store",
    },
  ),
)
