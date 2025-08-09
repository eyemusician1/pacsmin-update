"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight, Eye, Heart, MessageCircle } from "lucide-react"
import { useAppStore } from "@/lib/store"

export default function FeaturedPosts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { getFeaturedStories, getMoreStories } = useAppStore()

  const featuredStories = getFeaturedStories()
  const moreStories = getMoreStories()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0)
  const [isFeaturedAutoPlaying, setIsFeaturedAutoPlaying] = useState(true)

  // Auto-play for More Stories carousel
  useEffect(() => {
    if (!isAutoPlaying || moreStories.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % moreStories.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, moreStories.length])

  // Auto-play for Featured Stories carousel
  useEffect(() => {
    if (!isFeaturedAutoPlaying || featuredStories.length === 0) return

    const interval = setInterval(() => {
      setCurrentFeaturedSlide((prev) => (prev + 1) % featuredStories.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isFeaturedAutoPlaying, featuredStories.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % moreStories.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + moreStories.length) % moreStories.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) => (prev + 1) % featuredStories.length)
    setIsFeaturedAutoPlaying(false)
  }

  const prevFeaturedSlide = () => {
    setCurrentFeaturedSlide((prev) => (prev - 1 + featuredStories.length) % featuredStories.length)
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
      Alumni: "bg-pink-500",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500"
  }

  if (featuredStories.length === 0 && moreStories.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-sm fade-in"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6">Latest News & Updates</h2>
          <p className="text-lg sm:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Stay updated with the latest developments, achievements, and opportunities in the PACSMIN community.
          </p>
          <div className="py-16">
            <p className="text-xl text-gray-500 mb-4">No stories available at the moment.</p>
            <p className="text-gray-400">Check back soon for the latest updates!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-sm fade-in"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 mb-6">Latest News & Updates</h2>
          <p className="text-lg sm:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest developments, achievements, and opportunities in the PACSMIN community.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Featured Stories Carousel */}
          {featuredStories.length > 0 && (
            <div className="mb-16">
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy-800">Featured Stories</h3>
                  {featuredStories.length > 1 && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevFeaturedSlide}
                        className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200 bg-transparent"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextFeaturedSlide}
                        className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200 bg-transparent"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentFeaturedSlide * 100}%)` }}
                    onMouseEnter={() => setIsFeaturedAutoPlaying(false)}
                    onMouseLeave={() => setIsFeaturedAutoPlaying(true)}
                  >
                    {featuredStories.map((post) => (
                      <div key={post.id} className="w-full flex-shrink-0">
                        <Card className="bg-white/90 backdrop-blur-md border-blue-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            <div className="relative overflow-hidden">
                              <img
                                src={post.image || "/placeholder.svg?height=400&width=600"}
                                alt={post.title}
                                className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute top-4 left-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(post.category)}`}
                                >
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
                                {post.comments && (
                                  <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-sm">{post.comments}</span>
                                  </div>
                                )}
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
                                {post.readTime && (
                                  <span className="text-sm text-blue-600 font-medium">{post.readTime}</span>
                                )}
                              </div>

                              <h3 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-6 leading-tight group-hover:text-blue-700 transition-colors">
                                {post.title}
                              </h3>

                              <p className="text-navy-600 text-lg leading-relaxed mb-8">{post.excerpt}</p>

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

                  {/* Featured Carousel Indicators */}
                  {featuredStories.length > 1 && (
                    <div className="flex justify-center space-x-2 mt-12">
                      {featuredStories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToFeaturedSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentFeaturedSlide ? "bg-navy-600 scale-125" : "bg-navy-200 hover:bg-navy-400"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* More Stories Carousel */}
          {moreStories.length > 0 && (
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-800">More Stories</h3>
                {moreStories.length > 3 && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevSlide}
                      className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200 bg-transparent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextSlide}
                      className="rounded-full w-10 h-10 p-0 border-navy-200 hover:bg-navy-50 hover:border-navy-300 transition-all duration-200 bg-transparent"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {moreStories.map((post, index) => (
                    <div key={post.id} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Show 3 posts at a time on large screens, 2 on medium, 1 on small */}
                        {moreStories.slice(index, index + 3).map((slidePost) => (
                          <Card
                            key={slidePost.id}
                            className="bg-white/90 backdrop-blur-md border-blue-100 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                          >
                            <div className="relative">
                              <img
                                src={slidePost.image || "/placeholder.svg?height=250&width=400"}
                                alt={slidePost.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(slidePost.category)}`}
                                >
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
                                {slidePost.readTime && (
                                  <span className="text-xs text-blue-600 font-medium">{slidePost.readTime}</span>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-navy-600 hover:text-blue-600 p-0 h-auto font-medium"
                                >
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

              {/* More Stories Carousel Indicators */}
              {moreStories.length > 3 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {moreStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "bg-navy-600 scale-125" : "bg-navy-200 hover:bg-navy-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
