import { Link } from "react-router-dom"
import Container from "../components/Container"
import { advocacyList } from "../data/site"
import usePageTitle from "../usePageTitle"

export default function NotFound() {
  usePageTitle("Page not found · Three Voices")

  return (
    <section className="py-24">
      <Container className="max-w-xl">
        <p className="font-logo text-[11px] tracking-[0.28em] text-galaxy">404</p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">This page is not on the map.</h1>
        <p className="mt-4 leading-7 text-mist">The portfolios are still here. Pick a voice, or go back home.</p>
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
