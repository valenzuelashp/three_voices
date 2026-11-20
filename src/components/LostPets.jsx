import { Camera, PawPrint } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Container from "./Container"
import { petGalleryApi } from "../data/pets"

const ACCEPT = "image/jpeg,image/png,image/webp"
const MAX_BYTES = 4 * 1024 * 1024

export default function LostPets() {
  const [lostPets, setLostPets] = useState([])
  const [petName, setPetName] = useState("")
  const [reporterName, setReporterName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [contactConsent, setContactConsent] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [sending, setSending] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    let ignore = false
    fetch(`${petGalleryApi}/lost`, { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}))
        if (!response.ok) {
          const message = response.status === 404
            ? "The missing-pet service needs to be updated before this board can load."
            : data.error || "Missing-pet reports could not be loaded."
          throw new Error(message)
        }
        if (!Array.isArray(data.posts)) throw new Error("Missing-pet reports could not be loaded.")
        if (!ignore) setLostPets(data.posts)
      })
      .catch((reason) => {
        if (!ignore) setLoadError(reason instanceof TypeError ? "The missing-pet board could not be reached." : reason.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    if (!file) {
      setPreview("")
      return undefined
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  function chooseFile(nextFile) {
    if (!nextFile) return
    if (!["image/jpeg", "image/png", "image/webp"].includes(nextFile.type)) {
      setFile(null)
      if (fileRef.current) fileRef.current.value = ""
      setError("Choose a JPG, PNG, or WEBP photo.")
      return
    }
    if (nextFile.size > MAX_BYTES) {
      setFile(null)
      if (fileRef.current) fileRef.current.value = ""
      setError("Choose a photo smaller than 4 MB.")
      return
    }
    setError("")
    setNotice("")
    setFile(nextFile)
  }

  async function submit(event) {
    event.preventDefault()
    const name = petName.trim()
    if (!name) {
      setError("Enter the missing pet's name.")
      return
    }
    if (reporterName.trim().length < 2) {
      setError("Enter your name.")
      return
    }
    const contact = contactNumber.trim()
    const contactDigits = contact.replace(/[^0-9]/g, "")
    if (!/^[+0-9(). -]{7,30}$/.test(contact) || contactDigits.length < 7 || contactDigits.length > 15) {
      setError("Enter a valid contact number.")
      return
    }
    if (!contactConsent) {
      setError("Please agree to publish your name and contact number if the report is approved.")
      return
    }
    if (!file) {
      setError("Choose a photo of the missing pet.")
      return
    }

    setSending(true)
    setError("")
    setNotice("")
    const body = new FormData()
    body.set("petName", name)
    body.set("reporterName", reporterName.trim())
    body.set("contactNumber", contact)
    body.set("publicContactConsent", "yes")
    body.set("photo", file)
    try {
      const response = await fetch(`${petGalleryApi}/lost`, { method: "POST", body })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        const message = response.status === 404
          ? "The missing-pet service needs to be updated before reports can be submitted."
          : data.error || "The missing-pet report could not be sent."
        throw new Error(message)
      }
      setNotice(`${name} was submitted. The report will appear here after review.`)
      setPetName("")
      setReporterName("")
      setContactNumber("")
      setContactConsent(false)
      setFile(null)
      if (fileRef.current) fileRef.current.value = ""
    } catch (reason) {
      setError(reason instanceof TypeError ? "The missing-pet board could not be reached. Try again." : reason.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="home-paper-section py-10 sm:py-14 lg:py-16" aria-labelledby="lost-pets-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-logo text-[10px] tracking-[0.14em] text-animals sm:text-[11px] sm:tracking-[0.28em]">
            COMMUNITY LOST-PET BOARD
          </p>
          <h2 id="lost-pets-title" className="mt-2 font-display text-2xl text-ink sm:text-3xl lg:text-4xl">
            Help bring missing pets home.
          </h2>
          <p className="mt-3 text-sm leading-6 text-mist sm:text-base sm:leading-7">
            Share a missing pet’s name and photo to help more people recognize them. Reports are reviewed before they appear publicly.
          </p>
        </div>

        <div className="lost-pets-layout mt-8">
          <div className="lost-pets-list" aria-live="polite">
            {loading ? <p className="text-sm text-mist">Loading missing-pet reports…</p> : null}
            {loadError ? <p className="text-sm text-[#FCA5A5]" role="alert">{loadError}</p> : null}
            {!loading && !loadError && lostPets.length === 0 ? (
              <div className="lost-pets-empty">
                <PawPrint size={26} aria-hidden="true" />
                <p>What is the Lost Pets board?</p>
                <span>
                  A community space for sharing missing pets’ names and photos so more people can recognize them and help bring them home.
                  No reports yet—be the first to add one.
                </span>
              </div>
            ) : null}
            {lostPets.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lostPets.map((pet) => {
                  const contactHref = pet.contactNumber?.replace(/[^\d+]/g, "")
                  return (
                    <article key={pet.id} className="lost-pet-card">
                      <p className="lost-pet-poster-heading">HAVE YOU SEEN ME?</p>
                      <img src={pet.src} alt={pet.alt || `Photo of missing pet ${pet.petName}`} loading="lazy" />
                      <div className="lost-pet-card-details">
                        <h3 className="lost-pet-name">My name is {pet.petName}!</h3>
                        {pet.reporterName ? <p className="lost-pet-reporter">Reported by {pet.reporterName}</p> : null}
                        <p className="lost-pet-contact-label">If found, please contact:</p>
                        {pet.contactNumber && contactHref ? (
                          <a className="lost-pet-contact" href={`tel:${contactHref}`}>
                            {pet.contactNumber}
                          </a>
                        ) : (
                          <p className="lost-pet-contact">Contact details unavailable.</p>
                        )}
                        <span className="lost-pet-badge">MISSING</span>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : null}
          </div>

          <form className="lost-pet-form" onSubmit={submit}>
            <h3 className="font-display text-xl text-ink">Add a missing pet</h3>
            <p className="mt-1 text-sm leading-6 text-mist">Add your contact details and a clear photo.</p>
            <label className="pet-label mt-5" htmlFor="lost-pet-name">
              Pet’s name
              <input
                id="lost-pet-name"
                className="pet-field mt-2"
                value={petName}
                onChange={(event) => setPetName(event.target.value)}
                maxLength={40}
                required
              />
            </label>
            <label className="pet-label mt-4" htmlFor="lost-pet-reporter-name">
              Your name
              <input
                id="lost-pet-reporter-name"
                className="pet-field mt-2"
                value={reporterName}
                onChange={(event) => setReporterName(event.target.value)}
                autoComplete="name"
                maxLength={40}
                required
              />
            </label>
            <label className="pet-label mt-4" htmlFor="lost-pet-contact-number">
              Contact number
              <input
                id="lost-pet-contact-number"
                className="pet-field mt-2"
                type="tel"
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
                autoComplete="tel"
                maxLength={30}
                required
              />
            </label>
            <div className="mt-4">
              <span className="pet-label">Photo</span>
              <button
                type="button"
                className="pet-file mt-2 inline-flex items-center gap-2"
                onClick={() => fileRef.current?.click()}
              >
                <Camera size={16} aria-hidden="true" />
                {file ? file.name : "Choose a JPG, PNG, or WEBP"}
              </button>
              <input
                ref={fileRef}
                className="sr-only"
                type="file"
                accept={ACCEPT}
                onChange={(event) => chooseFile(event.target.files?.[0])}
              />
              {preview ? <img src={preview} alt="Preview of the missing pet photo" className="pet-preview" /> : null}
            </div>
            <label className="mt-4 flex items-start gap-2 text-sm leading-5 text-mist">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-animals"
                checked={contactConsent}
                onChange={(event) => setContactConsent(event.target.checked)}
                required
              />
              <span>
                I agree that my name and contact number will be shown publicly if this report is approved.
              </span>
            </label>
            {error ? <p className="mt-4 text-sm text-[#9f1239]" role="alert">{error}</p> : null}
            {notice ? <p className="mt-4 text-sm leading-6 text-mist" role="status">{notice}</p> : null}
            {!error && !notice ? (
              <p className="pet-hint mt-4">
                Photos must be under 4 MB. Reports are checked before being shown on the board. Your contact details
                stay private until approval.
              </p>
            ) : null}
            <button
              type="submit"
              className="theme-primary-button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              disabled={sending}
            >
              <Camera size={16} aria-hidden="true" />
              {sending ? "Sending report…" : "Submit missing-pet report"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}
