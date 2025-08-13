"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, FileText, CheckCircle, AlertCircle, UserPlus } from "lucide-react"
import { getAllUsers } from "../appwrite/auth"
import type { User } from "../appwrite/types"

interface DashboardStats {
  totalUsers: number
  newUsersThisWeek: number
  newUsersThisMonth: number
  growthPercentage: number
  recentUsers: User[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    newUsersThisWeek: 0,
    newUsersThisMonth: 0,
    growthPercentage: 0,
    recentUsers: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { users, total } = await getAllUsers(100, 0)

        // Type assertion to ensure users is User[]
        const typedUsers = users as User[]

        const now = new Date()
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

        const newUsersThisWeek = typedUsers.filter((user: User) => new Date(user.$createdAt) > oneWeekAgo).length

        const newUsersThisMonth = typedUsers.filter((user: User) => new Date(user.$createdAt) > oneMonthAgo).length

        const newUsersLastMonth = typedUsers.filter((user: User) => {
          const createdAt = new Date(user.$createdAt)
          return createdAt > twoMonthsAgo && createdAt <= oneMonthAgo
        }).length

        const growthPercentage =
          newUsersLastMonth > 0
            ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100
            : newUsersThisMonth > 0
              ? 100
              : 0

        const recentUsers = typedUsers.slice(0, 5)

        setStats({
          totalUsers: total,
          newUsersThisWeek,
          newUsersThisMonth,
          growthPercentage: Math.round(growthPercentage),
          recentUsers,
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
    // Redirect to users page as default
    router.replace("/admin/users")
  }, [router])

  const activities = [
    { id: 1, type: "user", message: "New user registration", time: "2 minutes ago", icon: UserPlus },
    { id: 2, type: "system", message: "Database backup completed", time: "1 hour ago", icon: CheckCircle },
    { id: 3, type: "event", message: "New event created", time: "3 hours ago", icon: Calendar },
    { id: 4, type: "content", message: "Content updated", time: "5 hours ago", icon: FileText },
    { id: 5, type: "system", message: "System maintenance scheduled", time: "1 day ago", icon: AlertCircle },
  ]

  const systemStatus = [
    { name: "Database", status: "operational", uptime: "99.9%" },
    { name: "Authentication", status: "operational", uptime: "99.8%" },
    { name: "File Storage", status: "operational", uptime: "99.7%" },
    { name: "Email Service", status: "maintenance", uptime: "98.5%" },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Redirecting...</p>
      </div>
    </div>
  )
}
