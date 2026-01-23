/**
 * GitHub API Service
 * Fetches repositories from GitHub and processes them for display
 */

const GITHUB_USERNAME = 'vladimiryaroslav'
const GITHUB_API_BASE = 'https://api.github.com'

// Token from .env (Vite)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

/**
 * Creates headers for GitHub API requests
 */
const getHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }

  // Add auth only if token exists
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  }

  return headers
}

/**
 * Fetches all public repositories for the user
 */
export const fetchRepositories = async () => {
  try {
    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=all`
    
    const response = await fetch(url, { headers: getHeaders() })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching repositories:', error)
    throw error
  }
}

/**
 * Determines project type based on repository data
 */
export const getProjectType = (repo) => {
  const description = (repo.description || '').toLowerCase()
  const topics = (repo.topics || []).map(t => t.toLowerCase())
  const language = (repo.language || '').toLowerCase()
  
  if (topics.includes('web') || topics.includes('website') || topics.includes('frontend')) return 'Web Development'
  if (topics.includes('api') || topics.includes('backend') || topics.includes('server')) return 'Backend'
  if (topics.includes('mobile') || topics.includes('app') || topics.includes('react-native')) return 'Mobile'
  if (topics.includes('machine-learning') || topics.includes('ai') || topics.includes('ml')) return 'Machine Learning'
  if (topics.includes('data') || topics.includes('analytics')) return 'Data Science'
  if (topics.includes('devops') || topics.includes('docker') || topics.includes('kubernetes')) return 'DevOps'
  if (topics.includes('game') || topics.includes('gaming')) return 'Game Development'
  
  if (['javascript', 'typescript', 'html', 'css'].includes(language)) return 'Web Development'
  if (['java', 'kotlin', 'swift', 'dart'].includes(language)) return 'Mobile'
  
  if (description.includes('api') || description.includes('backend')) return 'Backend'
  if (description.includes('web') || description.includes('frontend')) return 'Web Development'
  
  return 'Other'
}

/**
 * Extracts technologies from repository data
 */
export const extractTechnologies = (repo) => {
  const techStack = []
  
  if (repo.language) techStack.push(repo.language)
  
  const techTopics = ['react', 'vue', 'angular', 'node', 'python', 'java', 'typescript', 'javascript', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'express', 'mongodb', 'postgresql', 'mysql', 'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp']
  repo.topics?.forEach(topic => {
    if (techTopics.some(tech => topic.toLowerCase().includes(tech)) && !techStack.includes(topic)) {
      techStack.push(topic)
    }
  })
  
  return techStack.slice(0, 8)
}

/**
 * Processes repositories into project format
 */
export const processRepositories = async (repos) => {
  const filteredRepos = repos.filter(repo => 
    !repo.fork && 
    !repo.archived && 
    repo.name !== 'vladimir-portfolio'
  )
  
  const projects = filteredRepos.map(repo => {
    const techStack = extractTechnologies(repo)
    const projectType = getProjectType(repo)
    
    const imageMap = {
      'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      'Backend': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      'Mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      'Machine Learning': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'DevOps': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      'Game Development': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      'Other': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    }
    
    return {
      id: repo.id,
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'A project showcasing modern development practices.',
      techStack,
      images: [imageMap[projectType] || imageMap['Other']],
      githubLink: repo.html_url,
      liveLink: repo.homepage || repo.html_url,
      featured: repo.stargazers_count > 0 || repo.topics?.length > 0,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
      projectType,
      language: repo.language,
      topics: repo.topics || []
    }
  })
  
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    if (a.stars !== b.stars) return b.stars - a.stars
    return new Date(b.updatedAt) - new Date(a.updatedAt)
  })
}
