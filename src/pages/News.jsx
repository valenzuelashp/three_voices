import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowDown, ArrowUpRight, Newspaper, X } from "lucide-react"
import Container from "../components/Container"
import KabangModel from "../components/KabangModel"
import PetAssets from "../components/PetAssets"

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
  const reduceMotion = useReducedMotion()
  const [newsPage, setNewsPage] = useState(0)
  const [newsFrom, setNewsFrom] = useState(null)
  const [kabangOpen, setKabangOpen] = useState(false)
  const [kabangFacing, setKabangFacing] = useState("left")
  const [hachikoFacing, setHachikoFacing] = useState("right")
  const [hachikoReady, setHachikoReady] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState({})
  const kabangStoryScrollRef = useRef(null)
  const kabangStoryRef = useRef(null)
  const hachikoStoryRef = useRef(null)
  const kabangScrollOffsetRef = useRef(0)
  const hachikoScrollOffsetRef = useRef(0)
  const kabangTriggerRef = useRef(null)
  const { scrollYProgress: kabangStoryProgress } = useScroll({
    container: kabangStoryScrollRef,
    target: kabangStoryRef,
    offset: ["start end", "end start"],
  })
  const { scrollYProgress: hachikoStoryProgress } = useScroll({
    container: kabangStoryScrollRef,
    target: hachikoStoryRef,
    offset: ["start end", "end start"],
  })
  const kabangScrollOffset = useTransform(
    kabangStoryProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-0.75, 0.75],
  )
  const hachikoScrollOffset = useTransform(
    hachikoStoryProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-0.75, 0.75],
  )
  useMotionValueEvent(kabangScrollOffset, "change", (value) => {
    kabangScrollOffsetRef.current = value
  })
  useMotionValueEvent(hachikoScrollOffset, "change", (value) => {
    hachikoScrollOffsetRef.current = value
  })
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
  const updateHachikoRotation = useCallback((rotation) => {
    if (rotation < -0.35) setHachikoFacing("left")
    if (rotation > 0.35) setHachikoFacing("right")
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
    <section id="news" className="news-page home-paper-section home-sheet home-sheet-watch py-10 sm:py-14 lg:py-20" aria-labelledby="featured-issue-title">
      <div className="news-spots" aria-hidden="true" />
      <PetAssets variant="stamps" />
      <Container>
        <div className="news-masthead">
          <p className="journal-chapter">The Stories That Matter</p>
          <p className="home-index home-index-center">
            <span>02</span>
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
                ref={kabangStoryScrollRef}
                className={`kabang-zoom is-facing-${kabangFacing}`}
                style={zoomOrigin}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dog-stories-title"
                tabIndex={-1}
              >
                <button
                  type="button"
                  className="kabang-modal-close"
                  onClick={() => setKabangOpen(false)}
                  aria-label="Close dog stories"
                >
                  <X size={20} aria-hidden="true" />
                </button>
                <motion.article
                  ref={kabangStoryRef}
                  className="kabang-zoom-story kabang-zoom-story--kabang"
                  initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: kabangStoryScrollRef, amount: 0.25, once: true }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 id="dog-stories-title" className="sr-only">Stories of brave and loyal dogs</h2>
                  <div className="kabang-zoom-stage">
                    <KabangModel
                      zoomed
                      initialRotation={-0.25}
                      onRotationChange={updateKabangRotation}
                      scrollOffsetRef={kabangScrollOffsetRef}
                    />
                  </div>
                  <p className="kabang-zoom-kicker">DRAG THE STATUE TO TURN</p>
                  <span className="kabang-zoom-instruction">Drag or use arrow keys to explore Kabang</span>
                  <span className="kabang-story-scroll-prompt">
                    Scroll for Hachikō’s story <ArrowDown size={16} aria-hidden="true" />
                  </span>
                  <aside className="kabang-face-card kabang-face-left" aria-label="Kabang name">
                    <p>The hero dog</p>
                    <h2 id="kabang-modal-title">Kabang</h2>
                    <small>Zamboanga City · 2011 rescue</small>
                    <p className="kabang-face-caption">An Aspin remembered for her courage.</p>
                    <figure className="kabang-photo-frame">
                      <img src="/images/kabang-portrait-frame.png" alt="Kabang sitting for a portrait" />
                      <figcaption>Kabang · Zamboanga City</figcaption>
                    </figure>
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
                </motion.article>
                <motion.article
                  ref={hachikoStoryRef}
                  className={`kabang-zoom-story kabang-zoom-story--hachiko is-facing-${hachikoFacing}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: kabangStoryScrollRef, amount: 0.25, once: true }}
                  onViewportEnter={() => setHachikoReady(true)}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="kabang-zoom-stage">
                    {hachikoReady ? (
                      <KabangModel
                        zoomed
                        focusOnMount={false}
                        initialRotation={0.82}
                        keepOnLeft
                        minRotation={-0.65}
                        modelSrc="/hachiko_bronze.glb"
                        modelName="Hachikō"
                        onRotationChange={updateHachikoRotation}
                        scrollOffsetRef={hachikoScrollOffsetRef}
                      />
                    ) : null}
                  </div>
                  <figure className="kabang-photo-frame kabang-hachiko-photo-frame">
                    <img src="/images/hachiko-portrait-frame.png" alt="Hachikō in an archival portrait" />
                    <figcaption>Hachikō · Shibuya, Tokyo</figcaption>
                  </figure>
                  <p className="kabang-zoom-kicker">A STORY OF LOYALTY</p>
                  <span className="kabang-zoom-instruction">Drag or use arrow keys to turn Hachikō</span>
                  <aside className="kabang-hachiko-card" aria-labelledby="hachiko-story-title">
                    <p>The dog who waited</p>
                    <h2 id="hachiko-story-title">Hachikō</h2>
                    <p>
                      In 1924 Tokyo, Hachikō walked Professor Hidesaburō Ueno to Shibuya Station each morning and
                      returned each afternoon to greet him. When the professor died suddenly in May 1925, Hachikō
                      continued waiting at the station.
                    </p>
                    <p>
                      Though adopted by relatives, he kept returning through every season. After a newspaper shared
                      his story in 1932, he became a beloved national icon and kept waiting until his death in 1935.
                    </p>
                    <small>Shibuya Station, Tokyo · 1924–1935</small>
                  </aside>
                </motion.article>
              </section>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
