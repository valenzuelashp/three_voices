import { Link } from "react-router-dom"
import ContactForm from "../components/ContactForm"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import { advocacyList } from "../data/site"
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
            Ways to help, and a note if you want to leave one.
          </h1>
          <p className="mt-4 text-[15px] leading-6 text-mist sm:mt-6 sm:text-lg sm:leading-8">
            Each portfolio ends with steps you can take. This page gathers them, then leaves room for a message. The
            form is a preview: it checks what you type, and it does not send anything.
          </p>
        </Container>
      </section>

      <section className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <Container className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {advocacyList.map((item, index) => (
            <Reveal key={item.slug} className="h-full" delay={index * 0.1}>
            <article
              style={{ "--accent": item.accent }}
              className="accent-card flex h-full flex-col rounded-2xl p-4 sm:rounded-3xl sm:p-6"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--accent)] uppercase">
                {item.member}
              </p>
              <h2 className="mt-2 font-display text-xl text-ink sm:text-2xl">{item.nav}</h2>
              <ol className="mt-6 flex-1 space-y-4">
                {item.help.map((step, index) => (
                  <li key={step.title} className="text-sm leading-6 text-mist">
                    <span className="font-semibold text-ink">
                      {index + 1}. {step.title}.
                    </span>{" "}
                    {step.text}
                  </li>
                ))}
              </ol>
              <Link to={item.path} className="mt-6 text-sm font-semibold text-ink">
                {`Read ${item.member}'s portfolio`}
              </Link>
            </article>
            </Reveal>
          ))}
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
              Use this when you want to respond to a portfolio or to the site itself. Nothing is emailed. When the
              group connects a form service, this page can send notes for real.
            </p>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  )
}
