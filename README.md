## 🚀 Live Demo

Visit the live site: [vladweb.xyz](https://vladweb.xyz)

## 📁 Project Structure

```
Vladimir/
├── index.html      # Main
├── 404.html        # Custom 404 page that links back home
├── vercel.json     # Vercel config (custom headers, 404 handled by 404.html)
└── README.md
```

## 🛠️ Technologies Used

- **HTML/CSS/JavaScript**
- **Vercel** for deployment and hostiny (https://vercel.com)
- **Cloudflare** for securit (https://cloudflare.com)

## 🎯 Pages

- `/` (home): Main page
- `/404`: Custom 404 page; navigation limited to Home and Back

## 🚀 Deployment

### Vercel

1. Fork/Clone this repository
2. Connect to Vercel
3. Deploy (no special build needed)

Notes:
- `vercel.json` contains only security headers. No rewrites are needed.
- Vercel will automatically serve `404.html` for unknown routes.

### Look and Feel
- Tweak colors and animations directly in `index.html` and `404.html` styles.

Built with ❤️ by Vladimir
