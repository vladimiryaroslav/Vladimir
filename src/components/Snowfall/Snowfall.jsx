import { useEffect, useRef } from 'react'
import './Snowfall.css'

const Snowfall = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create snowflakes
    const createSnowflake = () => {
      const snowflake = document.createElement('div')
      snowflake.className = 'snowflake'
      
      // Random size between 2px and 8px
      const size = Math.random() * 6 + 2
      snowflake.style.width = `${size}px`
      snowflake.style.height = `${size}px`
      
      // Random starting position
      snowflake.style.left = `${Math.random() * 100}%`
      
      // Random fall duration between 3s and 8s
      const duration = Math.random() * 5 + 3
      snowflake.style.animationDuration = `${duration}s`
      
      // Random delay
      snowflake.style.animationDelay = `${Math.random() * 2}s`
      
      // Random opacity for depth
      snowflake.style.opacity = Math.random() * 0.7 + 0.3
      
      container.appendChild(snowflake)
      
      // Remove snowflake after animation completes
      setTimeout(() => {
        if (snowflake.parentNode) {
          snowflake.parentNode.removeChild(snowflake)
        }
      }, (duration + 2) * 1000)
    }

    // Create initial snowflakes
    const initialCount = 50
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => createSnowflake(), i * 100)
    }

    // Continuously create new snowflakes
    const interval = setInterval(() => {
      createSnowflake()
    }, 200)

    return () => {
      clearInterval(interval)
      // Clean up any remaining snowflakes
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return <div ref={containerRef} className="snowfall-container" />
}

export default Snowfall

