import { useEffect, useRef } from 'react'
import './Particles.css'

const Particles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let particles = []
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.16 + 0.12
      }
    }

    const initParticles = () => {
      // Determine max particles based on device type
      const isMobile = window.innerWidth <= 768
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024
      
      let maxParticles = 120 // Desktop default
      if (isMobile) {
        maxParticles = 60 // Mobile: fewer particles for better performance
      } else if (isTablet) {
        maxParticles = 90 // Tablet: medium particle count
      }
      
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 20000),
        maxParticles
      )
      particles = Array.from(
        { length: particleCount },
        createParticle
      )
    }

    const updateParticles = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`
        ctx.fill()
      }
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return <canvas ref={canvasRef} id="particles" className="particles-canvas" />
}

export default Particles

