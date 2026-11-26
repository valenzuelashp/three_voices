const runners = [
  { kind: "dog", position: 1 },
  { kind: "bird", position: 15 },
  { kind: "cat", position: 19 },
  { kind: "bird", position: 34 },
  { kind: "rabbit", position: 36 },
  { kind: "bird", position: 53 },
  { kind: "hamster", position: 56 },
  { kind: "dog", position: 71 },
  { kind: "bird", position: 85 },
  { kind: "cat", position: 88 },
]

const animalFrames = {
  dog: ["/images/profile-runner-dog-1.png", "/images/profile-runner-dog-2.png"],
  cat: ["/images/profile-runner-cat-1.png", "/images/profile-runner-cat-2.png"],
  rabbit: ["/images/profile-runner-rabbit-1.png", "/images/profile-runner-rabbit-2.png"],
}

const stillSilhouettes = {
  bird: "/images/profile-runner-bird.png",
  hamster: "/images/profile-runner-green.png",
}

function RunnerArt({ kind }) {
  const frames = animalFrames[kind]

  if (frames) {
    return (
      <span className="profile-pet-runner__frame-stack">
        {frames.map((src, index) => (
          <img
            key={src}
            className={`profile-pet-runner__frame profile-pet-runner__frame--${index + 1}`}
            src={src}
            alt=""
            draggable="false"
          />
        ))}
      </span>
    )
  }

  return (
    <img
      className={`profile-pet-runner__art profile-pet-runner__art--${kind}`}
      src={stillSilhouettes[kind]}
      alt=""
      draggable="false"
    />
  )
}

export default function ProfilePetRail() {
  return (
    <aside className="profile-pet-rail" aria-hidden="true">
      <div className="profile-pet-track">
        {[0, 1].map((sequence) => (
          <div
            key={sequence}
            className={`profile-pet-sequence${sequence ? " is-copy" : ""}`}
          >
            {runners.map(({ kind, position }, index) => (
              <span
                key={`${kind}-${index}`}
                className={`profile-pet-runner profile-pet-runner--${kind}`}
                style={{ "--runner-top": `${position}%` }}
              >
                <RunnerArt kind={kind} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </aside>
  )
}
