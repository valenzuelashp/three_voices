function Glyph({ children }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

const hole = "var(--pet-icon-hole, #fff)"

const glyphs = {
  dog: (
    <Glyph>
      <path fill="currentColor" d="M8 29c1-2 4-4 7-3 0 0 1 3 4 3 6 0 12-4 14-9 1 0 4 1 5 4 1 4-1 8-5 10-1 5-4 8-9 8h-2c-3 0-6-2-7-5-4 1-8 0-7-8z" />
      <circle cx="33" cy="16" r="7" fill="currentColor" />
      <path fill="currentColor" d="M28 12 26 4l8 8z" />
      <ellipse cx="39" cy="17" rx="3.4" ry="2.3" fill="currentColor" />
      <rect x="20" y="36" width="3.4" height="8" rx="1.6" fill="currentColor" />
      <rect x="14" y="35" width="3.4" height="7" rx="1.6" fill="currentColor" />
      <circle cx="35.2" cy="15.2" r="1.3" fill={hole} />
    </Glyph>
  ),
  cat: (
    <Glyph>
      <circle cx="24" cy="28" r="13" fill="currentColor" />
      <path fill="currentColor" d="M12 24 6 8l12 10zM36 24 42 8 30 18z" />
      <circle cx="19" cy="28" r="1.8" fill={hole} />
      <circle cx="29" cy="28" r="1.8" fill={hole} />
      <path fill={hole} d="M24 31.2 22.2 34h3.6z" />
    </Glyph>
  ),
  hamster: (
    <Glyph>
      <ellipse cx="24" cy="28" rx="14" ry="12" fill="currentColor" />
      <circle cx="13" cy="16" r="4.2" fill="currentColor" />
      <circle cx="35" cy="16" r="4.2" fill="currentColor" />
      <circle cx="18.5" cy="27" r="1.6" fill={hole} />
      <circle cx="29.5" cy="27" r="1.6" fill={hole} />
      <ellipse cx="24" cy="31.5" rx="2.2" ry="1.5" fill={hole} />
    </Glyph>
  ),
  bird: (
    <Glyph>
      <ellipse cx="27" cy="26" rx="13" ry="9" fill="currentColor" />
      <path fill="currentColor" d="M12 24c4-3 8-2 10 1-4 1-8 2-10 5-2-1-3-4 0-6z" />
      <path fill="currentColor" d="M36 23h8l-6 4z" />
      <path fill="currentColor" d="M24 34v6M20 40h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="33" cy="24" r="1.5" fill={hole} />
    </Glyph>
  ),
  rabbit: (
    <Glyph>
      <ellipse cx="18" cy="16" rx="3.4" ry="11" fill="currentColor" />
      <ellipse cx="28" cy="16" rx="3.4" ry="11" fill="currentColor" />
      <circle cx="23" cy="31" r="12" fill="currentColor" />
      <circle cx="19" cy="30" r="1.6" fill={hole} />
      <circle cx="27" cy="30" r="1.6" fill={hole} />
    </Glyph>
  ),
  fish: (
    <Glyph>
      <ellipse cx="27" cy="24" rx="14" ry="9" fill="currentColor" />
      <path fill="currentColor" d="M12 24 3 15v18z" />
      <circle cx="34" cy="22" r="1.6" fill={hole} />
    </Glyph>
  ),
}

export default function PetIcon({ name }) {
  return glyphs[name] ?? null
}
