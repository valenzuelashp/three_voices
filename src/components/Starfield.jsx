import { motion, useReducedMotion } from "motion/react"

const clouds = [
  { className: "absolute -left-24 -top-24 h-96 w-96 bg-galaxy/20", duration: 18 },
  { className: "absolute top-1/3 -right-24 h-80 w-80 bg-climate/10", duration: 22 },
  { className: "absolute bottom-0 left-1/4 h-80 w-80 bg-nature/10", duration: 26 },
]

export default function Starfield() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-space" />
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.className}
          className={`${cloud.className} rounded-full blur-3xl`}
          animate={reduce ? undefined : { x: [0, 28, 0], y: [0, 18, 0] }}
          transition={{ duration: cloud.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="starfield-stars absolute inset-0" />
    </div>
  )
}