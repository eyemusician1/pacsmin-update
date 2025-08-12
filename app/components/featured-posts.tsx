"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight, Eye, Heart, MessageCircle } from "lucide-react"
import useStore from "@/lib/store"

export default function FeaturedPosts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { getFeaturedStories, getMoreStories } = useStore()

  const featuredStories = getFeaturedStories()
  const moreStories = getMoreStories()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0)
  const [isFeaturedAutoPlaying, setIsFeaturedAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Optimized auto-play with longer intervals on mobile
  useEffect(() => {
    if (!isAutoPlaying || moreStories.length === 0) return

    const interval = setInterval(
      () => {
        setCurrentSlide((prev) => (prev + 1) % moreStories.length)
      },
      isMobile ? 6000 : 4000, // Longer interval on mobile
    )

    return () => clearInterval(interval)
  }, [isAutoPlaying, moreStories.length, isMobile])

  useEffect(() => {
    if (!isFeaturedAutoPlaying || featuredStories.length === 0) return

    const interval = setInterval(
      () => {
        setCurrentFeaturedSlide((prev) => (prev + 1) % featuredStories.length)
      },
      isMobile ? 8000 : 6000, // Longer interval on mobile
    )

    return () => clearInterval(interval)
  }, [isFeaturedAutoPlaying, featuredStories.length, isMobile])

  // Optimized navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % moreStories.length)
    setIsAutoPlaying(false)
  }, [moreStories.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + moreStories.length) % moreStories.length)
    setIsAutoPlaying(false)
  }, [moreStories.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }, [])

  const nextFeaturedSlide = useCallback(() => {
    setCurrentFeaturedSlide((prev) => (prev + 1) % featuredStories.length)
    setIsFeaturedAutoPlaying(false)
  }, [featuredStories.length])

  const prevFeaturedSlide = useCallback(() => {
    setCurrentFeaturedSlide((prev) => (prev - 1 + featuredStories.length) % featuredStories.length)
    setIsFeaturedAutoPlaying(false)
  }, [featuredStories.length])

  const goToFeaturedSlide = useCallback((index: number) => {
    setCurrentFeaturedSlide(index)
    setIsFeaturedAutoPlaying(false)
  }, [])

  const getCategoryColor = useCallback((category: string) => {
    const colors: Record<string, string> = {
      Research: "bg-blue-500",
      Achievement: "bg-yellow-500",
      News: "bg-green-500",
      Event: "bg-purple-500",
      Opportunity: "bg-orange-500",
      Alumni: "bg-pink-500",
    }
    return colors[category] || "bg-gray-500"
  }, [])

  if (featuredStories.length === 0 && moreStories.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-sm fade-in"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy-800 mb-4 sm:mb-6">
            Latest News & Updates
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12">
            Stay updated with the latest developments, achievements, and opportunities in the PACSMIN community.
          </p>
          <div className="py-12 sm:py-16">
            <p className="text-lg sm:text-xl text-gray-500 mb-4">No stories available at the moment.</p>
            <p className="text-gray-400">Check back soon for the latest updates!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-sm fade-in"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy-800 mb-4 sm:mb-6">
            Latest News & Updates
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest developments, achievements, and opportunities in the PACSMIN community.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Featured Stories Carousel */}
          {featuredStories.length > 0 && (
            <div className="mb-12 sm:mb-16">
              <div className="relative">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-800">Featured Stories</h3>
                  {featuredStories.length > 1 && !isMobile && (
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

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <div
                    className="flex transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateX(-${currentFeaturedSlide * 100}%)` }}
                    onMouseEnter={() => !isMobile && setIsFeaturedAutoPlaying(false)}
                    onMouseLeave={() => !isMobile && setIsFeaturedAutoPlaying(true)}
                  >
                    {featuredStories.map((post) => (
                      <div key={post.id} className="w-full flex-shrink-0">
                        <Card className="bg-white/90 backdrop-blur-md border-blue-100 shadow-lg sm:shadow-2xl transition-all duration-300 overflow-hidden group">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            <div className="relative overflow-hidden">
                              <img
                                src={post.image || "/placeholder.svg?height=300&width=500"}
                                alt={post.title}
                                className="w-full h-48 sm:h-64 lg:h-full object-cover transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                <span
                                  className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium ${getCategoryColor(post.category)}`}
                                >
                                  {post.category}
                                </span>
                              </div>
                              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-2 sm:space-x-4 text-white">
                                {post.views && (
                                  <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm">{post.views}</span>
                                  </div>
                                )}
                                {post.likes && (
                                  <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm">{post.likes}</span>
                                  </div>
                                )}
                                {post.comments && (
                                  <div className="hidden sm:flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-sm">{post.comments}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <CardContent className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4 text-navy-600">
                                <div className="flex items-center space-x-2">
                                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs sm:text-sm font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs sm:text-sm">{post.date}</span>
                                </div>
                                {post.readTime && (
                                  <span className="text-xs sm:text-sm text-blue-600 font-medium">{post.readTime}</span>
                                )}
                              </div>

                              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-navy-800 mb-4 sm:mb-6 leading-tight">
                                {post.title}
                              </h3>

                              <p className="text-navy-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                                {post.excerpt}
                              </p>

                              <Button className="bg-gradient-to-r from-navy-600 to-blue-600 hover:from-navy-700 hover:to-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 self-start touch-manipulation">
                                Read Full Article
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                              </Button>
                            </CardContent>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>

                  {/* Featured Carousel Indicators */}
                  {featuredStories.length > 1 && (
                    <div className="flex justify-center space-x-2 mt-8 sm:mt-12">
                      {featuredStories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToFeaturedSlide(index)}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 touch-manipulation ${
                            index === currentFeaturedSlide ? "bg-navy-600 scale-125" : "bg-navy-200 hover:bg-navy-400"
                          }`}
                          style={{ minHeight: "32px", minWidth: "32px" }} // Smaller touch target
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* More Stories Section - Simplified for mobile */}
          {moreStories.length > 0 && (
            <div className="relative">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-800">More Stories</h3>
                {moreStories.length > 3 && !isMobile && (
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

              {/* Mobile: Show grid instead of carousel */}
              {isMobile ? (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {moreStories.slice(0, 4).map((post) => (
                      <Card
                        key={post.id}
                        className="bg-white/90 backdrop-blur-md border-blue-100 shadow-md transition-all duration-300 group overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={post.image || "/placeholder.svg?height=200&width=350"}
                            alt={post.title}
                            className="w-full h-40 object-cover transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2">
                            <span
                              className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(post.category)}`}
                            >
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex flex-col space-y-1 mb-2 text-navy-600 text-xs">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{post.date}</span>
                            </div>
                          </div>

                          <h4 className="text-base font-bold text-navy-800 mb-2 leading-tight line-clamp-2">
                            {post.title}
                          </h4>

                          <p className="text-navy-600 text-sm leading-relaxed mb-3 line-clamp-3">{post.excerpt}</p>

                          <div className="flex items-center justify-between">
                            {post.readTime && (
                              <span className="text-xs text-blue-600 font-medium">{post.readTime}</span>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-navy-600 hover:text-blue-600 p-0 h-auto font-medium text-xs touch-manipulation"
                            >
                              Read More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Mobile More Stories Indicators */}
                  {moreStories.length > 4 && (
                    <div className="flex justify-center space-x-2 mt-6">
                      {Array.from({ length: Math.ceil(moreStories.length / 4) }).map((_, index) => (
                        <button
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 touch-manipulation ${
                            index === 0 ? "bg-navy-600 scale-125" : "bg-navy-200"
                          }`}
                          style={{ minHeight: "32px", minWidth: "32px" }}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Desktop: Show carousel
                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    {moreStories.map((post, index: number) => (
                      <div key={post.id} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {moreStories.slice(index, index + 3).map((slidePost) => (
                            <Card
                              key={slidePost.id}
                              className="bg-white/90 backdrop-blur-md border-blue-100 shadow-xl transition-all duration-300 group overflow-hidden"
                            >
                              <div className="relative">
                                <img
                                  src={slidePost.image || "/placeholder.svg?height=250&width=400"}
                                  alt={slidePost.title}
                                  className="w-full h-48 object-cover transition-transform duration-500"
                                  loading="lazy"
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

                                <h4 className="text-lg sm:text-xl font-bold text-navy-800 mb-3 leading-tight line-clamp-2">
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
              )}

              {/* More Stories Carousel Indicators - Desktop only */}
              {moreStories.length > 3 && !isMobile && (
                <div className="flex justify-center space-x-2 mt-8">
                  {moreStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
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