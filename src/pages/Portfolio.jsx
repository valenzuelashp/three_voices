import { Link, useParams } from "react-router-dom"
import { ArrowDown, ArrowLeft, PawPrint, Plus } from "lucide-react"
import Container from "../components/Container"
import { profiles } from "../data/site"
import usePageTitle from "../usePageTitle"
import NotFound from "./NotFound"

const storyPhotos = [
  {
    number: "01",
    src: "/images/ia-cookie-birthday-story.jpg",
    alt: "Cookie celebrating her birthday in a party hat",
    objectPosition: "center 72%",
  },
  { number: "02", src: "/images/ia-cookie-bilog-bath.jpg", alt: "Cookie and Bilog waiting for their bath" },
  { number: "03", src: "/images/ia-cookie-2.jpg", alt: "Cookie resting underneath a chair" },
  { number: "04", src: "/images/ia-cookie-3.jpg", alt: "Cookie smiling at the camera" },
  { number: "05", src: "/images/ia-bilog-2.jpg", alt: "Bilog lying comfortably on a blanket" },
  { number: "06", src: "/images/ia-bilog.jpg", alt: "Bilog sitting and looking at the camera" },
  { number: "07", src: "/images/ia-yeongtan-maliya-story.jpg", alt: "Yeongtan and Maliya together as puppies" },
  { number: "08", src: "/images/ia-cookies-puppies.jpg", alt: "Cookie's three puppies together" },
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
              {profile.slug === "ia"
                ? "Saturday baths, fierce companions, and the lessons my dogs and cats teach me about care."
                : `A space for ${profile.name} to share experiences, memories, and what this cause means to them.`}
            </p>
          </div>

          {profile.slug === "ia" ? (
            <div className="profile-story-chapters">
              <article className="profile-story-chapter">
                <div className="profile-story-copy">
                  <h3>Saturdays Smell Like Dog Shampoo</h3>
                  <p>
                    I’m Ia Mary Sorio, 22, a fourth-year BSIT student, and every Saturday I turn into a full-time dog groomer.
                    My family has nine dogs and three cats, and yes, we celebrate every one of their birthdays. Growing up in a house like this,
                    caring for animals is just part of life.
                  </p>
                  <p>
                    Every weekend I give the dogs their baths in a fixed lineup. Cookie, Bilog, and Yeongtan go in together.
                    Maliya and Brownie are the second batch. Coffee gets a shower all to himself. Cookie’s three babies aren’t old enough for baths yet,
                    so for now they just watch the chaos.
                  </p>
                </div>
                <StoryPhotos photos={storyPhotos.slice(0, 2)} />
              </article>

              <article className="profile-story-chapter">
                <div className="profile-story-copy">
                  <h3>Cookie, the Cute but Dangerous</h3>
                  <p>
                    Cookie is an aspin we got from Papa’s friend back when I was in high school, so she’s been with me through all of it.
                    She is easily the smartest and most spoiled dog in the house. She can climb ladders, sit on chairs, and cry loudly the second she wants attention.
                    She has even “mukbang-ed” our viand twice after climbing onto chairs and tables the moment we looked away.
                  </p>
                  <p>
                    She looks like a cute sealion, but she’s fierce. She has bitten a lot of people, and my sister has taken responsibility and paid for it more than once.
                    That’s why Cookie is on a leash whenever we have visitors. Cute, but dangerous.
                  </p>
                  <p>
                    The thing I love most is how easily she gets rage-baited. Her patience is very short, and I tease her just to see her reaction.
                    We love her anyway—spoiled and fierce and all.
                  </p>
                </div>
                <StoryPhotos photos={storyPhotos.slice(2, 4)} />
              </article>

              <article className="profile-story-chapter">
                <div className="profile-story-copy">
                  <h3>Bilog, the One Who Reads the Room</h3>
                  <p>
                    Bilog is Cookie’s daughter, from her very first batch of puppies. She got her name because she was so chunky and round when she was young.
                    My brother called her Bilog, she responded to it, and we never got the chance to change it.
                  </p>
                  <p>
                    Bilog is quiet and well-behaved. She looks like a corgi—long, short, and cute—and she is just as smart as Cookie.
                    What sets her apart is that she knows how to read the room. Whenever I’m sad, she comes to me and sits beside me while I figure things out.
                    Bilog is my comfort, and I’m so grateful for her.
                  </p>
                </div>
                <StoryPhotos photos={storyPhotos.slice(4, 6)} />
              </article>

              <article className="profile-story-chapter">
                <div className="profile-story-copy">
                  <h3>Why Dogs and Cats Are My Advocacy</h3>
                  <p>
                    Dogs are the first ones to greet you whenever you come home. They comfort you and stay with you when you’re feeling down.
                    Every day feels special because they’re around. They are only a part of your life, but your dog’s whole life revolves around you.
                  </p>
                  <p>
                    Living with twelve animals has taught me how much they depend on us. They can’t tell us when they’re hungry, hurting, or scared,
                    so we have to pay attention for them. Every Saturday bath, every birthday, and every time Bilog sits beside me is a reminder that
                    they give us so much more than we give them.
                  </p>
                  <p>
                    That’s why my advocacy is about dogs and cats. Every one of them deserves to be fed, kept safe, and loved—whether they live in a house like ours
                    or are strays looking for someone to take them in.
                  </p>
                  <p>
                    If my dogs spend their whole lives trusting me, the least I can do is speak up for the ones who have no one to do it for them.
                  </p>
                </div>
                <StoryPhotos photos={storyPhotos.slice(6, 8)} />
              </article>
            </div>
          ) : (
            <div className="profile-story-grid">
              <article className="profile-story-card">
                <span className="profile-card-label">MY EXPERIENCE</span>
                <p className="profile-story-placeholder">Story placeholder — personal experiences coming soon.</p>
                <span className="profile-card-index">STORY / 01</span>
              </article>
              <div className="profile-moments" aria-label="Personal photo placeholders">
                {storyPhotos.slice(0, 4).map(({ number }) => (
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
          )}

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

function StoryPhotos({ photos }) {
  return (
    <div className="profile-story-photos" aria-label="Photos for this story section">
      {photos.map(({ number, src, alt, objectPosition }) => (
        <figure key={number} className="profile-story-photo">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="size-full object-cover"
            style={objectPosition ? { objectPosition } : undefined}
          />
          <figcaption>{number}</figcaption>
        </figure>
      ))}
    </div>
  )
}
