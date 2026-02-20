export const defaultLang = 'en' as const
export const supportedLangs = ['en', 'es'] as const
export type Lang = (typeof supportedLangs)[number]

export const translations = {
  en: {
    // Layout
    'site.title': 'chileanWare — Software made in Chile 🇨🇱',
    'site.description': 'A curated gallery of software projects created by Chilean developers. Discover, explore and contribute to the Chilean tech ecosystem.',

    // Hero
    'hero.badge': 'Active and growing community',
    'hero.title.prefix': 'Software made in',
    'hero.title.chile': 'Chile',
    'hero.description.line1': 'Discover, explore and contribute to the Chilean software ecosystem.',
    'hero.description.line2': 'A curated gallery of projects created by developers from all over Chile.',
    'hero.cta.explore': 'Explore projects',
    'hero.cta.publish': 'Publish my project',
    'hero.stat.projects': 'Projects',
    'hero.stat.categories': 'Categories',
    'hero.stat.chilean': 'Chilean',

    // DotNav
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.contribute': 'Contribute',
    'nav.sponsors': 'Sponsors',
    'nav.aria': 'Section navigation',
    'nav.goto': 'Go to',

    // ProjectsGrid
    'projects.heading': 'All projects',
    'projects.featured': '⭐ Featured',
    'projects.by': 'by',
    'projects.project_singular': 'project',
    'projects.project_plural': 'projects',
    'projects.in': 'in',
    'projects.created_in_chile': 'created in Chile',
    'projects.all': '🌎 All',
    'projects.scroll_left': 'Scroll left',
    'projects.scroll_right': 'Scroll right',
    'projects.empty': 'No projects in this category yet.',
    'projects.view_all': 'View all projects',
    'projects.repo': 'Repository',
    'projects.website': 'Website',

    // Project detail
    'detail.back': 'Back to projects',
    'detail.repo': 'Repository',
    'detail.visit': 'Visit site',

    // Contribute
    'contribute.heading': 'Have a Chilean project?',
    'contribute.description': 'Publishing your project is easy. Just create a',
    'contribute.description2': 'file with the information and submit a Pull Request.',
    'contribute.format': 'File format',
    'contribute.step1.title': '1. Create the file',
    'contribute.step1.desc': 'Create a',
    'contribute.step1.desc2': 'file in',
    'contribute.step2.title': '2. Fill the frontmatter',
    'contribute.step2.desc': 'Add title, description, tags, category and more.',
    'contribute.step3.title': '3. Submit a PR',
    'contribute.step3.desc': 'Make a Pull Request and your project will appear in the gallery.',
    'contribute.cta': 'Contribute on GitHub',
    'contribute.example.title': 'My Project',
    'contribute.example.description': 'A short description of your project',
    'contribute.example.author': 'Your Name',
    'contribute.example.about': '## About your project',
    'contribute.example.body1': 'Describe your project here using Markdown.',
    'contribute.example.body2': 'You can use **bold**, *italic*, lists,',
    'contribute.example.body3': 'code blocks and more.',

    // Sponsors
    'sponsors.badge': 'Support the Chilean tech ecosystem',
    'sponsors.heading': 'Become a Sponsor',
    'sponsors.description': 'Your support helps maintain this platform, showcase Chilean projects and strengthen the developer community.',
    'sponsors.per_month': '/ month',
    'sponsors.tier1.name': 'Supporter',
    'sponsors.tier1.benefit1': 'Name on the website',
    'sponsors.tier1.benefit2': 'Sponsor badge',
    'sponsors.tier1.benefit3': 'Community access',
    'sponsors.tier1.cta': 'Support',
    'sponsors.tier2.badge': '⭐ Popular',
    'sponsors.tier2.name': 'Backer',
    'sponsors.tier2.benefit1': 'Everything above',
    'sponsors.tier2.benefit2': 'Logo in the README',
    'sponsors.tier2.benefit3': 'Featured project for 1 month',
    'sponsors.tier2.benefit4': 'Social media mention',
    'sponsors.tier2.cta': 'Become a Backer',
    'sponsors.tier3.name': 'Gold Sponsor',
    'sponsors.tier3.benefit1': 'Everything above',
    'sponsors.tier3.benefit2': 'Large logo on landing',
    'sponsors.tier3.benefit3': 'Feature priority',
    'sponsors.tier3.benefit4': 'Direct support',
    'sponsors.tier3.cta': 'Become Gold Sponsor',
    'sponsors.current': 'Current sponsors',
    'sponsors.first': 'Be the first to support chileanWare 💛',
    'sponsors.one_time': 'Prefer a one-time contribution? You can also make a',
    'sponsors.donation': 'one-time donation',

    // Footer
    'footer.description': 'A curated gallery of software created by Chilean developers. Celebrating Chile\'s tech innovation 🇨🇱',
    'footer.nav': 'Navigation',
    'footer.nav.projects': 'Projects',
    'footer.nav.categories': 'Categories',
    'footer.nav.contribute': 'Contribute',
    'footer.community': 'Community',
    'footer.copyright': 'chileanWare. Made with ❤️ from Chile.',
    'footer.built': 'Built with',
    'footer.by': 'by',

    // Language
    'lang.switch': 'ES',
    'lang.label': 'Español',
  },

  es: {
    // Layout
    'site.title': 'chileanWare — Software hecho en Chile 🇨🇱',
    'site.description': 'Galería de proyectos de software creados por desarrolladores chilenos. Descubre, explora y contribuye al ecosistema tech chileno.',

    // Hero
    'hero.badge': 'Comunidad activa y creciendo',
    'hero.title.prefix': 'Software hecho en',
    'hero.title.chile': 'Chile',
    'hero.description.line1': 'Descubre, explora y contribuye al ecosistema de software chileno.',
    'hero.description.line2': 'Una galería curada de proyectos creados por desarrolladores de todo Chile.',
    'hero.cta.explore': 'Explorar proyectos',
    'hero.cta.publish': 'Publicar mi proyecto',
    'hero.stat.projects': 'Proyectos',
    'hero.stat.categories': 'Categorías',
    'hero.stat.chilean': 'Chileno',

    // DotNav
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.contribute': 'Contribuir',
    'nav.sponsors': 'Sponsors',
    'nav.aria': 'Navegación por secciones',
    'nav.goto': 'Ir a',

    // ProjectsGrid
    'projects.heading': 'Todos los proyectos',
    'projects.featured': '⭐ Destacado',
    'projects.by': 'por',
    'projects.project_singular': 'proyecto',
    'projects.project_plural': 'proyectos',
    'projects.in': 'en',
    'projects.created_in_chile': 'creados en Chile',
    'projects.all': '🌎 Todos',
    'projects.scroll_left': 'Scroll izquierda',
    'projects.scroll_right': 'Scroll derecha',
    'projects.empty': 'No hay proyectos en esta categoría aún.',
    'projects.view_all': 'Ver todos los proyectos',
    'projects.repo': 'Repositorio',
    'projects.website': 'Sitio web',

    // Project detail
    'detail.back': 'Volver a proyectos',
    'detail.repo': 'Repositorio',
    'detail.visit': 'Visitar sitio',

    // Contribute
    'contribute.heading': '¿Tienes un proyecto chileno?',
    'contribute.description': 'Publicar tu proyecto es fácil. Solo crea un archivo',
    'contribute.description2': 'con la información y envía un Pull Request.',
    'contribute.format': 'Formato del archivo',
    'contribute.step1.title': '1. Crea el archivo',
    'contribute.step1.desc': 'Crea un archivo',
    'contribute.step1.desc2': 'en',
    'contribute.step2.title': '2. Completa el frontmatter',
    'contribute.step2.desc': 'Agrega título, descripción, tags, categoría y más.',
    'contribute.step3.title': '3. Envía un PR',
    'contribute.step3.desc': 'Haz un Pull Request y tu proyecto aparecerá en la galería.',
    'contribute.cta': 'Contribuir en GitHub',
    'contribute.example.title': 'Mi Proyecto',
    'contribute.example.description': 'Descripción corta de tu proyecto',
    'contribute.example.author': 'Tu Nombre',
    'contribute.example.about': '## Sobre tu proyecto',
    'contribute.example.body1': 'Describe tu proyecto aquí usando Markdown.',
    'contribute.example.body2': 'Puedes usar **negrita**, *cursiva*, listas,',
    'contribute.example.body3': 'bloques de código y más.',

    // Sponsors
    'sponsors.badge': 'Apoya el ecosistema tech chileno',
    'sponsors.heading': 'Sé parte como Sponsor',
    'sponsors.description': 'Tu apoyo ayuda a mantener esta plataforma, visibilizar proyectos chilenos y fortalecer la comunidad de desarrolladores.',
    'sponsors.per_month': '/ mes',
    'sponsors.tier1.name': 'Supporter',
    'sponsors.tier1.benefit1': 'Nombre en la web',
    'sponsors.tier1.benefit2': 'Badge de sponsor',
    'sponsors.tier1.benefit3': 'Acceso a la comunidad',
    'sponsors.tier1.cta': 'Apoyar',
    'sponsors.tier2.badge': '⭐ Popular',
    'sponsors.tier2.name': 'Backer',
    'sponsors.tier2.benefit1': 'Todo lo anterior',
    'sponsors.tier2.benefit2': 'Logo en el README',
    'sponsors.tier2.benefit3': 'Proyecto destacado 1 mes',
    'sponsors.tier2.benefit4': 'Mención en redes sociales',
    'sponsors.tier2.cta': 'Ser Backer',
    'sponsors.tier3.name': 'Gold Sponsor',
    'sponsors.tier3.benefit1': 'Todo lo anterior',
    'sponsors.tier3.benefit2': 'Logo grande en landing',
    'sponsors.tier3.benefit3': 'Prioridad en features',
    'sponsors.tier3.benefit4': 'Soporte directo',
    'sponsors.tier3.cta': 'Ser Gold Sponsor',
    'sponsors.current': 'Sponsors actuales',
    'sponsors.first': 'Sé el primero en apoyar chileanWare 💛',
    'sponsors.one_time': '¿Prefieres un aporte único? También puedes hacer una',
    'sponsors.donation': 'donación puntual',

    // Footer
    'footer.description': 'Galería curada de software creado por desarrolladores chilenos. Celebrando la innovación tech de Chile 🇨🇱',
    'footer.nav': 'Navegación',
    'footer.nav.projects': 'Proyectos',
    'footer.nav.categories': 'Categorías',
    'footer.nav.contribute': 'Contribuir',
    'footer.community': 'Comunidad',
    'footer.copyright': 'chileanWare. Hecho con ❤️ desde Chile.',
    'footer.built': 'Construido con',
    'footer.by': 'por',

    // Language
    'lang.switch': 'EN',
    'lang.label': 'English',
  },
} as const

export type TranslationKey = keyof (typeof translations)['en']
