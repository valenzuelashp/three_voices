import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowDown, ArrowLeft, ArrowRight, Pause, PawPrint, Play, Plus } from "lucide-react"
import { useRef, useState } from "react"
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
const charlesStoryPhotos = [
  { number: "01", src: "/images/charles-dog-story-02.jpg", alt: "Charles's puppy looking at the camera" },
  { number: "02", src: "/images/charles-dog-story-01.jpg", alt: "Charles's dog sitting on the floor" },
]
const charlesMatriarchPhotos = [
  { number: "01", src: "/images/charles-matriarch-story-01.jpg", alt: "Charles's senior dog relaxing on a backpack in her red shirt" },
  { number: "02", src: "/images/charles-matriarch-story-02.jpg", alt: "Charles's senior dog curled up in bed wearing her shirt" },
]
const charlesVicePhotos = [
  { number: "01", src: "/images/charles-vice-cosmetics-01.jpg", alt: "Charles's dog posing with Vice Cosmetics lipstick", objectPosition: "center 58%" },
  { number: "02", src: "/images/charles-vice-cosmetics-02.jpg", alt: "Charles's dog smiling beside a Vice Cosmetics lipstick", objectPosition: "center 60%" },
]
const charlesYogaPhotos = [
  { number: "01", src: "/images/charles-yoga-session.jpg", alt: "A puppy stretching forward as if doing a yoga pose" },
  { number: "02", src: "/images/charles-yoga-session-02.png", alt: "A black-and-white puppy stretching on a blue blanket in a playful yoga pose" },
]
const charlesSleepyPhotos = [
  { src: "/images/charles-sleepy-01.jpg", alt: "A puppy resting on its back on the bed" },
  { src: "/images/charles-sleepy-02.jpg", alt: "A puppy asleep in Charles's arms" },
  { src: "/images/charles-sleepy-03.jpg", alt: "A puppy sleeping on its back beside the couch" },
  { src: "/images/charles-sleepy-04.jpg", alt: "A puppy sleeping in a cardboard box" },
  { src: "/images/charles-sleepy-05.jpg", alt: "Two small puppies resting together on a blanket" },
  { src: "/images/charles-sleepy-06.jpg", alt: "A close-up of a puppy asleep on a blanket" },
  { src: "/images/charles-sleepy-07.jpg", alt: "A puppy curled up asleep beside a slipper" },
  { src: "/images/charles-sleepy-08.jpg", alt: "A puppy resting on its bed" },
  { src: "/images/charles-sleepy-09.jpg", alt: "A puppy resting upside down beside Charles" },
  { src: "/images/charles-sleepy-10.jpg", alt: "A puppy asleep on its back on the tile floor" },
  { src: "/images/charles-sleepy-11.jpg", alt: "A puppy dozing in a cardboard box" },
  { src: "/images/charles-sleepy-12.png", alt: "A puppy sleeping on its back on the wooden floor" },
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
const charlesPetPhotos = [
  { src: "/images/charles-pet-queen.png", name: "Cupcake", alt: "Cupcake wearing a lavender hoodie" },
  { src: "/images/charles-pet-01.jpg", name: "Twinkle", alt: "Twinkle looking to the side" },
  { src: "/images/charles-pet-02.jpg", name: "Toffee", alt: "Toffee resting beside Charles" },
  { src: "/images/charles-pet-03.jpg", name: "Muffin", alt: "Muffin resting on the floor" },
  { src: "/images/charles-pet-04.jpg", name: "Cream-o", alt: "Cream-o with their tongue out" },
  { src: "/images/charles-pet-05.jpg", name: "Chuchoy / Buchoy", alt: "Chuchoy, also called Buchoy, wearing a knitted hat" },
  { src: "/images/charles-pet-06.jpg", name: "Hershey", alt: "Hershey resting on someone's arm" },
  { src: "/images/charles-pet-07.jpg", name: "Kisses", alt: "Kisses relaxing in someone's arms" },
  { src: "/images/charles-pet-08.jpg", name: "Almond", alt: "Almond sitting on a tiled floor" },
]

export default function Portfolio() {
  const { slug } = useParams()
  const profile = profiles.find((entry) => entry.slug === slug)
  const experienceVideoRef = useRef(null)
  const [experienceVideoPlaying, setExperienceVideoPlaying] = useState(true)
  const hersheyVideoRef = useRef(null)
  const [hersheyVideoPlaying, setHersheyVideoPlaying] = useState(true)
  const mainPhoto = profile?.slug === "charles"
    ? { src: "/images/charles-dog-main.png", alt: "Charles's dog wearing a lavender costume" }
    : profile?.slug === "ia"
      ? { src: "/images/profile-ia-main.jpg", alt: "Ia with Bilog" }
      : null
  const petPhotos = profile?.slug === "ia"
    ? iaPetPhotos
    : profile?.slug === "charles"
      ? charlesPetPhotos
      : null
  const featuredPetPhoto = profile?.slug === "charles" ? charlesPetPhotos[0] : null
  const galleryPetPhotos = profile?.slug === "charles" ? charlesPetPhotos.slice(1) : petPhotos
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
            <div className={`profile-story-grid${profile.slug === "charles" ? " profile-story-grid--charles" : ""}`}>
              <article className="profile-story-card">
                <span className="profile-card-label">MY EXPERIENCE</span>
                {profile.slug === "charles" ? (
                  <div className="profile-story-video-wrap">
                    <video
                      ref={experienceVideoRef}
                      className="profile-story-video"
                      src="/videos/charles-experience.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label="Charles's animal experience video"
                      onPlay={() => setExperienceVideoPlaying(true)}
                      onPause={() => setExperienceVideoPlaying(false)}
                    />
                    <button
                      type="button"
                      className="profile-video-toggle"
                      aria-label={experienceVideoPlaying ? "Pause Charles's experience video" : "Play Charles's experience video"}
                      onClick={() => {
                        const video = experienceVideoRef.current
                        if (!video) return
                        if (video.paused) {
                          video.play().catch(() => setExperienceVideoPlaying(false))
                        } else {
                          video.pause()
                        }
                      }}
                    >
                      {experienceVideoPlaying ? (
                        <Pause size={15} strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <Play size={15} strokeWidth={2.5} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="profile-story-placeholder">Story placeholder — personal experiences coming soon.</p>
                )}
                <span className="profile-card-index">STORY / 01</span>
              </article>

              <div
                className="profile-moments"
                aria-label={profile.slug === "charles" ? "Charles's personal photos and experience text" : "Personal photo placeholders"}
              >
                {profile.slug === "charles" ? (
                  <>
                    {charlesStoryPhotos.map(({ number, src, alt }) => (
                      <figure key={number} className="profile-moment profile-moment--photo">
                        <img src={src} alt={alt} loading="lazy" />
                        <figcaption className="profile-moment-number">{number}</figcaption>
                      </figure>
                    ))}
                    <div className="profile-moment profile-moment--wide profile-photo-placeholder">
                      <span className="profile-moment-number">03 / 04</span>
                      <div className="profile-experience-placeholder">
                        <h3>Holidays Mean Spontaneous Photo Shoots</h3>
                        <p>
                          I’m Charles, 22, a fourth-year BSIT student, and whenever holidays and long weekends roll around,
                          going home to Cavite means my camera roll is instantly taken over by our dogs.
                        </p>
                        <p>
                          Between their excited welcome zoomies, goofy bleps, and surprisingly dramatic side profiles, every visit
                          turns into an impromptu photo shoot the second I walk through the door. Filling up my gallery with their
                          best angles has become my favorite way to unwind and track how much they’ve grown between trips.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  storyPhotos.slice(0, 4).map(({ number }) => (
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
                  ))
                )}
              </div>
            </div>
          )}

          {profile.slug === "charles" && (
            <>
              <figure className="profile-story-wide-photo">
                <img
                  src="/images/charles-dogs-wide.jpg"
                  alt="Charles's dogs gathered together on a shelf"
                  loading="lazy"
                />
              </figure>
              <div className="profile-story-chapters">
                <article className="profile-story-chapter">
                  <div className="profile-story-copy">
                    <h3>The undisputed Queen of the House</h3>
                    <p>
                      Every pack needs a matriarch, and for our household, that title belongs to the eldest—the mother of them all.
                      While the younger pups are busy running around, she prefers lounging like royalty in her favorite shirts,
                      whether she&apos;s claiming a backpack as her personal throne or curling up for belly rubs in bed.
                    </p>
                    <p>
                      She has been with us through every chapter, watching over the entire brood with that calm, sleepy-eyed wisdom
                      only a senior dog has. Taking care of her in her golden years is our way of giving back for all the love
                      she&apos;s poured into our family.
                    </p>
                  </div>
                  <StoryPhotos photos={charlesMatriarchPhotos} />
                </article>
                <article className="profile-story-chapter profile-hershey-story">
                  <div className="profile-story-clip">
                    <video
                      ref={hersheyVideoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label="Hershey's underdog video"
                      onPlay={() => setHersheyVideoPlaying(true)}
                      onPause={() => setHersheyVideoPlaying(false)}
                    >
                      <source src="/videos/charles-hershey-underdog.mp4" type="video/mp4" />
                      Your browser does not support embedded videos.
                    </video>
                    <button
                      type="button"
                      className="profile-video-toggle"
                      aria-label={hersheyVideoPlaying ? "Pause Hershey's video" : "Play Hershey's video"}
                      onClick={() => {
                        const video = hersheyVideoRef.current
                        if (!video) return
                        if (video.paused) {
                          video.play().catch(() => setHersheyVideoPlaying(false))
                        } else {
                          video.pause()
                        }
                      }}
                    >
                      {hersheyVideoPlaying ? (
                        <Pause size={15} strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <Play size={15} strokeWidth={2.5} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <div className="profile-hershey-connector">
                    <h3>Is Hershey the Underdog?</h3>
                    <ArrowRight size={25} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <figure className="profile-story-image">
                    <img
                      src="/images/charles-hershey-underdog-poster.jpg"
                      alt="A dog dressed as a superhero in a workshop"
                      loading="lazy"
                    />
                  </figure>
                </article>
                <article className="profile-story-chapter profile-story-chapter--vice">
                  <div className="profile-story-copy">
                    <h3>Vice Cosmetics ambassador?</h3>
                  </div>
                  <StoryPhotos photos={charlesVicePhotos} />
                </article>
                <article className="profile-story-chapter profile-yoga-chapter">
                  <StoryPhoto photo={charlesYogaPhotos[0]} />
                  <div className="profile-story-copy">
                    <h3>Yoga session?</h3>
                  </div>
                  <StoryPhoto photo={charlesYogaPhotos[1]} />
                </article>
                <article className="profile-story-chapter">
                  <div className="profile-story-copy">
                    <h3>Off to where sir?</h3>
                  </div>
                  <figure className="profile-story-photo profile-off-to-photo">
                    <img
                      src="/images/charles-off-to-where.jpg"
                      alt="A small dog riding in a red toy wagon"
                      loading="lazy"
                    />
                  </figure>
                </article>
                <article className="profile-story-chapter profile-sleepy-chapter">
                  <h3 className="profile-sleepy-title">Sleepy time</h3>
                  <div className="profile-sleepy-grid">
                    {charlesSleepyPhotos.map(({ src, alt }) => (
                      <figure key={src} className="profile-sleepy-photo">
                        <img src={src} alt={alt} loading="lazy" />
                      </figure>
                    ))}
                  </div>
                </article>
                <article className="profile-story-chapter profile-goodbye-chapter">
                  <h3 className="profile-goodbye-title">Good byee!</h3>
                  <figure className="profile-story-photo profile-goodbye-photo">
                    <img
                      src="/images/charles-goodbye.jpg"
                      alt="A close-up of a puppy looking at the camera"
                      loading="lazy"
                    />
                  </figure>
                </article>
              </div>
            </>
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
              {petPhotos
                ? "Meet the pets who share my life."
                : profile.slug === "charles"
                  ? "A few of the dogs who make every visit feel like home."
                  : "Add a photo and name for each pet."}
            </p>
          </div>

          <div
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            aria-label={
              petPhotos
                ? `${profile.name}'s pet gallery`
                : profile.slug === "charles"
                  ? "Charles's pet photos and placeholders"
                  : `${profile.name}'s pet photo placeholders`
            }
          >
            {featuredPetPhoto && (
              <div className="profile-pet-featured">
                <h3 className="profile-pet-featured-title">The Queen</h3>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={featuredPetPhoto.src}
                    alt={featuredPetPhoto.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pt-10 pb-3 text-center text-base font-semibold text-white">
                    {featuredPetPhoto.name}
                  </figcaption>
                </figure>
              </div>
            )}
            {galleryPetPhotos
              ? galleryPetPhotos.map(({ src, name, alt }) => (
                  <figure key={src} className="group relative aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={src}
                      alt={alt || name}
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
      {photos.map((photo) => <StoryPhoto key={photo.number} photo={photo} />)}
    </div>
  )
}

function StoryPhoto({ photo }) {
  const { number, src, alt, objectPosition } = photo

  return (
    <figure className="profile-story-photo">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="size-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <figcaption>{number}</figcaption>
    </figure>
  )
}
