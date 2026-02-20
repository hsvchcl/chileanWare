# 🇨🇱 chileanWare

> A curated gallery of software projects made in Chile — Discover, explore and contribute to the Chilean tech ecosystem.

[![Live Site](https://img.shields.io/badge/Live-chileanware.web.app-FF5D01?style=for-the-badge&logo=firebase&logoColor=white)](https://chileanware.web.app)

![Astro](https://img.shields.io/badge/Astro_5-FF5D01?style=flat-square&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)

## ✨ Features

- **3D Interactive Globe** — Animated rotating Earth with Chile highlighted in red, built with Canvas 2D
- **18 Chilean Projects** — Curated collection of startups, open source tools and npm packages
- **i18n** — Full English/Spanish support with automatic locale routing
- **Dark/Light Mode** — Theme toggle with anti-FOUC and persistence across navigations
- **View Transitions** — Smooth card-morph animations between pages
- **Full SEO** — OG/Twitter cards, JSON-LD, canonical, hreflang, sitemap, robots.txt
- **Responsive** — Mobile-first design with compact controls on small screens
- **Sponsor & Featured Chips** — Special badges for highlighted projects
- **Category Filtering** — Filter projects by category with animated chips

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Deploy to Firebase
firebase deploy --only hosting
```

## 📦 Add a New Project

Adding a project to chileanWare is simple — just create a `.md` file in `src/content/projects/`.

### 1. Create the file

```bash
touch src/content/projects/my-project.md
```

### 2. Add frontmatter and content

```markdown
---
title: "My Project"
description: "A short, clear description of your project."
author: "Your Name"
authorUrl: "https://github.com/your-username"
repoUrl: "https://github.com/your-username/my-project"
websiteUrl: "https://my-project.cl"
tags: ["typescript", "react", "open-source"]
category: "Web"
featured: false
sponsor: false
publishDate: 2024-01-01
---

## About My Project

Describe your project here with full **Markdown** support.
```

### 3. Frontmatter Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | ✅ | Project name |
| `description` | `string` | ✅ | Short description (shown on card) |
| `author` | `string` | ✅ | Author or team name |
| `authorUrl` | `string` | ❌ | Author profile URL |
| `repoUrl` | `string` | ❌ | Repository URL |
| `websiteUrl` | `string` | ❌ | Project website URL |
| `tags` | `string[]` | ❌ | Technologies (e.g. `["react", "typescript"]`) |
| `category` | `enum` | ❌ | Project category (see below) |
| `featured` | `boolean` | ❌ | Mark as featured project |
| `sponsor` | `boolean` | ❌ | Show sponsor badge |
| `publishDate` | `date` | ✅ | Publication date |

### 4. Available Categories

| Category | Emoji | Description |
|----------|-------|-------------|
| `CLI` | ⌨️ | Command-line tools |
| `Web` | 🌐 | Web apps & platforms |
| `Mobile` | 📱 | Mobile apps |
| `API` | 🔌 | APIs & services |
| `Library` | 📦 | Libraries & packages |
| `Framework` | 🏗️ | Frameworks |
| `DevTool` | 🛠️ | Developer tools |
| `Data` | 📊 | Data & analytics |
| `AI/ML` | 🤖 | Artificial intelligence |
| `IoT` | 📡 | Internet of Things |
| `Game` | 🎮 | Games |
| `Other` | 💡 | Other |

### 5. Submit a Pull Request

Fork the repo, add your `.md` file and send a PR! 🎉

## 🏗️ Tech Stack

| Technology | Role |
|------------|------|
| [Astro 5](https://astro.build) | Static site framework with View Transitions |
| [React 19](https://react.dev) | Interactive components (Globe, Grid, DotNav) |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling with `@custom-variant` |
| [shadcn/ui](https://ui.shadcn.com) | UI component primitives |
| [Firebase Hosting](https://firebase.google.com) | Static hosting & deployment |

## 📁 Project Structure

```
chileanWare/
├── src/
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── CodeBackground.tsx # 3D globe animation (Canvas 2D)
│   │   ├── ProjectsGrid.tsx   # Filterable project grid (React)
│   │   ├── DotNav.tsx         # Floating dot navigation
│   │   ├── Hero.astro         # Hero section with dynamic stats
│   │   ├── Contribute.astro   # Call-to-action section
│   │   ├── Sponsors.astro     # Sponsors section
│   │   ├── Footer.astro       # Footer
│   │   ├── LangSwitch.astro   # EN/ES language toggle
│   │   └── ThemeToggle.astro  # Dark/light mode toggle
│   ├── content/
│   │   └── projects/          # 👈 Project .md files go here
│   ├── i18n/
│   │   └── translations.ts   # EN/ES translations
│   ├── layouts/
│   │   └── Layout.astro       # Root layout (SEO, ViewTransitions)
│   ├── pages/
│   │   ├── index.astro        # English landing
│   │   ├── es/index.astro     # Spanish landing
│   │   ├── proyecto/[slug].astro
│   │   └── es/proyecto/[slug].astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts      # Content collection schema
├── public/
│   ├── og-default.png         # OG image (1200×630)
│   ├── favicon.svg            # Chilean flag favicon
│   └── robots.txt
├── firebase.json
├── astro.config.mjs
└── package.json
```

## 🌐 Current Projects

Buda.com · Fintual · Cornershop · Betterfly · NotCo (Giuseppe) · Houm · Chask · Osito · NoamVC · Cumplo · Xepelin · Khipu · Global66 · Destácame · Platanus · Chilean RUT Formatter · Chilean Territorial Divisions · Elo Image to WebP Converter

## 📄 License

MIT — Made with ❤️ from Chile 🇨🇱
