import * as React from 'react'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react'
import { cn } from '../../lib/utils'

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
}

const blurVariants = {
  hidden: { filter: 'blur(10px)', opacity: 0 },
  visible: { filter: 'blur(0px)', opacity: 1 },
}

const ContainerScrollContext = React.createContext(undefined)

function useContainerScrollContext() {
  const ctx = React.useContext(ContainerScrollContext)
  if (!ctx) throw new Error('Must be used inside ContainerScroll')
  return ctx
}

export function ContainerScroll({ children, className, ...props }) {
  const scrollRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start center', 'end end'],
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn('relative min-h-svh w-full', className)} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

export const ContainerAnimated = React.forwardRef(
  ({ className, style, inputRange = [0.2, 0.8], outputRange = [80, 0], transition, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const y = useTransform(scrollYProgress, inputRange, outputRange)
    return (
      <motion.div
        ref={ref}
        className={cn('', className)}
        variants={blurVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ y, ...style }}
        transition={{ ...SPRING_TRANSITION, ...transition }}
        {...props}
      />
    )
  }
)
ContainerAnimated.displayName = 'ContainerAnimated'

export const ContainerSticky = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('sticky left-0 top-0 min-h-svh w-full', className)} {...props} />
))
ContainerSticky.displayName = 'ContainerSticky'

export const HeroVideo = React.forwardRef(({ style, className, ...props }, ref) => {
  const { scrollYProgress } = useContainerScrollContext()
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1])
  return (
    <motion.video
      ref={ref}
      className={cn('relative z-10 size-auto max-h-full max-w-full', className)}
      autoPlay
      muted
      loop
      playsInline
      style={{ scale, ...style }}
      {...props}
    />
  )
})
HeroVideo.displayName = 'HeroVideo'

export const ContainerInset = React.forwardRef(
  ({
    className,
    style,
    insetYRange = [45, 0],
    insetXRange = [45, 0],
    roundednessRange = [1000, 16],
    ...props
  }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const insetY = useTransform(scrollYProgress, [0, 0.8], insetYRange)
    const insetX = useTransform(scrollYProgress, [0, 0.8], insetXRange)
    const roundedness = useTransform(scrollYProgress, [0, 1], roundednessRange)
    const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`
    return (
      <motion.div
        ref={ref}
        className={cn('pointer-events-none overflow-hidden', className)}
        style={{ clipPath, ...style }}
        {...props}
      />
    )
  }
)
ContainerInset.displayName = 'ContainerInset'
