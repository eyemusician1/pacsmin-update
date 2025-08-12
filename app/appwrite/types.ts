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
  name: string
  description: string
  price: number
  imageUrl?: string
  category: string
  inStock: boolean
  quantity: number
  $createdAt: string
  $updatedAt: string
}
