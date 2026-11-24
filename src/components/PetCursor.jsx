import { useEffect, useRef, useState } from "react"

export default function PetCursor() {
  const ringRef = useRef(null)
  const pawRef = useRef(null)
  const [active, setActive] = useState(false)
  const [stamps, setStamps] = useState([])

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return undefined

    setActive(true)
    document.documentElement.classList.add("has-pet-cursor")

    const aim = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...aim }
    const paw = { ...aim }
    let hovering = false
    let frame = 0

    function draw() {
      ring.x += (aim.x - ring.x) * 0.38
      ring.y += (aim.y - ring.y) * 0.38
      paw.x += (aim.x - paw.x) * 0.16
      paw.y += (aim.y - paw.y) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.65 : 1})`
      }
      if (pawRef.current) {
        pawRef.current.style.transform = `translate3d(${paw.x}px, ${paw.y}px, 0) translate(-50%, -50%) rotate(${hovering ? -22 : -10}deg) scale(${hovering ? 1.25 : 1})`
      }
      frame = window.requestAnimationFrame(draw)
    }

    function move(event) {
      aim.x = event.clientX
      aim.y = event.clientY
      const target = event.target
      hovering = Boolean(target?.closest?.("a, button, summary, [role='button']"))
    }

    function press(event) {
      const id = `${Date.now()}-${event.clientX}`
      setStamps((current) => [...current.slice(-5), { id, x: event.clientX, y: event.clientY }])
      window.setTimeout(() => {
        setStamps((current) => current.filter((stamp) => stamp.id !== id))
      }, 680)
    }

    function hide() {
      document.documentElement.classList.add("pet-cursor-away")
    }

    function show() {
      document.documentElement.classList.remove("pet-cursor-away")
    }

    frame = window.requestAnimationFrame(draw)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerdown", press)
    document.documentElement.addEventListener("pointerleave", hide)
    document.documentElement.addEventListener("pointerenter", show)

    return () => {
      window.cancelAnimationFrame(frame)
      document.documentElement.classList.remove("has-pet-cursor", "pet-cursor-away")
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", press)
      document.documentElement.removeEventListener("pointerleave", hide)
      document.documentElement.removeEventListener("pointerenter", show)
    }
  }, [])

  if (!active) return null

  return (
    <div className="pet-cursor" aria-hidden="true">
      <span ref={ringRef} className="pet-cursor-ring" />
      <span ref={pawRef} className="pet-cursor-paw">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="28" cy="36" rx="11" ry="14" transform="rotate(-24 28 36)" />
          <ellipse cx="45" cy="22" rx="10" ry="13" transform="rotate(-6 45 22)" />
          <ellipse cx="64" cy="21" rx="10" ry="13" transform="rotate(8 64 21)" />
          <ellipse cx="81" cy="35" rx="11" ry="14" transform="rotate(24 81 35)" />
          <path d="M36 52C22 54 14 68 20 82C26 94 42 100 54 96C66 100 82 94 88 82C94 68 86 54 72 52C66 60 60 64 54 62C48 64 42 60 36 52Z" />
        </svg>
      </span>
      {stamps.map((stamp) => (
        <span key={stamp.id} className="pet-cursor-stamp" style={{ left: stamp.x, top: stamp.y }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <ellipse cx="28" cy="36" rx="11" ry="14" transform="rotate(-24 28 36)" />
            <ellipse cx="45" cy="22" rx="10" ry="13" transform="rotate(-6 45 22)" />
            <ellipse cx="64" cy="21" rx="10" ry="13" transform="rotate(8 64 21)" />
            <ellipse cx="81" cy="35" rx="11" ry="14" transform="rotate(24 81 35)" />
            <path d="M36 52C22 54 14 68 20 82C26 94 42 100 54 96C66 100 82 94 88 82C94 68 86 54 72 52C66 60 60 64 54 62C48 64 42 60 36 52Z" />
          </svg>
        </span>
      ))}
    </div>
  )
}
