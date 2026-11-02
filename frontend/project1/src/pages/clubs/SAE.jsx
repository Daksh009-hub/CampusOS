import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Trophy, Users, CalendarDays, Mail, Car, Wrench, Globe } from 'lucide-react';

function SAE() {
  const events = [
    { title: "AutoCAD & SolidWorks Workshop", desc: "Hands-on CAD modeling session for mechanical and vehicle framework design.", date: "Nov 2026" },
    { title: "Engine Assembly Masterclass", desc: "Interactive session covering IC engines, transmission systems, and tuning.", date: "Oct 2026" },
    { title: "BAJA Vehicle Design Review", desc: "Project presentation and feedback session with industry automotive experts.", date: "Sep 2026" }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Header / Hero */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
            <Car size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Society of Automotive Engineers (SAE)
          </h1>
          <p className="mx-auto max-w-3xl text-slate-400 text-base md:text-lg leading-relaxed">
            The collegiate chapter of SAE India at UIET Kurukshetra. Dedicated to hands-on automotive engineering, electric vehicle design, manufacturing, and national mobility competitions.
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
              To inspire student engineers to design, build, and test real-world vehicle prototypes, fostering expertise in mechanical design, CAD simulation, powertrain integration, and green mobility.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7 transition hover:border-purple-500/50">
            <div className="flex items-center gap-3 text-purple-400 mb-4">
              <Trophy size={26} />
              <h2 className="text-2xl font-bold text-white">Key Achievements</h2>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li>Designed and fabricated all-terrain vehicles (ATVs) for BAJA SAE.</li>
              <li>Hosted campus-wide CAD modeling & 3D prototyping challenges.</li>
              <li>Engineered electric kart prototypes in department workshops.</li>
            </ul>
          </div>
        </div>

        {/* Core Activities */}
        <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7">
          <div className="flex items-center gap-3 text-blue-400 mb-6">
            <Wrench size={26} />
            <h2 className="text-2xl font-bold text-white">Focus Areas</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Vehicle Dynamics</h3>
              <p className="text-xs text-slate-400 mt-1">Suspension tuning, chassis geometry, and braking analysis.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">EV Mobility</h3>
              <p className="text-xs text-slate-400 mt-1">Battery management, electric drivetrains, and motor controllers.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">3D CAD & FEA</h3>
              <p className="text-xs text-slate-400 mt-1">Structural stress analysis using SolidWorks and ANSYS.</p>
            </div>
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

        {/* Contact */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white">Connect With SAE UIET</h3>
          <p className="text-xs text-slate-400">Mechanical Engineering Block, UIET, Kurukshetra University</p>
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

export default SAE;
