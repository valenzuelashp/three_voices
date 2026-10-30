import { ArrowUpRight, CloudSun, PawPrint, TreePine } from "lucide-react"
import { Link } from "react-router-dom"

const icons = {
  nature: TreePine,
  animals: PawPrint,
  climate: CloudSun,
}

export default function AdvocacyCard({ item }) {
  const Icon = icons[item.slug]

  return (
    <Link
      to={item.path}
      style={{ "--accent": item.accent }}
      className="accent-card group flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden">
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
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-[color:var(--accent)] uppercase">{item.nav}</p>
        <h3 className="mt-2 font-display text-2xl text-ink">{item.member}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-mist">{item.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Explore
          <ArrowUpRight
            size={16}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
