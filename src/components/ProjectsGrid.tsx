import { useState, useRef, useEffect } from 'react'
import { translations, type Lang, type TranslationKey } from '../i18n/translations'

function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations['en'][key] ?? key
}

interface Project {
  title: string
  description: string
  slug: string
  author: string
  tags: string[]
  category: string
  featured?: boolean
  websiteUrl?: string
  repoUrl?: string
}

interface Category {
  name: string
  count: number
  icon: string
}

interface Props {
  projects: Project[]
  categories: Category[]
  lang?: Lang
}

const categoryIcons: Record<string, string> = {
  'CLI': '⌨️', 'Web': '🌐', 'Mobile': '📱', 'API': '🔌',
  'Library': '📦', 'Framework': '🏗️', 'DevTool': '🛠️', 'Data': '📊',
  'AI/ML': '🤖', 'IoT': '📡', 'Game': '🎮', 'Other': '💡',
}

function ProjectCard({ title, description, slug, author, tags, category, featured, websiteUrl, repoUrl, lang = 'en' }: Project & { lang?: Lang }) {
  const prefix = lang === 'en' ? '' : `/${lang}`
  return (
    <article
      className="group relative flex flex-col rounded-xl border border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-primary/5"
      style={{
        viewTransitionName: `card-${slug}`,
        WebkitTransform: 'translateZ(0)',
      } as React.CSSProperties}
    >
      {featured && (
        <div className="absolute -top-3 right-4 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            {t(lang, 'projects.featured')}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-lg">
              {categoryIcons[category] || '💡'}
            </div>
            <div>
              <h3
                className="font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors"
              >
                <a href={`${prefix}/proyecto/${slug}`} className="after:absolute after:inset-0">
                  {title}
                </a>
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{t(lang, 'projects.by')} {author}</p>
            </div>
          </div>
        </div>
        <p
          className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3"
        >
          {description}
        </p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-md border border-border/50 bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs text-muted-foreground">
              +{tags.length - 4}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-border/40 pt-4">
          <span
            className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
          >
            {category}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer"
                className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label={t(lang, 'projects.repo')} onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer"
                className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label={t(lang, 'projects.website')} onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsGrid({ projects, categories, lang = 'en' }: Props) {
  const [active, setActive] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const filtered = active ? projects.filter(p => p.category === active) : projects

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  // Sort: with active ones first that have projects
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count)

  return (
    <section id="proyectos" className="border-b border-border/40">
      <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">{t(lang, 'projects.heading')}</h2>
          <p className="text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? t(lang, 'projects.project_singular') : t(lang, 'projects.project_plural')} {active ? `${t(lang, 'projects.in')} ${active}` : t(lang, 'projects.created_in_chile')}.
          </p>
        </div>

        {/* Category chips carousel */}
        <div className="relative mb-10">
          {/* Left fade + arrow */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 z-10 flex h-full items-center">
              <div className="pointer-events-none h-full w-12 bg-gradient-to-r from-background to-transparent" />
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent"
                aria-label={t(lang, 'projects.scroll_left')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
            </div>
          )}

          {/* Scrollable chips */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* "Todos" chip */}
            <button
              onClick={() => setActive(null)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all
                ${!active
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border/60 bg-card/50 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground'
                }`}
            >
              {t(lang, 'projects.all')}
              <span className={`ml-0.5 text-xs ${!active ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}>
                {projects.length}
              </span>
            </button>

            {sortedCategories.map(({ name, count, icon }) => (
              <button
                key={name}
                onClick={() => setActive(active === name ? null : name)}
                disabled={count === 0}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all
                  ${active === name
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : count === 0
                      ? 'border-border/30 bg-card/20 text-muted-foreground/40 cursor-not-allowed'
                      : 'border-border/60 bg-card/50 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground'
                  }`}
              >
                <span>{icon}</span>
                {name}
                <span className={`ml-0.5 text-xs ${active === name ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Right fade + arrow */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 z-10 flex h-full items-center">
              <div className="pointer-events-none h-full w-12 bg-gradient-to-l from-background to-transparent" />
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent"
                aria-label={t(lang, 'projects.scroll_right')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} {...project} lang={lang} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="mb-3 text-4xl">🔍</span>
            <p className="text-lg font-medium text-muted-foreground">{t(lang, 'projects.empty')}</p>
            <button onClick={() => setActive(null)} className="mt-4 text-sm text-primary underline underline-offset-4 hover:text-primary/80">
              {t(lang, 'projects.view_all')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
