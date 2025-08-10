"use client"

import type React from "react"

import { UserProvider } from "./context/userContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}
