import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {currentYear} Vladimir Yaroslav. Built with{' '}
            <FaHeart className="heart-icon" /> using React & Vite
          </p>
          <div className="footer-social">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

