import { motion, useReducedMotion } from "motion/react"
import { Link } from "react-router-dom"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import SectionTitle from "../components/SectionTitle"
import SourcesList from "../components/SourcesList"
import { advocacies, advocacyList, sourcesFor } from "../data/site"
import usePageTitle from "../usePageTitle"
import NotFound from "./NotFound"

export default function Portfolio({ slug }) {
  const item = advocacies[slug]
  const reduce = useReducedMotion()
  usePageTitle(item ? `${item.member} · ${item.title} · Three Voices` : "Page not found · Three Voices")

  if (!item) return <NotFound />

  const others = advocacyList.filter((entry) => entry.slug !== item.slug)

  return (
    <div style={{ "--accent": item.accent }}>
      <section className="py-10 sm:py-16 lg:py-24">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="font-logo text-[10px] tracking-[0.14em] text-[color:var(--accent)] sm:text-[11px] sm:tracking-[0.28em]">
              {item.hero.kicker}
            </p>
            <h1 className="mt-3 font-display text-[1.7rem] leading-[1.15] font-semibold text-balance text-ink sm:mt-4 sm:text-5xl sm:leading-[1.08] lg:text-6xl">
              {item.hero.headline}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-6 text-mist sm:mt-6 sm:text-lg sm:leading-8">{item.hero.lede}</p>
            <p className="mt-3 text-sm font-medium text-ink sm:mt-4">
              {item.member} · {item.title}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <a href="#issues" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space">
                See the issues
              </a>
              <a href="#help" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-ink">
                How to help
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2rem] blur-2xl"
              style={{ background: item.accent, opacity: 0.18 }}
              aria-hidden="true"
            />
            <motion.img
              src={item.hero.image}
              alt={item.hero.imageAlt}
              fetchPriority="high"
              className="relative aspect-[3/2] w-full rounded-2xl object-cover sm:aspect-[5/4] sm:rounded-[2rem] lg:aspect-[4/5]"
              initial={reduce ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-12 sm:py-16 lg:py-20" aria-labelledby="about-title">
        <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle index="01" eyebrow="About" title={item.about.title} titleId="about-title" />
          <div className="max-w-2xl space-y-4 sm:space-y-5">
            {item.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-7 text-mist sm:text-base sm:leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section id="issues" className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionTitle index="02" eyebrow="Evidence" title="Issues and impact">
            Each figure names the report it comes from. The full links are at the bottom of this page.
          </SectionTitle>
          <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
            {item.issues.map((issue, index) => (
              <Reveal key={issue.title} className="h-full" delay={index * 0.08}>
              <article className="accent-card flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl">
                {issue.image ? (
                  <img src={issue.image} alt={issue.imageAlt} className="h-40 w-full object-cover sm:h-52" />
                ) : null}
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  {issue.stat ? (
                    <>
                      <p className="font-display text-[1.65rem] leading-tight text-[color:var(--accent)] sm:text-4xl">
                        {issue.stat}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-mist">{issue.statLabel}</p>
                    </>
                  ) : null}
                  <h3 className="mt-4 font-display text-lg text-ink sm:mt-5 sm:text-xl">{issue.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-mist">{issue.text}</p>
                  <p className="mt-5 text-xs tracking-wide text-ink/80">Source: {issue.source}</p>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="help" className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Container className={`grid gap-8 sm:gap-10 ${item.helpImage ? "lg:grid-cols-[1.15fr_0.85fr]" : ""}`}>
          <div>
            <SectionTitle index="03" eyebrow="Action" title="How to help">
              Pick one step you can keep. A finished action is worth more than a long list you only read.
            </SectionTitle>
            <ol className="mt-6 space-y-5 sm:mt-10 sm:space-y-6">
              {item.help.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-3 sm:gap-4">
                  <span className="font-logo text-[10px] tracking-[0.14em] text-[color:var(--accent)] sm:text-xs sm:tracking-[0.18em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink sm:text-xl">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-mist sm:mt-2 sm:text-base sm:leading-7">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {item.helpImage ? (
            <figure>
              <img
                src={item.helpImage.src}
                alt={item.helpImage.alt}
                className="aspect-[3/2] w-full rounded-2xl object-cover sm:aspect-auto sm:rounded-[2rem]"
              />
              <figcaption className="mt-4 text-sm leading-6 text-mist">{item.helpImage.caption}</figcaption>
            </figure>
          ) : null}
        </Container>
      </section>

      <section className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Reveal>
        <Container className="max-w-3xl">
          <SectionTitle index="04" eyebrow="Reflection" title={`A note from ${item.member}`} />
          <blockquote className="mt-5 border-l-2 border-[color:var(--accent)] pl-4 text-base leading-7 text-ink sm:mt-8 sm:pl-5 sm:text-lg sm:leading-8">
            {item.reflection}
          </blockquote>
        </Container>
        </Reveal>
      </section>

      <section className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Container className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl text-ink sm:text-2xl">The other voices</h2>
            <div className="mt-6 grid gap-4">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  to={other.path}
                  style={{ "--accent": other.accent }}
                  className="accent-card rounded-2xl p-5"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--accent)] uppercase">
                    {other.member}
                  </p>
                  <p className="mt-2 font-display text-xl text-ink">{other.title}</p>
                  <p className="mt-2 text-sm leading-6 text-mist">{other.summary}</p>
                </Link>
              ))}
            </div>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space"
            >
              Homepage
            </Link>
          </div>
          <div>
            <h2 className="font-display text-xl text-ink sm:text-2xl">Sources for this page</h2>
            <div className="mt-6">
              <SourcesList items={sourcesFor(item.sourceIds)} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
