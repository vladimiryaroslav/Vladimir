A minimal site that shows live Discord presence with a custom animated 404 page.

## 🌟 Features

- **Live Discord presence** via Lanyard WebSocket
- **Animated UI**: starfield background, status badges, song progress
- **Custom 404** with particles, floating icons, easter eggs, and a Home button

## 🚀 Live Demo

Visit the live site: [vladweb.xyz](https://vladweb.xyz)

## 📁 Project Structure

```
Vladimir/
├── index.html      # Main (only) page showing Discord activity
├── 404.html        # Custom 404 page that links back home
├── vercel.json     # Vercel config (custom headers, 404 handled by 404.html)
└── README.md
```

## 🛠️ Technologies Used

- **HTML/CSS/JavaScript**
- **Lanyard API** (WebSocket) for Discord status
- **Vercel** for deployment

## 🎯 Pages

- `/` (home): Discord live status, activity and Spotify progress
- `/404`: Custom 404 page; navigation limited to Home and Back

## 🚀 Deployment

### Vercel

1. Fork/Clone this repository
2. Connect to Vercel
3. Deploy (no special build needed)

Notes:
- `vercel.json` contains only security headers. No rewrites are needed.
- Vercel will automatically serve `404.html` for unknown routes.

## 🎨 Customization

### Discord User
Update `DISCORD_ID` in `index.html`:
```html
<script>
  const DISCORD_ID = "YOUR_DISCORD_ID";
</script>
```

### Look and Feel
- Tweak colors and animations directly in `index.html` and `404.html` styles.

Built with ❤️ by Vladimir
