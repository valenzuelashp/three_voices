export const palettes = [
  {
    id: "sage-cream",
    name: "Sage & cream",
    description: "Muted sage, warm ivory, and soft moss",
    swatches: ["#b9c9ad", "#e7e2d2", "#71876f"],
  },
  {
    id: "blush-lilac",
    name: "Blush & lilac",
    description: "Dusty rose, pale lavender, and warm white",
    swatches: ["#ddbcd0", "#c4b8e3", "#f5eff6"],
  },
  {
    id: "sky-sand",
    name: "Sky & sand",
    description: "Powder blue, soft teal, and warm beige",
    swatches: ["#a8c8d5", "#b4d2cc", "#e2d2b7"],
  },
  {
    id: "butter-peach",
    name: "Butter & peach",
    description: "Pale butter yellow, muted peach, and cream",
    swatches: ["#e8d79f", "#edc69f", "#f5eee0"],
  },
  {
    id: "pastel-colours",
    name: "Pastel colours",
    description: "Powder blue, mint, soft green, peach, and rose",
    swatches: ["#c7cde9", "#afe8d6", "#bcebdd", "#ddefc8", "#ffd8bd", "#ffb7b7"],
  },
]

export const defaultPalette = "blush-lilac"
export const paletteStorageKey = "three-voices-palette"

export function isPaletteId(value) {
  return palettes.some((palette) => palette.id === value)
}
