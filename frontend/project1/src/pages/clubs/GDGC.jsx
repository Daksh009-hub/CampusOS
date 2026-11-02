import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Trophy, Users, CalendarDays, Mail, Globe, Sparkles, Code2 } from 'lucide-react';

function GDGC() {
  const events = [
    { title: "Web Dev Bootcamp", desc: "Hands-on workshop covering modern frontend development with React & Tailwind CSS.", date: "Nov 2026" },
    { title: "Google Cloud Arcade Study Jams", desc: "Interactive lab sessions on GCP services, BigQuery, and Cloud IAM.", date: "Oct 2026" },
    { title: "Gen AI Hackathon & Codelabs", desc: "Building AI-driven applications with Google Gemini API.", date: "Sep 2026" }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Header / Hero */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
            <Code2 size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Google Developer Group on Campus
          </h1>
          <p className="mx-auto max-w-3xl text-slate-400 text-base md:text-lg leading-relaxed">
            A vibrant student-led technical community empowering engineers at UIET Kurukshetra through hands-on learning, Google Cloud certifications, open-source projects, and developer workshops.
          </p>
        </div>

        {/* Vision & Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7 transition hover:border-cyan-500/50">
            <div className="flex items-center gap-3 text-cyan-400 mb-4">
              <Target size={26} />
              <h2 className="text-2xl font-bold text-white">Vision & Mission</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              To bridge the gap between academic theory and real-world software engineering. We focus on fostering developer skills in Web Development, Artificial Intelligence, Mobile Apps, and Cloud Infrastructure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7 transition hover:border-purple-500/50">
            <div className="flex items-center gap-3 text-purple-400 mb-4">
              <Trophy size={26} />
              <h2 className="text-2xl font-bold text-white">Key Achievements</h2>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li>Organized Google Cloud Arcade Facilitator program cohorts.</li>
              <li>Hosted campus-wide ideathons & Gen AI codelabs.</li>
              <li>Built collaborative open-source campus platforms.</li>
            </ul>
          </div>
        </div>

        {/* Events Section */}
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

        {/* Contact & Official Links */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white">Connect With GDGC UIET</h3>
          <div className="flex gap-6 text-slate-400">
            <a href="https://gdg.community.dev/gdg-on-campus-university-institute-of-engineering-and-technology-kurukshetra-university-kurukshetra-india/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition" title="GDG Portal">
              <Globe size={22} />
            </a>
            <a href="mailto:director.uiet@kuk.ac.in" className="hover:text-purple-400 transition" title="Email">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GDGC;
