"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminGuard from "@/app/components/admin-guard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Users, Calendar, Store, Menu, X, LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { logoutUser } from "@/app/appwrite/auth"
import { useUser } from "@/app/context/userContext"

const navigationItems = [
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Store", href: "/admin/store", icon: Store },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, refreshUser } = useUser()

  // Redirect /admin to /admin/users
  useEffect(() => {
    if (pathname === "/admin") {
      router.replace("/admin/users")
    }
  }, [pathname, router])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      await refreshUser()
      router.push("/signin")
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/signin")
    }
  }

  const currentPage = navigationItems.find((item) => pathname === item.href)

  return (
    <AdminGuard>
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center h-16 px-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div>
                  <img src="/logo.png" alt="PACSMIN Logo" className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">PACSMIN</span>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-400")} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-100">
              {user && (
                <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleMobileMenuClose} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={handleMobileMenuClose}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Mobile sidebar content */}
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <div className="flex items-center space-x-3">
                     <div>
                  <img src="/logo.png" alt="PACSMIN Logo" className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900">PACSMIN</span>
                      <p className="text-xs text-gray-500">Admin Panel</p>
                    </div>
                  </div>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleMobileMenuClose}
                        className={cn(
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                          isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        )}
                      >
                        <item.icon
                          className={cn("mr-4 flex-shrink-0 h-6 w-6", isActive ? "text-blue-500" : "text-gray-400")}
                        />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Mobile user profile */}
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                {user && (
                  <div className="flex-shrink-0 w-full group block">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm font-medium text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl mt-3"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* Mobile top navigation */}
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={handleMobileMenuToggle}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 px-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div>
                  <img src="/logo.png" alt="PACSMIN Logo" className="h-6 w-6" />
                </div>
                <span className="font-semibold text-gray-900">PACSMIN</span>
              </div>
              {currentPage && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <currentPage.icon className="h-4 w-4" />
                  <span>{currentPage.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop header */}
          <div className="hidden lg:block bg-white border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                {currentPage && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <currentPage.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold text-gray-900">{currentPage.name}</h1>
                      <p className="text-sm text-gray-500">Manage your {currentPage.name.toLowerCase()}</p>
                    </div>
                  </div>
                )}
              </div>
              {user && (
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span>Welcome back, {user.firstName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  )
}
