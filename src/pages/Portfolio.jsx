import { Link, useParams } from "react-router-dom"
import { ArrowDown, ArrowLeft, PawPrint, Plus } from "lucide-react"
import Container from "../components/Container"
import { profiles } from "../data/site"
import usePageTitle from "../usePageTitle"
import NotFound from "./NotFound"

const storyPhotos = [
  { number: "01", src: "/images/ia-cookie-birthday.jpg", alt: "Cookie celebrating a birthday in a party hat" },
  { number: "02", src: "/images/ia-dogs-bath.jpg", alt: "Cookie and Bilog together during bath time" },
  {
    number: "03",
    src: "/images/ia-maliya-yeongtan.jpg",
    alt: "Maliya and Yeongtan together",
    objectPosition: "left center",
  },
  { number: "04", src: "/images/ia-bilog-resting.jpg", alt: "Bilog resting on their back" },
]
const petPhotoSlots = ["01", "02", "03", "04", "05", "06", "07", "08"]
const iaPetPhotos = [
  { src: "/images/pet-bilog-cute.webp", name: "Bilog" },
  { src: "/images/pet-sealion-cookie.jpg", name: "Cookie" },
  { src: "/images/pet-yeongtan.jpg", name: "Yeongtan" },
  { src: "/images/pet-brownie.jpg", name: "Brownie" },
  { src: "/images/pet-maliya.jpg", name: "Maliya" },
  { src: "/images/pet-coffee.jpg", name: "Coffee" },
  { src: "/images/pet-mallows.jpg", name: "Mallows" },
  { src: "/images/pet-mini-cookie.jpg", name: "Mini Cookie" },
  { src: "/images/pet-mini-yoshi.jpg", name: "Mini Yoshi" },
  { src: "/images/pet-maui.jpg", name: "Maui" },
  { src: "/images/pet-mimo.jpg", name: "Mimo" },
  { src: "/images/pet-momo.jpg", name: "Momo" },
]

export default function Portfolio() {
  const { slug } = useParams()
  const profile = profiles.find((entry) => entry.slug === slug)
  const mainPhoto = profile?.slug === "charles"
    ? { src: "/images/charles-dog-main.png", alt: "Charles's dog wearing a lavender costume" }
    : profile?.slug === "ia"
      ? { src: "/images/profile-ia-main.jpg", alt: "Ia with Bilog" }
      : null
  const petPhotos = profile?.slug === "ia" ? iaPetPhotos : null
  usePageTitle(profile ? `${profile.name} · Three Voices` : "Page not found · Three Voices")

  if (!profile) return <NotFound />
  if (!profile.path) return <Navigate to="/#profiles" replace />

  return (
    <div className="profile-page" style={{ "--accent": profile.accent }}>
      <section className="profile-hero" aria-labelledby="profile-title">
        <Container>
          <div className="profile-eyebrow">
            <PawPrint size={15} aria-hidden="true" />
            <span>ONE ADVOCACY / ONE PERSONAL VOICE</span>
          </div>

          <div className="profile-hero-grid">
            <div className="profile-intro">
              <p className="profile-kicker">Animal welfare · Three Voices</p>
              <h1 id="profile-title" className="profile-title">
                {profile.name}
                <span>’s voice</span>
              </h1>
              <p className="profile-intro-copy">A personal connection to a kinder world for animals.</p>
              <a href="#profile-story" className="profile-action">
                Read my story
                <ArrowDown size={16} aria-hidden="true" />
              </a>
              <div className="profile-commitment">
                <span className="profile-commitment-icon">
                  <PawPrint size={17} aria-hidden="true" />
                </span>
                <span>
                  <strong>One shared cause</strong>
                  <span>Care · respect · protection</span>
                </span>
              </div>
            </div>

            <div
              className={`profile-main-photo${mainPhoto ? "" : " profile-photo-placeholder"}`}
              role={mainPhoto ? undefined : "img"}
              aria-label={mainPhoto ? undefined : `${profile.name}'s main photo placeholder`}
            >
              {mainPhoto ? (
                <img
                  src={mainPhoto.src}
                  alt={mainPhoto.alt}
                  className="size-full rounded-[inherit] object-cover"
                />
              ) : (
                <>
                  <span className="profile-photo-corner profile-photo-corner-top" aria-hidden="true" />
                  <span className="profile-photo-placeholder-content">
                    <PawPrint size={32} strokeWidth={1.4} aria-hidden="true" />
                    <span>Main photo placeholder</span>
                  </span>
                </>
              )}
              <span className="profile-photo-index">PHOTO / 01</span>
            </div>

            <div className="profile-side-photo-wrap">
              {profile.slug === "charles" ? (
                <div className="profile-side-photo">
                  <img
                    src="/images/charles-dog-portrait.png"
                    alt="Charles's dog wearing a lavender costume"
                    className="absolute inset-0 size-full rounded-[inherit] object-cover"
                  />
                </div>
              ) : profile.slug === "ia" ? (
                <div className="profile-side-photo">
                  <img
                    src="/images/profile-ia-cat.jpg"
                    alt="Ia with Maui the cat"
                    className="absolute inset-0 size-full rounded-[inherit] object-cover"
                    style={{ objectPosition: "center 35%" }}
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label={`${profile.name}'s portrait placeholder`}
                  className="profile-side-photo profile-photo-placeholder"
                >
                  <span className="profile-photo-placeholder-content">
                    <PawPrint size={25} strokeWidth={1.4} aria-hidden="true" />
                    <span>Portrait placeholder</span>
                  </span>
                </div>
              )}
              <p className="profile-caption">A little more about me, coming soon.</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="profile-story" className="profile-story-section" aria-labelledby="story-title">
        <Container>
          <div className="profile-section-heading">
            <div>
              <p className="profile-kicker">PERSONAL STORY</p>
              <h2 id="story-title" className="profile-section-title">
                My story with animals
              </h2>
            </div>
            <p className="profile-section-lede">
              A space for {profile.name} to share experiences, memories, and what this cause means to them.
            </p>
          </div>

          <div className="profile-story-grid">
            <article className="profile-story-card">
              <span className="profile-card-label">MY EXPERIENCE</span>
              <p className="profile-story-placeholder">Story placeholder — personal experiences coming soon.</p>
              <span className="profile-card-index">STORY / 01</span>
            </article>

            <div
              className="profile-moments"
              aria-label={profile.slug === "ia" ? "Ia's personal photos" : "Personal photo placeholders"}
            >
              {storyPhotos.map(({ number, src, alt, objectPosition }) => {
                const photo = profile.slug === "ia" ? src : null
                return (
                  <div
                    key={number}
                    role={photo ? undefined : "img"}
                    aria-label={photo ? undefined : `${profile.name}'s story photo placeholder ${number}`}
                    className={`profile-moment${photo ? " relative overflow-hidden" : " profile-photo-placeholder"}`}
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt={alt}
                        className="absolute inset-0 size-full rounded-[inherit] object-cover"
                        style={objectPosition ? { objectPosition } : undefined}
                      />
                    ) : null}
                    <span
                      className="profile-moment-number"
                      style={photo ? { color: "white", textShadow: "0 1px 5px rgba(0, 0, 0, 0.9)" } : undefined}
                    >
                      {number}
                    </span>
                    {photo ? null : (
                      <>
                        <span className="profile-moment-add">
                          <Plus size={19} aria-hidden="true" />
                        </span>
                        <span className="sr-only">Story photo placeholder</span>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </Container>
      </section>

      <section className="profile-story-section" aria-labelledby="pet-gallery-title">
        <Container>
          <div className="profile-section-heading">
            <div>
              <p className="profile-kicker">PET GALLERY</p>
              <h2 id="pet-gallery-title" className="profile-section-title">{profile.name}'s pets</h2>
            </div>
            <p className="profile-section-lede">
              {petPhotos ? "Meet the pets who share my life." : "Add a photo and name for each pet."}
            </p>
          </div>

          <div
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            aria-label={petPhotos ? `${profile.name}'s pet gallery` : `${profile.name}'s pet photo placeholders`}
          >
            {petPhotos
              ? petPhotos.map(({ src, name }) => (
                  <figure key={src} className="group relative aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={src}
                      alt={name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pt-10 pb-3 text-sm font-semibold text-white">
                      {name}
                    </figcaption>
                  </figure>
                ))
              : petPhotoSlots.map((number) => (
                  <div
                    key={number}
                    role="img"
                    aria-label={`${profile.name}'s pet photo and name placeholder ${number}`}
                    className="profile-photo-placeholder aspect-square rounded-2xl"
                  >
                    <span className="profile-photo-placeholder-content">
                      <PawPrint size={25} strokeWidth={1.4} aria-hidden="true" />
                      <span>Pet photo {number}</span>
                      <span className="text-xs text-[color:var(--profile-muted)]">Pet name</span>
                    </span>
                  </div>
                ))}
          </div>

          <Link to="/#profiles" className="profile-back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to all voices
          </Link>
        </Container>
      </section>
    </div>
  )
}
