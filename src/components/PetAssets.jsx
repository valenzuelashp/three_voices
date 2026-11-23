import PetIcon from "./PetIcon"

const rowPets = ["dog", "cat", "hamster", "bird", "rabbit", "fish"]
const stampPets = ["dog", "cat", "hamster"]

export default function PetAssets({ variant = "row" }) {
  const names = variant === "row" ? rowPets : stampPets

  if (variant === "row") {
    return (
      <ul className="pet-row" aria-hidden="true">
        {names.map((name) => (
          <li key={name} className={`pet-badge pet-badge-${name}`}>
            <PetIcon name={name} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="pet-assets" aria-hidden="true">
      {names.map((name) => (
        <span key={name} className={`pet-badge pet-badge-${name} pet-stamp`}>
          <PetIcon name={name} />
        </span>
      ))}
    </div>
  )
}
