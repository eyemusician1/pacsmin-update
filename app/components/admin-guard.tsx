"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/app/context/userContext"

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading, error } = useUser()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    console.log("🛡️ AdminGuard - Current state:", { 
      user, 
      loading, 
      error, 
      userRole: user?.role 
    })

    // Wait for user context to finish loading
    if (loading) {
      console.log("⏳ AdminGuard - Still loading user...")
      return
    }

    // If there's an error or no user, redirect to signin
    if (error || !user) {
      console.log("❌ AdminGuard - No user or error, redirecting to signin")
      router.push("/signin")
      return
    }

    // Check if user has admin role
    if (user.role !== "admin") {
      console.log(`🚫 AdminGuard - User role is '${user.role}', not admin. Redirecting to home.`)
      router.push("/") // Redirect non-admin users to home page
      return
    }

    console.log("✅ AdminGuard - User is admin, allowing access")
    setIsChecking(false)
  }, [user, loading, error, router])

  // Show loading state while checking
  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Authentication error: {error}</p>
        </div>
      </div>
    )
  }

  // If user is not admin, don't render children (redirect will handle this)
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Access denied. Redirecting...</p>
        </div>
      </div>
    )
  }

  // User is authenticated and is admin, render the protected content
  return <>{children}</>
}