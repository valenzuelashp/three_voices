import { Link } from "react-router-dom"
import { PawPrint } from "lucide-react"
import { navLinks, site } from "../data/site"

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:px-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="flex items-center gap-2 font-logo text-[10px] tracking-[0.16em] text-ink sm:text-[11px] sm:tracking-[0.28em]">
            <PawPrint size={16} className="text-animals" aria-hidden="true" />
            {site.name.toUpperCase()}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">{site.tagline}</p>
          <p className="mt-3 text-sm text-mist sm:mt-4">A group website by Charles, Sharmaine, and Ia.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-ink">Explore</h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-mist hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-mist sm:px-6 sm:py-5 lg:px-8">
          Photographs from Unsplash. © {new Date().getFullYear()} Three Voices.
        </p>
      </div>
    </footer>
  )
}
