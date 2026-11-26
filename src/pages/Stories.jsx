import { useEffect, useRef, useState } from "react"
import AdvocacyCard from "../components/AdvocacyCard"
import Container from "../components/Container"
import PetAssets from "../components/PetAssets"
import { profiles } from "../data/site"
import usePageTitle from "../usePageTitle"

function tear(x, y0, y1, width, salt) {
  const steps = 42
  const hash = (n) => {
    const value = Math.sin(n * 127.1 + salt * 311.7) * 43758.5453
    return value - Math.floor(value)
  }
  const side = (sign) => {
    const points = []
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps
      const y = y0 + (y1 - y0) * t
      const tip = Math.min(1, Math.sin(Math.PI * t) * 1.7)
      const roll = hash(i * 1.7 + sign * 3)
      const snag = roll > 0.82 ? (roll - 0.82) * width * 1.1 : (roll - 0.5) * width * 0.16
      const curve = Math.sin(Math.PI * t) * 12
      const half = width * 0.46 * tip
      points.push([x + curve + sign * (half + snag * tip), y])
    }
    return points
  }
  const points = [...side(1), ...side(-1).reverse()]
  return `M ${points.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(" L ")} Z`
}

const clawPaths = [
  tear(78, 6, 400, 36, 1),
  tear(210, 18, 418, 42, 3),
  tear(348, 4, 408, 38, 5),
  tear(486, 26, 392, 34, 2),
]

function ClawMarks() {
  return (
    <svg viewBox="0 0 560 430" aria-hidden="true">
      {clawPaths.map((d) => (
        <path key={`rim-${d}`} d={d} fill="#cfc9c2" stroke="#cfc9c2" strokeWidth="5" strokeLinejoin="round" />
      ))}
      {clawPaths.map((d) => (
        <path key={d} d={d} fill="#171412" />
      ))}
    </svg>
  )
}

function scratchTone(ctx, { when = 0, duration, frequency, q, gain }) {
  const length = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let hold = 0
  let left = 0
  for (let i = 0; i < length; i += 1) {
    if (left <= 0) {
      hold = Math.random() * 2 - 1
      left = 6 + Math.floor(Math.random() * 16)
    }
    left -= 1
    const t = i / length
    data[i] = hold * Math.sin(Math.PI * t) * (1 - t * 0.25)
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = "bandpass"
  filter.Q.value = q
  const start = ctx.currentTime + when
  filter.frequency.setValueAtTime(frequency, start)
  filter.frequency.exponentialRampToValueAtTime(Math.max(180, frequency * 0.42), start + duration)
  const amp = ctx.createGain()
  amp.gain.value = gain
  source.connect(filter)
  filter.connect(amp)
  amp.connect(ctx.destination)
  source.start(start)
}

function playScratchSounds(ctx) {
  ;[0, 0.07, 0.14, 0.21].forEach((when, index) => {
    scratchTone(ctx, { when, duration: 0.1, frequency: 3400 - index * 420, q: 0.7, gain: 0.16 })
  })
  scratchTone(ctx, { when: 0.34, duration: 0.5, frequency: 920, q: 1.35, gain: 0.28 })
}

export default function Stories() {
  usePageTitle("Stories · One Kind")
  const [fur, setFur] = useState(false)
  const [scratching, setScratching] = useState(false)
  const timers = useRef([])
  const audioRef = useRef(null)

  useEffect(() => () => {
    timers.current.forEach(clearTimeout)
  }, [])

  function revealFur() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setFur(true)
      return
    }
    setScratching(true)
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (AudioCtx) {
      if (!audioRef.current) audioRef.current = new AudioCtx()
      const ctx = audioRef.current
      if (ctx.state === "suspended") ctx.resume()
      playScratchSounds(ctx)
    }
    timers.current.push(window.setTimeout(() => setFur(true), 920))
    timers.current.push(window.setTimeout(() => setScratching(false), 1800))
  }

  function onCatClick() {
    if (scratching) return
    if (fur) {
      setFur(false)
      return
    }
    revealFur()
  }

  return (
    <section
      id="profiles"
      className={`stories-page home-paper-section home-sheet home-sheet-advocacy py-12 sm:py-16 lg:py-20${scratching ? " is-scratching" : ""}${fur ? " is-fur" : ""}`}
      aria-labelledby="profiles-title"
    >
      <div className="stories-fur-layer" />
      <div className="stories-scratches" aria-hidden="true">
        <span className="stories-scratch stories-scratch-a"><ClawMarks /></span>
        <span className="stories-scratch stories-scratch-b"><ClawMarks /></span>
      </div>
      <div className="pattern-field" aria-hidden="true">
        <span className="pattern-dogs" />
        <span className="pattern-cats" />
      </div>
      <PetAssets variant="stamps" />
      <Container>
        <div className="home-voices">
          <div className="home-voices-heading stories-heading">
            <div>
              <p className="journal-chapter">The People</p>
              <p className="home-index">
                <span>05</span>
                The people behind the cause
              </p>
              <h1 id="profiles-title" className="home-display home-display-small">
                Three voices, one advocacy.
              </h1>
            </div>
            <div className="stories-cat-slot">
            <p className={`stories-cat-pop${fur ? " is-asking" : ""}`} aria-hidden="true">
              {fur ? "bring my beautiful fur back" : "don't touch me!!"}
            </p>
            <button
              type="button"
              className="stories-cat"
              aria-pressed={fur}
              aria-label={fur ? "Hide the cat coat" : "Show the cat coat"}
              onClick={onCatClick}
            >
              <span className="stories-cat-figure">
              <svg viewBox="0 0 180 210" aria-hidden="true">
                <defs>
                  <pattern id="stories-cat-fur" patternUnits="userSpaceOnUse" width="360" height="360">
                    <image href="/images/cat-fur.svg?v=seamless" width="360" height="360" />
                  </pattern>
                </defs>
                <g className="stories-cat-coat" fill="url(#stories-cat-fur)" stroke="#f7f1e6" strokeWidth="7" strokeLinejoin="round">
                  <path d="M58 86 34 28l46 34z" />
                  <path d="M122 86 146 28l-46 34z" />
                  <circle cx="90" cy="98" r="46" />
                  <ellipse className="stories-cat-body" cx="88" cy="162" rx="48" ry="40" />
                  <path className="stories-cat-tail" d="M132 148c26 6 34 34 12 42-16 6-30-10-28-24" />
                </g>
                <g fill="#8a5a32">
                  <ellipse className="stories-cat-ear" cx="48" cy="58" rx="7" ry="16" transform="rotate(-18 48 58)" />
                  <ellipse className="stories-cat-ear" cx="132" cy="58" rx="7" ry="16" transform="rotate(18 132 58)" />
                  <circle cx="74" cy="96" r="4.2" />
                  <circle cx="106" cy="96" r="4.2" />
                  <path d="M90 108c-3 4-3 7 0 8 3-1 3-4 0-8z" />
                  <path d="M90 116c-8 6-6 10 0 8 6 2 8-2 0-8z" fill="none" stroke="#8a5a32" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
              </span>
            </button>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {profiles.map((profile, index) => (
              <AdvocacyCard key={profile.slug} item={profile} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
