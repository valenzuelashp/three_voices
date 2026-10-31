import { useState } from "react"
import { advocacyList } from "../data/site"

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ink placeholder:text-mist/50"

const empty = { name: "", email: "", subject: "", message: "" }

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#FCA5A5]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function validate(next) {
    const result = {}
    if (next.name.trim().length < 2) result.name = "Enter your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) {
      result.email = "Enter an email address like name@email.com."
    }
    if (!next.subject) result.subject = "Choose which voice this note is about."
    if (next.message.trim().length < 12) result.message = "Write at least a sentence."
    return result
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const first = ["name", "email", "subject", "message"].find((key) => nextErrors[key])
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    setDone({
      name: values.name.trim(),
      subject: values.subject,
      message: values.message.trim(),
    })
    setValues(empty)
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-8">
        <p className="font-logo text-[10px] tracking-[0.14em] text-galaxy sm:text-[11px] sm:tracking-[0.28em]">PREVIEW</p>
        <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">Thanks, {done.name}.</h3>
        <p className="mt-4 leading-7 text-mist">
          This form does not send email or save your note on a server. It stays in this browser until you leave the
          page.
        </p>
        <p className="mt-6 text-sm text-mist">About: {done.subject}</p>
        <blockquote className="mt-3 border-l-2 border-galaxy pl-4 leading-7 text-ink">{done.message}</blockquote>
        <button
          type="button"
          onClick={() => setDone(null)}
          className="mt-8 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-ink"
        >
          Write another note
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:space-y-5 sm:rounded-3xl sm:p-8">
      <Field id="name" label="Name" error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={update}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={update}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field id="subject" label="This note is about" error={errors.subject}>
        <select
          id="subject"
          name="subject"
          value={values.subject}
          onChange={update}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClass}
        >
          <option value="">Choose a voice</option>
          {advocacyList.map((item) => (
            <option key={item.slug} value={`${item.nav} — ${item.member}`}>
              {item.nav} — {item.member}
            </option>
          ))}
          <option value="The website">The website</option>
        </select>
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass}
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-space">
          Send a note
        </button>
        <p className="text-sm text-mist">This preview does not deliver messages.</p>
      </div>
    </form>
  )
}
