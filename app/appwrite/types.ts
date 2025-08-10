export interface DatabaseUser {
  $id: string
  $createdAt: string
  $updatedAt: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  university?: string
  role?: string
  imageUrl?: string
  accountId: string
}

export interface CreateUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  university?: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface CreateUserData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  university?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface Event {
  $id: string
  $createdAt: string
  $updatedAt: string
  title: string
  description: string
  date: string
  endDate?: string
  time: string
  location: string
  organizer: string
  category: string
  registrationFee?: string
  maxAttendees: number
  attendees: number
  status: "Draft" | "Published" | "Cancelled"
  image?: string
}
