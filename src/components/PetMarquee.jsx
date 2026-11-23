import PetIcon from "./PetIcon"

const phrases = [
  "One Kind",
  "One shared voice",
  "They only have us",
  "Love them while they are here",
  "Have you seen me",
]

const icons = ["dog", "cat", "hamster", "bird", "rabbit", "fish"]

function Copy() {
  return (
    <p className="pet-marquee-copy">
      {phrases.map((phrase, index) => (
        <span key={phrase}>
          <PetIcon name={icons[index % icons.length]} />
          {phrase}
        </span>
      ))}
    </p>
  )
}

export default function PetMarquee() {
  return (
    <div className="pet-marquee pet-reveal" aria-hidden="true">
      <div className="pet-marquee-track">
        <Copy />
        <Copy />
      </div>
    </div>
  )
}
