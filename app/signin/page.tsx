"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Chrome } from "lucide-react"
import MoleculeBackground from "../components/molecule-background"
import { loginWithGoogle, loginWithEmailPassword } from "../appwrite/auth"
import { useRouter } from "next/navigation"
import { useUser } from "../context/userContext" // Adjusted import path

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { refreshUser } = useUser()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await loginWithEmailPassword(formData.email, formData.password)
      
      if (result.success) {
        await refreshUser() // Refresh user context
        alert("Successfully signed in!")
        router.push("/") // Redirect to home page
      } else {
        alert(`Sign in failed: ${result.error}`)
      }
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error)
      alert(`An unexpected error occurred: ${error.message || "Please try again."}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
    } catch (error: any) {
      console.error("Google login error:", error)
      alert(`Google login failed: ${error.message || "Please try again."}`)
    }
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
            <p className="text-sm sm:text-base text-navy-600 leading-relaxed px-2">Sign in to your PACSMIN account</p>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
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
                    style={{ minHeight: '24px', minWidth: '24px' }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white py-3 h-12 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95"
                style={{ minHeight: '48px', touchAction: 'manipulation' }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
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
              style={{ minHeight: '48px', touchAction: 'manipulation' }}
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