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
        <svg viewBox="0 0 48 48" fill="currentColor">
          <ellipse cx="16" cy="14" rx="5" ry="6.5" />
          <ellipse cx="26" cy="10" rx="4.5" ry="6" />
          <ellipse cx="35" cy="14" rx="4.2" ry="5.6" />
          <ellipse cx="11" cy="23" rx="4" ry="5" />
          <path d="M24 27c-7 0-12 5-12 10 0 4 3.2 7 8 7 2.2 0 3.6-1 4-2.4.4 1.4 1.8 2.4 4 2.4 4.8 0 8-3 8-7 0-5-5-10-12-10z" />
        </svg>
      </span>
      {stamps.map((stamp) => (
        <span key={stamp.id} className="pet-cursor-stamp" style={{ left: stamp.x, top: stamp.y }}>
          <svg viewBox="0 0 48 48" fill="currentColor">
            <ellipse cx="16" cy="14" rx="5" ry="6.5" />
            <ellipse cx="26" cy="10" rx="4.5" ry="6" />
            <ellipse cx="35" cy="14" rx="4.2" ry="5.6" />
            <ellipse cx="11" cy="23" rx="4" ry="5" />
            <path d="M24 27c-7 0-12 5-12 10 0 4 3.2 7 8 7 2.2 0 3.6-1 4-2.4.4 1.4 1.8 2.4 4 2.4 4.8 0 8-3 8-7 0-5-5-10-12-10z" />
          </svg>
        </span>
      ))}
    </div>
  )
}
