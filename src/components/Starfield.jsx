import { motion, useReducedMotion } from "motion/react"
import { PawPrint } from "lucide-react"

const clouds = [
  { className: "absolute -left-24 -top-24 h-96 w-96 bg-animals/10", duration: 18 },
  { className: "absolute top-1/3 -right-24 h-80 w-80 bg-lilac/10", duration: 22 },
  { className: "absolute bottom-0 left-1/4 h-80 w-80 bg-animals/5", duration: 26 },
]

const pawprints = [
  "left-[10%] top-[18%] rotate-[-24deg]",
  "right-[12%] top-[38%] rotate-[18deg]",
  "left-[28%] bottom-[14%] rotate-[12deg]",
  "right-[34%] top-[8%] rotate-[-12deg]",
]

export default function Starfield() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="ambient-backdrop absolute inset-0" />
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.className}
          className={`${cloud.className} rounded-full blur-3xl`}
          animate={reduce ? undefined : { x: [0, 28, 0], y: [0, 18, 0] }}
          transition={{ duration: cloud.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="paw-print-pattern absolute inset-0" />
      {pawprints.map((position, index) => (
        <PawPrint
          key={position}
          className={`absolute ${position} size-12 text-animals/[0.075] sm:size-16`}
          strokeWidth={1.2}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}