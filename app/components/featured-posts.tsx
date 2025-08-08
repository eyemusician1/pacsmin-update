"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight, Eye, Heart, MessageCircle } from 'lucide-react'

export default function FeaturedPosts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true) // For "More Stories" carousel

  // New state for featured carousel
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0)
  const [isFeaturedAutoPlaying, setIsFeaturedAutoPlaying] = useState(true)

  // Data for featured carousel posts
  const featuredCarouselPosts = [
    {
      id: 1,
      title: "Revolutionary Green Chemistry Breakthrough: PACSMIN Students Develop Eco-Friendly Catalyst",
      excerpt: "A groundbreaking discovery by PACSMIN researchers has led to the development of a new biodegradable catalyst that could transform industrial chemical processes. This innovation promises to reduce environmental impact while maintaining high efficiency in chemical reactions.",
      image: "/featured/catalyst.webp",
      author: "Dr. Maria Santos",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Research",
      views: "2.1k",
      likes: "156",
      comments: "23"
    },
    {
      id: 7,
      title: "PACSMIN's Annual Research Summit Highlights Student Innovations",
      excerpt: "This year's summit showcased incredible student-led research projects, pushing the boundaries of chemical science and technology.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Prof. David Lee",
      date: "January 5, 2025",
      readTime: "7 min read",
      category: "Event",
      views: "1.8k",
      likes: "120",
      comments: "18"
    },
    {
      id: 8,
      title: "New Scholarship Program for Aspiring Chemists Launched",
      excerpt: "PACSMIN, in partnership with leading chemical companies, announces a new scholarship initiative to support undergraduate chemistry students.",
      image: "/placeholder.svg?height=400&width=600",
      author: "PACSMIN Board",
      date: "January 10, 2025",
      readTime: "4 min read",
      category: "Opportunity",
      views: "2.5k",
      likes: "200",
      comments: "35"
    }
  ]

  // Data for "More Stories" carousel posts
  const carouselPosts = [
    {
      id: 2,
      title: "PACSMIN Wins National Chemistry Competition 2024",
      excerpt: "Our team secured first place in the prestigious National Chemistry Olympiad, showcasing exceptional talent and dedication.",
      image: "/placeholder.svg?height=250&width=400",
      author: "John Dela Cruz",
      date: "December 12, 2024",
      category: "Achievement",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "New Laboratory Facilities Open at Partner Universities",
      excerpt: "State-of-the-art chemistry labs equipped with cutting-edge technology are now available to PACSMIN members.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Sarah Kim",
      date: "December 10, 2024",
      category: "News",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "International Chemistry Conference 2025 Announced",
      excerpt: "PACSMIN will host the largest chemistry conference in Southeast Asia, featuring world-renowned speakers.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Prof. Alex Rivera",
      date: "December 8, 2024",
      category: "Event",
      readTime: "2 min read"
    },
    {
      id: 5,
      title: "Student Research Grant Program Launches",
      excerpt: "New funding opportunities available for undergraduate chemistry research projects across the Philippines.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Dr. Lisa Chen",
      date: "December 5, 2024",
      category: "Opportunity",
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "Alumni Spotlight: From PACSMIN to Global Success",
      excerpt: "Meet our alumni who are making waves in the international chemistry industry and research community.",
      image: "/placeholder.svg?height=250&width=400",
      author: "Mark Johnson",
      date: "December 3, 2024",
      category: "Alumni",
      readTime: "6 min read"
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselPosts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, carouselPosts.length])

  // New useEffect for Featured Carousel
  useEffect(() => {
    if (!isFeaturedAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentFeaturedSlide((prev) => (prev + 1) % featuredCarouselPosts.length)
    }, 6000) // Slightly longer auto-play for featured

    return () => clearInterval(interval)
  }, [isFeaturedAutoPlaying, featuredCarouselPosts.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselPosts.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselPosts.length) % carouselPosts.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  // New functions for featured carousel
  const nextFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) => (prev + 1) % featuredCarouselPosts.length)
    setIsFeaturedAutoPlaying(false)
  }

  const prevFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) => (prev - 1 + featuredCarouselPosts.length) % featuredCarouselPosts.length)
    setIsFeaturedAutoPlaying(false)
  }

  const goToFeaturedSlide = (index: number) => {
    setCurrentFeaturedSlide(index)
    setIsFeaturedAutoPlaying(false)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Research: "bg-blue-500",
      Achievement: "bg-yellow-500",
      News: "bg-green-500",
      Event: "bg-purple-500",
      Opportunity: "bg-orange-500",
      Alumni: "bg-pink-500"
    }
    return colors[category as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-sm fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6">
            Latest News & Updates
          </h2>
          <p className="text-lg sm:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest developments, achievements, and opportunities in the PACSMIN community.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Featured Post Carousel */}
          <div className="mb-16">
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-800">Featured Stories</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevFeaturedSlide}
                    className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextFeaturedSlide}
                    className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentFeaturedSlide * 100}%)` }}
                  onMouseEnter={() => setIsFeaturedAutoPlaying(false)}
                  onMouseLeave={() => setIsFeaturedAutoPlaying(true)}
                >
                  {featuredCarouselPosts.map((post) => (
                    <div key={post.id} className="w-full flex-shrink-0">
                      <Card className="bg-white/90 backdrop-blur-md border-blue-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                          <div className="relative overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(post.category)}`}>
                                {post.category}
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-4 flex space-x-4 text-white">
                              <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                                <Eye className="h-4 w-4" />
                                <span className="text-sm">{post.views}</span>
                              </div>
                              <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                                <Heart className="h-4 w-4" />
                                <span className="text-sm">{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-sm">{post.comments}</span>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center space-x-4 mb-4 text-navy-600">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">{post.author}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">{post.date}</span>
                              </div>
                              <span className="text-sm text-blue-600 font-medium">{post.readTime}</span>
                            </div>
                            
                            <h3 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-6 leading-tight group-hover:text-blue-700 transition-colors">
                              {post.title}
                            </h3>
                            
                            <p className="text-navy-600 text-lg leading-relaxed mb-8">
                              {post.excerpt}
                            </p>
                            
                            <Button className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group/btn self-start">
                              Read Full Article
                              <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center space-x-2 mt-12">
                  {featuredCarouselPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToFeaturedSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeaturedSlide
                          ? 'bg-navy-600 scale-125'
                          : 'bg-navy-200 hover:bg-navy-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* More Stories Carousel Section */}
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-800">More Stories</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevSlide}
                    className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextSlide}
                    className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {carouselPosts.map((post, index) => (
                    <div key={post.id} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Show 3 posts at a time on large screens, 2 on medium, 1 on small */}
                        {carouselPosts.slice(index, index + 3).map((slidePost) => (
                          <Card key={slidePost.id} className="bg-white/90 backdrop-blur-md border-blue-100 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                            <div className="relative">
                              <img 
                                src={slidePost.image || "/placeholder.svg"} 
                                alt={slidePost.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(slidePost.category)}`}>
                                  {slidePost.category}
                                </span>
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center space-x-3 mb-3 text-navy-600 text-sm">
                                <div className="flex items-center space-x-1">
                                  <User className="h-3 w-3" />
                                  <span>{slidePost.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{slidePost.date}</span>
                                </div>
                              </div>
                              
                              <h4 className="text-lg sm:text-xl font-bold text-navy-800 mb-3 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
                                {slidePost.title}
                              </h4>
                              
                              <p className="text-navy-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                {slidePost.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-blue-600 font-medium">{slidePost.readTime}</span>
                                <Button variant="ghost" size="sm" className="text-navy-600 hover:text-blue-600 p-0 h-auto font-medium">
                                  Read More
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {carouselPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-navy-600 scale-125' 
                        : 'bg-navy-200 hover:bg-navy-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
