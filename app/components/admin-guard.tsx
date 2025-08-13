"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/app/context/userContext"

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading, error } = useUser()
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // Don't do anything while loading
    if (loading) {
      console.log("⏳ AdminGuard - Loading user data...")
      return
    }

    // Mark that we've checked auth
    if (!authChecked) {
      setAuthChecked(true)
    }

    console.log("🛡️ AdminGuard - Auth check:", {
      user: user ? { id: user.$id, role: user.role, email: user.email } : null,
      loading,
      error,
      authChecked,
    })

    // If there's an error or no user, redirect to signin
    if (error || !user) {
      console.log("❌ AdminGuard - No user or error, redirecting to signin")
      router.replace("/signin?redirect=/admin")
      return
    }

    // Check if user has admin role
    if (user.role !== "admin") {
      console.log(`🚫 AdminGuard - User role is '${user.role}', not admin. Redirecting to home.`)
      router.replace("/")
      return
    }

    console.log("✅ AdminGuard - User is admin, access granted")
  }, [user, loading, error, router, authChecked])

  // Show loading state while checking
  if (loading || !authChecked) {
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
          <p className="text-red-600 mb-4">Authentication error: {error}</p>
          <button
            onClick={() => router.replace("/signin")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    )
  }

  // If no user, show access denied
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to access the admin panel.</p>
          <button
            onClick={() => router.replace("/signin?redirect=/admin")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  // If user is not admin, show access denied
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Access denied. You need admin privileges.</p>
          <p className="text-sm text-gray-500 mb-4">Current role: {user.role}</p>
          <button
            onClick={() => router.replace("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  // User is authenticated and is admin, render the protected content
  return <>{children}</>
}
