import { useEffect, useState } from "react"
import { Menu, PawPrint, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { navLinks, site } from "../data/site"
import PalettePreferences from "./PalettePreferences"

function isActive(pathname, hash, to) {
  const [path, targetHash] = to.split("#")
  const targetPath = path || "/"
  if (targetPath === "/") return pathname === "/" && (targetHash ? hash === `#${targetHash}` : !hash)
  return pathname === targetPath || pathname.startsWith(`${targetPath}/`)
}

export default function Navbar() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === "/"
  const isProfile = pathname.startsWith("/profiles/")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className={`site-header ${isHome ? "hero-site-header" : isProfile ? "profile-site-header" : "sticky top-0"} z-40 shadow-[0_8px_32px_rgba(0,0,0,0.16)] backdrop-blur-xl`}>
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-logo text-[10px] tracking-[0.16em] text-ink sm:text-xs sm:tracking-[0.22em]">
          <PawPrint size={18} className="text-animals theme-accent-glow" aria-hidden="true" />
          {site.name.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActive(pathname, hash, link.to)
            const cta = link.to === "/get-involved"
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`${
                  cta
                    ? "theme-primary-button rounded-full px-4 py-2 text-sm font-semibold"
                    : `hero-nav-link text-sm font-medium ${active ? "text-ink" : "text-mist hover:text-ink"}`
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <PalettePreferences />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 px-4 py-3 md:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isActive(pathname, hash, link.to) ? "page" : undefined}
                  className="block rounded-xl px-3 py-3 text-base text-ink hover:bg-white/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
