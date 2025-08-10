"use client"

import { useEffect, useRef } from "react"

export default function MoleculeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas, { passive: true })

    // Simplified molecule animation for mobile performance
    const molecules: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }> = []

    // Reduce number of molecules on mobile
    const isMobile = window.innerWidth <= 768
    const moleculeCount = isMobile ? 15 : 30

    // Initialize molecules
    for (let i = 0; i < moleculeCount; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw molecules
      molecules.forEach((molecule, i) => {
        // Update position
        molecule.x += molecule.vx
        molecule.y += molecule.vy

        // Bounce off edges
        if (molecule.x < 0 || molecule.x > canvas.width) molecule.vx *= -1
        if (molecule.y < 0 || molecule.y > canvas.height) molecule.vy *= -1

        // Draw molecule
        ctx.beginPath()
        ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(30, 58, 138, ${molecule.opacity})`
        ctx.fill()

        // Draw connections (simplified for performance)
        if (!isMobile) {
          molecules.slice(i + 1).forEach((otherMolecule) => {
            const dx = molecule.x - otherMolecule.x
            const dy = molecule.y - otherMolecule.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(molecule.x, molecule.y)
              ctx.lineTo(otherMolecule.x, otherMolecule.y)
              ctx.strokeStyle = `rgba(30, 58, 138, ${0.1 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ background: "transparent" }}
    />
  )
}
