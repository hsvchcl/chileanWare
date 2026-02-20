/**
 * Validates frontmatter of .md files in src/content/projects/
 * Used by CI to ensure contributor PRs follow the required format.
 *
 * Usage: node .github/scripts/validate-frontmatter.mjs <file1.md> [file2.md ...]
 * Exit code 0 = all valid, 1 = errors found
 */

import { readFileSync } from 'fs'

// ── Schema definition (mirrors src/content.config.ts) ───────────────
const VALID_CATEGORIES = [
  'CLI', 'Web', 'Mobile', 'API', 'Library', 'Framework',
  'DevTool', 'Data', 'AI/ML', 'IoT', 'Game', 'Other',
]

const REQUIRED_FIELDS = ['title', 'description', 'author', 'publishDate']
const OPTIONAL_FIELDS = ['authorUrl', 'repoUrl', 'websiteUrl', 'tags', 'logo', 'category', 'featured', 'sponsor']
const ALL_FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]
const URL_FIELDS = ['authorUrl', 'repoUrl', 'websiteUrl']

// ── Parse frontmatter ───────────────────────────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const lines = match[1].split('\n')
  const data = {}

  for (const line of lines) {
    // Handle array fields like tags: ["a", "b"]
    const kvMatch = line.match(/^(\w+):\s*(.*)$/)
    if (!kvMatch) continue

    const [, key, rawValue] = kvMatch
    let value = rawValue.trim()

    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    // Parse arrays
    if (value.startsWith('[')) {
      try {
        data[key] = JSON.parse(value)
      } catch {
        // Try YAML-style: ["a", "b"] with single quotes
        data[key] = value
          .replace(/^\[|\]$/g, '')
          .split(',')
          .map(s => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean)
      }
    }
    // Parse booleans
    else if (value === 'true') data[key] = true
    else if (value === 'false') data[key] = false
    // Keep as string
    else data[key] = value
  }

  return data
}

// ── Validate a single file ──────────────────────────────────────────
function validateFile(filePath) {
  const errors = []
  const warnings = []

  let content
  try {
    content = readFileSync(filePath, 'utf-8')
  } catch (e) {
    return { errors: [`Cannot read file: ${e.message}`], warnings }
  }

  // Check frontmatter exists
  if (!content.startsWith('---')) {
    errors.push('Missing frontmatter block (must start with ---)')
    return { errors, warnings }
  }

  const data = parseFrontmatter(content)
  if (!data) {
    errors.push('Invalid frontmatter format (must be enclosed between --- markers)')
    return { errors, warnings }
  }

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`Missing required field: "${field}"`)
    }
  }

  // Check for unknown fields
  for (const key of Object.keys(data)) {
    if (!ALL_FIELDS.includes(key)) {
      warnings.push(`Unknown field: "${key}" (will be ignored)`)
    }
  }

  // Validate title length
  if (data.title && data.title.length > 80) {
    errors.push(`"title" is too long (${data.title.length} chars, max 80)`)
  }

  // Validate description length
  if (data.description && data.description.length > 500) {
    errors.push(`"description" is too long (${data.description.length} chars, max 500)`)
  }

  // Validate URLs
  for (const field of URL_FIELDS) {
    if (data[field] && typeof data[field] === 'string') {
      try {
        new URL(data[field])
      } catch {
        errors.push(`"${field}" is not a valid URL: "${data[field]}"`)
      }
    }
  }

  // Validate tags (must be array)
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push('"tags" must be an array, e.g. ["typescript", "react"]')
    } else if (data.tags.length > 10) {
      errors.push(`"tags" has too many items (${data.tags.length}, max 10)`)
    }
  }

  // Validate category
  if (data.category !== undefined && !VALID_CATEGORIES.includes(data.category)) {
    errors.push(`"category" must be one of: ${VALID_CATEGORIES.join(', ')} (got "${data.category}")`)
  }

  // Validate booleans
  for (const field of ['featured', 'sponsor']) {
    if (data[field] !== undefined && typeof data[field] !== 'boolean') {
      errors.push(`"${field}" must be true or false (got "${data[field]}")`)
    }
  }

  // Validate publishDate
  if (data.publishDate) {
    const date = new Date(data.publishDate)
    if (isNaN(date.getTime())) {
      errors.push(`"publishDate" is not a valid date: "${data.publishDate}" (use YYYY-MM-DD format)`)
    }
  }

  // Validate filename matches convention (lowercase, hyphens)
  const filename = filePath.split('/').pop().replace('.md', '')
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(filename) && filename.length > 1) {
    warnings.push(`Filename "${filename}.md" should use lowercase and hyphens (e.g. "my-project.md")`)
  }

  // Check body content exists after frontmatter
  const bodyMatch = content.match(/^---[\s\S]*?---\r?\n([\s\S]*)$/)
  if (!bodyMatch || bodyMatch[1].trim().length < 50) {
    warnings.push('Body content is very short — consider adding a description of your project (at least a few paragraphs)')
  }

  // Contributors should not set featured or sponsor to true
  if (data.featured === true) {
    errors.push('"featured" cannot be set to true — this is managed by maintainers')
  }
  if (data.sponsor === true) {
    errors.push('"sponsor" cannot be set to true — this is managed by maintainers')
  }

  return { errors, warnings }
}

// ── Main ────────────────────────────────────────────────────────────
const files = process.argv.slice(2)

if (files.length === 0) {
  console.log('No files to validate.')
  process.exit(0)
}

let hasErrors = false

for (const file of files) {
  console.log(`\n📄 Validating: ${file}`)
  const { errors, warnings } = validateFile(file)

  for (const w of warnings) {
    console.log(`  ⚠️  ${w}`)
  }
  for (const e of errors) {
    console.log(`  ❌ ${e}`)
  }

  if (errors.length === 0) {
    console.log('  ✅ Valid!')
  } else {
    hasErrors = true
  }
}

console.log('')
if (hasErrors) {
  console.log('❌ Validation failed. Please fix the errors above.')
  console.log('')
  console.log('📖 Required frontmatter format:')
  console.log('---')
  console.log('title: "Project Name"')
  console.log('description: "Short description of your project"')
  console.log('author: "Your Name"')
  console.log('authorUrl: "https://github.com/your-user"')
  console.log('repoUrl: "https://github.com/your-user/your-repo"')
  console.log('websiteUrl: "https://your-project.cl"')
  console.log('tags: ["tag1", "tag2"]')
  console.log(`category: "${VALID_CATEGORIES.join('" | "')}"`)
  console.log('featured: false')
  console.log('publishDate: YYYY-MM-DD')
  console.log('---')
  process.exit(1)
} else {
  console.log('✅ All files passed validation!')
  process.exit(0)
}
