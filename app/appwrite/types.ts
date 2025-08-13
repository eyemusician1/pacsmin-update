export interface User {
  $id: string
  accountId?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  university?: string
  imageUrl?: string | null
  role?: "user" | "admin" // Add role field
  $createdAt: string
  $updatedAt: string
}

export interface Event {
  $id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl?: string
  registrationRequired: boolean
  maxAttendees?: number
  currentAttendees: number
  $createdAt: string
  $updatedAt: string
}

export interface StoreItem {
  $id: string
  $createdAt: string
  $updatedAt: string
  name: string
  description?: string
  price: number
  payment_link?: string
  category?: string
  stock?: number
  isActive?: boolean
  imageUrl?: string
}
