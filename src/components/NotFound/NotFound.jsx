import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { FaHome, FaArrowLeft, FaSearch, FaGithub } from 'react-icons/fa'
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const errorMessages = [
    "The page you're looking for seems to have drifted away in the snow.",
    "Oops! This page got lost in a blizzard.",
    "Looks like this page took a wrong turn in the winter wonderland.",
    "This page must be hibernating. Let's find something else!",
  ]

  const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]

  return (
    <div className="not-found-page">
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="error-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <div className="error-icon">
        <i className="fas fa-triangle-exclamation"></i>
      </div>
      <div className="error-number">404</div>
</motion.div>

        <motion.h1
          className="not-found-title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="not-found-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {randomMessage}
        </motion.p>

        <motion.div
          className="not-found-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button onClick={handleGoHome} className="not-found-button not-found-button-primary">
            <FaHome /> Go Home
          </button>
          <button onClick={handleGoBack} className="not-found-button not-found-button-secondary">
            <FaArrowLeft /> Go Back
          </button>
        </motion.div>

        <motion.div
          className="not-found-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="links-title">Quick Links:</p>
          <div className="links-container">
            <Link to="/" className="quick-link">
              <FaHome /> Home
            </Link>
            <Link to="/#about" className="quick-link" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }, 100) }}>
              <FaSearch /> About
            </Link>
            <Link to="/#projects" className="quick-link" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }, 100) }}>
              <FaGithub /> Projects
            </Link>
            <Link to="/#contact" className="quick-link" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }, 100) }}>
              <FaSearch /> Contact
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound

