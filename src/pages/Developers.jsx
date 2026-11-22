import { Check, Clock3, LockKeyhole, PawPrint, Search, ShieldCheck, Trash, X } from "lucide-react"
import { useEffect, useState } from "react"
import Container from "../components/Container"
import { petGalleryApi } from "../data/pets"
import usePageTitle from "../usePageTitle"

const storageKey = "pet-developer-key"

export default function Developers() {
  usePageTitle("Developers · One Kind")
  const [key, setKey] = useState(() => sessionStorage.getItem(storageKey) || "")
  const [draft, setDraft] = useState("")
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState("missing")
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")
  const [busyId, setBusyId] = useState("")

  useEffect(() => {
    if (!key) return undefined
    let ignore = false
    loadQueue(key)
      .then((next) => {
        if (ignore) return
        setPosts(next)
        setReady(true)
        setError("")
      })
      .catch((reason) => {
        if (ignore) return
        sessionStorage.removeItem(storageKey)
        setKey("")
        setReady(false)
        setError(reason.message)
      })
    return () => {
      ignore = true
    }
  }, [key])

  function unlock(event) {
    event.preventDefault()
    const next = draft.trim()
    if (!next) {
      setError("Enter the developer key.")
      return
    }
    sessionStorage.setItem(storageKey, next)
    setKey(next)
  }

  async function review(id, action) {
    setBusyId(id)
    setError("")
    try {
      const response = await fetch(`${petGalleryApi}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Developer-Key": key,
        },
        body: JSON.stringify({ id, action }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || "That photo could not be updated.")
      setPosts(await loadQueue(key))
    } catch (reason) {
      setError(reason.message || "That photo could not be updated.")
    } finally {
      setBusyId("")
    }
  }

  const waiting = posts.filter((post) => post.status === "pending")
  const live = posts.filter((post) => post.status !== "pending")
  const missingWaiting = waiting.filter((post) => post.type === "lost")
  const petWaiting = waiting.filter((post) => post.type !== "lost")
  const missingLive = live.filter((post) => post.type === "lost")
  const petLive = live.filter((post) => post.type !== "lost")
  const categoryWaiting = category === "missing" ? missingWaiting : petWaiting
  const categoryLive = category === "missing" ? missingLive : petLive

  return (
    <section className="developer-page">
      <Container className="max-w-6xl">
        <div className="developer-page-heading">
          <p className="developer-eyebrow">
            <PawPrint size={14} aria-hidden="true" />
            ONE KIND <span>/</span> COMMUNITY CARE
          </p>
          <h1>Review pet submissions.</h1>
          <p className="developer-page-lede">
            A calm, organized space to review community posts before they reach the site.
          </p>
        </div>

        {key && ready ? (
          <div className="developer-dashboard">
            <div className="developer-dashboard-header">
              <div>
                <p className="developer-section-kicker">REVIEW DESK</p>
                <h2>Submission queue</h2>
                <p>Choose a category to review pending and published posts.</p>
              </div>
              <div className="developer-dashboard-stats">
                <div className="developer-stat">
                  <Clock3 size={17} aria-hidden="true" />
                  <span>{waiting.length}</span>
                  <small>Waiting</small>
                </div>
                <div className="developer-stat">
                  <ShieldCheck size={17} aria-hidden="true" />
                  <span>{live.length}</span>
                  <small>Published</small>
                </div>
              </div>
            </div>

            <div className="developer-category-switch" role="group" aria-label="Filter submissions by category">
              <button
                type="button"
                className={category === "missing" ? "is-active" : ""}
                aria-pressed={category === "missing"}
                onClick={() => setCategory("missing")}
              >
                <Search size={17} aria-hidden="true" />
                <span>Missing reports</span>
                <b>{missingWaiting.length}</b>
              </button>
              <button
                type="button"
                className={category === "pets" ? "is-active" : ""}
                aria-pressed={category === "pets"}
                onClick={() => setCategory("pets")}
              >
                <PawPrint size={17} aria-hidden="true" />
                <span>Pet submissions</span>
                <b>{petWaiting.length}</b>
              </button>
            </div>

            <div className="developer-queue-sections">
              <Queue
                title="Waiting for approval"
                empty={`No ${category === "missing" ? "missing reports" : "pet submissions"} are waiting.`}
                posts={categoryWaiting}
                busyId={busyId}
                primary="Approve"
                primaryIcon={Check}
                primaryAction="approve"
                secondary="Decline"
                secondaryIcon={X}
                onReview={review}
              />
              <Queue
                title="Published on the site"
                empty={`No ${category === "missing" ? "missing reports" : "pet submissions"} have been published.`}
                posts={categoryLive}
                busyId={busyId}
                secondary="Remove"
                secondaryIcon={Trash}
                onReview={review}
              />
            </div>
          </div>
        ) : (
          <div className="developer-access-card">
            <div className="developer-access-heading">
              <span className="developer-access-icon"><LockKeyhole size={19} aria-hidden="true" /></span>
              <div>
                <p className="developer-section-kicker">PRIVATE ACCESS</p>
                <h2>Open the review desk</h2>
                <p>Enter your developer key to manage community submissions.</p>
              </div>
            </div>
            <form className="developer-access-form" onSubmit={unlock}>
              <label htmlFor="developer-key">
                Developer key
                <input
                  id="developer-key"
                  type="password"
                  value={draft}
                  autoComplete="current-password"
                  onChange={(event) => setDraft(event.target.value)}
                />
              </label>
              <button type="submit" className="theme-primary-button">
                Open the queue
              </button>
            </form>
          </div>
        )}
        {error ? (
          <p className="developer-error" role="alert">
            {error}
          </p>
        ) : null}
      </Container>
    </section>
  )
}

function Queue({ title, empty, posts, busyId, primary, primaryIcon: PrimaryIcon, primaryAction, secondary, secondaryIcon: SecondaryIcon, onReview }) {
  return (
    <section className="developer-queue">
      <div className="developer-queue-heading">
        <div>
          <p className="developer-section-kicker">{primary ? "NEEDS REVIEW" : "ON THE SITE"}</p>
          <h3>{title}</h3>
        </div>
        <span className="developer-queue-count">{posts.length}</span>
      </div>
      {posts.length === 0 ? (
        <div className="developer-queue-empty">
          <PawPrint size={18} aria-hidden="true" />
          <p>{empty}</p>
        </div>
      ) : null}
      <div className="developer-queue-grid">
        {posts.map((post) => (
          <article key={post.id} className="developer-post-card">
            <div className="developer-post-image">
              <img src={post.src} alt={post.alt || `Photo of ${post.petName}`} loading="lazy" />
              <span>{post.type === "lost" ? "Missing report" : "Pet submission"}</span>
            </div>
            <div className="developer-post-content">
              <div className="developer-post-details">
                <h4>{post.petName}</h4>
                <p>
                  {post.type === "lost"
                    ? `Missing-pet report${post.reporterName ? ` from ${post.reporterName}` : ""}`
                    : `Shared by ${post.name}`}
                </p>
                {post.type === "lost" && post.contactNumber ? (
                  <a
                    href={`tel:${post.contactNumber.replace(/[^\d+]/g, "")}`}
                    className="developer-post-contact"
                  >
                    <span>Contact</span>
                    {post.contactNumber}
                  </a>
                ) : null}
              </div>
              <div className="developer-post-actions">
                {primary ? (
                  <button
                    type="button"
                    className="theme-primary-button"
                    disabled={busyId === post.id}
                    onClick={() => onReview(post.id, primaryAction)}
                  >
                    <PrimaryIcon size={15} aria-hidden="true" />
                    {primary}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="developer-secondary-button"
                  disabled={busyId === post.id}
                  onClick={() => onReview(post.id, "decline")}
                >
                  <SecondaryIcon size={15} aria-hidden="true" />
                  {secondary}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

async function loadQueue(key) {
  const response = await fetch(`${petGalleryApi}/review`, {
    cache: "no-store",
    headers: { "X-Developer-Key": key },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || "The queue could not be opened.")
  return Array.isArray(data.posts) ? data.posts : []
}
