const parade = [
  { kind: "dog", motion: "walk" },
  { kind: "bird", motion: "fly" },
  { kind: "cat", motion: "walk" },
  { kind: "butterfly", motion: "fly" },
  { kind: "rabbit", motion: "hop" },
  { kind: "bird", motion: "fly" },
  { kind: "hamster", motion: "waddle" },
  { kind: "butterfly", motion: "fly" },
]

function Dog() {
  return (
    <svg viewBox="0 0 96 58">
      <path className="footer-parade-tail" d="M18 30c-8 0-14-6-14-12 3 8 9 12 14 12z" fill="currentColor" />
      <ellipse cx="40" cy="30" rx="20" ry="12" fill="currentColor" />
      <ellipse cx="38" cy="34" rx="11" ry="6" fill="var(--pet-mark)" />
      <g className="footer-parade-leg"><rect x="26" y="36" width="5" height="15" rx="2.4" fill="currentColor" /></g>
      <g className="footer-parade-leg is-back"><rect x="36" y="37" width="5" height="14" rx="2.4" fill="currentColor" /></g>
      <g className="footer-parade-leg"><rect x="46" y="36" width="5" height="15" rx="2.4" fill="currentColor" /></g>
      <circle cx="64" cy="23" r="12" fill="currentColor" />
      <path d="M56 15c2-8 11-8 13 0-5 1-10 2-13 0z" fill="currentColor" />
      <ellipse cx="75" cy="26" rx="6.5" ry="4.2" fill="currentColor" />
      <ellipse cx="74" cy="28" rx="3.4" ry="2" fill="var(--pet-mark)" />
      <circle cx="68" cy="21" r="1.7" fill="var(--pet-eye)" />
      <circle cx="68.6" cy="20.4" r="0.55" fill="#fff" />
    </svg>
  )
}

function Cat() {
  return (
    <svg viewBox="0 0 92 54">
      <path className="footer-parade-tail" d="M16 28c-1-12 8-18 12-8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="40" cy="30" rx="18" ry="11" fill="currentColor" />
      <ellipse cx="38" cy="34" rx="9" ry="5" fill="var(--pet-mark)" />
      <g className="footer-parade-leg"><rect x="28" y="36" width="4.2" height="13" rx="2.1" fill="currentColor" /></g>
      <g className="footer-parade-leg is-back"><rect x="38" y="37" width="4.2" height="12" rx="2.1" fill="currentColor" /></g>
      <g className="footer-parade-leg"><rect x="48" y="36" width="4.2" height="13" rx="2.1" fill="currentColor" /></g>
      <circle cx="62" cy="24" r="11" fill="currentColor" />
      <path d="M54 18 50 6l10 10z" fill="currentColor" />
      <path d="M66 16 74 6l-2 12z" fill="currentColor" />
      <path d="M55 14 53 8l6 5z" fill="var(--pet-mark)" />
      <ellipse cx="71" cy="26" rx="5" ry="3.4" fill="currentColor" />
      <circle cx="65" cy="22" r="1.5" fill="var(--pet-eye)" />
      <circle cx="65.5" cy="21.5" r="0.5" fill="#fff" />
    </svg>
  )
}

function Rabbit() {
  return (
    <svg viewBox="0 0 78 64">
      <ellipse cx="30" cy="20" rx="4.2" ry="14" fill="currentColor" />
      <ellipse cx="40" cy="18" rx="4.2" ry="15" fill="currentColor" />
      <ellipse cx="30" cy="21" rx="2" ry="9" fill="var(--pet-mark)" />
      <ellipse cx="40" cy="19" rx="2" ry="10" fill="var(--pet-mark)" />
      <ellipse cx="36" cy="42" rx="16" ry="12" fill="currentColor" />
      <ellipse cx="34" cy="46" rx="8" ry="5" fill="var(--pet-mark)" />
      <g className="footer-parade-leg"><rect x="24" y="50" width="5" height="10" rx="2.4" fill="currentColor" /></g>
      <g className="footer-parade-leg is-back"><rect x="40" y="50" width="5" height="10" rx="2.4" fill="currentColor" /></g>
      <circle cx="52" cy="36" r="10" fill="currentColor" />
      <ellipse cx="60" cy="38" rx="5" ry="3.4" fill="currentColor" />
      <circle cx="54" cy="34" r="1.5" fill="var(--pet-eye)" />
      <circle cx="54.5" cy="33.5" r="0.5" fill="#fff" />
    </svg>
  )
}

function Hamster() {
  return (
    <svg viewBox="0 0 70 48">
      <ellipse cx="34" cy="28" rx="18" ry="14" fill="currentColor" />
      <ellipse cx="32" cy="32" rx="10" ry="7" fill="var(--pet-mark)" />
      <circle cx="22" cy="16" r="5" fill="currentColor" />
      <circle cx="34" cy="15" r="5.5" fill="currentColor" />
      <circle cx="22" cy="16" r="2.4" fill="var(--pet-mark)" />
      <circle cx="34" cy="15" r="2.6" fill="var(--pet-mark)" />
      <g className="footer-parade-leg"><rect x="22" y="38" width="5" height="8" rx="2.4" fill="currentColor" /></g>
      <g className="footer-parade-leg is-back"><rect x="36" y="38" width="5" height="8" rx="2.4" fill="currentColor" /></g>
      <circle cx="48" cy="26" r="9" fill="currentColor" />
      <ellipse cx="55" cy="28" rx="4.5" ry="3.2" fill="currentColor" />
      <circle cx="50" cy="24" r="1.45" fill="var(--pet-eye)" />
      <circle cx="50.5" cy="23.5" r="0.48" fill="#fff" />
    </svg>
  )
}

function Bird() {
  return (
    <svg viewBox="0 0 78 46">
      <path d="M18 24c-8 2-14 1-16-3 6 2 12 1 16 3z" fill="currentColor" />
      <ellipse cx="40" cy="26" rx="16" ry="10" fill="currentColor" />
      <g className="footer-parade-wing">
        <path d="M36 24c-8-12-22-12-26-2 8 1 18 2 26 2z" fill="var(--pet-mark)" />
      </g>
      <circle cx="56" cy="20" r="8" fill="currentColor" />
      <path d="M62 20h10l-8 4z" fill="var(--pet-mark)" />
      <circle cx="58" cy="18" r="1.45" fill="var(--pet-eye)" />
      <circle cx="58.5" cy="17.5" r="0.48" fill="#fff" />
    </svg>
  )
}

function Butterfly() {
  return (
    <svg viewBox="0 0 72 52">
      <g className="footer-parade-wing">
        <path d="M34 22C20 4 4 8 8 22c3 10 16 12 26 2z" fill="currentColor" />
        <path d="M34 28C18 32 6 42 14 48c8 3 18-6 20-16z" fill="var(--pet-mark)" />
      </g>
      <g className="footer-parade-wing is-right">
        <path d="M38 22C52 4 68 8 64 22c-3 10-16 12-26 2z" fill="currentColor" />
        <path d="M38 28C54 32 66 42 58 48c-8 3-18-6-20-16z" fill="var(--pet-mark)" />
      </g>
      <path d="M36 14c1 8 1 18 0 26" fill="none" stroke="var(--pet-eye)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="12" r="2.4" fill="var(--pet-eye)" />
    </svg>
  )
}

const art = { dog: Dog, cat: Cat, rabbit: Rabbit, hamster: Hamster, bird: Bird, butterfly: Butterfly }

export default function FooterParade() {
  const columns = [...parade, ...parade]
  return (
    <div className="footer-parade" aria-hidden="true">
      <div className="footer-parade-track">
        {columns.map((pet, index) => {
          const Art = art[pet.kind]
          return (
            <span
              key={`${pet.kind}-${index}`}
              className={`footer-parade-pet footer-parade-pet--${pet.kind} footer-parade-pet--${pet.motion}`}
            >
              <span className="footer-parade-shadow" />
              <span className="footer-parade-motion">
                <Art />
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
