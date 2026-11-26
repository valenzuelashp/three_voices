import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowUpRight, Newspaper, X } from "lucide-react"
import Container from "../components/Container"
import KabangModel from "../components/KabangModel"
import PetAssets from "../components/PetAssets"
import usePageTitle from "../usePageTitle"

const inquirerPostUrl =
  "https://www.facebook.com/inquirerdotnet/posts/trigger-warning-sensitive-contentall-29-dogs-and-cats-dumped-in-san-jose-del-mon/1601376602173289/"
const inquirerPreviewImageUrl =
  "https://scontent.fmnl9-7.fna.fbcdn.net/v/t39.99422-6/877512484_1654189299431425_319350756179079831_n.png?stp=dst-jpg_tt6&cstp=mx1292x1569&ctp=p600x600&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=cae128&_nc_ohc=HTp-ILE0K2oQ7kNvwH6xvSY&_nc_oc=AdoX1B460rUdfARFKkKLVFaJzaPpGgb_eXdE9KmVx0oomdjzcMED5l_8kmLwmwKkcT_aDACCfskPkNxvOWXBQ-yY&_nc_zt=14&_nc_ht=scontent.fmnl9-7.fna&_nc_gid=a1dBSazKV9FgxxJuNPnmtQ&_nc_ss=7b30f&oh=00_AQRByL6Xn6_2mv9LA3R2NJHPzyuqU7wOg4I5sUzUx9Mkhg&oe=6B0B7331"

function NewsLeaf({ index, turning = false, onTurned, onTurnNext }) {
  return (
    <article
      className={turning ? "news-leaf is-turning" : "news-leaf"}
      aria-hidden={turning || undefined}
      inert={turning || undefined}
      onAnimationEnd={turning ? onTurned : undefined}
    >
      <header className="news-folio">
        <p>One Kind</p>
        <p>Page {index + 1} of 2</p>
      </header>
      <div className="news-folio-rule" aria-hidden="true" />
      {index === 0 ? (
        <>
          <p className="news-warning">TRIGGER WARNING · SENSITIVE CONTENT — THE IMAGE BELOW IS BLURRED</p>
          <div className="news-story">
            <figure>
              <a href={inquirerPostUrl} target="_blank" rel="noopener noreferrer" aria-label="Open the Inquirer Facebook post">
                <img
                  src={inquirerPreviewImageUrl}
                  alt="Blurred image in an INQUIRER.net graphic about the Bulacan case"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </a>
              <figcaption>IMAGE: INQUIRER.NET · PHOTO: LUNA AND FURRY SIBLINGS ANIMAL RESCUE</figcaption>
            </figure>
            <div>
              <p className="news-kicker">
                <Newspaper size={16} aria-hidden="true" />
                ANIMAL WELFARE WATCH
              </p>
              <p className="news-dateline">San Jose del Monte, Bulacan</p>
              <h3>29 dogs and cats claimed by their owners, rescue group says</h3>
              <p>
                INQUIRER.net reports that all 29 dogs and cats dumped in San Jose del Monte, Bulacan, have been claimed
                by their respective owners, according to an animal rescue group.
              </p>
              <div className="news-actions">
                <a
                  href="https://newsinfo.inquirer.net/2334122/all-dead-pets-dumped-in-bulacan-claimed-by-owners-rescue-group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-primary-button"
                >
                  Read the report <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a href={inquirerPostUrl} target="_blank" rel="noopener noreferrer" className="news-text-link">
                  View Inquirer post <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="news-story news-story-flip">
          <div>
            <p className="news-kicker">PAWS RESCUE · TAYTAY, RIZAL</p>
            <h3>34 animals rescued from neglect</h3>
            <p>
              PAWS reports rescuing 29 dogs and 5 cats found in filthy, unsanitary conditions. Many were severely
              underweight, and some were confined in cages. PAWS urges spaying and neutering and adopting pets that
              have already been spayed or neutered.
            </p>
            <div className="news-actions">
              <a
                href="https://www.facebook.com/share/v/1CQUrzKddi/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-primary-button"
              >
                Watch the PAWS update <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://mb.com.ph/2026/11/16/child-34-neglected-animals-rescued-from-filthy-rizal-home"
                target="_blank"
                rel="noopener noreferrer"
                className="news-text-link"
              >
                Read a report <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure>
            <a
              href="https://www.facebook.com/share/v/1CQUrzKddi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the PAWS rescue video on Facebook"
            >
              <img
                src="/images/paws-taytay-rescue.jpg"
                alt="PAWS alert about 29 dogs and 5 cats left in neglect in Taytay, Rizal"
                loading="lazy"
              />
            </a>
            <figcaption>PAWS PHILIPPINES · TAYTAY, RIZAL</figcaption>
          </figure>
        </div>
      )}
      {index === 0 && onTurnNext ? (
        <button type="button" className="news-corner" onClick={onTurnNext}>
          Turn the page
        </button>
      ) : null}
    </article>
  )
}

export default function News() {
  usePageTitle("News · One Kind")
  const [newsPage, setNewsPage] = useState(0)
  const [newsFrom, setNewsFrom] = useState(null)
  const [kabangOpen, setKabangOpen] = useState(false)
  const [kabangFacing, setKabangFacing] = useState("left")
  const [zoomOrigin, setZoomOrigin] = useState({})
  const kabangTriggerRef = useRef(null)
  const openKabang = useCallback((sourceRect) => {
    kabangTriggerRef.current = document.activeElement
    setKabangFacing("left")
    if (sourceRect) {
      const scale = Math.min(sourceRect.width / window.innerWidth, sourceRect.height / window.innerHeight, 1)
      setZoomOrigin({
        "--zoom-from-x": `${sourceRect.left + sourceRect.width / 2 - window.innerWidth / 2}px`,
        "--zoom-from-y": `${sourceRect.top + sourceRect.height / 2 - window.innerHeight / 2}px`,
        "--zoom-from-scale": scale,
      })
    }
    setKabangOpen(true)
  }, [])
  const updateKabangRotation = useCallback((rotation) => {
    if (rotation < -0.35) setKabangFacing("left")
    if (rotation > 0.35) setKabangFacing("right")
  }, [])

  useEffect(() => {
    if (newsFrom === null) return undefined
    const timer = window.setTimeout(() => setNewsFrom(null), 1000)
    return () => window.clearTimeout(timer)
  }, [newsFrom])

  useEffect(() => {
    if (!kabangOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function closeOnEscape(event) {
      if (event.key === "Escape") setKabangOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
      if (kabangTriggerRef.current instanceof HTMLElement && kabangTriggerRef.current.isConnected) {
        window.requestAnimationFrame(() => kabangTriggerRef.current?.focus())
      }
    }
  }, [kabangOpen])

  function turnNews(next) {
    if (newsFrom !== null || next === newsPage || next < 0 || next > 1) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNewsPage(next)
      return
    }
    setNewsFrom(newsPage)
    setNewsPage(next)
  }

  return (
    <section className="news-page home-paper-section home-sheet home-sheet-watch py-10 sm:py-14 lg:py-20" aria-labelledby="featured-issue-title">
      <div className="news-spots" aria-hidden="true" />
      <PetAssets variant="stamps" />
      <Container>
        <div className="news-masthead">
          <p className="journal-chapter">The Stories That Matter</p>
          <p className="home-index home-index-center">
            <span>05</span>
            Animal welfare watch · Philippines
          </p>
          <h1 id="featured-issue-title">Stories that need our attention</h1>
        </div>

        <article className="kabang-exhibit" aria-labelledby="kabang-title">
          <div className="kabang-exhibit-copy">
            <p className="kabang-exhibit-eyebrow">A hero in the Philippines</p>
            <div className="kabang-exhibit-message">
              <h2 id="kabang-title">
                <span>Not all heroes wear capes.</span>
                <strong>They have PAWS</strong>
              </h2>
              <p>Meet the brave Aspin who became a hero.</p>
            </div>
          </div>
          <div className="kabang-statue-button">
            <KabangModel onOpen={openKabang} onRotationChange={updateKabangRotation} />
            <span className="kabang-click-hint">Click Kabang to discover her story</span>
          </div>
        </article>

        <div className="news-book">
          <NewsLeaf index={newsPage} onTurnNext={newsPage === 0 ? () => turnNews(1) : undefined} />
          {newsFrom !== null ? (
            <NewsLeaf index={newsFrom} turning onTurned={() => setNewsFrom(null)} />
          ) : null}
        </div>
        <div className="news-pager">
          <button type="button" onClick={() => turnNews(newsPage - 1)} disabled={newsPage === 0 || newsFrom !== null}>
            Previous page
          </button>
          <p className="sr-only" aria-live="polite">Page {newsPage + 1} of 2</p>
          <button type="button" onClick={() => turnNews(newsPage + 1)} disabled={newsPage === 1 || newsFrom !== null}>
            Turn the page
          </button>
        </div>
      </Container>
      {kabangOpen
        ? createPortal(
            <div className="kabang-modal-backdrop" role="presentation">
              <section
                className={`kabang-zoom is-facing-${kabangFacing}`}
                style={zoomOrigin}
                role="dialog"
                aria-modal="true"
                aria-labelledby="kabang-modal-title"
              >
                <button
                  type="button"
                  className="kabang-modal-close"
                  onClick={() => setKabangOpen(false)}
                  aria-label="Close Kabang story"
                >
                  <X size={20} aria-hidden="true" />
                </button>
                <div className="kabang-zoom-stage">
                  <KabangModel
                    zoomed
                    initialRotation={-0.82}
                    onRotationChange={updateKabangRotation}
                  />
                </div>
                <p className="kabang-zoom-kicker">DRAG THE STATUE TO TURN</p>
                <span className="kabang-zoom-instruction">Drag or use arrow keys to explore Kabang</span>
                <aside className="kabang-face-card kabang-face-left" aria-label="Kabang name">
                  <p>The hero dog</p>
                  <h2 id="kabang-modal-title">Kabang</h2>
                  <small>Zamboanga City · 2011 rescue</small>
                  <p className="kabang-face-caption">An Aspin remembered for her courage.</p>
                </aside>
                <aside className="kabang-face-card kabang-face-right" aria-label="Kabang information">
                  <p>A story of courage</p>
                  <h2>A hero in action</h2>
                  <p>
                    Nine-year-old Dina Bunaggal and her three-year-old cousin Princess Diansing were crossing a street
                    in Zamboanga City when a motorcycle approached. Kabang leapt between them and the motorcycle,
                    protecting both children.
                  </p>
                  <small>Zamboanga City · December 2011</small>
                </aside>
              </section>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
