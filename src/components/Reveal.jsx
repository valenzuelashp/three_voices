import { motion, useReducedMotion } from "motion/react"

const ease = [0.22, 1, 0.36, 1]

export default function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? { duration: 0 } : { duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
