import {
  useRef,
  useEffect,
  useState,
  createElement,
  useMemo,
  useCallback,
  memo,
} from 'react'

// Portiert von 21st.dev (vapour-text-effect) nach JSX.
// Text wird in Partikel aufgelöst, die "wie Wind" davonwehen.

// eslint-disable-next-line react-refresh/only-export-components
export const Tag = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  P: 'p',
}

export default function VaporizeTextCycle({
  texts = ['Next.js', 'React'],
  font = {
    fontFamily: 'sans-serif',
    fontSize: '50px',
    fontWeight: 400,
  },
  color = 'rgb(255, 255, 255)',
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.5,
  },
  direction = 'left-to-right',
  alignment = 'center',
  tag = Tag.P,
}) {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const isInView = useIsInView(wrapperRef)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  // animationStateRef keeps the rAF loop in sync without stale closure
  const animationStateRef = useRef('static')
  const vaporizeProgressRef = useRef(0)
  const fadeOpacityRef = useRef(0)
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 })
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true)

  // rAF loop reads the ref directly — no React state needed for the cycle
  const setAnim = useCallback((val) => {
    animationStateRef.current = val
  }, [])

  const globalDpr = useMemo(() => {
    if (typeof window !== 'undefined') {
      return Math.min(window.devicePixelRatio || 1, 2)
    }
    return 1
  }, [])

  const wrapperStyle = useMemo(
    () => ({
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }),
    []
  )

  const canvasStyle = useMemo(
    () => ({
      minWidth: '30px',
      minHeight: '20px',
      pointerEvents: 'none',
    }),
    []
  )

  const animationDurations = useMemo(
    () => ({
      VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
      FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
      WAIT_DURATION: (animation.waitDuration ?? 0.5) * 1000,
    }),
    [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]
  )

  const fontConfig = useMemo(() => {
    const fontSize = parseInt(font.fontSize?.replace('px', '') || '50')
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize)
    const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread
    return {
      fontSize,
      VAPORIZE_SPREAD,
      MULTIPLIED_VAPORIZE_SPREAD,
      font: `${font.fontWeight ?? 400} ${fontSize * globalDpr}px ${font.fontFamily}`,
    }
  }, [font.fontSize, font.fontWeight, font.fontFamily, spread, globalDpr])

  const memoizedUpdateParticles = useCallback(
    (particles, vaporizeX, deltaTime) => {
      return updateParticles(
        particles,
        vaporizeX,
        deltaTime,
        fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
        animationDurations.VAPORIZE_DURATION,
        direction,
        transformedDensity
      )
    },
    [
      fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
      animationDurations.VAPORIZE_DURATION,
      direction,
      transformedDensity,
    ]
  )

  const memoizedRenderParticles = useCallback(
    (ctx, particles) => {
      renderParticles(ctx, particles, globalDpr)
    },
    [globalDpr]
  )

  useEffect(() => {
    if (isInView) {
      const startAnimationTimeout = setTimeout(() => {
        vaporizeProgressRef.current = 0
        fadeOpacityRef.current = 0
        setAnim('vaporizing')
      }, 0)
      return () => clearTimeout(startAnimationTimeout)
    } else {
      setAnim('static')
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isInView, setAnim])

  // Single persistent rAF loop — reads animationStateRef.current so it never goes stale
  useEffect(() => {
    if (!isInView) return

    let lastTime = performance.now()
    let frameId
    let waitTimeout = null

    const animate = (currentTime) => {
      // Cap at ~2 frames to prevent animation jumps after React re-renders
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05)
      lastTime = currentTime

      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')

      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Read from ref — never stale, no dependency on animationState closure
      const state = animationStateRef.current

      switch (state) {
        case 'static': {
          memoizedRenderParticles(ctx, particlesRef.current)
          break
        }
        case 'vaporizing': {
          vaporizeProgressRef.current +=
            (deltaTime * 100) / (animationDurations.VAPORIZE_DURATION / 1000)

          const textBoundaries = canvas.textBoundaries
          if (!textBoundaries) break

          const progress = Math.min(100, vaporizeProgressRef.current)
          const vaporizeX =
            direction === 'left-to-right'
              ? textBoundaries.left + (textBoundaries.width * progress) / 100
              : textBoundaries.right - (textBoundaries.width * progress) / 100

          const allVaporized = memoizedUpdateParticles(
            particlesRef.current,
            vaporizeX,
            deltaTime
          )
          memoizedRenderParticles(ctx, particlesRef.current)

          // Weiter, wenn Welle durch UND Wolke verflogen — oder bei 135 hart
          // kappen: da ist der Reststaub unter ~11 % Deckkraft, der Schnitt
          // unsichtbar, und das nächste Wort kommt spürbar schneller.
          // (Verhindert nebenbei jeden denkbaren Metrik-Freeze.)
          if (
            (vaporizeProgressRef.current >= 100 && allVaporized) ||
            vaporizeProgressRef.current >= 135
          ) {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
            setAnim('fadingIn')
            fadeOpacityRef.current = 0
          }
          break
        }
        case 'fadingIn': {
          fadeOpacityRef.current +=
            (deltaTime * 1000) / animationDurations.FADE_IN_DURATION

          ctx.save()
          ctx.scale(globalDpr, globalDpr)
          particlesRef.current.forEach((particle) => {
            const opacity = Math.min(fadeOpacityRef.current, 1) * particle.originalAlpha
            ctx.fillStyle = `rgba(${particle.r},${particle.g},${particle.b},${opacity})`
            ctx.fillRect(particle.originalX / globalDpr, particle.originalY / globalDpr, 1, 1)
          })
          ctx.restore()

          if (fadeOpacityRef.current >= 1) {
            setAnim('waiting')
            waitTimeout = setTimeout(() => {
              setAnim('vaporizing')
              vaporizeProgressRef.current = 0
              resetParticles(particlesRef.current)
            }, animationDurations.WAIT_DURATION)
          }
          break
        }
        case 'waiting': {
          memoizedRenderParticles(ctx, particlesRef.current)
          break
        }
        default:
          break
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    animationFrameRef.current = frameId

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      if (waitTimeout) clearTimeout(waitTimeout)
    }
  }, [
    isInView,
    texts.length,
    direction,
    globalDpr,
    memoizedUpdateParticles,
    memoizedRenderParticles,
    animationDurations.FADE_IN_DURATION,
    animationDurations.WAIT_DURATION,
    animationDurations.VAPORIZE_DURATION,
    setAnim,
  ])

  // Kein 1s-"Font nachladen"-Hack mehr nötig: VaporizeWord wartet via
  // document.fonts, bis die Schrift geladen ist, bevor es hier mountet.
  // Der Hack hat sonst mitten im ersten Zyklus die Partikel zurückgesetzt.
  useEffect(() => {
    renderCanvas({
      framerProps: { texts, font, color, alignment },
      canvasRef,
      wrapperSize,
      particlesRef,
      globalDpr,
      currentTextIndex,
      transformedDensity,
    })
  }, [texts, font, color, alignment, wrapperSize, currentTextIndex, globalDpr, transformedDensity])

  useEffect(() => {
    const container = wrapperRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setWrapperSize({ width, height })
      }

      renderCanvas({
        framerProps: { texts, font, color, alignment },
        canvasRef,
        wrapperSize: { width: container.clientWidth, height: container.clientHeight },
        particlesRef,
        globalDpr,
        currentTextIndex,
        transformedDensity,
      })
    })

    resizeObserver.observe(container)
    return () => {
      resizeObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      setWrapperSize({ width: rect.width, height: rect.height })
    }
  }, [])

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  )
}

// ------------------------------------------------------------ //
// SEO ELEMENT
// ------------------------------------------------------------ //
const SeoElement = memo(({ tag = Tag.P, texts }) => {
  const style = useMemo(
    () => ({
      position: 'absolute',
      width: '0',
      height: '0',
      overflow: 'hidden',
      userSelect: 'none',
      pointerEvents: 'none',
    }),
    []
  )

  const safeTag = Object.values(Tag).includes(tag) ? tag : 'p'
  return createElement(safeTag, { style }, texts?.join(' ') ?? '')
})
SeoElement.displayName = 'SeoElement'

// ------------------------------------------------------------ //
// RENDER CANVAS
// ------------------------------------------------------------ //
const renderCanvas = ({
  framerProps,
  canvasRef,
  wrapperSize,
  particlesRef,
  globalDpr,
  currentTextIndex,
}) => {
  const canvas = canvasRef.current
  if (!canvas || !wrapperSize.width || !wrapperSize.height) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = wrapperSize

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = Math.floor(width * globalDpr)
  canvas.height = Math.floor(height * globalDpr)

  const fontSize = parseInt(framerProps.font?.fontSize?.replace('px', '') || '50')
  const font = `${framerProps.font?.fontWeight ?? 400} ${fontSize * globalDpr}px ${
    framerProps.font?.fontFamily ?? 'sans-serif'
  }`
  const color = parseColor(framerProps.color ?? 'rgb(153, 153, 153)')

  let textX
  const textY = canvas.height / 2
  const currentText = framerProps.texts[currentTextIndex] || 'Next.js'

  if (framerProps.alignment === 'center') {
    textX = canvas.width / 2
  } else if (framerProps.alignment === 'left') {
    textX = 0
  } else {
    textX = canvas.width
  }

  const { particles, textBoundaries } = createParticles(
    ctx,
    canvas,
    currentText,
    textX,
    textY,
    font,
    color,
    framerProps.alignment || 'left'
  )

  particlesRef.current = particles
  canvas.textBoundaries = textBoundaries
}

// ------------------------------------------------------------ //
// PARTICLE SYSTEM
// ------------------------------------------------------------ //
const createParticles = (ctx, canvas, text, textX, textY, font, color, alignment) => {
  const particles = []

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = color
  ctx.font = font
  ctx.textAlign = alignment
  ctx.textBaseline = 'middle'
  ctx.imageSmoothingQuality = 'high'
  ctx.imageSmoothingEnabled = true

  if ('fontKerning' in ctx) {
    ctx.fontKerning = 'normal'
  }

  if ('textRendering' in ctx) {
    ctx.textRendering = 'geometricPrecision'
  }

  const metrics = ctx.measureText(text)
  const advanceWidth = metrics.width

  // Fallbacks relativ zum Anker, falls actualBoundingBox fehlt (alte Browser)
  const fallbackLeft =
    alignment === 'center' ? advanceWidth / 2 : alignment === 'left' ? 0 : advanceWidth
  const fallbackRight =
    alignment === 'center' ? advanceWidth / 2 : alignment === 'left' ? advanceWidth : 0

  // WICHTIG (Fix für den "d bleibt stehen"-Freeze): metrics.width ist die
  // Laufweite, nicht die Tinte. Kursive Glyphen malen rechts darüber hinaus —
  // Partikel dort würden von der Welle nie erfasst, "allVaporized" bliebe
  // für immer false und der Zyklus fröre ein. Deshalb: echte Tinten-Ausmaße
  // (actualBoundingBox, relativ zum Anker textX) + Sicherheitsrand.
  const pad = 8
  const left = textX - (metrics.actualBoundingBoxLeft ?? fallbackLeft) - pad
  const right = textX + (metrics.actualBoundingBoxRight ?? fallbackRight) + pad

  const textBoundaries = {
    left,
    right,
    width: right - left,
  }

  ctx.fillText(text, textX, textY)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  const currentDPR = canvas.width / parseInt(canvas.style.width)
  // 1 particle per device pixel → dense fill matching 21st.dev quality.
  // Regex removal + DPR cap keep this fast enough.
  const sampleRate = 1

  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4
      const alpha = data[index + 3]

      if (alpha > 0) {
        const originalAlpha = (alpha / 255) * (sampleRate / currentDPR)
        const particle = {
          x,
          y,
          originalX: x,
          originalY: y,
          r: data[index],
          g: data[index + 1],
          b: data[index + 2],
          opacity: originalAlpha,
          originalAlpha,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        }

        particles.push(particle)
      }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  return { particles, textBoundaries }
}

// Original-Physik der 21st.dev-Demo: 360°-Zerstäuben mit Distanz-Dämpfung,
// leichter Rückzugskraft und dichteabhängigem Schnell-Fade.
const updateParticles = (
  particles,
  vaporizeX,
  deltaTime,
  MULTIPLIED_VAPORIZE_SPREAD,
  VAPORIZE_DURATION,
  direction,
  density
) => {
  let allParticlesVaporized = true

  particles.forEach((particle) => {
    const shouldVaporize =
      direction === 'left-to-right'
        ? particle.originalX <= vaporizeX
        : particle.originalX >= vaporizeX

    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle = Math.random() * Math.PI * 2
        particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD
        particle.velocityX = Math.cos(particle.angle) * particle.speed
        particle.velocityY = Math.sin(particle.angle) * particle.speed
        particle.shouldFadeQuickly = Math.random() > density
      }

      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime)
      } else {
        const dx = particle.originalX - particle.x
        const dy = particle.originalY - particle.y
        const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy)

        const dampingFactor = Math.max(
          0.95,
          1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD)
        )

        const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3
        const spreadX = (Math.random() - 0.5) * randomSpread
        const spreadY = (Math.random() - 0.5) * randomSpread

        particle.velocityX = (particle.velocityX + spreadX + dx * 0.002) * dampingFactor
        particle.velocityY = (particle.velocityY + spreadY + dy * 0.002) * dampingFactor

        const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2
        const currentVelocity = Math.sqrt(
          particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY
        )

        if (currentVelocity > maxVelocity) {
          const scale = maxVelocity / currentVelocity
          particle.velocityX *= scale
          particle.velocityY *= scale
        }

        particle.x += particle.velocityX * deltaTime * 20
        particle.y += particle.velocityY * deltaTime * 10

        // 0.25 im Original — höher, damit die Restwolke nicht so lange steht
        const baseFadeRate = 0.55
        const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION)

        particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate)
      }

      if (particle.opacity > 0.01) {
        allParticlesVaporized = false
      }
    } else {
      allParticlesVaporized = false
    }
  })

  return allParticlesVaporized
}

const renderParticles = (ctx, particles, globalDpr) => {
  ctx.save()
  ctx.scale(globalDpr, globalDpr)

  particles.forEach((particle) => {
    if (particle.opacity > 0) {
      ctx.fillStyle = `rgba(${particle.r},${particle.g},${particle.b},${particle.opacity})`
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1)
    }
  })

  ctx.restore()
}

const resetParticles = (particles) => {
  particles.forEach((particle) => {
    particle.x = particle.originalX
    particle.y = particle.originalY
    particle.opacity = particle.originalAlpha
    particle.speed = 0
    particle.velocityX = 0
    particle.velocityY = 0
  })
}

// ------------------------------------------------------------ //
// CALCULATE VAPORIZE SPREAD
// ------------------------------------------------------------ //
const calculateVaporizeSpread = (fontSize) => {
  const size = typeof fontSize === 'string' ? parseInt(fontSize) : fontSize

  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 },
  ]

  if (size <= points[0].size) return points[0].spread
  if (size >= points[points.length - 1].size) return points[points.length - 1].spread

  let i = 0
  while (i < points.length - 1 && points[i + 1].size < size) i++

  const p1 = points[i]
  const p2 = points[i + 1]

  return p1.spread + ((size - p1.size) * (p2.spread - p1.spread)) / (p2.size - p1.size)
}

// ------------------------------------------------------------ //
// PARSE COLOR
// ------------------------------------------------------------ //
const parseColor = (color) => {
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)

  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch
    return `rgba(${r}, ${g}, ${b}, ${a})`
  } else if (rgbMatch) {
    const [, r, g, b] = rgbMatch
    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  console.warn('Could not parse color:', color)
  return 'rgba(0, 0, 0, 1)'
}

function transformValue(input, inputRange, outputRange, clamp = false) {
  const [inputMin, inputMax] = inputRange
  const [outputMin, outputMax] = outputRange

  const progress = (input - inputMin) / (inputMax - inputMin)
  let result = outputMin + progress * (outputMax - outputMin)

  if (clamp) {
    if (outputMax > outputMin) {
      result = Math.min(Math.max(result, outputMin), outputMax)
    } else {
      result = Math.min(Math.max(result, outputMax), outputMin)
    }
  }

  return result
}

function useIsInView(ref) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '50px' }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isInView
}
