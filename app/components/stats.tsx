"use client"

import { useEffect, useRef } from "react"

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter')
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0')
              let current = 0
              const increment = target / 100
              const timer = setInterval(() => {
                current += increment
                if (current >= target) {
                  current = target
                  clearInterval(timer)
                }
                counter.textContent = Math.floor(current).toString()
              }, 20)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: 5000, label: "Active Members", suffix: "+" },
    { number: 50, label: "Partner Universities", suffix: "+" },
    { number: 200, label: "Events Hosted", suffix: "+" },
    { number: 15, label: "Years of Excellence", suffix: "" }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy-600 via-blue-600 to-navy-600 relative overflow-hidden animate-gradient-x fade-in"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our Impact
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            See how PACSMIN has been making a difference in the chemistry education 
            landscape across the Philippines.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl sm:text-6xl font-bold text-white mb-4">
                  <span className="counter" data-target={stat.number}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-xl text-blue-100 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
