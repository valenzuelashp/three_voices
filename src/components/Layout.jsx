import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Starfield from "./Starfield"

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-space"
      >
        Skip to content
      </a>
      <Starfield />
      <Navbar />
      <main id="content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
