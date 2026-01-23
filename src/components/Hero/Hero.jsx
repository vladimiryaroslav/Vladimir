import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Particles from './Particles'
import { FaArrowDown } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div
        className="hero-gradient"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      <div className="hero-content">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-greeting"
            variants={itemVariants}
          >
            <span className="greeting-text">Hi, I'm</span>
          </motion.div>
          <motion.h1
            className="hero-name"
            variants={itemVariants}
          >
            <span className="name-text">Vladimir</span>
            <span className="name-text highlight">Yaroslav</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            variants={itemVariants}
          >
            Frontend Developer — HTML • CSS • JavaScript • React • TypeScript
          </motion.p>
          <motion.div
            className="hero-buttons"
            variants={itemVariants}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => {
                const element = document.getElementById('projects')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={() => {
                const element = document.getElementById('contact')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <button
          className="scroll-indicator"
          onClick={scrollToAbout}
          aria-label="Scroll down"
        >
          <FaArrowDown />
        </button>
      </motion.div>
    </section>
  )
}

export default Hero

