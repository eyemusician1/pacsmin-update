"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FlaskRoundIcon as Flask, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import MoleculeBackground from "../components/molecule-background"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <MoleculeBackground />

        <div className="relative z-10 w-full max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-md border-green-100 shadow-2xl">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-navy-800 mb-4">Check Your Email</h2>
              <p className="text-navy-600 mb-6 leading-relaxed">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
                instructions to reset your password.
              </p>
              <div className="space-y-4">
                <Link href="/signin">
                  <Button className="w-full bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white">
                    Back to Sign In
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full border-navy-600 text-navy-600 hover:bg-navy-50"
                >
                  Try Different Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <MoleculeBackground />

      {/* Back to Sign In Button */}
      <Link
        href="/signin"
        className="absolute top-8 left-8 flex items-center space-x-2 text-navy-600 hover:text-blue-600 transition-colors z-20"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back to Sign In</span>
      </Link>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <Card className="bg-white/90 backdrop-blur-md border-blue-100 shadow-2xl">
          <CardHeader className="text-center pb-6 px-4 sm:px-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <Flask className="h-10 w-10 text-navy-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-navy-800">PACSMIN</span>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2">Forgot Password?</CardTitle>
            <p className="text-sm sm:text-base text-navy-600 leading-relaxed px-2">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 px-4 sm:px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-navy-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="juan@example.com"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white py-3 h-12 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-navy-600">
                Remember your password?{" "}
                <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
