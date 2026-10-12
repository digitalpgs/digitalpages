# DigitalPages

> **Modern Digital Experiences & Solutions**

A modern, responsive portfolio and service website with multi-language support, dark/light theme toggle, AI assistant widget, and smooth animations.

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🌍 **Multi-language support** (English, Spanish, Catalan)
- 🌓 **Dark/Light theme toggle** with smooth transitions
- 🤖 **AI Assistant widget** (Digi chatbot)
- ✨ **Smooth animations** and cursor effects
- 📱 **Fully responsive** design (mobile, tablet, desktop)
- ⚡ **Fast loading** with optimized assets
- 🎨 **Modern UI** with custom gradient backgrounds
- 🔍 **SEO optimized** with meta tags and sitemap
- ♿ **Accessible** with ARIA labels and semantic HTML

## 📁 Project Structure

```
DigitalPages/
├── index.html                  # Main entry point
├── components/                 # HTML component files
│   ├── navbar.html
│   ├── hero.html
│   ├── services.html
│   ├── about.html
│   ├── portfolio.html
│   ├── faq.html
│   ├── contact.html
│   └── footer.html
├── assets/
│   ├── css/                   # Stylesheets
│   │   ├── variables.css      # CSS custom properties
│   │   ├── style.css          # Base styles
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── services.css
│   │   ├── about.css
│   │   ├── portfolio.css
│   │   ├── faq.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   ├── animations.css
│   │   └── responsive.css
│   ├── js/                    # JavaScript files
│   │   ├── main.js            # Entry point
│   │   ├── navbar.js
│   │   ├── theme.js           # Theme toggle logic
│   │   ├── language.js        # Multi-language support
│   │   ├── animations.js
│   │   ├── scroll.js
│   │   ├── cursor.js
│   │   ├── loading.js
│   │   ├── form.js
│   │   ├── faq.js
│   │   ├── assistant.js       # AI assistant widget
│   │   └── components.js
│   ├── images/                # Image assets
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── background/
│   │   └── avatar/
│   └── fonts/                 # Custom fonts
├── data/                      # JSON data files
│   ├── services.json
│   └── portfolio.json
├── languages/                 # Translation files
│   ├── en.json
│   ├── es.json
│   └── ca.json
├── manifest.json              # PWA manifest
├── robots.txt                 # SEO robot directives
├── sitemap.xml                # XML sitemap
└── README.md                  # This file
```

## 🚀 Quick Start

### Option 1: VS Code Live Server (Easiest)
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open the project folder in VS Code
3. Right-click on `index.html` and select **"Open with Live Server"**
4. The site will open at `http://127.0.0.1:5500`

### Option 2: Python
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000`

### Option 3: Node.js
```bash
# Install dependencies (if needed)
npm install

# Start the dev server
npm run preview

# Or start with auto-open
npm run dev
```

### Option 4: Direct File Opening
Simply open `index.html` in your browser (limited functionality for remote resources).

## 📝 Configuration

### Theme Customization
Edit CSS variables in [assets/css/variables.css](assets/css/variables.css):
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --bg-light: #ffffff;
  --bg-dark: #0f0f0f;
  /* ... more variables */
}
```

### Language Setup
Translation files are in the [languages/](languages/) folder:
- [en.json](languages/en.json) - English
- [es.json](languages/es.json) - Spanish
- [ca.json](languages/ca.json) - Catalan

Add translations by updating the JSON files with key-value pairs.

### Portfolio & Services Data
Update content in [data/](data/) folder:
- [services.json](data/services.json) - Service offerings
- [portfolio.json](data/portfolio.json) - Portfolio projects

## 🎨 Customization Guide

### Change Colors
1. Open [assets/css/variables.css](assets/css/variables.css)
2. Modify the CSS custom properties in `:root`
3. Changes apply globally

### Add New Languages
1. Create `languages/xx.json` (replace `xx` with language code)
2. Copy structure from [languages/en.json](languages/en.json)
3. Translate all values
4. Register the language in [assets/js/language.js](assets/js/language.js)

### Update Navigation
Edit [components/navbar.html](components/navbar.html) to add/remove navigation links.

### Modify Hero Section
Update [components/hero.html](components/hero.html) and related styles in [assets/css/hero.css](assets/css/hero.css).

## 📊 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **Vanilla JavaScript** - No frameworks, lightweight
- **JSON** - Data management

## 📄 Files

- `manifest.json` - Progressive Web App configuration
- `robots.txt` - Search engine crawling directives
- `sitemap.xml` - XML sitemap for SEO
- `.gitignore` - Git ignore rules

## 🌐 Deployment

### Deploy to GitHub Pages
1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Select **Source: Deploy from a branch**
4. Choose **main** branch and **/root** folder
5. Click **Save**
6. Your site will be live at `https://username.github.io/repository-name`

### Deploy to Netlify
1. Connect your GitHub repository
2. Build command: (leave empty - static site)
3. Publish directory: `/`
4. Deploy

### Deploy to Vercel
1. Import your GitHub repository
2. Framework: (other - static)
3. Deploy

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📖 Documentation

### Theme Toggle
- Located in top-right navbar
- Toggles between light (☀️) and dark (🌙) modes
- State persists with localStorage

### Language Selector
- Located in navbar
- Switch between English, Spanish, and Catalan
- Updates all text content dynamically

### AI Assistant (Digi)
- Floating widget (🤖) in bottom-right
- Opens chat interface
- Powered by `assets/js/assistant.js`

### Responsive Design
- Mobile-first approach
- Breakpoints defined in [assets/css/responsive.css](assets/css/responsive.css)
- Fully responsive from 320px to 4K screens

## 🐛 Troubleshooting

### Styles not loading?
- Hard refresh: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check browser console for errors

### Scripts not working?
- Ensure JavaScript is enabled
- Check browser console (F12) for errors
- Verify file paths are correct

### Images not showing?
- Verify image paths in HTML
- Check image files exist in `assets/images/`
- Use absolute paths from project root

## 📞 Contact

For questions or support, reach out through the contact form on the website or open an issue in the repository.

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

**Made with 💜 by [digitalpgs](https://github.com/digitalpgs)**