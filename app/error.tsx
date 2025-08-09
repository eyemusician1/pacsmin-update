"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FlaskRoundIcon as Flask, RefreshCw, Home, AlertTriangle } from "lucide-react"
import MoleculeBackground from "./components/molecule-background"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <MoleculeBackground />

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        <Card className="bg-white/90 backdrop-blur-md border-red-100 shadow-2xl">
          <CardContent className="p-8 sm:p-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <Flask className="h-12 w-12 text-navy-600" />
                <AlertTriangle className="absolute -top-1 -right-1 h-6 w-6 text-red-500" />
              </div>
              <span className="text-2xl font-bold text-navy-800">PACSMIN</span>
            </div>

            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
            <p className="text-navy-600 mb-8 leading-relaxed">
              It looks like we had an unexpected reaction in our chemistry lab. Don't worry, our team is working to fix
              this issue.
            </p>

            <div className="space-y-4">
              <Button
                onClick={reset}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full border-navy-600 text-navy-600 hover:bg-navy-50 py-3 rounded-xl bg-transparent"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-navy-500 hover:text-navy-700">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-32">{error.message}</pre>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
