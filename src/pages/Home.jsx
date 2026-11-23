import { useEffect } from "react"
import { ArrowUpRight, Bone, Heart, Newspaper, PawPrint } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import AdvocacyCard from "../components/AdvocacyCard"
import Container from "../components/Container"
import LostPets from "../components/LostPets"
import PetAssets from "../components/PetAssets"
import PetIcon from "../components/PetIcon"
import PetGallery from "../components/PetGallery"
import PetMarquee from "../components/PetMarquee"
import Reveal from "../components/Reveal"
import { profiles, site } from "../data/site"
import usePageTitle from "../usePageTitle"

const inquirerPostUrl =
  "https://www.facebook.com/inquirerdotnet/posts/trigger-warning-sensitive-contentall-29-dogs-and-cats-dumped-in-san-jose-del-mon/1601376602173289/"
const inquirerPreviewImageUrl =
  "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.99422-6/877512484_1654189299431425_319350756179079831_n.png?stp=dst-jpg_tt6&cstp=mx1292x1569&ctp=p600x600&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=cae128&_nc_ohc=hlNJB2FEJ4AQ7kNvwGut-O-&_nc_oc=AdoAze_F7kkXQJFpM3MyoabOvH765rS4Gsy3YjXRIfulscAuVYllzbhl9fPKe2zMaXw&_nc_zt=14&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=fAz6NFp1wXUa2LOn_wDYEQ&_nc_ss=7b20f&oh=00_AQTu1YZDpoF5l8QyoE1W1QMZYWYCL_w9EDcvFqjFQeUoyw&oe=6B0351F1"

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
              <a href="#profiles" className="theme-primary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
                <Bone size={16} aria-hidden="true" />
                Meet our voices
              </a>
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
            fill="var(--palette-paper)"
          />
        </svg>
      </section>

      <section className="pet-creed pet-reveal" aria-label="Our shared line">
        <PawPrint className="pet-creed-mark" size={28} aria-hidden="true" />
        <p>{site.tagline}</p>
      </section>

      <section id="advocacy" className="home-paper-section home-sheet home-sheet-advocacy pet-reveal pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <PetAssets variant="stamps" />
        <Container>
          <div className="home-split">
            <div>
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
          <div id="profiles" className="home-voices">
            <div className="home-voices-heading">
              <p className="home-index">
                <span>02</span>
                The people behind the cause
              </p>
              <h2 className="home-display home-display-small">Three voices, one advocacy.</h2>
            </div>
            <div className="home-voice-rule" aria-hidden="true">
              <span />
              <i className="pet-badge pet-badge-dog"><PetIcon name="dog" /></i>
              <span />
              <i className="pet-badge pet-badge-cat"><PetIcon name="cat" /></i>
              <span />
              <i className="pet-badge pet-badge-hamster"><PetIcon name="hamster" /></i>
              <span />
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {profiles.map((profile, index) => (
              <AdvocacyCard key={profile.slug} item={profile} index={index} />
            ))}
            </div>
          </div>
        </Container>
      </section>

      <PetMarquee />

      <PetGallery />

      <section className="home-paper-section home-sheet home-sheet-watch pet-reveal py-12 sm:py-16 lg:py-20" aria-labelledby="featured-issue-title">
        <PetAssets variant="stamps" />
        <Container>
          <div className="mb-5 text-center sm:mb-7">
            <p className="home-index home-index-center">
              <span>03</span>
              Animal welfare watch · Philippines
            </p>
            <h2 id="featured-issue-title" className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              Stories that need our attention
            </h2>
          </div>
          <p className="mx-auto mb-4 max-w-5xl font-logo text-[10px] font-semibold tracking-[0.16em] text-animals sm:mb-5 sm:text-[11px]">
            TRIGGER WARNING · SENSITIVE CONTENT — THE IMAGE BELOW IS BLURRED
          </p>
          <article className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-[0.8fr_1.2fr]">
            <figure className="m-0 flex flex-col items-center justify-center gap-3 bg-animals/5 p-4 sm:p-6">
              <a href={inquirerPostUrl} target="_blank" rel="noopener noreferrer" aria-label="Open the Inquirer Facebook post">
                <img
                  src={inquirerPreviewImageUrl}
                  alt="Blurred image in an INQUIRER.net graphic about the Bulacan case"
                  className="h-auto max-h-[36rem] w-auto max-w-full rounded-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </a>
              <figcaption className="text-center font-logo text-[9px] tracking-[0.12em] text-mist/70">
                IMAGE: INQUIRER.NET · PHOTO: LUNA AND FURRY SIBLINGS ANIMAL RESCUE
              </figcaption>
            </figure>
            <div className="p-5 sm:p-8">
              <p className="flex items-center gap-2 font-logo text-[10px] tracking-[0.2em] text-animals sm:text-[11px]">
                <Newspaper size={16} aria-hidden="true" />
                ANIMAL WELFARE WATCH
              </p>
              <p className="mt-3 font-display text-lg text-ink sm:text-xl">San Jose del Monte, Bulacan</p>
              <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">
                29 dogs and cats claimed by their owners, rescue group says
              </h3>
              <p className="mt-3 text-sm leading-6 text-mist sm:text-base sm:leading-7">
                INQUIRER.net reports that all 29 dogs and cats dumped in San Jose del Monte, Bulacan, have been claimed
                by their respective owners, according to an animal rescue group.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://newsinfo.inquirer.net/2334122/all-dead-pets-dumped-in-bulacan-claimed-by-owners-rescue-group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-primary-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
                >
                  Read the report <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href={inquirerPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/10"
                >
                  View Inquirer post <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
          <article className="mx-auto mt-6 grid max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-5 sm:p-8">
              <p className="font-logo text-[10px] tracking-[0.2em] text-animals sm:text-[11px]">
                PAWS RESCUE · TAYTAY, RIZAL
              </p>
              <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">
                34 animals rescued from neglect
              </h3>
              <p className="mt-3 text-sm leading-6 text-mist sm:text-base sm:leading-7">
                PAWS reports rescuing 29 dogs and 5 cats found in filthy, unsanitary conditions. Many were severely
                underweight, and some were confined in cages. PAWS urges spaying and neutering and adopting pets that
                have already been spayed or neutered.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/share/v/1CQUrzKddi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-primary-button inline-flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
                >
                  Watch the PAWS update <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href="https://mb.com.ph/2026/11/16/child-34-neglected-animals-rescued-from-filthy-rizal-home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/10"
                >
                  Read a report <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <figure className="m-0 flex flex-col items-center justify-center gap-3 bg-animals/5 p-4 sm:p-6">
              <a
                href="https://www.facebook.com/share/v/1CQUrzKddi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the PAWS rescue video on Facebook"
              >
                <img
                  src="/images/paws-taytay-rescue.jpg"
                  alt="PAWS alert about 29 dogs and 5 cats left in neglect in Taytay, Rizal"
                  className="h-auto max-h-[36rem] w-auto max-w-full rounded-xl"
                  loading="lazy"
                />
              </a>
              <figcaption className="text-center font-logo text-[9px] tracking-[0.12em] text-mist/70">
                PAWS PHILIPPINES · TAYTAY, RIZAL
              </figcaption>
            </figure>
          </article>
        </Container>
      </section>

      <LostPets />

      <section className="home-paper-section home-sheet home-sheet-close home-bottom-cta pet-reveal py-12 sm:py-16 lg:py-20">
        <Reveal>
          <Container className="flex flex-col items-start justify-between gap-5 sm:gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
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
    </>
  )
}
