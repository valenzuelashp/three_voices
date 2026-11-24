export default function PawMark({ kind = "dog", size = 24, className = "" }) {
  if (kind === "cat") {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M18 28 6 8 24 22zM38 14 41-2 50 13zM57 13 67-2 72 14zM78 26 98 10 86 34z" />
        <ellipse cx="28" cy="36" rx="11" ry="14" fill="currentColor" transform="rotate(-24 28 36)" />
        <ellipse cx="45" cy="22" rx="10" ry="13" fill="currentColor" transform="rotate(-6 45 22)" />
        <ellipse cx="64" cy="21" rx="10" ry="13" fill="currentColor" transform="rotate(8 64 21)" />
        <ellipse cx="81" cy="35" rx="11" ry="14" fill="currentColor" transform="rotate(24 81 35)" />
        <path fill="currentColor" d="M36 52C22 54 14 68 20 82C26 94 42 100 54 96C66 100 82 94 88 82C94 68 86 54 72 52C66 60 60 64 54 62C48 64 42 60 36 52Z" />
      </svg>
    )
  }

  if (kind === "rabbit") {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <ellipse cx="32" cy="52" rx="16" ry="34" fill="currentColor" transform="rotate(-8 32 52)" />
        <ellipse cx="66" cy="50" rx="16" ry="34" fill="currentColor" transform="rotate(8 66 50)" />
      </svg>
    )
  }

  if (kind === "bird") {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M46 52 16 16l10-6 16 28 2-30h10l-2 32 22-24 8 8-26 22 4 28-12-2z" />
      </svg>
    )
  }

  if (kind === "fish") {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M10 40c24-22 54-22 80 0-26-10-54-10-80 0zM10 60c24 22 54 22 80 0-26 10-54 10-80 0z" />
      </svg>
    )
  }

  if (kind === "claw") {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M18 36 26 12l9 24zM38 26l8-18 9 20zM60 24l9-18 8 20zM78 36l12-16 6 20z" />
        <ellipse cx="28" cy="48" rx="11" ry="13" fill="currentColor" transform="rotate(-18 28 48)" />
        <ellipse cx="46" cy="40" rx="10" ry="12" fill="currentColor" />
        <ellipse cx="66" cy="38" rx="10" ry="12" fill="currentColor" />
        <ellipse cx="84" cy="48" rx="10" ry="12" fill="currentColor" transform="rotate(16 84 48)" />
        <path fill="currentColor" d="M30 60c-14 2-22 14-16 28 5 12 20 18 34 14 14 4 30-4 32-18 2-12-8-20-18-18-2 6-8 10-14 8-6-1-12-6-18-14z" />
      </svg>
    )
  }

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <ellipse cx="28" cy="36" rx="11" ry="14" fill="currentColor" transform="rotate(-24 28 36)" />
      <ellipse cx="45" cy="22" rx="10" ry="13" fill="currentColor" transform="rotate(-6 45 22)" />
      <ellipse cx="64" cy="21" rx="10" ry="13" fill="currentColor" transform="rotate(8 64 21)" />
      <ellipse cx="81" cy="35" rx="11" ry="14" fill="currentColor" transform="rotate(24 81 35)" />
      <path fill="currentColor" d="M36 52C22 54 14 68 20 82C26 94 42 100 54 96C66 100 82 94 88 82C94 68 86 54 72 52C66 60 60 64 54 62C48 64 42 60 36 52Z" />
    </svg>
  )
}
