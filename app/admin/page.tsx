"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, TrendingUp, Eye, UserPlus, CalendarPlus, MessageSquare } from "lucide-react"
import { useAppStore } from "@/lib/store"

export default function AdminDashboard() {
  const { events, stories, users } = useAppStore()

  const publishedEvents = events.filter((event) => event.status === "Published")
  const publishedStories = stories.filter((story) => story.status === "Published")
  const activeUsers = users.filter((user) => user.status === "Active")

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: `${activeUsers.length} active users`,
    },
    {
      title: "Active Events",
      value: publishedEvents.length.toString(),
      change: "+3",
      changeType: "positive",
      icon: Calendar,
      description: `${events.length - publishedEvents.length} drafts`,
    },
    {
      title: "Published Stories",
      value: publishedStories.length.toString(),
      change: "+8",
      changeType: "positive",
      icon: FileText,
      description: `${stories.length - publishedStories.length} drafts`,
    },
    {
      title: "Page Views",
      value: "45.2K",
      change: "+18%",
      changeType: "positive",
      icon: Eye,
      description: "This month",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user",
      message: "New user registration: Maria Santos",
      time: "2 minutes ago",
      icon: UserPlus,
    },
    {
      id: 2,
      type: "event",
      message: "Event updated: Chemistry Symposium 2024",
      time: "15 minutes ago",
      icon: CalendarPlus,
    },
    {
      id: 3,
      type: "content",
      message: "New story published: Green Chemistry Breakthrough",
      time: "1 hour ago",
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "user",
      message: "User profile updated: John Dela Cruz",
      time: "2 hours ago",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome back! Here's what's happening with PACSMIN.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <p
                      className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change}
                    </p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-navy-100 to-blue-100 rounded-2xl">
                  <stat.icon className="h-8 w-8 text-navy-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                    <activity.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-6 text-left border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-navy-50 hover:to-blue-50 hover:border-navy-200 transition-all duration-200 group">
                <Users className="h-10 w-10 text-navy-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-gray-900 mb-1">Add User</p>
                <p className="text-sm text-gray-500">Create new user account</p>
              </button>
              <button className="p-6 text-left border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-navy-50 hover:to-blue-50 hover:border-navy-200 transition-all duration-200 group">
                <Calendar className="h-10 w-10 text-navy-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-gray-900 mb-1">New Event</p>
                <p className="text-sm text-gray-500">Schedule an event</p>
              </button>
              <button className="p-6 text-left border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-navy-50 hover:to-blue-50 hover:border-navy-200 transition-all duration-200 group">
                <FileText className="h-10 w-10 text-navy-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-gray-900 mb-1">Write Story</p>
                <p className="text-sm text-gray-500">Publish new content</p>
              </button>
              <button className="p-6 text-left border border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-navy-50 hover:to-blue-50 hover:border-navy-200 transition-all duration-200 group">
                <TrendingUp className="h-10 w-10 text-navy-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-gray-900 mb-1">Analytics</p>
                <p className="text-sm text-gray-500">View detailed reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
