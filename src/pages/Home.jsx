import { Link } from "react-router-dom"
import AdvocacyCard from "../components/AdvocacyCard"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import { profiles, site } from "../data/site"
import usePageTitle from "../usePageTitle"

export default function Home() {
  usePageTitle("Three Voices · Animal Advocacy")

  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <img
          src="/images/hero-dog-window.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="hero-image"
        />
        <Container className="hero-content">
          <div className="max-w-3xl">
            <p className="hero-kicker">
              <span className="signal-dot size-1.5 rounded-full bg-animals" aria-hidden="true" />
              ONE CAUSE <span className="text-white/60">/</span> THREE VOICES
            </p>
            <h1 id="hero-title" className="hero-heading">
              A kinder world for animals <span>starts with us.</span>
            </h1>
            <p className="hero-lede">{site.lede}</p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
              <a href="#profiles" className="theme-primary-button rounded-full px-5 py-3 text-sm font-semibold">
                Meet our voices
              </a>
              <Link
                to="/get-involved"
                className="rounded-full border border-white/45 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Get involved
              </Link>
            </div>
          </div>
        </Container>
        <svg
          className="hero-wave"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 43 C160 72 260 91 430 84 C620 76 694 48 850 55 C1035 64 1155 86 1300 62 C1365 52 1410 37 1440 30 L1440 100 L0 100 Z"
            fill="var(--palette-paper)"
          />
        </svg>
      </section>

      <section id="advocacy" className="home-paper-section pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-logo text-[10px] tracking-[0.14em] text-animals sm:text-[11px] sm:tracking-[0.28em]">
              OUR SHARED ADVOCACY
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:mt-3 sm:text-3xl lg:text-4xl">Animal welfare</h2>
            <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">
              From beloved pets to wildlife, every animal deserves care, respect, and protection. We share one cause
              and bring our own voices to it.
            </p>
          </div>
          <div id="profiles" className="mt-8 sm:mt-12">
            <div className="mb-5 text-center sm:mb-7">
              <p className="font-logo text-[10px] tracking-[0.14em] text-animals sm:text-[11px] sm:tracking-[0.28em]">
                THE PEOPLE BEHIND THE CAUSE
              </p>
              <h2 className="mt-2 font-display text-xl text-ink sm:text-2xl">Three voices, one advocacy.</h2>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {profiles.map((profile, index) => (
              <AdvocacyCard key={profile.slug} item={profile} index={index} />
            ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="home-paper-section home-bottom-cta py-10 sm:py-14 lg:py-16">
        <Reveal>
          <Container className="flex flex-col items-start justify-between gap-5 sm:gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl text-ink sm:text-3xl lg:text-4xl">Stand with animals.</h2>
              <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">
                Learn more about our group and leave us a note.
              </p>
            </div>
            <Link to="/get-involved" className="theme-primary-button rounded-full px-5 py-3 text-sm font-semibold">
              Get involved
            </Link>
          </Container>
        </Reveal>
      </section>
    </>
  )
}
