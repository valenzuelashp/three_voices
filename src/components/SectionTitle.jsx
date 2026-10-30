export default function SectionTitle({ index, eyebrow, title, titleId, children }) {
  return (
    <div className="max-w-2xl">
      <p className="font-logo text-[11px] tracking-[0.28em] text-[color:var(--accent,#a78bfa)]">
        {index} / {eyebrow}
      </p>
      <h2 id={titleId} className="mt-3 font-display text-3xl text-balance text-ink sm:text-4xl">
        {title}
      </h2>
      {children ? <p className="mt-4 leading-7 text-mist">{children}</p> : null}
    </div>
  )
}
