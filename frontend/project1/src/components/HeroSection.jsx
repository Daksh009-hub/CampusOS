import React from 'react';
function HeroSection() {
  return (
    <section
      id="home"
      className="py-16 text-center sm:py-24"
    >
      <p className="mb-3 font-semibold text-blue-700">
        UIET STUDENT COMMUNITY
      </p>

      <h1 className="text-4xl font-bold sm:text-5xl">
        Welcome to CampusOS
      </h1>

      <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">
        Discover student clubs, explore campus events and connect
        with communities—all in one place.
      </p>

      <a
        href="#clubs"
        className="mt-7 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
      >
        Explore Clubs
      </a>
    </section>
  )
}

export default HeroSection
