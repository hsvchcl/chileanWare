---
title: "NoamVC"
description: "Chat de voz privado, encriptado y peer-to-peer. Audio HD E2EE vía WebRTC Insertable Streams, chat de texto cifrado con AES-256-GCM, señalización firmada con HMAC-SHA256 y cero telemetría. Construido con Tauri 2 + React 19."
author: "hsvchcl"
authorUrl: "https://h4nsd3v.web.app/"
websiteUrl: "https://noamvc.web.app/"
tags: ["tauri", "rust", "react", "webrtc", "encryption", "p2p", "typescript"]
category: "Other"
featured: false
publishDate: 2026-02-19
---

## Sobre NoamVC

NoamVC es una aplicación de escritorio para chat de voz privado, con comunicación directa entre pares (P2P) y múltiples capas de encriptación. Tu voz y tus mensajes viajan directamente entre participantes — sin servidores intermediarios, sin grabaciones, sin compromisos.

### Características principales

- **Audio E2EE**: DTLS-SRTP en transporte + Insertable Streams con PBKDF2-SHA256 (100K iteraciones). Tu voz se encripta antes de salir de tu dispositivo.
- **Audio HD Adaptativo**: Códec Opus a 48 kHz fullband con bitrate adaptativo (32–96 kbps), corrección de errores FEC, detección de silencio DTX y cancelación de eco.
- **Chat de texto cifrado**: Mensajes enviados vía WebRTC DataChannels, encriptados con AES-256-GCM. Historial persistente en SQLite local.
- **Conexión P2P directa**: Audio y mensajes viajan directamente entre dispositivos usando WebRTC nativo. Sin servidores intermediarios.
- **Control de admisión**: Salas con códigos criptográficos de 16 caracteres hex. Nuevos participantes deben ser aprobados antes de entrar.
- **Señalización firmada con HMAC**: Cada mensaje de señalización está firmado con HMAC-SHA256. Las claves están embebidas en el binario nativo de Rust.
- **Cero telemetría**: Sin tracking, sin analytics, sin recolección de datos. Código abierto verificable.

### Stack tecnológico

- **Frontend**: React 19 + TypeScript 5.9 + Tailwind CSS 4 + shadcn/ui
- **Desktop**: Tauri 2 + Rust
- **Comunicación**: WebRTC (P2P Audio) + Socket.IO 4.8 (Señalización)
- **Encriptación**: Insertable Streams E2EE + AES-256-GCM + HMAC-SHA256
- **Almacenamiento**: IOTA Stronghold (SQLite encriptado)

### Plataformas soportadas

- macOS 11+ (Apple Silicon M1–M4 / Intel x64)
- Windows 10+
- Linux (próximamente)
