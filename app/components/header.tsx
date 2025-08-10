"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutUser } from "../appwrite/auth"
import { useRouter } from "next/navigation"
import { useUser } from "../context/userContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, setUser, loading } = useUser()
  const router = useRouter()

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser()
      setUser(null)
      setIsUserMenuOpen(false)
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }, [setUser, router])

  const getUserInitials = useCallback((firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }, [])

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 sm:space-x-4" onClick={closeMenus}>
            <div className="relative">
              <img src="/logo.png" alt="PACSMIN Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-navy-800">PACSMIN</span>
              <span className="text-[0.5rem] sm:text-[0.6rem] lg:text-xs text-navy-600 mt-0 leading-tight">
                Philippine Association of Chemistry Students
              </span>
              <span className="text-[0.5rem] sm:text-[0.6rem] lg:text-xs text-navy-600 leading-tight">
                Mindanao Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-navy-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/events" className="text-navy-700 hover:text-blue-600 transition-colors font-medium">
              Events
            </Link>
            <Link href="/store" className="text-navy-700 hover:text-blue-600 transition-colors font-medium">
              Store
            </Link>

            {/* User Authentication Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-navy-600 text-white px-3 py-2 rounded-full hover:bg-navy-700 transition-colors"
                >
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl || "/placeholder.svg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {getUserInitials(user.firstName, user.lastName)}
                    </div>
                  )}
                  <span className="font-medium">{user.firstName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.university && <p className="text-xs text-gray-500 mt-1">{user.university}</p>}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={closeMenus}
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={closeMenus}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signup">
                <Button className="bg-navy-600 hover:bg-navy-700 text-white">Join PACSMIN</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
            <nav className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-navy-700 hover:text-blue-600 transition-colors font-medium py-2 touch-manipulation"
                onClick={closeMenus}
              >
                Home
              </Link>
              <Link
                href="/events"
                className="block text-navy-700 hover:text-blue-600 transition-colors font-medium py-2 touch-manipulation"
                onClick={closeMenus}
              >
                Events
              </Link>
              <Link
                href="/store"
                className="block text-navy-700 hover:text-blue-600 transition-colors font-medium py-2 touch-manipulation"
                onClick={closeMenus}
              >
                Store
              </Link>

              {/* Mobile User Section */}
              {user ? (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-3">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl || "/placeholder.svg"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {getUserInitials(user.firstName, user.lastName)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="block text-navy-700 hover:text-blue-600 transition-colors font-medium py-2 touch-manipulation"
                    onClick={closeMenus}
                  >
                    Profile Settings
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block text-navy-700 hover:text-blue-600 transition-colors font-medium py-2 touch-manipulation"
                    onClick={closeMenus}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left text-red-600 hover:text-red-700 transition-colors font-medium py-2 touch-manipulation"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/signup" onClick={closeMenus}>
                  <Button className="w-full bg-navy-600 hover:bg-navy-700 text-white touch-manipulation">
                    Join PACSMIN
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
