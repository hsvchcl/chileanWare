import { defaultLang, supportedLangs, translations, type Lang, type TranslationKey } from './translations'

/**
 * Detect the language from a URL pathname.
 * - `/es/…`  → 'es'
 * - anything else → 'en' (default)
 */
export function getLangFromUrl(url: URL | string): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname
  const [, maybeLang] = pathname.split('/')
  if (supportedLangs.includes(maybeLang as Lang) && maybeLang !== defaultLang) {
    return maybeLang as Lang
  }
  return defaultLang
}

/**
 * Get a translate function scoped to a language.
 *
 * Usage:
 *   const t = useTranslations('es')
 *   t('hero.badge') // → "Comunidad activa y creciendo"
 */
export function useTranslations(lang: Lang) {
  const dict = translations[lang]
  return function t(key: TranslationKey): string {
    return dict[key] ?? translations[defaultLang][key] ?? key
  }
}

/**
 * Get the localized path prefix for a given language.
 * - 'en' → '' (default, no prefix)
 * - 'es' → '/es'
 */
export function getLangPrefix(lang: Lang): string {
  return lang === defaultLang ? '' : `/${lang}`
}

/**
 * Build a localized href.
 * - localizeHref('/proyecto/fintual', 'es') → '/es/proyecto/fintual'
 * - localizeHref('/proyecto/fintual', 'en') → '/proyecto/fintual'
 */
export function localizeHref(href: string, lang: Lang): string {
  // Strip existing lang prefix if present
  let clean = href
  for (const l of supportedLangs) {
    if (l !== defaultLang && clean.startsWith(`/${l}/`)) {
      clean = clean.slice(l.length + 1)
      break
    }
    if (l !== defaultLang && clean === `/${l}`) {
      clean = '/'
      break
    }
  }
  const prefix = getLangPrefix(lang)
  if (clean === '/') return prefix || '/'
  return `${prefix}${clean}`
}

/**
 * Get the alternate language for the switcher.
 */
export function getAlternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en'
}

/**
 * Get the locale code for date formatting.
 */
export function getDateLocale(lang: Lang): string {
  return lang === 'es' ? 'es-CL' : 'en-US'
}

export { defaultLang, supportedLangs, type Lang, type TranslationKey }
