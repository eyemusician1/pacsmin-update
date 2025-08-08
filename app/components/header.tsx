"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, FlaskRoundIcon as Flask } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-4">
            <div className="relative">
              {/* This is where the Flask icon is */}
              <img src="/pacsmin.png" alt="PACSMIN Logo" className="h-8 w-8" /> 
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg sm:text-xl font-bold text-navy-800">PACSMIN</span>
              <span className="text-[0.6rem] sm:text-xs text-navy-600 mt-0">Philippine Association of Chemistry Students</span>
              <span className="text-[0.6rem] sm:text-xs text-navy-600">Mindanao Chapter</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-navy-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/events" className="text-navy-700 hover:text-blue-600 transition-colors font-medium">
              Events
            </Link>
            <Link href="/store" className="text-navy-700 hover:text-blue-600 transition-colors font-medium">
              Store
            </Link>
            <Button className="bg-navy-600 hover:bg-navy-700 text-white">
              Join PACSMIN
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
            <nav className="px-4 py-4 space-y-4">
              <Link href="/" className="block text-navy-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/events" className="block text-navy-700 hover:text-blue-600 transition-colors font-medium">
                Events
              </Link>
              <Link href="/store" className="block text-navy-700 hover:text-blue-600 transition-colors font-medium">
                Store
              </Link>
              <Button className="w-full bg-navy-600 hover:bg-navy-700 text-white">
                Join PACSMIN
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
