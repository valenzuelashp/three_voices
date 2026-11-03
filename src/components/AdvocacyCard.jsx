import { ArrowUpRight, PawPrint } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Link } from "react-router-dom"

export default function AdvocacyCard({ item, index = 0 }) {
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
      <div className="profile-artwork relative grid h-44 place-items-center overflow-hidden border-b border-white/10 sm:h-56">
        {item.slug === "charles" ? (
          <>
            <img
              src="/images/profile-charles.png"
              alt="Charles with his dog"
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: "center 38%" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden="true" />
          </>
        ) : (
          <div className="profile-artwork-icon grid size-14 place-items-center rounded-full bg-space/80 text-[color:var(--accent)]">
            <PawPrint size={22} aria-hidden="true" />
            <span className="sr-only">Profile photo placeholder</span>
          </div>
        )}
        <span className="absolute top-4 right-4 font-logo text-[9px] tracking-[0.16em] text-mist/50">PROFILE / 0{index + 1}</span>
        {item.slug !== "charles" && (
          <div className="absolute inset-5 rounded-2xl border border-dashed border-white/10" aria-hidden="true" />
        )}
        <span className="absolute bottom-4 left-4 flex items-center gap-2 font-logo text-[9px] tracking-[0.14em] text-mist/70">
          <span className="size-1.5 rounded-full bg-animals/70" />
          STORY PENDING
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[color:var(--accent)] uppercase sm:text-xs sm:tracking-[0.22em]">
          ANIMAL ADVOCACY
        </p>
        <h3 className="mt-1.5 font-display text-xl text-ink sm:mt-2 sm:text-2xl">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-mist sm:mt-3">Personal story and experiences coming soon.</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink sm:mt-6">
          View profile
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
