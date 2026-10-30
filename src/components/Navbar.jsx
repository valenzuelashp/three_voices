import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { navLinks, site } from "../data/site"

function isActive(pathname, to) {
  if (to === "/") return pathname === "/"
  return pathname === to || pathname.startsWith(`${to}/`)
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-space/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="font-logo text-[11px] tracking-[0.28em] text-ink sm:text-xs">
          {site.name.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.to)
            const cta = link.to === "/get-involved"
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={
                  cta
                    ? "rounded-full bg-ink px-4 py-2 text-sm font-semibold text-space"
                    : `text-sm font-medium ${active ? "text-ink" : "text-mist hover:text-ink"}`
                }
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

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

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 px-5 py-4 md:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isActive(pathname, link.to) ? "page" : undefined}
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
