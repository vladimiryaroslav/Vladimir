# Vladimir Yaroslav - Portfolio Website

A modern, interactive portfolio website built with React, featuring smooth animations, glassmorphism design, and a fully responsive layout.

## 🚀 Features

- **Hero Section** - Animated intro with interactive particle background
- **About Me** - Skills showcase with hover animations
- **Projects** - Project grid with modal carousel and detailed views
- **Contact Form** - EmailJS integration with form validation
- **Light/Dark Mode** - Theme toggle with persistent storage
- **Smooth Scrolling** - Seamless navigation between sections
- **Fully Responsive** - Optimized for desktop, tablet, and mobile
- **Modern UI** - Glassmorphism effects, neon accents, and micro-interactions

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **CSS3** - Custom styling with CSS variables

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Vladimir
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎨 Customization

### Colors & Themes

Edit CSS variables in `src/index.css` to customize colors:

```css
:root {
  --accent-primary: #00d4ff;
  --accent-secondary: #7c3aed;
  /* ... more variables */
}
```

### Projects

Edit the `projects` array in `src/components/Projects/Projects.jsx` to add your own projects.

### Personal Information

- Update name and bio in `src/components/Hero/Hero.jsx`
- Update skills in `src/components/About/About.jsx`
- Update social links in `src/components/Contact/Contact.jsx`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1400px+)
- Tablet (768px - 968px)
- Mobile (< 768px)

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vladimir Yaroslav**
- Portfolio: https://vladweb.xyz
- GitHub: https://github.com/vladimiryaroslav

---

Built with ❤️ using React and Vite

