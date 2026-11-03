export default function SectionTitle({ index, eyebrow, title, titleId, children }) {
  return (
    <div className="max-w-2xl">
      <p className="font-logo text-[10px] tracking-[0.14em] text-[color:var(--accent,#ddbcd0)] sm:text-[11px] sm:tracking-[0.28em]">
        {index} / {eyebrow}
      </p>
      <h2 id={titleId} className="mt-2 font-display text-2xl text-balance text-ink sm:mt-3 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {children ? <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">{children}</p> : null}
    </div>
  )
}
