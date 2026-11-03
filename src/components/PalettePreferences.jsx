import { useEffect, useRef, useState } from "react"
import { Check, Palette } from "lucide-react"
import { defaultPalette, isPaletteId, paletteStorageKey, palettes } from "../data/palettes"

function getSavedPalette() {
  try {
    const saved = window.localStorage.getItem(paletteStorageKey)
    return isPaletteId(saved) ? saved : defaultPalette
  } catch {
    return defaultPalette
  }
}

export default function PalettePreferences() {
  const [selected, setSelected] = useState(getSavedPalette)
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const rootRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.palette = selected
  }, [selected])

  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  function choosePalette(id) {
    setSelected(id)
    try {
      window.localStorage.setItem(paletteStorageKey, id)
      setNotice(`${palettes.find((palette) => palette.id === id).name} palette saved.`)
    } catch {
      setNotice("Palette changed for this visit, but could not be saved in this browser.")
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="palette-trigger"
        aria-label="Palette preferences"
        title="Palette preferences"
        aria-expanded={open}
        aria-controls="palette-preferences"
        onClick={() => setOpen((value) => !value)}
      >
        <Palette size={16} aria-hidden="true" />
      </button>
      {open ? (
        <section
          id="palette-preferences"
          className="palette-panel"
          aria-label="Palette preferences"
        >
          <h2 className="palette-panel-title">Choose a palette</h2>
          <p className="palette-panel-description">Pick the soft colors you’d like to see.</p>
          <div className="palette-options">
            {palettes.map((palette) => {
              const active = selected === palette.id
              return (
                <button
                  key={palette.id}
                  type="button"
                  className={`palette-option ${active ? "is-selected" : ""}`}
                  aria-pressed={active}
                  onClick={() => choosePalette(palette.id)}
                >
                  <span className="palette-swatches" aria-hidden="true">
                    {palette.swatches.map((color) => (
                      <span key={color} style={{ backgroundColor: color }} />
                    ))}
                  </span>
                  <span className="palette-option-copy">
                    <span className="palette-option-name">{palette.name}</span>
                    <span className="palette-option-description">{palette.description}</span>
                  </span>
                  {active ? <Check size={17} className="palette-check" aria-hidden="true" /> : null}
                </button>
              )
            })}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {notice}
          </p>
        </section>
      ) : null}
    </div>
  )
}
