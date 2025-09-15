# Mohammad Irfan - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, Bootstrap, and JavaScript featuring glassmorphic design, smooth animations, and dark/light theme toggle.

## 🚀 Features

### Design & UI
- **Glassmorphic Design**: Modern glassmorphic effects with blur and transparency
- **Dark/Light Theme**: Toggle between dark and light modes with smooth transitions
- **Responsive Layout**: Fully responsive design using Bootstrap 5 grid system
- **Modern Typography**: Clean Poppins font family for excellent readability
- **Gradient Accents**: Beautiful blue-purple/cyan-indigo gradients throughout

### Animations & Interactions
- **Typewriter Effect**: Dynamic typing animation for hero section roles
- **Scroll Animations**: AOS (Animate On Scroll) library integration
- **Floating Elements**: Subtle floating animations for profile image
- **Hover Effects**: Smooth hover animations on cards, buttons, and links
- **Ripple Effects**: Material Design-inspired ripple effects on buttons
- **Loading Animation**: Elegant loader with spinning gradient ring

### Sections
1. **Hero Section**: Full viewport with animated particles, typewriter effect, and floating profile image
2. **About Section**: Split layout with coding platform links (LeetCode, Codeforces, CodeChef, GeeksforGeeks)
3. **Tools Section**: Technology showcase with HTML, CSS, JavaScript, Java, Python, MySQL, C++, C, MS Excel, Git
4. **Projects Section**: Project showcase featuring UNO Multiplayer Game and Books Showcase
5. **Education Section**: Timeline with PW Institute of Innovation and IIT Madras
6. **Contact Section**: Animated contact form with validation
7. **Footer**: Social links (GitHub, LinkedIn, Gmail) and copyright information

### Technical Features
- **Smooth Scrolling**: Native smooth scroll behavior for navigation
- **Navbar Effects**: Blur-glass effect on scroll with active link highlighting
- **Counter Animations**: Animated number counters for statistics (DSA Problems, Projects, Events, Hackathons)
- **Form Handling**: Contact form with loading states and notifications
- **Theme Persistence**: Theme preference saved in localStorage
- **Performance Optimized**: Throttled scroll events and efficient animations
- **Responsive Design**: Mobile-first approach with Bootstrap 5

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS with glassmorphic styling
├── script.js           # JavaScript for animations and interactions
├── demo.html           # Demo template file (optional)
├── images/             # Image assets folder
│   ├── profile_img.jpg # Profile image
│   ├── uno_image.jpg   # UNO Multiplayer Game project image
│   ├── show_case.png   # Books Showcase project image
│   └── README.md       # Images folder documentation
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Custom properties, flexbox, grid, animations, and glassmorphic effects
- **Bootstrap 5**: Responsive grid system and components
- **JavaScript (ES6+)**: Modern JavaScript with modules and async/await
- **AOS Library**: Animate On Scroll for scroll-triggered animations
- **Typed.js**: Typewriter effect for dynamic text animation
- **Font Awesome**: Icon library for social media and UI icons
- **Google Fonts**: Poppins font family for typography

## 🎨 Color Scheme

### Dark Theme
- Primary Background: `#0a0a0a`
- Secondary Background: `#111111`
- Glass Background: `rgba(255, 255, 255, 0.05)`
- Primary Color: `#6366f1` (Indigo)
- Secondary Color: `#8b5cf6` (Purple)
- Accent Color: `#06b6d4` (Cyan)

### Light Theme
- Primary Background: `#ffffff`
- Secondary Background: `#f8fafc`
- Glass Background: `rgba(0, 0, 0, 0.05)`
- Same accent colors with adjusted text colors

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Images are already included** in the `images/` folder:
   - `profile_img.jpg` - Professional headshot
   - `uno_image.jpg` - UNO Multiplayer Game project
   - `show_case.png` - Books Showcase project
3. **Content is customized** in `index.html`:
   - Personal information for Mohammad Irfan
   - Project descriptions for UNO Game and Books Showcase
   - Social media links (GitHub, LinkedIn, Gmail)
   - Contact information and education details
4. **Open** `index.html` in your web browser or deploy to Netlify

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px
- **Large Desktop**: > 992px

## 🎯 Customization

### Colors
Edit CSS custom properties in `:root` and `[data-theme="light"]` sections of `styles.css`

### Animations
Modify animation durations and easing functions in the CSS and JavaScript files

### Content
Update text content, links, and images in `index.html`

### Typography
Change the Google Fonts import in `index.html` to use different fonts

## 🌟 Key Features Implementation

### Glassmorphic Effects
```css
background: var(--bg-glass);
backdrop-filter: blur(20px);
border: 1px solid var(--border-color);
```

### Typewriter Animation
```javascript
const roles = ['Frontend Developer', 'UI/UX Designer', 'Full Stack Developer'];
// Dynamic typing effect with customizable speed and roles
```

### Smooth Scrolling
```css
html { scroll-behavior: smooth; }
```

### Theme Toggle
```javascript
// Persistent theme switching with localStorage
localStorage.setItem('theme', currentTheme);
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Contact

- **Email**: mohammadirfan25092004@gmail.com
- **GitHub**: [mohdirfan2509](https://github.com/mohdirfan2509)
- **LinkedIn**: [Mohammad Irfan](https://www.linkedin.com/in/mohammad-irfan-638a2b308/)

## 🎓 Education

- **PW Institute of Innovation, Bengaluru** - 4-Year UG Programme in CS & AI (2024 - Present)
- **IIT Madras** - BS in Data Science & Applications (2024 - Present)

## 🏆 Achievements

- **140+ DSA Problems Solved** on various platforms
- **2 Completed Projects** with live deployments
- **10+ Tech Workshops & Events** attended
- **1 Hackathon** participated

---

**Made by Mohammad Irfan**
