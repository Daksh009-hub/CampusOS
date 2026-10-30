
import ClubCard from './ClubCard'

const clubs = [
  {
    name: 'GDGC',
    description: 'Technology, coding and developer events.',
  },
  {
    name: 'E-Cell',
    description: 'Entrepreneurship, startups and innovation.',
  },
  {
    name: 'SAE',
    description: 'Automotive engineering and practical projects.',
  },
  {
    name: 'Elektron',
    description: 'Electronics, technology and student activities.',
  },
  {
    name: 'Genesis',
    description: 'Student community and creative activities.',
  },
]

function ClubsSection() {
  return (
    <section id="clubs" className="py-10">
      <h2 className="text-3xl font-bold">
        Our Clubs
      </h2>

      <p className="mt-2 text-gray-600">
        Find a community that matches your interests.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <ClubCard
            key={club.name}
            name={club.name}
            description={club.description}
          />
        ))}
      </div>
    </section>
  )
}

export default ClubsSection
