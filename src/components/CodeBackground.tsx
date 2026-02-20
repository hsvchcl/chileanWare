import { useEffect, useRef } from 'react'

// ── World map data ──────────────────────────────────────────────────
// Grid: 90 cols × 45 rows  (each cell ≈ 4° lon × 4° lat)
// col → lon = col * 4 - 180,  row → lat = 90 - row * 4

const LAND: [number, number][][] = [
  /* 0  90°N */ [],
  /* 1  86°N */ [[25,27],[34,37]],
  /* 2  82°N */ [[23,28],[30,40],[57,60],[69,72]],
  /* 3  78°N */ [[20,27],[29,41],[48,51],[57,60],[69,73]],
  /* 4  74°N */ [[3,5],[13,15],[17,19],[21,28],[30,40],[49,52],[57,60],[66,75]],
  /* 5  70°N */ [[2,9],[10,22],[25,29],[32,39],[48,52],[54,82],[88,89]],
  /* 6  66°N */ [[2,6],[10,28],[33,37],[39,41],[43,45],[47,52],[54,83],[88,89]],
  /* 7  62°N */ [[2,5],[10,28],[34,36],[43,50],[54,86]],
  /* 8  58°N */ [[10,28],[43,50],[54,87]],
  /* 9  54°N */ [[10,30],[42,50],[54,87]],
  /*10  50°N */ [[12,30],[42,87]],
  /*11  46°N */ [[13,29],[42,50],[52,81]],
  /*12  42°N */ [[14,28],[42,56],[58,77],[80,81]],
  /*13  38°N */ [[15,27],[42,45],[47,56],[58,77],[79,80]],
  /*14  34°N */ [[16,25],[42,45],[47,57],[59,77],[79,80]],
  /*15  30°N */ [[16,24],[42,58],[60,77]],
  /*16  26°N */ [[16,21],[24,25],[40,59],[62,72]],
  /*17  22°N */ [[18,23],[24,26],[40,48],[50,60],[62,71],[73,77]],
  /*18  18°N */ [[19,22],[40,48],[51,60],[63,70],[73,77]],
  /*19  14°N */ [[19,22],[41,48],[52,59],[64,69],[74,78]],
  /*20  10°N */ [[20,22],[42,49],[53,57],[64,68],[74,78]],
  /*21   6°N */ [[20,26],[42,51],[53,57],[64,68],[74,80]],
  /*22   2°N */ [[20,30],[42,51],[53,57],[64,68],[74,82]],
  /*23  -2°  */ [[21,36],[42,51],[53,57],[68,70],[74,82]],
  /*24  -6°  */ [[22,38],[43,51],[54,57],[69,70],[74,82]],
  /*25 -10°  */ [[22,38],[44,51],[55,57],[73,80]],
  /*26 -14°  */ [[23,38],[45,52],[55,57],[73,80]],
  /*27 -18°  */ [[25,38],[46,50],[55,57],[73,80]],
  /*28 -22°  */ [[26,36],[47,50],[55,57],[73,80]],
  /*29 -26°  */ [[26,35],[47,50],[55,57],[73,80]],
  /*30 -30°  */ [[26,34],[47,50],[73,80]],
  /*31 -34°  */ [[26,33],[47,49],[73,78],[86,87]],
  /*32 -38°  */ [[26,32],[84,86]],
  /*33 -42°  */ [[26,28],[84,86]],
  /*34 -46°  */ [[26,28],[86,87]],
  /*35 -50°  */ [[27,29]],
  /*36 -54°  */ [[27,29]],
  /*37 -58°  */ [],
  /*38       */ [],
  /*39       */ [],
  /*40       */ [],
  /*41       */ [],
  /*42       */ [],
  /*43       */ [],
  /*44       */ [],
]

const CHILE: Record<number, [number, number]> = {
  27: [26, 27], 28: [26, 27], 29: [26, 27], 30: [26, 27],
  31: [26, 27], 32: [26, 27], 33: [26, 27], 34: [26, 27],
  35: [27, 28], 36: [27, 28],
}

// ── Pre-compute land dots with lat/lon in radians ───────────────────
interface LandDot {
  lat: number   // radians
  lon: number   // radians
  row: number
  chile: boolean
}

const landDots: LandDot[] = []
for (let row = 0; row < 45; row++) {
  const ranges = LAND[row] ?? []
  for (const [s, e] of ranges) {
    for (let col = s; col <= e; col++) {
      const lat = ((90 - row * 4 - 2) * Math.PI) / 180
      const lon = ((col * 4 - 180 + 2) * Math.PI) / 180
      const cr = CHILE[row]
      const chile = !!cr && col >= cr[0] && col <= cr[1]
      landDots.push({ lat, lon, row, chile })
    }
  }
}

const nonChileDots = landDots.filter(d => !d.chile)
const chileDots = landDots.filter(d => d.chile)

// ── Arc-packet on the sphere ────────────────────────────────────────
interface ArcPacket {
  srcLat: number; srcLon: number
  dstLat: number; dstLon: number
  progress: number
  speed: number
}

// Spherical linear interpolation
function slerp(lat1: number, lon1: number, lat2: number, lon2: number, t: number) {
  const x1 = Math.cos(lat1) * Math.cos(lon1)
  const y1 = Math.cos(lat1) * Math.sin(lon1)
  const z1 = Math.sin(lat1)
  const x2 = Math.cos(lat2) * Math.cos(lon2)
  const y2 = Math.cos(lat2) * Math.sin(lon2)
  const z2 = Math.sin(lat2)

  let dot = x1 * x2 + y1 * y2 + z1 * z2
  dot = Math.max(-1, Math.min(1, dot))
  const omega = Math.acos(dot)

  if (omega < 0.001) {
    return { lat: lat1 + (lat2 - lat1) * t, lon: lon1 + (lon2 - lon1) * t }
  }

  const sinO = Math.sin(omega)
  const a = Math.sin((1 - t) * omega) / sinO
  const b = Math.sin(t * omega) / sinO

  const x = a * x1 + b * x2
  const y = a * y1 + b * y2
  const z = a * z1 + b * z2

  return { lat: Math.asin(z), lon: Math.atan2(y, x) }
}

// ── Component ───────────────────────────────────────────────────────
export default function CodeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const packetsRef = useRef<ArcPacket[]>([])
  const timeRef = useRef(0)
  const rotationRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Visibility tracking — pause when off-screen ───────────────
    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting },
      { threshold: 0.01 }
    )
    observer.observe(container)

    // Also pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) isVisible = false
      // When tab becomes visible again, let IntersectionObserver decide
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cache size to avoid getBoundingClientRect() on every frame (forced reflow)
    let cachedW = 0
    let cachedH = 0
    const updateCachedSize = () => {
      const r = container.getBoundingClientRect()
      cachedW = r.width
      cachedH = r.height
    }
    const getSize = () => ({ w: cachedW, h: cachedH })

    const resize = () => {
      updateCachedSize()
      const dpr = window.devicePixelRatio || 1
      const { w, h } = getSize()
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    /** Project lat/lon onto a 3D sphere, return screen coords + depth.
     *  Tilts the globe slightly and rotates around Y axis. */
    const project = (
      lat: number, lon: number,
      cx: number, cy: number, radius: number,
      rotY: number, tiltX: number
    ) => {
      const adjustedLon = lon + rotY

      // 3D cartesian
      let x = Math.cos(lat) * Math.sin(adjustedLon)
      let y = -Math.sin(lat)
      let z = Math.cos(lat) * Math.cos(adjustedLon)

      // Tilt around X axis
      const cosT = Math.cos(tiltX)
      const sinT = Math.sin(tiltX)
      const y2 = y * cosT - z * sinT
      const z2 = y * sinT + z * cosT

      return {
        sx: cx + x * radius,
        sy: cy + y2 * radius,
        z: z2,             // depth: >0 = facing camera
        scale: (z2 + 1.5) / 2.5,  // for size attenuation
        nx: x, ny: y2, nz: z2,    // surface normal for lighting
      }
    }

    const spawnPacket = (): ArcPacket => {
      const src = chileDots[Math.floor(Math.random() * chileDots.length)]
      const dst = nonChileDots[Math.floor(Math.random() * nonChileDots.length)]
      return {
        srcLat: src.lat, srcLon: src.lon,
        dstLat: dst.lat, dstLon: dst.lon,
        progress: 0,
        speed: 0.002 + Math.random() * 0.003,
      }
    }

    // ── Intro animation parameters ────────────────────────────────
    // Easing: smooth deceleration curve
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
    const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)

    const INTRO_DURATION = 180 // frames (~3s at 60fps)

    // Skip intro when returning via View Transition (back navigation)
    const skipIntro = !!(window as any).__cwSkipIntro
    ;(window as any).__cwSkipIntro = false
    const effectiveIntroDuration = skipIntro ? 0 : INTRO_DURATION

    // Responsive parameters based on screen width
    const isMobile = () => getSize().w < 768

    // Start values (zoomed out, rotated away from Chile)
    const INTRO_ROT_START = 1.22 - 1.2   // start rotated away
    const INTRO_ROT_END = 1.22            // end focused on Chile
    const INTRO_RADIUS_SCALE_START = 0.30 // small/zoomed out
    const INTRO_RADIUS_SCALE_END_DESKTOP = 0.65
    const INTRO_RADIUS_SCALE_END_MOBILE = 0.70
    const INTRO_TILT_START = 0.0          // flat
    const INTRO_TILT_END = 0.35           // final tilt
    const INTRO_CX_START = 0.5            // start centered
    const INTRO_CX_END_DESKTOP = 0.25     // end at left 25%
    const INTRO_CX_END_MOBILE = 0.5       // stay centered on mobile

    // ── animation loop ──────────────────────────────────────────────
    const animate = () => {
      if (!ctx || !container) return

      // Skip rendering when off-screen or tab hidden to save CPU/GPU
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const { w, h } = getSize()
      ctx.clearRect(0, 0, w, h)
      timeRef.current++
      const t = timeRef.current

      // ── Intro interpolation ───────────────────────────────────────
      const introProgress = Math.min(t / (effectiveIntroDuration || 1), 1)
      const easeRot = easeOutCubic(introProgress)
      const easeZoom = easeOutQuart(introProgress)
      const easePos = easeOutCubic(introProgress)

      // Gentle breathing after intro completes
      const breathe = introProgress >= 1 ? Math.sin((t - effectiveIntroDuration) * 0.0008) * 0.04 : 0

      // Slow continuous rotation after titles appear
      const SPIN_START = skipIntro ? 0 : 210
      const SPIN_SPEED = 0.0003
      const SPIN_EASE_FRAMES = 120 // ease-in over ~2 seconds
      let spinAmount = 0
      if (t > SPIN_START) {
        const elapsed = t - SPIN_START
        const easeFactor = elapsed < SPIN_EASE_FRAMES
          ? (elapsed / SPIN_EASE_FRAMES) * (elapsed / SPIN_EASE_FRAMES) // quadratic ease-in
          : 1
        spinAmount = elapsed * SPIN_SPEED * easeFactor
      }

      const rotY = INTRO_ROT_START + (INTRO_ROT_END - INTRO_ROT_START) * easeRot + breathe + spinAmount

      const mobile = isMobile()
      const INTRO_CX_END = mobile ? INTRO_CX_END_MOBILE : INTRO_CX_END_DESKTOP
      const INTRO_RADIUS_SCALE_END = mobile ? INTRO_RADIUS_SCALE_END_MOBILE : INTRO_RADIUS_SCALE_END_DESKTOP

      const cxFraction = INTRO_CX_START + (INTRO_CX_END - INTRO_CX_START) * easePos
      const cx = w * cxFraction
      const cy = mobile ? h * 0.30 : h * 0.5

      const radiusScale = INTRO_RADIUS_SCALE_START + (INTRO_RADIUS_SCALE_END - INTRO_RADIUS_SCALE_START) * easeZoom
      const baseSize = mobile ? Math.min(w * 0.85, h * 0.42) : Math.min(w * 0.5, h)
      const radius = baseSize * radiusScale

      const tiltX = INTRO_TILT_START + (INTRO_TILT_END - INTRO_TILT_START) * easeRot

      // Global opacity fade-in
      const globalAlpha = Math.min(t / 40, 1)
      ctx.save()
      ctx.globalAlpha = globalAlpha

      // ── Globe interior (clipped) ────────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()

      // ── Subtle grid lines (meridians & parallels) ─────────────────
      // On mobile, use coarser grids and lower step resolution to reduce CPU
      const gridParallelStep = mobile ? 30 : 20
      const gridLonStep = mobile ? 8 : 4
      const gridMeridianStep = mobile ? 60 : 30
      const gridLatStep = mobile ? 8 : 4

      ctx.strokeStyle = 'rgba(80, 140, 220, 0.05)'
      ctx.lineWidth = 0.5

      // Parallels
      for (let latDeg = -60; latDeg <= 80; latDeg += gridParallelStep) {
        const latR = (latDeg * Math.PI) / 180
        ctx.beginPath()
        let first = true
        for (let lonDeg = -180; lonDeg <= 180; lonDeg += gridLonStep) {
          const lonR = (lonDeg * Math.PI) / 180
          const p = project(latR, lonR, cx, cy, radius, rotY, tiltX)
          if (p.z < -0.05) { first = true; continue }
          if (first) { ctx.moveTo(p.sx, p.sy); first = false }
          else ctx.lineTo(p.sx, p.sy)
        }
        ctx.stroke()
      }

      // Meridians
      for (let lonDeg = -180; lonDeg < 180; lonDeg += gridMeridianStep) {
        const lonR = (lonDeg * Math.PI) / 180
        ctx.beginPath()
        let first = true
        for (let latDeg = -90; latDeg <= 90; latDeg += gridLatStep) {
          const latR = (latDeg * Math.PI) / 180
          const p = project(latR, lonR, cx, cy, radius, rotY, tiltX)
          if (p.z < -0.05) { first = true; continue }
          if (first) { ctx.moveTo(p.sx, p.sy); first = false }
          else ctx.lineTo(p.sx, p.sy)
        }
        ctx.stroke()
      }

      ctx.restore()

      // ── atmosphere glow (outer) ───────────────────────────────────
      const atmoGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.35)
      atmoGrad.addColorStop(0, 'rgba(80, 160, 255, 0)')
      atmoGrad.addColorStop(0.35, 'rgba(70, 150, 255, 0.06)')
      atmoGrad.addColorStop(0.55, 'rgba(60, 140, 255, 0.10)')
      atmoGrad.addColorStop(0.7, 'rgba(50, 120, 240, 0.07)')
      atmoGrad.addColorStop(0.85, 'rgba(40, 100, 220, 0.03)')
      atmoGrad.addColorStop(1, 'rgba(30, 80, 200, 0)')
      ctx.fillStyle = atmoGrad
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2)
      ctx.fill()

      // ── inner edge glow ───────────────────────────────────────────
      const innerGlow = ctx.createRadialGradient(cx, cy, radius * 0.88, cx, cy, radius * 1.02)
      innerGlow.addColorStop(0, 'rgba(100, 180, 255, 0)')
      innerGlow.addColorStop(0.6, 'rgba(80, 160, 255, 0.04)')
      innerGlow.addColorStop(1, 'rgba(70, 150, 255, 0.08)')
      ctx.fillStyle = innerGlow
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2)
      ctx.fill()

      // ── draw land dots ────────────────────────────────────────────
      // Project and filter in one pass — skip back-facing dots early to avoid allocations
      const projected: Array<LandDot & { sx: number; sy: number; z: number; scale: number; nx: number; ny: number; nz: number }> = []
      for (const dot of landDots) {
        const p = project(dot.lat, dot.lon, cx, cy, radius, rotY, tiltX)
        if (p.z < -0.1) continue  // skip back-facing dots
        projected.push({ ...dot, ...p })
      }
      projected.sort((a, b) => a.z - b.z)

      for (const dot of projected) {
        const dotR = Math.max(1.0, 2.2 * dot.scale)
        const depthFade = Math.max(0, Math.min(1, (dot.z + 0.1) / 0.45))

        if (dot.chile) {
          const pulse = 0.75 + 0.25 * Math.sin(t * 0.04 + dot.lat * 8)
          const alpha = depthFade * pulse

          if (!mobile) {
            // Outer glow — expensive radial gradient, skip on mobile
            const glowR = dotR * (5 + Math.sin(t * 0.02) * 2)
            const grad = ctx.createRadialGradient(dot.sx, dot.sy, 0, dot.sx, dot.sy, glowR)
            grad.addColorStop(0, `rgba(255, 60, 40, ${0.4 * alpha})`)
            grad.addColorStop(0.3, `rgba(255, 40, 30, ${0.15 * alpha})`)
            grad.addColorStop(1, 'rgba(255, 30, 20, 0)')
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(dot.sx, dot.sy, glowR, 0, Math.PI * 2)
            ctx.fill()
          }

          // Main dot
          ctx.beginPath()
          ctx.arc(dot.sx, dot.sy, dotR * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 55, 35, ${0.9 * alpha})`
          ctx.fill()

          // Bright white-hot core
          ctx.beginPath()
          ctx.arc(dot.sx, dot.sy, dotR * 0.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 200, 180, ${0.95 * alpha})`
          ctx.fill()
        } else {
          // Color land by latitude for realistic earth tones
          const absLat = Math.abs(dot.row - 22) / 22 // 0 = equator, 1 = poles
          let r: number, g: number, b: number

          if (absLat < 0.15) {
            // Equatorial — dark lush green (rainforest)
            r = 25 + absLat * 50
            g = 140 + absLat * 30
            b = 45 + absLat * 20
          } else if (absLat < 0.35) {
            // Tropical — rich green
            const t2 = (absLat - 0.15) / 0.2
            r = 32 + t2 * 50
            g = 145 - t2 * 10
            b = 48 + t2 * 15
          } else if (absLat < 0.55) {
            // Temperate — olive/sage green
            const t2 = (absLat - 0.35) / 0.2
            r = 82 + t2 * 45
            g = 135 - t2 * 25
            b = 63 + t2 * 20
          } else if (absLat < 0.75) {
            // Boreal/Taiga — muted brown-green
            const t2 = (absLat - 0.55) / 0.2
            r = 127 + t2 * 40
            g = 110 - t2 * 15
            b = 83 + t2 * 25
          } else {
            // Polar/Arctic — icy white-blue
            const t2 = (absLat - 0.75) / 0.25
            r = 167 + t2 * 60
            g = 180 + t2 * 50
            b = 195 + t2 * 40
          }

          const a = 0.6 * depthFade
          ctx.beginPath()
          ctx.arc(dot.sx, dot.sy, dotR, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`
          ctx.fill()

          // Subtle inner highlight on front-facing dots
          if (dot.z > 0.3) {
            ctx.beginPath()
            ctx.arc(dot.sx, dot.sy, dotR * 0.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${Math.round(Math.min(255, r + 30))}, ${Math.round(Math.min(255, g + 25))}, ${Math.round(Math.min(255, b + 15))}, ${0.25 * depthFade})`
            ctx.fill()
          }
        }
      }

      // ── data packets (arcs on the sphere) ─────────────────────────
      const maxPackets = mobile ? 2 : 4
      if (introProgress >= 1 && t % 80 === 0 && packetsRef.current.length < maxPackets) {
        packetsRef.current.push(spawnPacket())
      }

      const alive: ArcPacket[] = []
      for (const pkt of packetsRef.current) {
        pkt.progress += pkt.speed
        if (pkt.progress > 1) continue

        // Draw trail + head along the great circle arc
        const trailSteps = mobile ? 6 : 12
        for (let i = trailSteps; i >= 0; i--) {
          const tp = Math.max(0, pkt.progress - i * 0.015)
          const { lat, lon } = slerp(pkt.srcLat, pkt.srcLon, pkt.dstLat, pkt.dstLon, tp)

          // Lift the arc above the surface
          const liftFactor = 1 + 0.06 * Math.sin(tp * Math.PI)
          const p = project(lat, lon, cx, cy, radius * liftFactor, rotY, tiltX)

          if (p.z < -0.1) continue  // behind the globe

          const fade = (1 - i / trailSteps) * (1 - pkt.progress * 0.4)
          const depthFade = Math.max(0, Math.min(1, (p.z + 0.1) / 0.4))

          if (i === 0) {
            // Head glow — cyan/blue
            const headGlow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 12 * p.scale)
            headGlow.addColorStop(0, `rgba(80, 200, 255, ${0.6 * fade * depthFade})`)
            headGlow.addColorStop(0.4, `rgba(60, 160, 255, ${0.2 * fade * depthFade})`)
            headGlow.addColorStop(1, 'rgba(40, 120, 255, 0)')
            ctx.fillStyle = headGlow
            ctx.beginPath()
            ctx.arc(p.sx, p.sy, 12 * p.scale, 0, Math.PI * 2)
            ctx.fill()

            // Bright head
            ctx.beginPath()
            ctx.arc(p.sx, p.sy, 2.8 * p.scale, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(200, 240, 255, ${0.95 * fade * depthFade})`
            ctx.fill()
          } else {
            // Trail dot — warm orange to cyan gradient along trail
            const tr = Math.max(0.6, (2.0 - i * 0.13) * p.scale)
            const trailMix = i / trailSteps
            const rr = Math.round(80 + trailMix * 140)
            const gg = Math.round(180 - trailMix * 60)
            const bb = Math.round(255 - trailMix * 100)
            ctx.beginPath()
            ctx.arc(p.sx, p.sy, tr, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rr}, ${gg}, ${bb}, ${fade * 0.7 * depthFade})`
            ctx.fill()
          }
        }

        alive.push(pkt)
      }
      packetsRef.current = alive

      ctx.restore()
      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  )
}
