---
title: "Osito"
description: "Librería open source de componentes UI para React, con diseño accesible y personalizable. Inspirada en la estética minimalista y construida con Tailwind CSS."
author: "Catalina Reyes"
authorUrl: "https://github.com/catalina-dev"
repoUrl: "https://github.com/catalina-dev/osito"
tags: ["react", "ui-library", "tailwind", "typescript", "open-source"]
category: "Library"
featured: false
publishDate: 2024-07-01
---

## Sobre Osito

Osito es una librería de componentes UI para React creada por desarrolladores chilenos. Ofrece componentes accesibles, personalizables y con un diseño moderno.

### Características principales

- **Accesibilidad primero**: Todos los componentes cumplen con WAI-ARIA.
- **Theming flexible**: Sistema de temas basado en CSS variables.
- **Tree-shakeable**: Solo importa lo que necesitas.
- **TypeScript nativo**: Tipado completo para una mejor DX.

### Instalación

```bash
npm install @osito/react
```

### Ejemplo de uso

```tsx
import { Button, Card } from '@osito/react'

export function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Hola mundo</Button>
    </Card>
  )
}
```
