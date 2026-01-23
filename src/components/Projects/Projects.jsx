import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight, FaStar, FaCodeBranch, FaSpinner } from 'react-icons/fa'
import { fetchRepositories, processRepositories } from '../../services/githubService'
import './Projects.css'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedType, setSelectedType] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch projects from GitHub
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching repositories from GitHub...')
        const repos = await fetchRepositories()
        console.log('Repositories fetched:', repos.length)
        
        if (repos.length === 0) {
          setError('No repositories found. Please check your GitHub username and token.')
          setLoading(false)
          return
        }
        
        console.log('Processing repositories...')
        const processedProjects = await processRepositories(repos)
        console.log('Projects processed:', processedProjects.length)
        
        setProjects(processedProjects)
        setFilteredProjects(processedProjects)
      } catch (err) {
        console.error('Error loading projects:', err)
        setError(`Failed to load projects: ${err.message || 'Please check the console for details.'}`)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Get unique project types
  const projectTypes = ['All', ...new Set(projects.map(p => p.projectType))]

  // Filter projects by type
  useEffect(() => {
    if (selectedType === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.projectType === selectedType))
    }
  }, [selectedType, projects])

  const openModal = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal()
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject])

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      )
    }
  }

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

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="projects-container">
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Loading projects from GitHub...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="projects">
        <div className="projects-container">
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="projects">
      <motion.div
        className="projects-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          My Projects
        </motion.h2>

        {/* Project Type Filter */}
        {projectTypes.length > 1 && (
          <motion.div className="project-filters" variants={itemVariants}>
            {projectTypes.map((type) => (
              <button
                key={type}
                className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div className="projects-grid" variants={containerVariants}>
          {filteredProjects.length === 0 ? (
            <div className="no-projects">
              <p>No projects found in this category.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(project)}
            >
              <div className="project-image-container">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-tech">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-type-badge">{project.projectType}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-stats">
                  {project.stars > 0 && (
                    <span className="project-stat">
                      <FaStar /> {project.stars}
                    </span>
                  )}
                  {project.forks > 0 && (
                    <span className="project-stat">
                      <FaCodeBranch /> {project.forks}
                    </span>
                  )}
                </div>
                <div className="project-links">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub /> Code
                  </a>
                  {project.liveLink !== project.githubLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              {selectedProject.images.length > 1 && (
                <>
                  <button
                    className="modal-nav modal-nav-prev"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="modal-nav modal-nav-next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              <div className="modal-image-container">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={selectedProject.title}
                    className="modal-image"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                {selectedProject.images.length > 1 && (
                  <div className="modal-image-indicator">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator-dot ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-info">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <span className="modal-type-badge">{selectedProject.projectType}</span>
                </div>
                <p className="modal-description">
                  {selectedProject.description}
                </p>
                <div className="modal-stats">
                  {selectedProject.stars > 0 && (
                    <span className="modal-stat">
                      <FaStar /> {selectedProject.stars} stars
                    </span>
                  )}
                  {selectedProject.forks > 0 && (
                    <span className="modal-stat">
                      <FaCodeBranch /> {selectedProject.forks} forks
                    </span>
                  )}
                  {selectedProject.language && (
                    <span className="modal-stat">
                      <FaCodeBranch /> {selectedProject.language}
                    </span>
                  )}
                </div>
                <div className="modal-tech-stack">
                  <h4 className="tech-stack-title">Technologies Used:</h4>
                  <div className="tech-tags-container">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="modal-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedProject.topics && selectedProject.topics.length > 0 && (
                  <div className="modal-topics">
                    <h4 className="topics-title">Topics:</h4>
                    <div className="topics-container">
                      {selectedProject.topics.map((topic) => (
                        <span key={topic} className="topic-tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="modal-actions">
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                  {selectedProject.liveLink !== selectedProject.githubLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link modal-link-primary"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
