# ArtVision AI - AI-Powered Image Generation Website

A fully responsive AI-based image generation website similar to ArtGuru.ai, built with HTML, CSS, and JavaScript.

## 🌟 Features

### 🧠 Core Functionality
- **Text-to-Image Generation**: Generate images from text prompts using AI simulation
- **Multiple Art Styles**: Choose from Realistic, Artistic, Cartoon, Abstract, Fantasy, and Minimalist styles
- **Customizable Image Sizes**: 512x512, 768x768, or 1024x1024 pixels
- **Grid View Display**: Beautiful grid layout for generated images
- **Image Download**: Download generated images with custom filenames

### 💳 Credit System
- **Free Credits**: Each user starts with 10 free credits
- **Credit Tracking**: Uses localStorage to track remaining credits
- **Credit Consumption**: 1 credit per image generation
- **Out of Credits Message**: Clear notification when credits are exhausted
- **Credit Display**: Real-time credit counter in the navigation

### 📩 Contact System
- **Buy Credits Button**: Prominent button in navigation and when out of credits
- **Contact Modal**: Professional contact form with name, email, and message fields
- **Email Integration**: Direct email link to `samadus2005@gmail.com`
- **Form Validation**: Client-side validation for all form fields

### 🖼️ UI/UX Features
- **Modern Design**: Clean, professional interface inspired by ArtGuru.ai
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Loading animations, hover effects, and transitions
- **Accessibility**: Keyboard shortcuts, focus management, and screen reader support

### 🚀 Performance & Technical
- **Lazy Loading**: Images load only when needed
- **PWA Ready**: Service worker for offline functionality
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards
- **Cross-Browser Compatible**: Works on all modern browsers
- **No Backend Required**: Pure frontend solution

## 🛠️ Tech Stack

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Custom animations, responsive design, and modern styling
- **JavaScript (ES6+)**: Modern JavaScript with classes and async/await
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Font Awesome**: Professional icons
- **Picsum Photos**: Placeholder image service for AI simulation

## 📦 File Structure

```
artvision-ai/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # Main JavaScript functionality
├── sw.js              # Service worker for PWA
├── README.md          # This file
└── assets/            # Optional assets folder
    ├── favicon.ico
    ├── apple-touch-icon.png
    └── og-image.jpg
```

## 🚀 Quick Start

### Option 1: Direct Deployment (Recommended)

1. **Download/Clone** all files to your local machine
2. **Upload** to GitHub repository
3. **Enable GitHub Pages** in repository settings
4. **Your site is live!** 🎉

### Option 2: Local Development

1. **Download** all files to a folder
2. **Open** `index.html` in your browser
3. **Start developing!** 🚀

### Option 3: Vercel Deployment

1. **Push** code to GitHub
2. **Connect** repository to Vercel
3. **Deploy** automatically! ⚡

## 🎮 Usage

### Generating Images
1. Enter a detailed description in the text area
2. Select your preferred art style
3. Choose image size
4. Click "Generate Image"
5. Wait for the AI to create your masterpiece!

### Keyboard Shortcuts
- `Ctrl/Cmd + Enter`: Generate image
- `Escape`: Close modal

### Testing Commands
Open browser console and use:
```javascript
artVision.resetCredits()    // Reset to 10 credits
artVision.addCredits(5)     // Add 5 credits
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #8b5cf6;
    --secondary-color: #ec4899;
}
```

### Adding New Styles
Modify the `styleMap` object in `script.js`:
```javascript
const styleMap = {
    'realistic': 'nature',
    'artistic': 'abstract',
    'your-style': 'your-category'
};
```

### Changing Contact Email
Update the email in `script.js`:
```javascript
const mailtoLink = `mailto:your-email@gmail.com?...`;
```

## 🔧 Configuration

### SEO Settings
Update meta tags in `index.html`:
```html
<title>Your Site Title</title>
<meta name="description" content="Your description">
<meta property="og:title" content="Your title">
```

### PWA Settings
Modify `sw.js` for caching preferences:
```javascript
const urlsToCache = [
    '/',
    '/your-files.html'
];
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 📱 Mobile Responsive

The website is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔒 Privacy & Security

- No user data is stored on servers
- All data is stored locally in browser
- No tracking or analytics
- GDPR compliant

## 🆘 Troubleshooting

### Images Not Loading
- Check internet connection
- Verify placeholder service is accessible
- Try refreshing the page

### Credits Not Saving
- Ensure localStorage is enabled
- Check browser permissions
- Try in incognito/private mode

### Dark Mode Not Working
- Check browser support
- Verify JavaScript is enabled
- Clear browser cache

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support or questions:
- Email: samadus2005@gmail.com
- Create an issue on GitHub
- Check the troubleshooting section

## 🎯 Roadmap

- [ ] Real AI integration (OpenAI, Replicate, etc.)
- [ ] User accounts and cloud storage
- [ ] Image editing tools
- [ ] Social sharing features
- [ ] Advanced style options
- [ ] Batch image generation

---

**Made with ❤️ for the creative community**

*Transform your imagination into stunning artwork with ArtVision AI!* 