# 🇨🇱 chileanWare

> Galería de software hecho en Chile — Descubre, explora y contribuye al ecosistema tech chileno.

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📦 Agregar un nuevo proyecto

Agregar un proyecto a chileanWare es muy fácil. Solo necesitas crear un archivo `.md` en la carpeta `src/content/projects/`.

### 1. Crea el archivo

```bash
touch src/content/projects/mi-proyecto.md
```

### 2. Agrega el frontmatter y contenido

```markdown
---
title: "Mi Proyecto"
description: "Una descripción corta y clara de tu proyecto."
author: "Tu Nombre"
authorUrl: "https://github.com/tu-usuario"
repoUrl: "https://github.com/tu-usuario/mi-proyecto"
websiteUrl: "https://mi-proyecto.cl"
tags: ["typescript", "react", "open-source"]
category: "Web"
featured: false
publishDate: 2024-01-01
---

## Sobre Mi Proyecto

Aquí puedes describir tu proyecto con todo el detalle que quieras.
Soporta **Markdown completo** incluyendo:

- Listas
- **Negrita** y *cursiva*
- [Links](https://ejemplo.com)
- Bloques de código
- Imágenes
- Y más...
```

### 3. Campos del frontmatter

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | `string` | ✅ | Nombre del proyecto |
| `description` | `string` | ✅ | Descripción corta (se muestra en la card) |
| `author` | `string` | ✅ | Nombre del autor o equipo |
| `authorUrl` | `string` | ❌ | URL del perfil del autor |
| `repoUrl` | `string` | ❌ | URL del repositorio |
| `websiteUrl` | `string` | ❌ | URL del sitio web del proyecto |
| `tags` | `string[]` | ❌ | Tags/tecnologías (ej: `["react", "typescript"]`) |
| `category` | `enum` | ❌ | Categoría del proyecto (ver abajo) |
| `featured` | `boolean` | ❌ | Marcar como proyecto destacado |
| `publishDate` | `date` | ✅ | Fecha de publicación |

### 4. Categorías disponibles

- `CLI` — Herramientas de línea de comandos
- `Web` — Aplicaciones y plataformas web
- `Mobile` — Apps móviles
- `API` — APIs y servicios
- `Library` — Librerías y paquetes
- `Framework` — Frameworks
- `DevTool` — Herramientas de desarrollo
- `Data` — Data y analytics
- `AI/ML` — Inteligencia artificial y Machine Learning
- `IoT` — Internet of Things
- `Game` — Videojuegos
- `Other` — Otros

### 5. Envía un Pull Request

¡Haz fork del repo, agrega tu archivo `.md` y envía un PR! 🎉

## 🏗️ Stack tecnológico

- **[Astro](https://astro.build)** — Framework web estático
- **[React](https://react.dev)** — Componentes interactivos
- **[Tailwind CSS v4](https://tailwindcss.com)** — Estilos utilitarios
- **[shadcn/ui](https://ui.shadcn.com)** — Componentes UI

## 📁 Estructura del proyecto

```
chileanWare/
├── src/
│   ├── components/        # Componentes UI (Astro + React)
│   │   ├── ui/            # Componentes shadcn/ui
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── Categories.astro
│   │   ├── Contribute.astro
│   │   └── Footer.astro
│   ├── content/
│   │   └── projects/      # 👈 Aquí van los proyectos (.md)
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── proyecto/
│   │       └── [slug].astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts  # Schema de validación
├── public/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 📄 Licencia

MIT — Hecho con ❤️ desde Chile 🇨🇱
