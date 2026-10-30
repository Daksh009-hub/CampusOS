import React from 'react';

function ClubCard({ name, description }) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-xl font-bold">{name}</h3>

      <p className="mt-3 leading-6 text-gray-600">
        {description}
      </p>

      <a
        href="#events"
        className="mt-5 inline-block font-semibold text-blue-700 hover:text-blue-900"
      >
        View details →
      </a>
    </article>
  )
}

export default ClubCard
