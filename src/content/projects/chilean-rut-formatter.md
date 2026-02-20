---
title: "Chilean RUT Formatter"
description: "Librería TypeScript de alto rendimiento para formatear y validar RUTs chilenos (Rol Único Tributario). Cero dependencias, tree-shakeable, con sanitización de input y protección DoS."
author: "hsvchcl"
authorUrl: "https://github.com/hsvchcl"
repoUrl: "https://github.com/hsvchcl/chilean-rut-formatter"
websiteUrl: "https://www.npmjs.com/package/chilean-rut-formatter"
tags: ["typescript", "npm", "rut", "validation", "formatter", "chile"]
category: "Library"
featured: false
publishDate: 2026-01-19
---

## Sobre Chilean RUT Formatter

Librería TypeScript ligera y segura para trabajar con RUTs chilenos. Valida, formatea, limpia y calcula dígitos verificadores usando el algoritmo oficial Módulo 11.

### Características principales

- **Validación completa**: Algoritmo Módulo 11 oficial con resultados detallados o booleano simple.
- **Formateo flexible**: Opciones configurables para puntos, guiones y mayúsculas.
- **Formateo en tiempo real**: `formatRutPartial` ideal para formatear mientras el usuario escribe.
- **Sanitización de input**: Limpieza automática de caracteres no válidos.
- **Zero dependencias**: Sin overhead de librerías externas, solo 42 kB.
- **TypeScript nativo**: Definiciones de tipos completas incluidas.
- **Tree-shakeable**: Soporte ESM y CJS.
- **Seguro**: Sanitización de input, protección DoS (máx. 50 chars), sin eval/Function.

### Instalación

```bash
npm install chilean-rut-formatter
```

### Uso rápido

```typescript
import { validateRut, formatRut, isValidRut } from 'chilean-rut-formatter';

// Validar
validateRut('12.345.678-5'); // { isValid: true, rut: '123456785' }
isValidRut('12.345.678-5');  // true

// Formatear
formatRut('123456785');      // '12.345.678-5'
formatRut('12345678K');      // '12.345.678-K'

// Formateo en tiempo real
formatRutPartial('12345');   // '1.234-5'
```

### API

- `validateRut(rut)` — Validación detallada con error descriptivo.
- `isValidRut(rut)` — Validación booleana simple.
- `formatRut(rut, options?)` — Formatea un RUT válido.
- `formatRutPartial(rut, options?)` — Formatea input parcial (tiempo real).
- `cleanRut(input)` — Limpia caracteres no válidos.
- `calculateVerificationDigit(rutBody)` — Calcula dígito verificador.
