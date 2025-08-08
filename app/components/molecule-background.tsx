"use client"

import { useEffect, useRef } from "react"

export default function MoleculeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const molecules = document.querySelectorAll('.molecule-svg')
      
      molecules.forEach((molecule, index) => {
        const speed = 0.5 + index * 0.1
        const yPos = scrolled * speed
        const rotation = scrolled * (0.1 + index * 0.05)
        
        ;(molecule as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${rotation}deg) scale(${1 + scrolled * 0.0005})`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const MoleculeIcon = ({ className, index }: { className: string, index: number }) => (
    <svg
      className={`molecule-svg ${className} animate-spin-slow`}
      style={{ animationDelay: `${index * 0.5}s`, animationDuration: `${15 + index * 3}s` }}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Enhanced molecule structure with more atoms */}
      <circle cx="20" cy="30" r="8" fill="currentColor" opacity="0.8" className="animate-pulse" />
      <circle cx="50" cy="20" r="6" fill="currentColor" opacity="0.6" className="animate-pulse animation-delay-200" />
      <circle cx="80" cy="35" r="7" fill="currentColor" opacity="0.7" className="animate-pulse animation-delay-400" />
      <circle cx="35" cy="60" r="5" fill="currentColor" opacity="0.5" className="animate-pulse animation-delay-600" />
      <circle cx="65" cy="70" r="6" fill="currentColor" opacity="0.6" className="animate-pulse animation-delay-800" />
      <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.9" className="animate-pulse animation-delay-1000" />
      <circle cx="15" cy="70" r="3" fill="currentColor" opacity="0.4" className="animate-pulse animation-delay-300" />
      <circle cx="85" cy="65" r="4" fill="currentColor" opacity="0.5" className="animate-pulse animation-delay-500" />
      
      {/* Enhanced bonds with varying opacity */}
      <line x1="20" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="50" y1="20" x2="80" y2="35" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="20" y1="30" x2="35" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="35" y1="60" x2="65" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="50" y1="50" x2="65" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="50" y1="50" x2="80" y2="35" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="35" y1="60" x2="15" y2="70" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="65" y1="70" x2="85" y2="65" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="50" y1="50" x2="35" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  )

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      <MoleculeIcon className="absolute top-20 left-10 w-32 h-32 text-blue-300 animate-float" index={0} />
      <MoleculeIcon className="absolute top-40 right-20 w-40 h-40 text-navy-200 animate-float-delayed" index={1} />
      <MoleculeIcon className="absolute bottom-40 left-20 w-36 h-36 text-blue-400 animate-float-slow" index={2} />
      <MoleculeIcon className="absolute bottom-20 right-10 w-28 h-28 text-navy-300 animate-float" index={3} />
      <MoleculeIcon className="absolute top-1/2 left-1/4 w-24 h-24 text-blue-200 animate-float-delayed" index={4} />
      <MoleculeIcon className="absolute top-1/3 right-1/3 w-44 h-44 text-navy-100 animate-float-slow" index={5} />
      <MoleculeIcon className="absolute top-3/4 left-1/2 w-20 h-20 text-blue-300 animate-float" index={6} />
      <MoleculeIcon className="absolute top-10 right-1/2 w-16 h-16 text-navy-200 animate-float-delayed" index={7} />
    </div>
  )
}
