import { useRef, useEffect } from 'react'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

// GPU-Partikel-Windfeld (WebGL via OGL, ~10kb).
// Tausende Punkte strömen mit Curl-artigem Rauschen nach rechts ("Wind"),
// mit Perspektiv-Tiefe und sanfter Maus-Parallaxe. Markenfarben: Weinrot → Rosé.
// Kein Scroll-Bezug: die Animation läuft beim Scrollen bewusst weiter.

const DEFAULT_COUNT = 3400

const vertex = /* glsl */ `
  attribute vec3 position;   // normalisiert -1..1, erst im Shader auf uRange gestreckt
  attribute float aSeed;     // 0..1 Zufallswert pro Partikel

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uDpr;
  uniform vec2 uMouse;
  uniform vec3 uRange;       // Halb-Ausdehnung des Volumens je Achse

  varying float vSeed;
  varying float vDepth;

  void main() {
    vSeed = aSeed;
    vec3 p = position * uRange;

    // Drift proportional zur sichtbaren Breite: dadurch wirkt die Strömung
    // im Hochformat genauso schnell wie im Querformat, obwohl das Volumen
    // dort deutlich schmaler ist.
    float t = uTime * 0.06 * (uRange.x / 7.0);

    // Kontinuierliche Rechts-Drift (Wind), pro Partikel leicht versetzt
    p.x += t * (0.6 + aSeed * 0.8);
    // Im Volumen umbrechen, damit der Strom endlos wirkt
    p.x = mod(p.x + uRange.x, uRange.x * 2.0) - uRange.x;

    // Geschichtete Turbulenz → organisches Wehen
    float f = uTime * 0.5;
    p.y += sin(p.x * 0.5 + f + aSeed * 6.28) * 0.45
         + sin(p.z * 0.7 + f * 0.7) * 0.25;
    p.z += cos(p.x * 0.4 + f * 0.9 + aSeed * 6.28) * 0.45;

    // Sanfte Parallaxe (Tiefe verstärkt den Versatz). Am Desktop von der Maus
    // gespeist, auf Touch von einer langsamen Eigenbewegung — sonst stünde
    // dort die halbe Tiefenwirkung still.
    p.xy += uMouse * (0.4 + (p.z + uRange.z) / (uRange.z * 2.0));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;

    gl_Position = projectionMatrix * mv;
    // Näher = größer; Größe variiert pro Partikel
    gl_PointSize = (34.0 + aSeed * 30.0) * uDpr / vDepth;
  }
`

const fragment = /* glsl */ `
  precision highp float;

  uniform float uOpacity;
  varying float vSeed;
  varying float vDepth;

  void main() {
    // Runder, weicher Punkt
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.05, d);

    // Markenfarbe: tiefes Weinrot → helles Rosé je nach Seed
    vec3 deep   = vec3(0.227, 0.090, 0.110); // #3a171c
    vec3 wine   = vec3(0.541, 0.180, 0.216); // #8a2e38
    vec3 bright = vec3(0.694, 0.271, 0.322); // #b14552
    vec3 col = mix(deep, wine, smoothstep(0.0, 0.45, vSeed));
    col = mix(col, bright, smoothstep(0.45, 1.0, vSeed));

    // Ferne Partikel verblassen → Tiefenstaffelung
    float depthFade = smoothstep(14.0, 4.0, vDepth);

    gl_FragColor = vec4(col, alpha * depthFade * uOpacity);
  }
`

export default function WindField3D({ className = '', count = DEFAULT_COUNT, maxOpacity = 1 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const COUNT = count
    const container = containerRef.current
    if (!container) return

    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const renderer = new Renderer({
      dpr,
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    // Additives Blending → leuchtende, sich überlagernde Partikel
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    container.appendChild(gl.canvas)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.style.display = 'block'

    const FOV = 45
    const CAM_Z = 9
    const camera = new Camera(gl, { fov: FOV })
    camera.position.set(0, 0, CAM_Z)

    const RANGE = 7
    // Halbe sichtbare Höhe an der Volumen-Mitte. Die Breite folgt daraus dem
    // Seitenverhältnis — deshalb muss die X-Ausdehnung mitwandern (s. resize).
    const HALF_H = CAM_Z * Math.tan(((FOV / 2) * Math.PI) / 180)

    const positions = new Float32Array(COUNT * 3)
    const seeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = Math.random() * 2 - 1
      positions[i * 3 + 1] = Math.random() * 2 - 1
      positions[i * 3 + 2] = Math.random() * 2 - 1
      seeds[i] = Math.random()
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      aSeed: { size: 1, data: seeds },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uDpr: { value: dpr },
        uMouse: { value: [0, 0] },
        uRange: { value: [RANGE, RANGE * 0.62, RANGE * 0.6] },
        uOpacity: { value: 0 },
      },
    })

    const mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS })

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      const aspect = w / h
      renderer.setSize(w, h)
      camera.perspective({ aspect })

      // Die vertikale FOV ist fix, also schrumpft die sichtbare Breite im
      // Hochformat massiv. Bliebe die X-Ausdehnung des Volumens konstant,
      // läge auf dem Handy der Großteil der Partikel außerhalb des Bildes und
      // der Strom wirkte fast leer. Deshalb folgt sie dem Seitenverhältnis.
      program.uniforms.uRange.value[0] = Math.max(HALF_H * aspect * 1.15, 1.5)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // Maus-Parallaxe (geglättet)
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let pointerSeen = false
    const onPointer = (e) => {
      pointerSeen = true
      target.x = (e.clientX / window.innerWidth - 0.5) * 1.4
      target.y = -(e.clientY / window.innerHeight - 0.5) * 1.4
    }
    if (!prefersReduced) window.addEventListener('pointermove', onPointer)

    // Nur rendern, wenn sichtbar. Beim Scrollen läuft die Animation bewusst
    // weiter — ein Einfrieren der Partikel fällt stärker auf als jede Last.
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && raf === null) loop(performance.now())
      },
      { threshold: 0 }
    )
    io.observe(container)

    let raf = null
    const start = performance.now()
    const loop = (now) => {
      if (!visible) {
        raf = null
        return
      }
      const t = (now - start) / 1000
      program.uniforms.uTime.value = t

      // Ohne Zeigegerät (Touch) übernimmt eine langsame Eigenbewegung die
      // Rolle der Maus, damit die Tiefenstaffelung auch dort atmet.
      if (!pointerSeen && !prefersReduced) {
        target.x = Math.sin(t * 0.17) * 0.55
        target.y = Math.cos(t * 0.12) * 0.34
      }

      // Maus glätten
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      program.uniforms.uMouse.value[0] = mouse.x
      program.uniforms.uMouse.value[1] = mouse.y

      // Sanftes Einblenden
      const o = program.uniforms.uOpacity
      if (o.value < maxOpacity) o.value = Math.min(maxOpacity, o.value + 0.012)

      renderer.render({ scene: mesh, camera })

      if (prefersReduced) {
        raf = null // einmal rendern, dann anhalten
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      const ext = gl.getExtension('WEBGL_lose_context')
      ext?.loseContext()
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas)
    }
  }, [count, maxOpacity])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  )
}
