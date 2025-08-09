"use client"

import { FlaskRoundIcon as Flask } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <Flask className="h-16 w-16 text-navy-600 mx-auto animate-bounce" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse" />
        </div>

        <h2 className="text-2xl font-bold text-navy-800 mb-4">PACSMIN</h2>
        <p className="text-navy-600 mb-6">Loading chemistry magic...</p>

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-navy-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-navy-600 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  )
}
