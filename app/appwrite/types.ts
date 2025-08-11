export interface User {
  $id: string
  accountId?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  university?: string
  imageUrl?: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  $collectionId: string
  $databaseId: string
}

export interface Event {
  $id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl?: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  $collectionId: string
  $databaseId: string
}

export interface StoreItem {
  $id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  category: string
  inStock: boolean
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  $collectionId: string
  $databaseId: string
}
