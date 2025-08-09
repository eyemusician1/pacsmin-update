"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FlaskRoundIcon as Flask, Eye, EyeOff, Mail, Lock, User, Phone, School, ArrowLeft } from "lucide-react"
import MoleculeBackground from "../components/molecule-background"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    password: "",
    confirmPassword: "",
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
    console.log("Sign up form submitted:", formData)
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
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2">Join PACSMIN</CardTitle>
            <p className="text-sm sm:text-base text-navy-600 leading-relaxed px-2">
              Create your account to connect with chemistry students nationwide
            </p>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-navy-700">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Juan"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-navy-700">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Dela Cruz"
                    />
                  </div>
                </div>
              </div>

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
                <Label htmlFor="phone" className="text-sm font-medium text-navy-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university" className="text-sm font-medium text-navy-700">
                  University/School
                </Label>
                <div className="relative">
                  <School className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                  <Input
                    id="university"
                    name="university"
                    type="text"
                    required
                    value={formData.university}
                    onChange={handleInputChange}
                    className="pl-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Mindanao State University"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-navy-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-11 text-sm border-navy-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-navy-400 hover:text-navy-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white py-3 h-12 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Create Account
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
                Already have an account?
                <Link href="/signin" className="ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-6 sm:mt-8">
          <Card className="bg-blue-50/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-navy-800 mb-3 text-center">Why Join PACSMIN?</h3>
              <ul className="text-xs sm:text-sm text-navy-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                  <span>Connect with 5,000+ chemistry students nationwide</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                  <span>Access exclusive events, workshops, and competitions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                  <span>Get discounts on PACSMIN merchandise and materials</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                  <span>Participate in research collaborations and projects</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
