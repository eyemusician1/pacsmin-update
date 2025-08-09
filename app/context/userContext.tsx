"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getCurrentUser } from '../appwrite/auth'

// Match the DatabaseUser interface from auth.ts
interface User {
  firstName: string
  lastName: string
  email: string
  imageUrl?: string | null
  university?: string
  phone?: string
  accountId: string
  $id: string
  $createdAt: string
  $updatedAt: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
  refreshUser: () => Promise<void>
  error: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      console.log('Refreshing user...') // Debug log
      
      const currentUser = await getCurrentUser()
      console.log('Retrieved user:', currentUser) // Debug log
      
      if (currentUser) {
        // The currentUser is already a database document, so we need to map it properly
        const mappedUser: User = {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl || null,
          university: currentUser.university || '',
          phone: currentUser.phone || '',
          accountId: currentUser.accountId,
          $id: currentUser.$id,
          $createdAt: currentUser.$createdAt,
          $updatedAt: currentUser.$updatedAt
        }
        
        // Validate that the user has the required properties
        if (mappedUser.firstName && mappedUser.lastName && mappedUser.email && mappedUser.accountId) {
          setUser(mappedUser)
        } else {
          console.error('User missing required properties:', currentUser)
          setError('User data is incomplete')
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error: unknown) {
      console.error('Error refreshing user:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user'
      setError(errorMessage)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const value: UserContextType = {
    user,
    setUser,
    loading,
    refreshUser,
    error
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}