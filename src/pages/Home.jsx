import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import AdvocacyCard from "../components/AdvocacyCard"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import { advocacyList, homeFacts, site } from "../data/site"
import usePageTitle from "../usePageTitle"

const ease = [0.22, 1, 0.36, 1]

const orbitRadius = 26
const orbitSeconds = 28

const planets = [
  { src: "/images/nature-forest.jpg", angle: -90, ring: "ring-[#86EFAC]" },
  { src: "/images/animals-dogs.jpg", angle: 150, ring: "ring-[#D8B4FE]" },
  { src: "/images/climate-earth.jpg", angle: 30, ring: "ring-[#7DD3FC]" },
]

function scaleAt(turn) {
  const normalized = ((turn % 360) + 360) % 360
  let delta = Math.abs(normalized - 270)
  if (delta > 180) delta = 360 - delta
  const closeness = Math.cos((delta * Math.PI) / 180)
  const peak = Math.pow((closeness + 1) / 2, 1.45)
  return 0.74 + peak * 0.58
}

function OrbitPlanet({ planet, index, angle, reduce }) {
  const radians = (planet.angle * Math.PI) / 180
  const scale = useTransform(angle, (value) => scaleAt(planet.angle + value))
  const zIndex = useTransform(scale, (value) => Math.round(value * 20))
  const counter = useTransform(angle, (value) => (reduce ? 0 : -value))

  return (
    <motion.div
      className="absolute aspect-square w-[34%]"
      style={{
        left: `${50 + orbitRadius * Math.cos(radians)}%`,
        top: `${50 + orbitRadius * Math.sin(radians)}%`,
        x: "-50%",
        y: "-50%",
        scale,
        rotate: counter,
        zIndex,
      }}
    >
      <motion.img
        src={planet.src}
        alt=""
        className={`h-full w-full rounded-full object-cover ring-2 ring-offset-2 ring-offset-space sm:ring-offset-4 ${planet.ring}`}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.12 + index * 0.08 }}
      />
    </motion.div>
  )
}

function PlanetCluster() {
  const reduce = useReducedMotion()
  const angle = useMotionValue(0)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const shiftX = useTransform(pointerX, (value) => value * 18)
  const shiftY = useTransform(pointerY, (value) => value * 12)

  useEffect(() => {
    if (reduce) return undefined
    const controls = animate(0, 360, {
      duration: orbitSeconds,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (value) => angle.set(value),
    })
    return () => controls.stop()
  }, [angle, reduce])

  function onMove(event) {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[17.5rem] sm:max-w-[22rem] lg:max-w-[27.5rem]"
      style={{ x: shiftX, y: shiftY }}
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
    >
      <motion.div className="absolute inset-0" style={{ rotate: angle }}>
        {planets.map((planet, index) => (
          <OrbitPlanet key={planet.src} planet={planet} index={index} angle={angle} reduce={reduce} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  usePageTitle("Three Voices")
  const reduce = useReducedMotion()
  const rise = reduce
    ? {}
    : {
        initial: "hidden",
        animate: "show",
        variants: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
      }
  const line = reduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
        },
      }

  return (
    <>
      <section className="py-10 sm:py-16 lg:py-24">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <motion.div {...rise}>
            <motion.p
              {...line}
              className="font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.32em]"
            >
              ONE PLANET · THREE VOICES
            </motion.p>
            <motion.h1
              {...line}
              className="mt-3 max-w-xl font-display text-[1.7rem] leading-[1.15] font-semibold text-balance text-ink sm:mt-5 sm:text-5xl sm:leading-[1.08] lg:text-6xl"
            >
              Protecting <span className="text-nature">Nature</span>, Defending{" "}
              <span className="text-animals">Life</span>, Securing Our <span className="text-climate">Future</span>.
            </motion.h1>
            <motion.p {...line} className="mt-4 max-w-xl text-[15px] leading-6 text-mist sm:mt-6 sm:text-lg sm:leading-8">
              {site.lede}
            </motion.p>
            <motion.div {...line} className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <a href="#voices" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space">
                Choose a voice
              </a>
              <Link
                to="/get-involved"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-ink"
              >
                Get involved
              </Link>
            </motion.div>
          </motion.div>

          <PlanetCluster />
        </Container>
      </section>

      <section id="voices" className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.28em]">
              THE PORTFOLIOS
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:mt-3 sm:text-3xl lg:text-4xl">
              Three portfolios. One planet.
            </h2>
            <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">
              Follow a voice to learn the issue, see the evidence, and find a practical way to help.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {advocacyList.map((item, index) => (
              <AdvocacyCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.28em]">
              FROM THE RESEARCH
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:mt-3 sm:text-3xl lg:text-4xl">
              A few figures, with the source attached.
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {homeFacts.map((fact, index) => (
              <Reveal key={fact.to} className="h-full" delay={index * 0.08}>
              <Link
                to={fact.to}
                style={{ "--accent": fact.accent }}
                className="accent-card flex h-full flex-col rounded-2xl p-4 sm:rounded-3xl sm:p-6"
              >
                <p className="font-display text-3xl text-[color:var(--accent)] sm:text-4xl">{fact.stat}</p>
                <h3 className="mt-2 font-display text-lg text-ink sm:mt-3 sm:text-xl">{fact.label}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-mist">{fact.detail}</p>
                <p className="mt-5 text-xs tracking-wide text-ink/80">Source: {fact.source}</p>
              </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Reveal>
        <Container className="flex flex-col items-start justify-between gap-5 sm:gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-ink sm:text-3xl lg:text-4xl">Start with one action.</h2>
            <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">
              Get Involved gathers the steps from all three portfolios, and leaves a place for a note.
            </p>
          </div>
          <Link to="/get-involved" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space">
            Take action
          </Link>
        </Container>
        </Reveal>
      </section>
    </>
  )
}
