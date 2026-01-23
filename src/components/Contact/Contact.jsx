import { motion } from 'framer-motion'
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from 'react-icons/fa'
import './Contact.css'

const Contact = () => {

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/vladimiryaroslav',
      color: '#333',
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:vlad@vladweb.xyz',
      color: '#ea4335',
    },
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
    <section id="contact" className="contact">
      <motion.div
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Get In Touch
        </motion.h2>

        <motion.p className="contact-subtitle" variants={itemVariants}>
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </motion.p>

        <div className="contact-content">
          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="email-display">
                  <FaEnvelope style={{ marginRight: '10px', color: 'var(--accent-primary)' }} />
                  <a href="mailto:vlad@vladweb.xyz" className="email-link">
                    vlad@vladweb.xyz
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-info" variants={itemVariants}>
            <div className="contact-info-card">
              <h3 className="info-title">Let's Connect</h3>
              <p className="info-description">
                Feel free to reach out if you're looking for a developer, have a
                question, or just want to connect.
              </p>

              <div className="social-links">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon style={{ color: social.color }} />
                      <span>{social.name}</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact

