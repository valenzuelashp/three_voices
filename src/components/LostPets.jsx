import { Camera, Megaphone, Phone, Upload, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Container from "./Container"
import PawMark from "./PawMark"
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
  const [reportOpen, setReportOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [sending, setSending] = useState(false)
  const fileRef = useRef(null)
  const reportButtonRef = useRef(null)
  const closeButtonRef = useRef(null)

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

  useEffect(() => {
    if (!reportOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      reportButtonRef.current?.focus()
    }
  }, [reportOpen])

  useEffect(() => {
    if (!reportOpen) return undefined
    function onKeyDown(event) {
      if (event.key === "Escape" && !sending) setReportOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [reportOpen, sending])

  function openReportModal() {
    setError("")
    setNotice("")
    setReportOpen(true)
  }

  function openFilePicker() {
    if (!fileRef.current) return
    fileRef.current.value = ""
    fileRef.current.click()
  }

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
    setDragging(false)
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
      setReportOpen(false)
    } catch (reason) {
      setError(reason instanceof TypeError ? "The missing-pet board could not be reached. Try again." : reason.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section id="lost-pets" className="home-paper-section home-sheet home-sheet-board pet-reveal py-12 sm:py-16 lg:py-20" aria-labelledby="lost-pets-title">
        <div className="bulletin-paws" aria-hidden="true">
          <PawMark kind="dog" size={72} />
          <PawMark kind="rabbit" size={52} />
          <PawMark kind="bird" size={68} />
          <PawMark kind="claw" size={48} />
          <PawMark kind="fish" size={40} />
        </div>
        <span className="bulletin-note bulletin-note-left" aria-hidden="true"><PawMark kind="rabbit" size={36} /></span>
        <span className="bulletin-note bulletin-note-right" aria-hidden="true"><PawMark kind="bird" size={36} /></span>
        <Container>
          <div className="bulletin-intro mx-auto max-w-2xl text-center">
            <p className="journal-chapter">The Missing Pages</p>
            <p className="home-index home-index-center">
              <span>04</span>
              Community lost-pet board
            </p>
            <p className="bulletin-kicker">Community bulletin board</p>
            <span className="bulletin-mark" aria-hidden="true">
              <PawMark kind="claw" size={18} />
            </span>
            <h2 id="lost-pets-title" className="bulletin-title font-display">
              Help bring missing pets home.
            </h2>
            <p className="mt-3 text-sm leading-6 text-mist sm:text-base sm:leading-7">
              Share a missing pet’s name and photo to help more people recognize them. Reports are reviewed before they appear publicly.
            </p>
            <button
              ref={reportButtonRef}
              type="button"
              className="theme-primary-button mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              onClick={openReportModal}
            >
              <Megaphone size={16} aria-hidden="true" />
              Report a missing pet
            </button>
            {notice ? <p className="mt-3 text-sm leading-6 text-mist" role="status">{notice}</p> : null}
          </div>

          <div className="lost-pets-layout mt-8">
            <div className="lost-pets-board" aria-live="polite">
            <div className="lost-pets-board-heading">
              <h3>Community bulletin board</h3>
              <p>Missing-pet notices shared by our community</p>
            </div>
            {loading ? <p className="text-center text-sm text-mist">Loading missing-pet reports…</p> : null}
            {loadError ? <p className="text-center text-sm text-[#FCA5A5]" role="alert">{loadError}</p> : null}
            {!loading && !loadError && lostPets.length === 0 ? (
              <div className="lost-pets-empty">
                <PawMark kind="dog" size={26} />
                <p>What is the Lost Pets board?</p>
                <span>
                  A community space for sharing missing pets’ names and photos so more people can recognize them and help bring them home.
                  No reports yet—be the first to add one.
                </span>
              </div>
            ) : null}
            {lostPets.length > 0 ? (
              <div className="lost-pet-posters">
                {lostPets.map((pet) => {
                  const contactHref = pet.contactNumber?.replace(/[^\d+]/g, "")
                  return (
                    <article key={pet.id} className="lost-pet-card">
                      <span className="lost-pet-tape" aria-hidden="true" />
                      <span className="lost-pet-burst lost-pet-burst-left" aria-hidden="true" />
                      <span className="lost-pet-burst lost-pet-burst-right" aria-hidden="true" />
                      <p className="lost-pet-poster-heading">HAVE YOU SEEN ME?</p>
                      <img src={pet.src} alt={pet.alt || `Photo of missing pet ${pet.petName}`} loading="lazy" />
                      <div className="lost-pet-card-details">
                        <h3 className="lost-pet-name">
                          <PawMark kind="dog" size={16} />
                          My name is {pet.petName}!
                          <PawMark kind="dog" size={16} />
                        </h3>
                        {pet.reporterName ? <p className="lost-pet-reporter">Reported by {pet.reporterName}</p> : null}
                        <p className="lost-pet-contact-label">If found, please contact:</p>
                        {pet.contactNumber && contactHref ? (
                          <a className="lost-pet-contact" href={`tel:${contactHref}`}>
                            <Phone size={15} aria-hidden="true" />
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
          </div>
        </Container>
      </section>

      {reportOpen ? createPortal(
        <div
          className="lost-pet-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && !sending && setReportOpen(false)}
        >
          <div
            className="lost-pet-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lost-pet-modal-title"
            aria-describedby="lost-pet-modal-description"
          >
            <div className="lost-pet-modal-heading">
              <div>
                <p className="font-logo text-[10px] tracking-[0.16em] text-animals">COMMUNITY REPORT</p>
                <h3 id="lost-pet-modal-title">Report a missing pet</h3>
                <p id="lost-pet-modal-description">
                  Share details and a photo to help bring your pet home.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="pet-nav"
                aria-label="Close report form"
                onClick={() => setReportOpen(false)}
                disabled={sending}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <form className="lost-pet-modal-form" onSubmit={submit}>
              <div className="lost-pet-modal-fields">
                <label className="pet-label" htmlFor="lost-pet-name">
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
                <label className="pet-label" htmlFor="lost-pet-reporter-name">
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
                <label className="pet-label lost-pet-modal-field--contact" htmlFor="lost-pet-contact-number">
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
              </div>

              <div className="lost-pet-modal-photo">
                <span className="pet-label">Photo</span>
                <div
                  className={`lost-pet-dropzone${dragging ? " is-dragging" : ""}${preview ? " has-preview" : ""}`}
                  role="group"
                  aria-label="Missing pet photo upload"
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
                    <div className="lost-pet-drop-preview">
                      <img src={preview} alt={`Preview of missing pet ${petName || "photo"}`} />
                      <button type="button" className="lost-pet-drop-button" onClick={openFilePicker}>
                        <Upload size={15} aria-hidden="true" />
                        Upload another photo
                      </button>
                    </div>
                  ) : (
                    <div className="lost-pet-drop-prompt">
                      <Upload size={28} aria-hidden="true" />
                      <p>Drop your photo here</p>
                      <span>or</span>
                      <button type="button" className="lost-pet-drop-button" onClick={openFilePicker}>
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

              <label className="lost-pet-modal-consent">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-animals"
                  checked={contactConsent}
                  onChange={(event) => setContactConsent(event.target.checked)}
                  required
                />
                <span>I agree that my name and contact number will be shown publicly if this report is approved.</span>
              </label>
              <p className="lost-pet-modal-note">
                Reports are reviewed before appearing on the board. Your contact details stay private until approval.
              </p>
              {error ? <p className="text-sm text-[#9f1239]" role="alert">{error}</p> : null}
              <button
                type="submit"
                className="theme-primary-button lost-pet-modal-submit inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                disabled={sending}
              >
                <Camera size={16} aria-hidden="true" />
                {sending ? "Sending report…" : "Submit missing-pet report"}
              </button>
            </form>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  )
}
