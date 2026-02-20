import { useState, useEffect, useCallback, useRef } from 'react'
import { translations, type Lang, type TranslationKey } from '../i18n/translations'

function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations['en'][key] ?? key
}

interface Props {
  lang?: Lang
}

export default function DotNav({ lang = 'en' }: Props) {
  const sections = [
    { id: 'inicio', label: t(lang, 'nav.home') },
    { id: 'proyectos', label: t(lang, 'nav.projects') },
    { id: 'contribuir', label: t(lang, 'nav.contribute') },
  ]

  const TOOLTIP_FLASH_DURATION = 2000
  const [active, setActive] = useState('inicio')
  const [hovered, setHovered] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [flashId, setFlashId] = useState<string | null>(null)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevActive = useRef(active)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const winH = window.innerHeight

    // Show dots only after scrolling a bit
    setVisible(scrollY > 100)

    // Determine which section is in view
    let current = 'inicio'
    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= winH * 0.4) {
          current = section.id
        }
      }
    }
    setActive(current)
  }, [])

  useEffect(() => {
    // Throttle scroll handler to ~60fps to reduce TBT
    let ticking = false
    const throttledScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
    }
    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  // Flash tooltip when active section changes (only when dots are visible)
  useEffect(() => {
    if (!visible) return
    if (active !== prevActive.current) {
      prevActive.current = active
      if (flashTimer.current) clearTimeout(flashTimer.current)
      setFlashId(active)
      flashTimer.current = setTimeout(() => setFlashId(null), TOOLTIP_FLASH_DURATION)
    }
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current)
    }
  }, [active, visible])

  // Flash on first appearance — wait a tick so active has settled
  const hasFlashedOnMount = useRef(false)
  useEffect(() => {
    if (visible && !hasFlashedOnMount.current) {
      hasFlashedOnMount.current = true
      // Use rAF to ensure scroll handler has fired and active is correct
      const raf = requestAnimationFrame(() => {
        setFlashId(prevActive.current)
        flashTimer.current = setTimeout(() => setFlashId(null), TOOLTIP_FLASH_DURATION)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [visible])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-5 transition-all duration-500 sm:flex"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: `translateY(-50%) translateX(${visible ? '0' : '12px'})`,
      }}
      aria-label={t(lang, 'nav.aria')}
    >
      {sections.map((section) => {
        const isActive = active === section.id
        const isHovered = hovered === section.id
        const showTooltip = isHovered || flashId === section.id

        return (
          <div key={section.id} className="group relative flex items-center">
            {/* Tooltip */}
            <div
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-border/50 bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md transition-all duration-300"
              style={{
                opacity: showTooltip ? 1 : 0,
                transform: `translateX(${showTooltip ? '0' : '8px'}) scale(${showTooltip ? 1 : 0.9})`,
              }}
            >
              {section.label}
              {/* Arrow */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="border-y-[5px] border-l-[5px] border-y-transparent border-l-border/50" />
              </div>
            </div>

            {/* Dot button */}
            <button
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => setHovered(section.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex h-8 w-8 items-center justify-center"
              aria-label={`${t(lang, 'nav.goto')} ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Outer ring (active) */}
              <span
                className="absolute inset-1 rounded-full border-2 transition-all duration-500 ease-out"
                style={{
                  borderColor: isActive ? 'oklch(0.63 0.26 29)' : 'transparent',
                  transform: `scale(${isActive ? 1 : 0.5})`,
                  opacity: isActive ? 1 : 0,
                }}
              />

              {/* Glow effect */}
              <span
                className="absolute inset-0 rounded-full transition-all duration-500"
                style={{
                  background: isActive
                    ? 'radial-gradient(circle, oklch(0.63 0.26 29 / 0.2), transparent 70%)'
                    : 'transparent',
                }}
              />

              {/* Dot */}
              <span
                className="relative z-10 block rounded-full transition-all duration-300 ease-out"
                style={{
                  width: isActive ? '10px' : isHovered ? '8px' : '6px',
                  height: isActive ? '10px' : isHovered ? '8px' : '6px',
                  backgroundColor: isActive
                    ? 'oklch(0.63 0.26 29)'
                    : isHovered
                      ? 'oklch(0.85 0 0)'
                      : 'oklch(0.55 0 0)',
                  boxShadow: isActive
                    ? '0 0 12px oklch(0.63 0.26 29 / 0.5)'
                    : 'none',
                }}
              />
            </button>
          </div>
        )
      })}

      {/* Connecting line */}
      <div
        className="pointer-events-none absolute left-1/2 top-4 -z-10 w-px -translate-x-1/2"
        style={{
          height: `${(sections.length - 1) * 52}px`,
          background: 'linear-gradient(to bottom, oklch(0.3 0 0), oklch(0.2 0 0))',
        }}
      />
    </nav>
  )
}
