"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FlaskRoundIcon as Flask, Home, ArrowLeft } from "lucide-react"
import MoleculeBackground from "./components/molecule-background"

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <MoleculeBackground />

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        <Card className="bg-white/90 backdrop-blur-md border-blue-100 shadow-2xl">
          <CardContent className="p-8 sm:p-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <Flask className="h-12 w-12 text-navy-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-navy-800">PACSMIN</span>
            </div>

            <div className="text-6xl font-bold text-navy-800 mb-4">404</div>
            <h1 className="text-2xl font-bold text-navy-800 mb-4">Page Not Found</h1>
            <p className="text-navy-600 mb-8 leading-relaxed">
              Oops! The page you're looking for seems to have disappeared into the chemistry lab. Let's get you back to
              where the real reactions happen!
            </p>

            <div className="space-y-4">
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full border-navy-600 text-navy-600 hover:bg-navy-50 py-3 rounded-xl"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
