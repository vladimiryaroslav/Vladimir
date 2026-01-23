import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaSass
} from 'react-icons/fa'
import { SiTypescript, SiVite, SiTailwindcss } from 'react-icons/si'
import './About.css'

const About = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skills = [
    { name: 'HTML5', icon: FaHtml5, color: '#e34c26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#264de4' },
    { name: 'JavaScript', icon: FaJs, color: '#f0db4f' },
    { name: 'TypeScript', icon: SiTypescript, color: '#007acc' },
    { name: 'React', icon: FaReact, color: '#61dafb' },
    { name: 'Vite', icon: SiVite, color: '#646cff' },
    { name: 'Node.js', icon: FaNodeJs, color: '#68a063' },
    { name: 'Git', icon: FaGitAlt, color: '#f1502f' },
    { name: 'Figma', icon: FaFigma, color: '#f24e1e' },
    { name: 'Sass', icon: FaSass, color: '#cc6699' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38b2ac' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="about" className="about">
      <motion.div
        className="about-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          About Me
        </motion.h2>

        <motion.div className="about-content" variants={itemVariants}>
          <div className="about-text">
            <div className="about-intro">
              <h3 className="about-subtitle">Hello, I'm Vladimir Yaroslav</h3>
              <p className="about-bio">
                I'm a passionate full-stack developer with a love for creating
                beautiful, interactive, and user-friendly web experiences. I
                specialize in building modern web applications using React, JavaScript,
                and other cutting-edge technologies.
              </p>
            </div>
            
            <div className="about-details">
              <div className="about-detail-item">
                <h4 className="detail-title">🎯 What I Do</h4>
                <p className="detail-text">
                  I develop responsive web applications, build RESTful APIs, create
                  interactive user interfaces, and solve complex technical challenges.
                  From frontend design to backend architecture, I enjoy working across
                  the full stack.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h4 className="detail-title">💡 My Approach</h4>
                <p className="detail-text">
                  With a keen eye for design and a focus on performance, I strive to
                  deliver applications that not only look great but also provide
                  seamless user experiences. Clean code, best practices, and
                  attention to detail are at the core of my development process.
                </p>
              </div>
              
              <div className="about-detail-item">
                <h4 className="detail-title">🚀 Always Learning</h4>
                <p className="detail-text">
                  I'm constantly learning and exploring new technologies to stay at
                  the forefront of web development. Whether it's mastering a new
                  framework, diving into system architecture, or experimenting with
                  the latest tools, I'm always up for a challenge.
                </p>
              </div>
            </div>
          </div>

          <div className="skills-section">
            <h3 className="skills-title">Skills & Technologies</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.name}
                    className={`skill-card ${hoveredSkill === index ? 'hovered' : ''}`}
                    onHoverStart={() => setHoveredSkill(index)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    variants={itemVariants}
                  >
                    <div
                      className="skill-icon"
                      style={{ '--skill-color': skill.color }}
                    >
                      <Icon />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-glow" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About

