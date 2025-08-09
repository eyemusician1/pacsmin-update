"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FlaskRoundIcon as Flask, Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import MoleculeBackground from "../molecule-background"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Sign in form submitted:", formData)
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
              <div className="relative">
              </div>
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
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
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
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
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
                    className="absolute right-3 top-3 text-navy-400 hover:text-navy-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white py-3 h-12 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-navy-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-navy-500">or</span>
              </div>
            </div>

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
