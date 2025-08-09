import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PACSMIN - Philippine Association of Chemistry Students",
  description:
    "Empowering the next generation of chemists through innovation, collaboration, and scientific excellence across the Philippines.",
  keywords: ["chemistry", "students", "Philippines", "PACSMIN", "education", "science"],
  authors: [{ name: "PACSMIN" }],
  openGraph: {
    title: "PACSMIN - Philippine Association of Chemistry Students",
    description: "Join the largest chemistry student organization in the Philippines",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
