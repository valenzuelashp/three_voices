import { Link } from "react-router-dom"
import Container from "../components/Container"
import SectionTitle from "../components/SectionTitle"
import SourcesList from "../components/SourcesList"
import { advocacies, advocacyList, sourcesFor } from "../data/site"
import usePageTitle from "../usePageTitle"
import NotFound from "./NotFound"

export default function Portfolio({ slug }) {
  const item = advocacies[slug]
  usePageTitle(item ? `${item.member} · ${item.title} · Three Voices` : "Page not found · Three Voices")

  if (!item) return <NotFound />

  const others = advocacyList.filter((entry) => entry.slug !== item.slug)

  return (
    <div style={{ "--accent": item.accent }}>
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-logo text-[11px] tracking-[0.28em] text-[color:var(--accent)]">{item.hero.kicker}</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] font-semibold text-balance text-ink sm:text-6xl">
              {item.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-mist">{item.hero.lede}</p>
            <p className="mt-4 text-sm font-medium text-ink">
              {item.member} · {item.title}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
            <img
              src={item.hero.image}
              alt={item.hero.imageAlt}
              fetchPriority="high"
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover sm:aspect-[5/4]"
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20" aria-labelledby="about-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle index="01" eyebrow="About" title={item.about.title} titleId="about-title" />
          <div className="max-w-2xl space-y-5">
            {item.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-mist">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section id="issues" className="border-t border-white/10 py-20">
        <Container>
          <SectionTitle index="02" eyebrow="Evidence" title="Issues and impact">
            Each figure names the report it comes from. The full links are at the bottom of this page.
          </SectionTitle>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {item.issues.map((issue) => (
              <article key={issue.title} className="accent-card flex h-full flex-col overflow-hidden rounded-3xl">
                {issue.image ? (
                  <img src={issue.image} alt={issue.imageAlt} className="h-52 w-full object-cover" />
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  {issue.stat ? (
                    <>
                      <p className="font-display text-4xl text-[color:var(--accent)]">{issue.stat}</p>
                      <p className="mt-2 text-sm leading-6 text-mist">{issue.statLabel}</p>
                    </>
                  ) : null}
                  <h3 className="mt-5 font-display text-xl text-ink">{issue.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-mist">{issue.text}</p>
                  <p className="mt-5 text-xs tracking-wide text-ink/80">Source: {issue.source}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="help" className="border-t border-white/10 py-20">
        <Container className={`grid gap-10 ${item.helpImage ? "lg:grid-cols-[1.15fr_0.85fr]" : ""}`}>
          <div>
            <SectionTitle index="03" eyebrow="Action" title="How to help">
              Pick one step you can keep. A finished action is worth more than a long list you only read.
            </SectionTitle>
            <ol className="mt-10 space-y-6">
              {item.help.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-logo text-xs tracking-[0.18em] text-[color:var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{step.title}</h3>
                    <p className="mt-2 leading-7 text-mist">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {item.helpImage ? (
            <figure>
              <img src={item.helpImage.src} alt={item.helpImage.alt} className="w-full rounded-[2rem] object-cover" />
              <figcaption className="mt-4 text-sm leading-6 text-mist">{item.helpImage.caption}</figcaption>
            </figure>
          ) : null}
        </Container>
      </section>

      <section className="border-t border-white/10 py-20">
        <Container className="max-w-3xl">
          <SectionTitle index="04" eyebrow="Reflection" title={`A note from ${item.member}`} />
          <blockquote className="mt-8 border-l-2 border-[color:var(--accent)] pl-5 text-lg leading-8 text-ink">
            {item.reflection}
          </blockquote>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink">The other voices</h2>
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
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink">Sources for this page</h2>
            <div className="mt-6">
              <SourcesList items={sourcesFor(item.sourceIds)} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
