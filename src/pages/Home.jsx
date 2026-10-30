import { Link } from "react-router-dom"
import AdvocacyCard from "../components/AdvocacyCard"
import Container from "../components/Container"
import { advocacyList, homeFacts, site } from "../data/site"
import usePageTitle from "../usePageTitle"

const planets = [
  {
    src: "/images/nature-forest.jpg",
    className: "col-span-2 h-44 w-44 justify-self-center ring-[#86EFAC] sm:h-52 sm:w-52",
  },
  {
    src: "/images/animals-dogs.jpg",
    className: "h-36 w-36 justify-self-end ring-[#D8B4FE] sm:h-44 sm:w-44",
  },
  {
    src: "/images/climate-earth.jpg",
    className: "h-36 w-36 justify-self-start ring-[#7DD3FC] sm:h-44 sm:w-44",
  },
]

export default function Home() {
  usePageTitle("Three Voices")

  return (
    <>
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-logo text-[11px] tracking-[0.32em] text-galaxy">ONE PLANET · THREE VOICES</p>
            <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] font-semibold text-balance text-ink sm:text-6xl">
              Protecting <span className="text-nature">Nature</span>, Defending{" "}
              <span className="text-animals">Life</span>, Securing Our <span className="text-climate">Future</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-mist">{site.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#voices" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space">
                Choose a voice
              </a>
              <Link
                to="/get-involved"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-ink"
              >
                Get involved
              </Link>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-5" aria-hidden="true">
            {planets.map((planet) => (
              <img
                key={planet.src}
                src={planet.src}
                alt=""
                className={`rounded-full object-cover ring-2 ring-offset-4 ring-offset-space ${planet.className}`}
              />
            ))}
          </div>
        </Container>
      </section>

      <section id="voices" className="border-t border-white/10 py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="font-logo text-[11px] tracking-[0.28em] text-galaxy">THE PORTFOLIOS</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Three portfolios. One planet.</h2>
            <p className="mt-4 leading-7 text-mist">
              Follow a voice to learn the issue, see the evidence, and find a practical way to help.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {advocacyList.map((item) => (
              <AdvocacyCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="font-logo text-[11px] tracking-[0.28em] text-galaxy">FROM THE RESEARCH</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">A few figures, with the source attached.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {homeFacts.map((fact) => (
              <Link
                key={fact.to}
                to={fact.to}
                style={{ "--accent": fact.accent }}
                className="accent-card flex h-full flex-col rounded-3xl p-6"
              >
                <p className="font-display text-4xl text-[color:var(--accent)]">{fact.stat}</p>
                <h3 className="mt-3 font-display text-xl text-ink">{fact.label}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-mist">{fact.detail}</p>
                <p className="mt-5 text-xs tracking-wide text-ink/80">Source: {fact.source}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Start with one action.</h2>
            <p className="mt-4 leading-7 text-mist">
              Get Involved gathers the steps from all three portfolios, and leaves a place for a note.
            </p>
          </div>
          <Link to="/get-involved" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space">
            Take action
          </Link>
        </Container>
      </section>
    </>
  )
}
