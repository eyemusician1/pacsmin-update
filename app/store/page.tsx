"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "../components/header"
import MoleculeBackground from "../components/molecule-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from 'lucide-react'

export default function StorePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".product-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const products = [
    {
      name: "PACSMIN Official T-Shirt",
      price: "₱599",
      image: "/store/tshirt.webp",
      description: "Premium quality cotton t-shirt with PACSMIN logo and chemistry-inspired design."
    },
    {
      name: "Laboratory Notebook Set",
      price: "₱299",
      image: "/placeholder.svg?height=300&width=300",
      description: "Professional lab notebooks with grid pages, perfect for chemistry experiments and notes."
    },
    {
      name: "Chemistry Reference Guide",
      price: "₱899",
      image: "/placeholder.svg?height=300&width=300",
      description: "Comprehensive reference guide covering all major chemistry topics and formulas."
    },
    {
      name: "PACSMIN Hoodie",
      price: "₱1,299",
      image: "/placeholder.svg?height=300&width=300",
      description: "Comfortable hoodie with embroidered PACSMIN logo, perfect for lab sessions."
    },
    {
      name: "Periodic Table Poster",
      price: "₱199",
      image: "/placeholder.svg?height=300&width=300",
      description: "High-quality periodic table poster with detailed element information."
    },
    {
      name: "Chemistry Mug Set",
      price: "₱449",
      image: "/placeholder.svg?height=300&width=300",
      description: "Set of 2 ceramic mugs with beaker design and chemistry formulas."
    }
  ]

  return (
    <div ref={pageRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MoleculeBackground />
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6">
              PACSMIN Store
            </h1>
            <p className="text-lg sm:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
              Get exclusive PACSMIN merchandise, educational materials, and chemistry essentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="product-card bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl text-navy-800">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center">
                    </div>
                  </div>
                  <p className="text-navy-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-navy-800">
                      {product.price}
                    </span>
                    <Button className="bg-navy-600 hover:bg-navy-700 text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
