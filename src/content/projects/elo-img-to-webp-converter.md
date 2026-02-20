---
title: "Elo Image to WebP Converter"
description: "CLI para convertir todas las imágenes de tu proyecto a formato WebP con procesamiento paralelo via Worker Threads y reemplazo automático de referencias en código. Soporta JPG, PNG y GIF."
author: "hsvchcl"
authorUrl: "https://github.com/hsvchcl"
repoUrl: "https://github.com/hsvchcl/elo-img-to-webp-converter"
websiteUrl: "https://www.npmjs.com/package/elo-img-to-webp-converter"
tags: ["nodejs", "cli", "webp", "image-optimization", "converter"]
category: "CLI"
featured: false
publishDate: 2026-01-19
---

## Sobre Elo Image to WebP Converter

Herramienta CLI que escanea tu proyecto, convierte todas las imágenes (JPG, PNG, GIF) a WebP en paralelo y actualiza automáticamente las referencias en tu código.

### Características principales

- **Procesamiento paralelo**: Worker Threads para conversión concurrente.
- **Reemplazo automático**: Actualiza referencias en JS, TS, CSS, SCSS, HTML, Vue, Svelte, Astro.
- **Calidad configurable**: Control de calidad WebP (0-100) y tamaño de batch.
- **Dry-run**: Previsualiza cambios sin modificar archivos.
- **Keep original**: Opción para conservar las imágenes originales.
- **Soporta**: JPG, JPEG, PNG y GIF.

### Uso rápido

```bash
# Sin instalación
npx elo-img-to-webp-converter

# Con opciones
npx elo-img-to-webp-converter --quality 85 --workers 8 --batch-size 15

# Previsualizar cambios
npx elo-img-to-webp-converter --dry-run

# Conservar originales
npx elo-img-to-webp-converter --keep-original
```

### Opciones

| Opción | Corto | Descripción | Default |
|---|---|---|---|
| `--quality` | `-q` | Calidad WebP (0-100) | 80 |
| `--workers` | `-w` | Workers paralelos máx. | 4 |
| `--batch-size` | `-b` | Imágenes por batch | 10 |
| `--keep-original` | `-k` | Conservar originales | false |
| `--dry-run` | `-d` | Preview sin cambios | false |
| `--no-replace` | — | Omitir reemplazo de refs | false |

### Cómo funciona

1. **Scan**: Encuentra todas las imágenes (JPG, PNG, GIF) en tu proyecto.
2. **Convert**: Convierte a WebP en batches paralelos con Worker Threads.
3. **Replace**: Actualiza todas las referencias en archivos de código.
