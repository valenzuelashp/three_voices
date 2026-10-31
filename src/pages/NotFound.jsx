import { Link } from "react-router-dom"
import Container from "../components/Container"
import { advocacyList } from "../data/site"
import usePageTitle from "../usePageTitle"

export default function NotFound() {
  usePageTitle("Page not found · Three Voices")

  return (
    <section className="py-14 sm:py-24">
      <Container className="max-w-xl">
        <p className="font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.28em]">404</p>
        <h1 className="mt-3 font-display text-3xl text-ink sm:mt-4 sm:text-5xl">This page is not on the map.</h1>
        <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">
          The portfolios are still here. Pick a voice, or go back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space">
            Home
          </Link>
          {advocacyList.map((item) => (
            <Link
              key={item.slug}
              to={item.path}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-ink"
            >
              {item.nav}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
