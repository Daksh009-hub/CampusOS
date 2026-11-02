import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Trophy, Users, CalendarDays, Mail, Sparkles, Lightbulb } from 'lucide-react';

function Genesis() {
  const events = [
    { title: "Genesis Ideathon", desc: "Inter-department ideation event encouraging student project pitches.", date: "Nov 2026" },
    { title: "UI/UX & Design Thinking Workshop", desc: "Interactive masterclass on user experience, Figma prototyping, and product design.", date: "Oct 2026" },
    { title: "Public Speaking & Pitching Session", desc: "Confidence-building workshop for stage presence and elevator pitches.", date: "Sep 2026" }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Header / Hero */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
            <Sparkles size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Genesis Society
          </h1>
          <p className="mx-auto max-w-3xl text-slate-400 text-base md:text-lg leading-relaxed">
            The creative, cultural, and multi-disciplinary student community at UIET Kurukshetra. Blending technology, design, soft skills, and creative innovation under one umbrella.
          </p>
        </div>

        {/* Vision & Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7 transition hover:border-cyan-500/50">
            <div className="flex items-center gap-3 text-cyan-400 mb-4">
              <Target size={26} />
              <h2 className="text-2xl font-bold text-white">Vision & Objectives</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              To nurture well-rounded engineering graduates by providing a platform for creative writing, digital media design, event management, leadership, and interdisciplinary collaboration.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7 transition hover:border-purple-500/50">
            <div className="flex items-center gap-3 text-purple-400 mb-4">
              <Trophy size={26} />
              <h2 className="text-2xl font-bold text-white">Key Achievements</h2>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li>Organized campus ideathons and creative design hackathons.</li>
              <li>Hosted department cultural showcase & student orientation activities.</li>
              <li>Published student technical articles and creative campus newsletters.</li>
            </ul>
          </div>
        </div>

        {/* Core Wings */}
        <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7">
          <div className="flex items-center gap-3 text-blue-400 mb-6">
            <Lightbulb size={26} />
            <h2 className="text-2xl font-bold text-white">Creative Wings</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Design & Media</h3>
              <p className="text-xs text-slate-400 mt-1">Graphic design, video editing, and campus media branding.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Literary & Public Speaking</h3>
              <p className="text-xs text-slate-400 mt-1">Debates, panel discussions, and pitch presentations.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Event Management</h3>
              <p className="text-xs text-slate-400 mt-1">Coordinating departmental workshops, fests, and student meets.</p>
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7">
          <div className="flex items-center gap-3 text-cyan-400 mb-6">
            <CalendarDays size={26} />
            <h2 className="text-2xl font-bold text-white">Workshops & Events</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {events.map((event, idx) => (
              <div key={idx} className="rounded-xl border border-slate-800 bg-[#080D1C] p-5">
                <span className="text-xs text-cyan-400 font-semibold">{event.date}</span>
                <h3 className="text-base font-bold text-white mt-1">{event.title}</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white">Connect With Genesis</h3>
          <p className="text-xs text-slate-400">Main Campus, UIET Kurukshetra University</p>
          <div className="flex gap-6 text-slate-400">
            <a href="mailto:director.uiet@kuk.ac.in" className="hover:text-purple-400 transition" title="Email">
              <Mail size={22} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition" title="Instagram">
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Genesis;
