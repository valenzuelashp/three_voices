import { Bone, Camera, ChevronLeft, ChevronRight, Heart, Pause, Play, Upload, X } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Container from "./Container"
import PetAssets from "./PetAssets"
import { petGalleryApi } from "../data/pets"

const ACCEPT = "image/jpeg,image/png,image/webp"
const MAX_BYTES = 4 * 1024 * 1024

function slotFor(index, active, count) {
  let diff = index - active
  diff = ((diff % count) + count) % count
  if (diff > count / 2) diff -= count
  return diff
}

function slideStyle(offset) {
  const distance = Math.abs(offset)
  const steps = [
    { grow: 1, fade: 1, z: 40 },
    { grow: 0.8, fade: 0.94, z: 30 },
    { grow: 0.66, fade: 0.78, z: 20 },
    { grow: 0.54, fade: 0.58, z: 10 },
  ]
  if (distance > 3) return { "--slot": offset, "--grow": 0.46, "--fade": 0, zIndex: 0 }
  const step = steps[distance]
  return { "--slot": offset, "--grow": step.grow, "--fade": step.fade, zIndex: step.z }
}

function useVisibleReach() {
  const [reach, setReach] = useState(1)

  useEffect(() => {
    const large = window.matchMedia("(min-width: 1024px)")
    const medium = window.matchMedia("(min-width: 640px)")
    const update = () => setReach(large.matches ? 3 : medium.matches ? 2 : 1)
    update()
    large.addEventListener("change", update)
    medium.addEventListener("change", update)
    return () => {
      large.removeEventListener("change", update)
      medium.removeEventListener("change", update)
    }
  }, [])

  return reach
}

export default function PetGallery() {
  const reduce = useReducedMotion()
  const [community, setCommunity] = useState([])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const holdUntil = useRef(0)
  const drag = useRef(null)
  const swiped = useRef(false)
  const reach = useVisibleReach()
  const posts = community
  const count = posts.length
  const current = posts[active]

  useEffect(() => {
    let ignore = false
    fetch(`${petGalleryApi}/posts`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!ignore && Array.isArray(data.posts)) setCommunity(data.posts)
      })
      .catch(() => {})
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    if (reduce || paused || hovering || open || count < 2) return undefined
    const timer = window.setInterval(() => {
      if (Date.now() < holdUntil.current) return
      setActive((index) => (index + 1) % count)
    }, 3400)
    return () => window.clearInterval(timer)
  }, [reduce, paused, hovering, open, count])

  function step(direction) {
    holdUntil.current = Date.now() + 8000
    setActive((index) => (index + direction + count) % count)
  }

  function show(index) {
    holdUntil.current = Date.now() + 8000
    setActive(index)
  }

  function onPointerDown(event) {
    drag.current = { x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event) {
    if (!drag.current) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    drag.current = null
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true
      step(dx < 0 ? 1 : -1)
    }
  }

  function noteSent(petName) {
    setNotice(`${petName} was sent. It will appear in the circle after we approve it.`)
    setOpen(false)
  }

  return (
    <section id="pets" className="home-paper-section home-sheet home-sheet-circle pet-gallery-section pet-reveal overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16" aria-labelledby="pets-title">
      <PetAssets variant="stamps" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="home-index home-index-center">
            <span>04</span>
            The circle
          </p>
          <h2 id="pets-title" className="mt-2 font-display text-2xl text-ink sm:mt-3 sm:text-3xl lg:text-4xl">
            Bring your pet into the picture.
          </h2>
          <p className="pet-gallery-lede mt-3 text-sm leading-6 text-mist sm:text-base">
            A little collection of the pets who make our days brighter.
          </p>
          <button
            type="button"
            className="theme-primary-button mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            onClick={() => setOpen(true)}
          >
            <Camera size={16} aria-hidden="true" />
            Share your pet photo
          </button>
          {notice ? <p className="mt-4 text-sm leading-6 text-mist">{notice}</p> : null}
        </div>
      </Container>

      <div
        className="pet-stage"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null
        }}
      >
        <div className="pet-stage-glow" aria-hidden="true" />
        {count === 0 ? (
          <p className="pet-empty">
            <Bone className="pet-empty-icon" aria-hidden="true" />
            <span>Shared pet photos will show up here.</span>
          </p>
        ) : null}
        {posts.map((post, index) => {
          const offset = slotFor(index, active, count)
          const near = Math.abs(offset) <= reach
          return (
            <button
              key={post.id}
              type="button"
              className="pet-slide"
              style={slideStyle(offset)}
              aria-hidden={near ? undefined : true}
              tabIndex={near ? 0 : -1}
              aria-current={offset === 0 ? "true" : undefined}
              aria-label={offset === 0 ? `${post.caption}. ${post.alt}` : `Show ${post.caption}`}
              onClick={() => {
                if (swiped.current) {
                  swiped.current = false
                  return
                }
                if (offset !== 0) show(index)
              }}
            >
              <img src={post.src} alt={offset === 0 ? post.alt : ""} draggable="false" />
            </button>
          )
        })}
        <div className="pet-stage-fade pet-stage-fade-left" aria-hidden="true" />
        <div className="pet-stage-fade pet-stage-fade-right" aria-hidden="true" />
      </div>

      {count > 0 ? (
      <Container>
        <div className="pet-gallery-controls mx-auto mt-5 flex max-w-xl items-center justify-center gap-3 sm:gap-5">
          <button type="button" className="pet-nav" aria-label="Previous photo" onClick={() => step(-1)}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1 text-center" aria-live={paused || reduce ? "polite" : "off"}>
            <p className="truncate font-display text-xl text-ink sm:text-2xl">{current?.caption}</p>
            <p className="mt-1 text-sm text-mist">Shared by {current?.name}</p>
          </div>
          <button type="button" className="pet-nav" aria-label="Next photo" onClick={() => step(1)}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="pet-nav"
            aria-pressed={paused}
            aria-label={paused ? "Play the photo circle" : "Pause the photo circle"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        </div>
      </Container>
      ) : null}

      {open ? (
        <SharePetDialog onClose={() => setOpen(false)} onSent={noteSent} />
      ) : null}
    </section>
  )
}

function SharePetDialog({ onClose, onSent }) {
  const titleId = useId()
  const fileRef = useRef(null)
  const [name, setName] = useState("")
  const [petName, setPetName] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)
  const [dragging, setDragging] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function onKey(event) {
      if (event.key === "Escape" && !sending) onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [onClose, sending])

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function openFilePicker() {
    if (!fileRef.current) return
    fileRef.current.value = ""
    fileRef.current.click()
  }

  function chooseFile(nextFile) {
    if (!nextFile) return
    if (!["image/jpeg", "image/png", "image/webp"].includes(nextFile.type)) {
      setError("Use a JPG, PNG, or WEBP photo.")
      return
    }
    if (nextFile.size > MAX_BYTES) {
      setError("Use a photo smaller than 4 MB.")
      return
    }
    setError("")
    setFile(nextFile)
    setPreview((current) => {
      if (current) URL.revokeObjectURL(current)
      return URL.createObjectURL(nextFile)
    })
  }

  async function submit(event) {
    event.preventDefault()
    if (name.trim().length < 2) {
      setError("Enter your name.")
      return
    }
    if (petName.trim().length < 1) {
      setError("Enter your pet's name.")
      return
    }
    if (!file) {
      setError("Choose a photo to share.")
      return
    }
    setSending(true)
    setError("")
    const body = new FormData()
    body.set("name", name.trim())
    body.set("petName", petName.trim())
    body.set("photo", file)
    try {
      const response = await fetch(`${petGalleryApi}/posts`, { method: "POST", body })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || "The gallery could not keep that photo.")
      }
      onSent(petName.trim())
    } catch (reason) {
      setError(reason instanceof TypeError ? "The gallery could not be reached. Try again." : reason.message)
    } finally {
      setSending(false)
    }
  }

  return createPortal(
    <div className="pet-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && !sending && onClose()}>
      <div className="pet-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-logo text-[10px] tracking-[0.16em] text-animals">SHARE A PHOTO</p>
            <h3 id={titleId} className="pet-dialog-title">
              Add your pet to the circle
            </h3>
          </div>
          <button ref={closeRef} type="button" className="pet-nav" aria-label="Close" onClick={onClose} disabled={sending}>
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <form className="pet-share-form" onSubmit={submit}>
          <div className="pet-share-fields">
            <label className="pet-label" htmlFor="pet-owner">
              Your name
              <input
                id="pet-owner"
                className="pet-field mt-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                maxLength={40}
              />
            </label>
            <label className="pet-label" htmlFor="pet-name">
              Your pet's name
              <input
                id="pet-name"
                className="pet-field mt-2"
                value={petName}
                onChange={(event) => setPetName(event.target.value)}
                maxLength={40}
              />
            </label>
          </div>
          <div className="pet-upload-section">
            <span className="pet-label">Photo</span>
            <div
              className={`pet-upload-zone${dragging ? " is-dragging" : ""}${preview ? " has-preview" : ""}`}
              role="group"
              aria-label="Pet photo upload"
              onDragOver={(event) => {
                event.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault()
                setDragging(false)
                chooseFile(event.dataTransfer.files?.[0])
              }}
            >
              {preview ? (
                <div className="pet-upload-preview">
                  <img src={preview} alt={`Preview of ${petName || "your pet"} photo`} />
                  <button type="button" className="pet-upload-again" onClick={openFilePicker}>
                    <Upload size={15} aria-hidden="true" />
                    Upload another photo
                  </button>
                </div>
              ) : (
                <div className="pet-upload-prompt">
                  <Upload size={28} aria-hidden="true" />
                  <p>Drag and drop your photo here</p>
                  <span>or</span>
                  <button type="button" className="pet-upload-choose" onClick={openFilePicker}>
                    Choose a photo
                  </button>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              className="sr-only"
              type="file"
              accept={ACCEPT}
              onChange={(event) => chooseFile(event.target.files?.[0])}
            />
            <p className="pet-hint">JPG, PNG, or WEBP · Under 4 MB</p>
          </div>
          {error ? (
            <p className="text-sm text-[#9f1239]" role="alert">
              {error}
            </p>
          ) : (
            <p className="pet-hint">Photos are kept under 4 MB. They appear in the circle after we approve them.</p>
          )}
          <button type="submit" className="theme-primary-button inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold" disabled={sending}>
            {sending ? "Sending your photo…" : (
              <>
                <Heart size={16} aria-hidden="true" />
                Send for review
              </>
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  )
}

