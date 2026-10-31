import React from 'react';

export default function EventsSection() {
  const dummyEvents = [
    { id: 1, name: "Web Dev Bootcamp", date: "15 Nov 2026", time: "10:00 AM", venue: "Room No. 100, UIET", club: "GDGC" },
    { id: 2, name: "Startup Pitch Desk", date: "18 Nov 2026", time: "02:00 PM", venue: "MV Sadan", club: "E-Cell" },
    { id: 3, name: "AutoCAD Workshop", date: "20 Nov 2026", time: "11:00 AM", venue: "Mechanical Block", club: "SAE" },
    { id: 4, name: "Circuit Design 101", date: "22 Nov 2026", time: "01:00 PM", venue: "Room No. 100, UIET", club: "Elektron" },
    { id: 5, name: "Genesis Ideathon", date: "25 Nov 2026", time: "09:30 AM", venue: "Main Campus", club: "Genesis" }
  ];

const EventCard = ({ event }) => (
  <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col gap-3">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-lg text-gray-800 leading-tight">{event.name}</h3>
      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap ml-2">
        {event.club}
      </span>
    </div>
    <div className="text-gray-600 text-sm flex flex-col gap-1.5 mt-auto">
      <div className="flex items-center gap-2">
        <span>📅</span> {event.date} • {event.time}
      </div>
      <div className="flex items-center gap-2">
        <span>📍</span> {event.venue}
      </div>
    </div>
  </div>
);

const EventsSection = () => {
  // To test the empty state, change this to: const events = [];
  const events = dummyEvents;

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Upcoming Events</h2>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-600">No upcoming events at the moment</h3>
          <p className="text-sm text-gray-500 mt-2">Check back later for updates from your campus clubs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default EventsSection;
