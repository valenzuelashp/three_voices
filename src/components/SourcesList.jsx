export default function SourcesList({ items }) {
  if (!items.length) return null

  return (
    <ul className="space-y-2">
      {items.map((source) => (
        <li key={source.id}>
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-mist underline decoration-white/20 underline-offset-4 hover:text-ink"
          >
            {source.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
