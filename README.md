# 🚀 Saad Siddiqui — Developer Portfolio

A modern, responsive portfolio website built with React.js. Features smooth animations, interactive particle effects, a working contact form, and a clean dark-themed UI.

**Live Site:** [final-react-portfolio-one.vercel.app](https://final-react-portfolio-one.vercel.app)

---

## ✨ Features

- **Animated particle background** that reacts to mouse movement
- **Typewriter effect** cycling through roles in the hero section
- **Scroll-triggered animations** on every section
- **Animated skill bars** that fill when scrolled into view
- **Custom cursor** with hover expand effect
- **Sticky navbar** with active section highlighting
- **Working contact form** powered by EmailJS
- **Fully responsive** on all screen sizes
- **Smooth scrolling** between sections

---

## 🛠️ Built With

- [React.js](https://reactjs.org/) — UI framework
- [EmailJS](https://emailjs.com/) — Contact form email delivery
- [Vercel](https://vercel.com/) — Deployment and hosting
- Pure CSS animations — No animation libraries needed

---

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   └── Contact.jsx
│   ├── Cursor.jsx
│   ├── FadeIn.jsx
│   ├── Navbar.jsx
│   ├── Particles.jsx
│   ├── ProjectCard.jsx
│   └── SkillBar.jsx
├── data/
│   └── index.js        ← all portfolio content lives here
├── hooks/
│   ├── useScrollSpy.js
│   └── useTypewriter.js
├── styles/
│   └── globals.css
└── App.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm installed

### Installation

1. Clone the repo
```bash
git clone https://github.com/Saadsiddiqui10/final-react-portfolio.git
```

2. Navigate into the project
```bash
cd final-react-portfolio
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## ✏️ Customization

All portfolio content is stored in one place — `src/data/index.js`.

To update your projects, skills, or experience just edit that file:

```js
// Add or edit projects
export const PROJECTS = [
  {
    title: "Your Project",
    desc: "What it does.",
    tags: ["React", "Node.js"],
    color: "#f97316",
    demo: "https://your-live-site.com",
    code: "https://github.com/you/repo",
  },
];
```

---

## 📬 Contact Form Setup

This portfolio uses EmailJS to send emails without a backend.

1. Create a free account at [emailjs.com](https://emailjs.com)
2. Add your Service ID, Template ID, and Public Key to `src/components/sections/Contact.jsx`

```js
emailjs.sendForm('service_xxxxxx', 'template_xxxxxx', e.target, 'your_public_key')
```

---

## 📦 Deployment

This site is deployed on Vercel. Any push to the `main` branch triggers an automatic redeploy.

```bash
git add .
git commit -m "your message"
git push
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Connect

- **Email:** saadsiddiqui2002@outlook.com
- **GitHub:** [github.com/Saadsiddiqui10](https://github.com/Saadsiddiqui10)
- **LinkedIn:** [linkedin.com/in/saad-siddiqui](https://linkedin.com/in/saad-siddiqui)