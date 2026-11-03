import { Link } from "react-router-dom"
import ContactForm from "../components/ContactForm"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import usePageTitle from "../usePageTitle"

export default function GetInvolved() {
  usePageTitle("Get involved · Three Voices")

  return (
    <>
      <section className="py-10 sm:py-16 lg:py-24">
        <Container className="max-w-3xl">
          <p className="font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.28em]">
            TAKE PART
          </p>
          <h1 className="mt-3 font-display text-[1.7rem] leading-[1.15] font-semibold text-balance text-ink sm:mt-4 sm:text-5xl sm:leading-tight lg:text-6xl">
            Get involved in animal welfare.
          </h1>
          <p className="mt-4 text-[15px] leading-6 text-mist sm:mt-6 sm:text-lg sm:leading-8">
            Our group shares one advocacy: supporting the care and protection of animals. Leave us a note about the
            cause or one of our profiles. This form is a preview and does not send anything.
          </p>
        </Container>
      </section>

      <section className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Container>
          <Reveal>
            <article
              style={{ "--accent": "var(--color-animals)" }}
              className="accent-card max-w-3xl rounded-2xl p-5 sm:rounded-3xl sm:p-8"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--accent)] uppercase">OUR CAUSE</p>
              <h2 className="mt-2 font-display text-xl text-ink sm:text-2xl">One group, one animal advocacy</h2>
              <p className="mt-3 text-sm leading-7 text-mist sm:text-base">
                We want to encourage compassion, responsible care, and protection for animals.
              </p>
              <Link to="/#advocacy" className="mt-5 inline-flex text-sm font-semibold text-ink">
                Learn about our cause
              </Link>
            </article>
          </Reveal>
        </Container>
      </section>

      <section id="note" className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.28em]">
              CONTACT
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:mt-3 sm:text-3xl lg:text-4xl">Leave a note</h2>
            <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">
              Use this when you want to respond to our animal advocacy or to the site itself. Nothing is emailed. When the
              group connects a form service, this page can send notes for real.
            </p>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  )
}
