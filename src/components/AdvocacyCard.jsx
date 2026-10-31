import { ArrowUpRight, CloudSun, PawPrint, TreePine } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Link } from "react-router-dom"

const icons = {
  nature: TreePine,
  animals: PawPrint,
  climate: CloudSun,
}

export default function AdvocacyCard({ item, index = 0 }) {
  const Icon = icons[item.slug]
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={reduce ? { duration: 0 } : { duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
    >
    <Link
      to={item.path}
      style={{ "--accent": item.accent }}
      className="accent-card group flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative h-44 overflow-hidden sm:h-56">
        <img
          src={item.hero.image}
          alt={item.hero.imageAlt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent" />
        <div className="absolute top-4 left-4 grid size-11 place-items-center rounded-full border border-white/20 bg-space/60 text-[color:var(--accent)] backdrop-blur-sm">
          <Icon size={18} aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[color:var(--accent)] uppercase sm:text-xs sm:tracking-[0.22em]">
          {item.nav}
        </p>
        <h3 className="mt-1.5 font-display text-xl text-ink sm:mt-2 sm:text-2xl">{item.member}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-mist sm:mt-3">{item.summary}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink sm:mt-6">
          Explore
          <ArrowUpRight
            size={16}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
    </motion.div>
  )
}
