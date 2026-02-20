---
title: "Rut.js"
description: "Librería JavaScript liviana para validar y formatear RUTs chilenos. Compatible con Node.js y navegadores, sin dependencias externas."
author: "Juan Pérez"
authorUrl: "https://github.com/juanperez"
repoUrl: "https://github.com/juanperez/rutjs"
websiteUrl: "https://rutjs.cl"
tags: ["javascript", "rut", "chile", "validacion"]
category: "Library"
featured: false
publishDate: 2026-02-20
---

## Sobre Rut.js

Rut.js es una librería JavaScript diseñada para manejar RUTs chilenos de forma simple y confiable. Permite validar, formatear y limpiar RUTs con una API intuitiva.

### Características principales

- **Validación completa**: Verifica el dígito verificador usando el algoritmo módulo 11.
- **Formateo automático**: Convierte `12345678-9` a `12.345.678-9` y viceversa.
- **Sin dependencias**: Zero dependencies, menos de 2KB minificado.
- **TypeScript**: Incluye tipos nativos.

### Instalación

```bash
npm install rutjs
```

### Uso

```javascript
import { validate, format } from 'rutjs'

validate('12.345.678-5') // true
format('123456785')       // '12.345.678-5'
```
