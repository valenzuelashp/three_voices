import { useEffect } from "react"
import { Bone, Heart, PawPrint } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import Container from "../components/Container"
import LostPets from "../components/LostPets"
import News from "./News"
import PetAssets from "../components/PetAssets"
import PetGallery from "../components/PetGallery"
import PetMarquee from "../components/PetMarquee"
import Reveal from "../components/Reveal"
import { site } from "../data/site"
import usePageTitle from "../usePageTitle"

const aquariumPets = [
  ["clown", "4%", "1.22rem", "40s", "-2s", "a", "3.1s", "8%"],
  ["seahorse", "46%", "1.05rem", "54s", "-18s", "b", "4.4s", "22%"],
  ["shrimp", "18%", "1rem", "33s", "-9s", "c", "2.2s", "41%"],
  ["snail", "38%", "1.12rem", "62s", "-27s", "a", "5.2s", "63%"],
  ["clown", "28%", "1.08rem", "47s", "-36s", "b", "3.6s", "15%"],
  ["shrimp", "52%", "0.92rem", "29s", "-6s", "a", "1.9s", "74%"],
  ["seahorse", "8%", "1.16rem", "58s", "-41s", "c", "4.8s", "33%"],
  ["snail", "22%", "0.98rem", "66s", "-14s", "b", "5.6s", "52%"],
  ["clown", "42%", "1.28rem", "36s", "-21s", "c", "2.8s", "6%"],
  ["shrimp", "10%", "1.02rem", "31s", "-24s", "b", "2.1s", "68%"],
  ["seahorse", "34%", "0.96rem", "50s", "-33s", "a", "4.1s", "27%"],
  ["clown", "16%", "1.05rem", "44s", "-12s", "a", "3.4s", "81%"],
  ["snail", "50%", "1.08rem", "70s", "-48s", "c", "6s", "44%"],
  ["shrimp", "30%", "0.9rem", "27s", "-4s", "c", "1.7s", "17%"],
  ["seahorse", "20%", "1.2rem", "61s", "-52s", "b", "5s", "59%"],
  ["clown", "48%", "1.1rem", "39s", "-29s", "b", "3s", "36%"],
  ["snail", "6%", "1.02rem", "64s", "-19s", "a", "5.4s", "72%"],
  ["shrimp", "40%", "1.06rem", "34s", "-16s", "a", "2.3s", "11%"],
  ["clown", "24%", "1.18rem", "43s", "-38s", "c", "3.3s", "49%"],
  ["seahorse", "54%", "1rem", "56s", "-8s", "c", "4.6s", "25%"],
  ["snail", "14%", "1.14rem", "68s", "-44s", "b", "5.8s", "78%"],
  ["shrimp", "36%", "0.94rem", "30s", "-22s", "b", "2s", "55%"],
  ["clown", "8%", "1.14rem", "45s", "-31s", "a", "3.5s", "19%"],
  ["seahorse", "44%", "1.1rem", "52s", "-46s", "a", "4.2s", "66%"],
  ["clown", "12%", "1.16rem", "42s", "-7s", "a", "3.2s", "12%"],
  ["clown", "26%", "1.24rem", "38s", "-15s", "c", "2.6s", "28%"],
  ["clown", "33%", "1.1rem", "49s", "-26s", "b", "3.8s", "57%"],
  ["clown", "18%", "1.2rem", "35s", "-11s", "a", "2.9s", "70%"],
  ["clown", "21%", "1.08rem", "41s", "-19s", "c", "3.1s", "84%"],
  ["turtle", "40%", "1.42rem", "78s", "-20s", "b", "6.4s", "46%"],
  ["dory", "22%", "1.26rem", "46s", "-9s", "c", "3.4s", "33%"],
]

function AquariumGlyph({ kind }) {
  if (kind === "seahorse") {
    return (
      <svg className="aquarium-glyph" viewBox="0 0 58 46">
        <path fill="#f0b429" d="M18 10c6-8 16-6 16 2 0 4-4 6-8 5 6 2 12 1 14 5 2 5-2 8-7 7 2 8-2 14-8 16-8 3-14-2-12-8 2-6-2-10-6-14-4-4-2-12 5-13 2 0 4 0 6 0z" />
        <path fill="#ffe08a" d="M22 16c4 1 6 4 5 8-2 5-2 8 0 12-3-1-5-5-4-9 1-4 0-8-1-11z" />
        <path fill="#f0b429" d="M30 8h14c1 2-2 5-6 5h-7c-1 0-2-2-1-5z" />
        <circle cx="20" cy="12" r="1.7" fill="#1d2430" />
        <circle cx="20.6" cy="11.5" r="0.55" fill="#fff" />
        <path fill="#f0b429" d="M16 34c6 1 9 6 5 9-4 3-9 1-10-3-1-3 2-5 5-4" />
      </svg>
    )
  }
  if (kind === "snail") {
    return (
      <svg className="aquarium-glyph" viewBox="0 0 58 34">
        <ellipse cx="22" cy="16" rx="13" ry="11" fill="#3db7e8" />
        <ellipse cx="22" cy="16" rx="8" ry="7" fill="#b6ecff" />
        <circle cx="22" cy="16" r="3.2" fill="#1d6f99" />
        <path fill="#f4c7a8" d="M18 22c10 1 22 2 30 6 2 1 2 4-1 5-12 2-24 1-32-3-3-2-2-7 3-8z" />
        <path stroke="#e7b08a" strokeWidth="1.4" fill="none" d="M40 24 44 16M46 26l6-6" />
        <circle cx="44" cy="15.2" r="1.3" fill="#1d2430" />
        <circle cx="52" cy="19.2" r="1.3" fill="#1d2430" />
      </svg>
    )
  }
  if (kind === "turtle") {
    return (
      <svg className="aquarium-glyph" viewBox="0 0 74 40">
        <path fill="#7d9a62" d="M10 18c5 0 8 3 7 6-5 1-10-1-7-6z" />
        <ellipse cx="24" cy="27" rx="8" ry="3.6" fill="#6f8f5c" transform="rotate(-24 24 27)" />
        <ellipse cx="36" cy="18" rx="16" ry="12" fill="#5f7d4e" />
        <ellipse cx="36" cy="18" rx="11" ry="8" fill="#c4b48a" />
        <path fill="#8f7a52" d="M30 12h7l-1 7h-7zM37 13l6 2-1 7-6-1z" />
        <ellipse cx="48" cy="26" rx="9" ry="3.8" fill="#7d9a62" transform="rotate(16 48 26)" />
        <ellipse cx="56" cy="16" rx="9" ry="5.4" fill="#8aaa72" />
        <circle cx="62" cy="15" r="1.5" fill="#1d2430" />
        <circle cx="62.5" cy="14.5" r="0.5" fill="#fff" />
      </svg>
    )
  }
  if (kind === "dory") {
    return (
      <svg className="aquarium-glyph" viewBox="0 0 70 36">
        <path fill="#f0d48a" d="M6 18 20 8v20z" />
        <ellipse cx="40" cy="18" rx="20" ry="12" fill="#f6ead0" />
        <path fill="#efe0bc" d="M28 8c8-6 18-4 20 2-8 1-16 0-20-2z" />
        <path fill="#efe0bc" d="M30 28c8 5 16 3 18-1-8-1-14 0-18 1z" />
        <path fill="#c4a27a" d="M46 9c5 2 8 7 5 12-5-1-10-5-10-10 1-1 3-2 5-2z" />
        <path fill="#fff8ea" d="M36 17c7 2 9 8 2 10-5-2-9-6-2-10z" />
        <circle cx="54" cy="16" r="2.2" fill="#1d2430" />
        <circle cx="54.7" cy="15.4" r="0.7" fill="#fff" />
      </svg>
    )
  }
  if (kind === "shrimp") {
    return (
      <svg className="aquarium-glyph" viewBox="0 0 64 30">
        <path fill="#ff6b8a" d="M10 15 2 8v14z" />
        <path fill="#ff8fa3" d="M12 15c6-7 16-8 24-4 8 4 14 3 20 6-4 5-10 6-18 4-8-1-16 0-22 4-3 2-6-4-4-10z" />
        <path fill="#ffd0da" d="M22 13c6 1 12 2 18 5" />
        <circle cx="46" cy="13" r="1.5" fill="#1d2430" />
        <path stroke="#ffd0da" strokeWidth="1.1" fill="none" d="M50 14 60 8M50 16l11 2" />
        <path stroke="#ff6b8a" strokeWidth="1" fill="none" d="M24 18 22 24M32 18l-1 6M40 17l1 6" />
      </svg>
    )
  }
  return (
    <svg className="aquarium-glyph" viewBox="0 0 68 34">
      <path fill="#ff7a1a" d="M6 17 18 7v20z" />
      <ellipse cx="38" cy="17" rx="18" ry="12" fill="#ff7a1a" />
      <path fill="#fff7ef" d="M28 7c1 6 1 14 0 20h7c1-6 1-14 0-20z" />
      <path fill="#fff7ef" d="M40 8c1 5 1 12 0 17h6c1-5 1-12 0-17z" />
      <path fill="#f25c12" d="M34 22c6 7 14 6 16 1-6 1-12-1-16-1z" />
      <circle cx="50" cy="14" r="2.1" fill="#1d2430" />
      <circle cx="50.7" cy="13.4" r="0.7" fill="#fff" />
    </svg>
  )
}

export default function Home() {
  const { hash } = useLocation()
  usePageTitle("One Kind · Animal Advocacy")

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" })
  }, [hash])

  useEffect(() => {
    const nodes = document.querySelectorAll(".pet-reveal")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-visible"))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.08 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const layer = document.querySelector(".hero-parallax")
    if (!layer) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    let frame = 0
    function onScroll() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        layer.style.transform = `translate3d(0, ${window.scrollY * 0.28}px, 0)`
        frame = 0
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || reduce) return undefined

    const pairs = [
      ["#advocacy", ".pattern-field"],
      ["#pets", ".circle-paws"],
    ]
      .map(([sectionSelector, fieldSelector]) => {
        const section = document.querySelector(sectionSelector)
        const field = section?.querySelector(fieldSelector)
        return section && field ? { section, field } : null
      })
      .filter(Boolean)

    function watch({ section, field }) {
      function onMove(event) {
        const rect = section.getBoundingClientRect()
        field.style.setProperty("--spot-x", `${event.clientX - rect.left}px`)
        field.style.setProperty("--spot-y", `${event.clientY - rect.top}px`)
        field.classList.add("is-lit")
      }
      function onLeave() {
        field.classList.remove("is-lit")
      }
      section.addEventListener("pointermove", onMove)
      section.addEventListener("pointerleave", onLeave)
      return () => {
        section.removeEventListener("pointermove", onMove)
        section.removeEventListener("pointerleave", onLeave)
      }
    }

    const stop = pairs.map(watch)
    return () => stop.forEach((cleanup) => cleanup())
  }, [])

  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-parallax">
          <img
            src="/images/hero-dog-window.png"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="hero-slide hero-image is-active"
          />
        </div>
        <Container className="hero-content">
          <div className="max-w-3xl">
            <p className="hero-kicker">
              <span className="signal-dot size-1.5 rounded-full bg-animals" aria-hidden="true" />
              ONE KIND <span className="text-white/60">/</span> ONE CAUSE
            </p>
            <PetAssets />
            <h1 id="hero-title" className="hero-heading">
              A kinder world for animals <span>starts with us.</span>
            </h1>
            <p className="hero-lede">{site.lede}</p>
            <div className="hero-actions mt-7 flex flex-wrap gap-3 sm:mt-9">
              <Link to="/stories" className="theme-primary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
                <Bone size={16} aria-hidden="true" />
                Meet our voices
              </Link>
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Heart size={16} aria-hidden="true" />
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
            fill="currentColor"
          />
        </svg>
      </section>

      <div className="journal-pages">
        <div className="journal-aquarium" aria-hidden="true">
          <div className="aquarium-cylinder">
            <div className="aquarium-rim" />
            <div className="aquarium-water">
              <div className="aquarium-grass" />
              <div className="aquarium-flower aquarium-flower-pink" />
              <div className="aquarium-flower aquarium-flower-white" />
              <div className="aquarium-flower aquarium-flower-yellow" />
              {aquariumPets.flatMap((pet, index) => {
                const seconds = parseFloat(pet[3])
                const shifted = `-${(Math.abs(parseFloat(pet[4])) + seconds / 2) % seconds}s`
                return [pet, [pet[0], pet[1], pet[2], pet[3], shifted, pet[5] === "a" ? "b" : "c", pet[6], pet[7]]]
              }).map(([kind, , size, dive, delay, weave, weaveTime, rest], index) => (
                <span
                  key={`${kind}-${index}`}
                  className={`aquarium-pet aquarium-kind-${kind}${weave === "b" ? " is-reverse" : ""}`}
                  style={{
                    width: `${(parseFloat(size) * 2.45).toFixed(2)}rem`,
                    top: rest,
                    "--dive": dive,
                    "--dive-delay": delay,
                    "--lap": `${(parseFloat(weaveTime) * 1.8).toFixed(2)}s`,
                    "--lap-delay": `${(index % 6) * 0.45}s`,
                  }}
                >
                  <span className={`aquarium-pet-path aquarium-swim-${weave}`} style={{ animationDuration: `${(parseFloat(weaveTime) * 1.8).toFixed(2)}s`, animationDelay: `${(index % 6) * 0.45}s` }}>
                    <AquariumGlyph kind={kind} />
                  </span>
                </span>
              ))}
              <span className="aquarium-bubble" />
              <span className="aquarium-bubble aquarium-bubble-b" />
              <span className="aquarium-bubble aquarium-bubble-c" />
              <span className="aquarium-bubble aquarium-bubble-d" />
              <span className="aquarium-bubble aquarium-bubble-e" />
              <span className="aquarium-bubble aquarium-bubble-f" />
              <span className="aquarium-bubble aquarium-bubble-g" />
              <span className="aquarium-bubble aquarium-bubble-h" />
            </div>
            <div className="aquarium-base" />
          </div>
        </div>
      <section className="pet-creed pet-reveal" aria-label="Our shared line">
        <PawPrint className="pet-creed-mark" size={28} aria-hidden="true" />
        <p>{site.tagline}</p>
      </section>

      <section id="advocacy" className="home-paper-section home-sheet home-sheet-advocacy pet-reveal pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="pattern-field" aria-hidden="true">
          <span className="pattern-dogs" />
          <span className="pattern-cats" />
        </div>
        <PetAssets variant="stamps" />
        <Container>
          <div className="home-split">
            <div>
              <p className="journal-chapter">The Promise</p>
              <p className="home-index">
                <span>01</span>
                Our shared advocacy
              </p>
              <h2 className="home-display">Animal welfare</h2>
              <PetAssets />
            </div>
            <div className="home-copy-stack">
              <p>
                Pets bring loyalty, comfort, and joy into our lives—dogs are called man’s best friend for a reason. In
                return, they deserve loving homes, thoughtful care, and protection throughout their lives. Join us in
                making that kindness a promise to every animal.
              </p>
              <p>
                Caring for a pet is a lifelong promise: provide healthy food, clean water, medical care, patience, and
                a safe place to call home. Adoption, spaying or neutering, and never abandoning a pet can help prevent
                suffering.
              </p>
              <p>
                Not everyone can adopt, but everyone can make a difference. Support local shelters, share responsible
                care, and speak up when an animal needs help. Small acts of compassion add up to a kinder world.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <News />

      <PetMarquee />

      <PetGallery />

      <LostPets />

      <section className="home-paper-section home-sheet home-sheet-close home-bottom-cta pet-reveal py-12 sm:py-16 lg:py-20">
        <Reveal>
          <Container className="flex flex-col items-start justify-between gap-5 sm:gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="journal-chapter">The Next Chapter</p>
              <PetAssets />
              <h2 className="mt-4 font-display text-2xl text-ink sm:text-3xl lg:text-4xl">Stand with animals.</h2>
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
      </div>
    </>
  )
}
