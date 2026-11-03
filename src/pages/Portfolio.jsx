import { Link, useParams } from "react-router-dom"
import { ArrowDown, ArrowLeft, PawPrint, Plus } from "lucide-react"
import Container from "../components/Container"
import { profiles } from "../data/site"
import usePageTitle from "../usePageTitle"
import NotFound from "./NotFound"

const storyPhotos = ["01", "02", "03", "04"]

export default function Portfolio() {
  const { slug } = useParams()
  const profile = profiles.find((entry) => entry.slug === slug)
  usePageTitle(profile ? `${profile.name} · Three Voices` : "Page not found · Three Voices")

  if (!profile) return <NotFound />

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
              className={`profile-main-photo${profile.slug === "charles" ? "" : " profile-photo-placeholder"}`}
              role={profile.slug === "charles" ? undefined : "img"}
              aria-label={profile.slug === "charles" ? undefined : `${profile.name}'s main photo placeholder`}
            >
              {profile.slug === "charles" ? (
                <img
                  src="/images/charles-dog-main.png"
                  alt="Charles's dog wearing a lavender costume"
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

            <div className="profile-moments" aria-label="Personal photo placeholders">
              {storyPhotos.map((number) => (
                <div
                  key={number}
                  role="img"
                  aria-label={`${profile.name}'s story photo placeholder ${number}`}
                  className="profile-moment profile-photo-placeholder"
                >
                  <span className="profile-moment-number">{number}</span>
                  <span className="profile-moment-add">
                    <Plus size={19} aria-hidden="true" />
                  </span>
                  <span className="sr-only">Story photo placeholder</span>
                </div>
              ))}
            </div>
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
