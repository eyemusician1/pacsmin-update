"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, Calendar, FileText, Settings, LogOut, Menu, X, Shield, BarChart3, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Suspense } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-gradient-to-r from-navy-600 to-blue-600">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-white" />
              <div>
                <span className="text-xl font-bold text-white">PACSMIN</span>
                <p className="text-xs text-blue-100">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-blue-100 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-navy-100 to-blue-100 text-navy-700 shadow-md border-l-4 border-navy-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-72">
          {/* Top header */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between h-20 px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-12 w-80 bg-gray-50 border-gray-200 focus:bg-white focus:border-navy-300 focus:ring-navy-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-xl">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    3
                  </span>
                </Button>

                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                  <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-navy-100 text-navy-700 font-semibold">AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@pacsmin.org</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
