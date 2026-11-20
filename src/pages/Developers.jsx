import { Check, PawPrint, Trash, X } from "lucide-react"
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

  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <Container className="max-w-5xl">
        <p className="flex items-center gap-2 font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.28em]">
          <PawPrint size={14} className="text-animals" aria-hidden="true" />
          DEVELOPERS
        </p>
        <h1 className="mt-3 font-display text-[1.5rem] leading-[1.2] font-semibold text-balance text-ink sm:mt-4 sm:text-4xl sm:leading-tight">
          Review pet submissions.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-6 text-mist sm:mt-6 sm:text-lg sm:leading-8">
          Circle photos and missing-pet reports stay here until you approve them. Approved submissions appear in their respective sections.
        </p>

        {key && ready ? (
          <div className="mt-10 space-y-12">
            <Queue
              title="Waiting for approval"
              empty="No submissions are waiting."
              posts={waiting}
              busyId={busyId}
              primary="Approve"
              primaryIcon={Check}
              primaryAction="approve"
              secondary="Decline"
              secondaryIcon={X}
              onReview={review}
            />
            <Queue
              title="On the site"
              empty="No approved submissions yet."
              posts={live}
              busyId={busyId}
              secondary="Remove"
              secondaryIcon={Trash}
              onReview={review}
            />
          </div>
        ) : (
          <form className="mt-8 max-w-md space-y-4" onSubmit={unlock}>
            <label className="block text-sm font-medium text-ink" htmlFor="developer-key">
              Developer key
              <input
                id="developer-key"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ink"
                type="password"
                value={draft}
                autoComplete="current-password"
                onChange={(event) => setDraft(event.target.value)}
              />
            </label>
            <button type="submit" className="theme-primary-button rounded-full px-5 py-3 text-sm font-semibold">
              Open the queue
            </button>
          </form>
        )}
        {error ? (
          <p className="mt-4 text-sm text-[#FCA5A5]" role="alert">
            {error}
          </p>
        ) : null}
      </Container>
    </section>
  )
}

function Queue({ title, empty, posts, busyId, primary, primaryIcon: PrimaryIcon, primaryAction, secondary, secondaryIcon: SecondaryIcon, onReview }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {posts.length === 0 ? <p className="mt-3 text-sm text-mist">{empty}</p> : null}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-3xl border border-white/10">
            <img src={post.src} alt={post.alt || ""} className="h-56 w-full object-cover" />
            <div className="space-y-3 p-4">
              <div>
                <p className="font-display text-xl text-ink">{post.petName}</p>
                <p className="text-sm text-mist">
                  {post.type === "lost"
                    ? `Missing-pet report${post.reporterName ? ` from ${post.reporterName}` : ""}`
                    : `Shared by ${post.name}`}
                </p>
                {post.type === "lost" && post.contactNumber ? (
                  <a
                    href={`tel:${post.contactNumber.replace(/[^\d+]/g, "")}`}
                    className="mt-1 inline-block text-sm text-ink underline underline-offset-2"
                  >
                    {post.contactNumber}
                  </a>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                {primary ? (
                  <button
                    type="button"
                    className="theme-primary-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                    disabled={busyId === post.id}
                    onClick={() => onReview(post.id, primaryAction)}
                  >
                    <PrimaryIcon size={15} aria-hidden="true" />
                    {primary}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-ink"
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
    </div>
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
