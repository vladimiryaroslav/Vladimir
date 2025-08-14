# Vladimir - Personal Portfolio Website

A modern, interactive portfolio website showcasing my skills as a Web Developer and Python Coder.

## 🌟 Features

- **Modern Design**: Clean, responsive design with glassmorphism effects
- **Interactive Elements**: Hover animations, particle effects, and smooth transitions
- **Discord Integration**: Live Discord status using Lanyard API
- **Multiple Pages**: Portfolio, Links, and Discord profile pages
- **Vercel Ready**: Configured for clean URLs and optimal deployment

## 🚀 Live Demo

Visit the live site: [vladweb.xyz](https://vladweb.xyz)

## 📁 Project Structure

```
Vladimir/
├── index.html          # Main landing page
├── Pages/
│   ├── Activity.html    # Discord profile page
│   └── Portfolio.html  # Detailed portfolio page
├── vercel.json         # Vercel configuration
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript** - Interactive functionality
- **Lanyard API** - Discord status integration
- **Vercel** - Deployment platform

## 🎯 Pages

### Main Site (`/`)
- Hero section with animated title
- About section
- Skills showcase
- Featured projects
- Discord status integration
- Contact information

### Portfolio (`/portfolio`)
- Detailed project showcase
- Experience timeline
- Skills breakdown
- Professional background

### Discord Profile (`/activity`)
- Live Discord status
- Spotify integration
- Platform activity
- Background music

## 🚀 Deployment

### Vercel Deployment

1. **Fork/Clone** this repository
2. **Connect** to Vercel
3. **Deploy** - Vercel will automatically detect the configuration

### Clean URLs

The site uses clean URLs thanks to `vercel.json`:
- `vladweb.xyz` - Main site
- `vladweb.xyz/portfolio` - Portfolio page
- `vladweb.xyz/activity` - Discord profile

## 🎨 Customization

### Colors
Update the CSS variables in the `:root` selector:
```css
:root {
  --accent-start: #8b5cf6;
  --accent-end: #22d3ee;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}
```

### Discord Integration
Update the Discord user ID in the JavaScript (must be in the Lanyard Discord Server);
```javascript
const LANYARD_API = "https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID";
```

### Content
- Update personal information in the HTML files
- Replace project links and descriptions
- Add your own social media links

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

**Built with ❤️ by Vladimir**
