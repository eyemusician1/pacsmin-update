"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  TrendingUp,
  Calendar,
  FileText,
  Activity,
  Plus,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Clock,
  UserPlus,
} from "lucide-react"
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
  }, [])

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
    <div className="space-y-6">
      {/* Add debug component at the top - REMOVE THIS AFTER DEBUGGING */}
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Dashboard</h1>
          <p className="text-navy-600 mt-1">Welcome to your PACSMIN admin panel</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Users</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalUsers}</p>
              </div>
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{stats.growthPercentage}%</span>
              <span className="text-blue-700 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">New This Week</p>
                <p className="text-3xl font-bold text-green-900">{stats.newUsersThisWeek}</p>
              </div>
              <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-700">Active growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">This Month</p>
                <p className="text-3xl font-bold text-purple-900">{stats.newUsersThisMonth}</p>
              </div>
              <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="h-4 w-4 text-purple-600 mr-1" />
              <span className="text-purple-700">Monthly target</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">System Health</p>
                <p className="text-3xl font-bold text-orange-900">98.9%</p>
              </div>
              <div className="h-12 w-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-orange-700">All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Users */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-navy-800">Recent Users</CardTitle>
            <CardDescription>Latest user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUsers.map((user) => (
                <div
                  key={user.$id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.imageUrl || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.firstName?.[0] || ""}
                      {user.lastName?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800 truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-navy-600 truncate">{user.email}</p>
                    {user.university && <p className="text-xs text-blue-600 truncate">{user.university}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-navy-500">{new Date(user.$createdAt).toLocaleDateString()}</p>
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy-800">Recent Activity</CardTitle>
            <CardDescription>System and user activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <activity.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy-800">{activity.message}</p>
                    <p className="text-xs text-navy-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-navy-800">System Status</CardTitle>
          <CardDescription>Current operational status of all services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {systemStatus.map((service) => (
              <div key={service.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-navy-800">{service.name}</h4>
                  <Badge
                    variant={service.status === "operational" ? "default" : "secondary"}
                    className={
                      service.status === "operational" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
                <p className="text-sm text-navy-600">Uptime: {service.uptime}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-navy-800">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span>Create Event</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <FileText className="h-6 w-6" />
              <span>Manage Store</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}