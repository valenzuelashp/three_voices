import { Link } from "react-router-dom"
import { navLinks, site, sources } from "../data/site"

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_0.8fr_1.4fr]">
        <div>
          <p className="font-logo text-[11px] tracking-[0.28em] text-ink">{site.name.toUpperCase()}</p>
          <p className="mt-4 max-w-xs leading-7 text-mist">{site.tagline}</p>
          <p className="mt-4 text-sm text-mist">A group website by Charles, Sharmaine, and Ia.</p>
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

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-ink">Sources</h2>
          <p className="mt-4 text-sm leading-6 text-mist">
            Figures on this site are summarized from the pages below. Read the original before citing a number.
          </p>
          <ul className="mt-4 space-y-2">
            {sources.map((source) => (
              <li key={source.id}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-mist underline decoration-white/20 underline-offset-4 hover:text-ink"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 text-xs text-mist sm:px-8">
          Photographs from Unsplash. © {new Date().getFullYear()} Three Voices.
        </p>
      </div>
    </footer>
  )
}
