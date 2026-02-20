---
title: "Chilean Territorial Divisions"
description: "Librería TypeScript con las divisiones político-administrativas de Chile: 16 regiones, 56 provincias y 346 comunas. Incluye códigos CUT e ISO 3166-2, helpers para selects en cascada y búsqueda de comunas."
author: "hsvchcl"
authorUrl: "https://github.com/hsvchcl"
repoUrl: "https://github.com/hsvchcl/chilean-territorial-divisions"
websiteUrl: "https://www.npmjs.com/package/chilean-territorial-divisions"
tags: ["typescript", "npm", "chile", "geography", "comunas", "regiones"]
category: "Library"
featured: false
publishDate: 2026-01-19
---

## Sobre Chilean Territorial Divisions

Librería TypeScript con la data completa de las divisiones político-administrativas de Chile. Zero dependencias, tipado completo, y helpers listos para construir selects en cascada.

### Datos incluidos

- **16 regiones** con número romano e ISO 3166-2:CL
- **56 provincias**
- **346 comunas** con Código Único Territorial (CUT)

### Características principales

- **Búsqueda de regiones**: Por número romano, código ISO o nombre parcial.
- **Búsqueda de comunas**: Por código CUT o texto libre (case-insensitive).
- **Helpers para selects**: `getRegionOptions()`, `getProvinciaOptions()`, `getComunaOptions()` retornan `{label, value}` listos para `<select>`.
- **Zero dependencias**: Sin overhead, 362 kB desempaquetado.
- **TypeScript nativo**: Interfaces completas para Region, Provincia, Comuna y SelectOption.
- **Dual module**: ESM y CommonJS.

### Instalación

```bash
npm install chilean-territorial-divisions
```

### Uso rápido

```typescript
import {
  getRegiones,
  getRegionByNumber,
  getComunaByCode,
  searchComunas,
} from 'chilean-territorial-divisions';

// Todas las regiones
const regiones = getRegiones(); // 16 regiones

// Buscar región por número
const rm = getRegionByNumber('XIII');
console.log(rm?.region); // "Región Metropolitana de Santiago"

// Buscar comuna por código CUT
const santiago = getComunaByCode('13101');
console.log(santiago?.comuna.name); // "Santiago"

// Buscar comunas por nombre
const results = searchComunas('viña');
console.log(results[0].comuna.name); // "Viña del Mar"
```

### API

- `getRegiones()` — Todas las regiones.
- `getRegionByNumber(number)` — Buscar por número romano.
- `getRegionByISO(iso)` — Buscar por código ISO 3166-2.
- `getProvincias(regionNumber)` — Provincias de una región.
- `getComunas(regionNumber, provinciaName?)` — Comunas de una región/provincia.
- `getComunaByCode(code)` — Buscar comuna por código CUT.
- `searchComunas(query)` — Búsqueda de texto.
- `getRegionOptions()` / `getProvinciaOptions()` / `getComunaOptions()` — Helpers para selects.
