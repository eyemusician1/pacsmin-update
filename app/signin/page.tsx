"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Chrome } from "lucide-react"
import MoleculeBackground from "../components/molecule-background"
import { loginWithGoogle, loginWithEmailPassword } from "../appwrite/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "../context/userContext"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { user, refreshUser } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"

  // Auto-redirect if user is already logged in and is admin trying to access admin
  useEffect(() => {
    if (user && !isLoading) {
      console.log("👤 User already logged in:", { 
        id: user.$id, 
        role: user.role, 
        redirectTo 
      })
      
      // Use a small timeout to ensure the redirect happens
      const redirectTimer = setTimeout(() => {
        // If user is already logged in and trying to access admin routes
        if (redirectTo.includes('/admin') && user.role === 'admin') {
          console.log("🚀 Admin user already logged in, redirecting to admin")
          router.push('/admin')
          return
        }
        
        // If regular user is already logged in
        if (!redirectTo.includes('/admin')) {
          console.log("🏠 Regular user already logged in, redirecting")
          router.push(redirectTo)
          return
        }
        
        // If non-admin user trying to access admin, redirect to home
        if (redirectTo.includes('/admin') && user.role !== 'admin') {
          console.log("🚫 Non-admin user trying to access admin, redirecting to home")
          router.push('/')
          return
        }
      }, 100) // Small delay to ensure proper redirect
      
      return () => clearTimeout(redirectTimer)
    }
  }, [user, redirectTo, router, isLoading])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("🔑 Attempting login with:", { 
        email: formData.email, 
        redirectTo,
        isAdminRoute: redirectTo.includes('/admin')
      })
      
      const result = await loginWithEmailPassword(formData.email, formData.password)

      if (result.success) {
        console.log("✅ Login successful, refreshing user context...")
        
        // Refresh user context to get updated user data with role
        await refreshUser()
        
        // Wait a bit longer for admin routes to ensure role is properly loaded
        const delay = redirectTo.includes('/admin') ? 1500 : 500
        
        console.log(`⏳ Waiting ${delay}ms before checking user role and redirecting...`)
        
        setTimeout(() => {
          console.log("🚀 Delay completed, redirecting to:", redirectTo)
          
          // For admin routes, the AdminGuard will handle the role verification
          // We just redirect and let the guard do its job
          router.push(redirectTo)
        }, delay)
        
      } else {
        console.error("❌ Login failed:", result.error)
        setError(result.error || "Sign in failed. Please try again.")
        setIsLoading(false)
      }
    } catch (error: any) {
      console.error("💥 Unexpected error during sign in:", error)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    try {
      await loginWithGoogle()
    } catch (error: any) {
      console.error("Google login error:", error)
      setError("Google login failed. Please try again.")
    }
  }

  // Show loading state if user is being auto-redirected (but only for a short time)
  if (user && redirectTo.includes('/admin') && user.role === 'admin') {
    // Add a failsafe - if stuck here for more than 3 seconds, force redirect
    setTimeout(() => {
      console.log("⚠️ Failsafe redirect triggered")
      window.location.href = '/admin'
    }, 3000)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to admin dashboard...</p>
          <p className="mt-2 text-xs text-gray-500">If this takes too long, <a href="/admin" className="text-blue-600 underline">click here</a></p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <MoleculeBackground />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center space-x-2 text-navy-600 hover:text-blue-600 transition-colors z-20"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <Card className="bg-white/90 backdrop-blur-md border-blue-100 shadow-2xl">
          <CardHeader className="text-center pb-6 px-4 sm:px-6">
            <div className="flex items-center space-x-3 mb-4 justify-between">
              <div className="relative"></div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2">Welcome Back</CardTitle>
            <p className="text-sm sm:text-base text-navy-600 leading-relaxed px-2">
              Sign in to your PACSMIN account
              {redirectTo.includes('/admin') && (
                <span className="block mt-1 text-xs text-blue-600 font-medium">
                  🔐 Admin access required
                </span>
              )}
            </p>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Debug info for development */}
            {process.env.NODE_ENV === "development" && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg text-xs">
                <strong>Debug:</strong> Redirect to: {redirectTo} | Current user role: {user?.role || 'none'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-navy-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-navy-400 pointer-events-none" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="juan@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-navy-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-navy-400 pointer-events-none" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-navy-400 hover:text-navy-600 touch-manipulation"
                    style={{ minHeight: "24px", minWidth: "24px" }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white py-3 h-12 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95"
                style={{ minHeight: "48px", touchAction: "manipulation" }}
              >
                {isLoading ? (
                  redirectTo.includes('/admin') ? "Verifying Admin Access..." : "Signing In..."
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-navy-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-navy-500">or</span>
              </div>
            </div>

            {/* Google Sign-in Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base sm:text-lg font-semibold rounded-xl shadow-md border-navy-200 hover:bg-navy-50 transition-all duration-300 flex items-center justify-center gap-2 bg-transparent touch-manipulation active:scale-95"
              onClick={handleGoogleLogin}
              style={{ minHeight: "48px", touchAction: "manipulation" }}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5" />
              Sign in with Google
            </Button>

            <div className="text-center px-2">
              <p className="text-sm sm:text-base text-navy-600">
                Don't have an account?
                <Link href="/signup" className="ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="text-center">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}