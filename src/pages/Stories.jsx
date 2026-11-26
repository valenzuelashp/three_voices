import AdvocacyCard from "../components/AdvocacyCard"
import Container from "../components/Container"
import PetAssets from "../components/PetAssets"
import { profiles } from "../data/site"
import usePageTitle from "../usePageTitle"

export default function Stories() {
  usePageTitle("Stories · One Kind")

  return (
    <section
      id="profiles"
      className="home-paper-section home-sheet home-sheet-advocacy py-12 sm:py-16 lg:py-20"
      aria-labelledby="profiles-title"
    >
      <div className="pattern-field" aria-hidden="true">
        <span className="pattern-dogs" />
        <span className="pattern-cats" />
      </div>
      <PetAssets variant="stamps" />
      <Container>
        <div className="home-voices">
          <div className="home-voices-heading">
            <p className="journal-chapter">The People</p>
            <p className="home-index">
              <span>05</span>
              The people behind the cause
            </p>
            <h1 id="profiles-title" className="home-display home-display-small">
              Three voices, one advocacy.
            </h1>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {profiles.map((profile, index) => (
              <AdvocacyCard key={profile.slug} item={profile} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
