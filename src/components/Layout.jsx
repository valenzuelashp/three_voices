import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Starfield from "./Starfield"

const ease = [0.22, 1, 0.36, 1]

export default function Layout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()

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
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
