import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Trophy, Users, CalendarDays, Mail, Globe, Rocket, Sparkles } from 'lucide-react';

function Ecell() {
  const pillars = [
    { title: "Ideate", desc: "Identify key societal and industry problems to brainstorm innovative solutions." },
    { title: "Innovate", desc: "Convert creative ideas into viable business models with expert mentorship." },
    { title: "Incubate", desc: "Gain access to seed funding, investor networks, and incubation facilities." }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Header / Hero */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
            <Rocket size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Entrepreneurship Cell (E-Cell)
          </h1>
          <blockquote className="italic text-slate-300 text-lg max-w-2xl mx-auto">
            “Identify your Problems and put in energy to accomplish Solutions.”
          </blockquote>
          <p className="mx-auto max-w-3xl text-slate-400 text-base md:text-lg leading-relaxed">
            Supporting and fostering the entrepreneurial spirit among student innovators at UIET Kurukshetra. We provide a bridge between student startups, mentors, angel investors, and incubation centers.
          </p>
        </div>

        {/* Pillars Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 transition hover:border-cyan-500/50">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">{pillar.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Vision & Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7">
            <div className="flex items-center gap-3 text-cyan-400 mb-4">
              <Target size={26} />
              <h2 className="text-2xl font-bold text-white">Vision & Objectives</h2>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li>Monetary & incubation support via Community Incubation Centre (CIC).</li>
              <li>Mentorship sessions with successful founders and venture capitalists.</li>
              <li>Guidance on pitch decks and business model validation.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7">
            <div className="flex items-center gap-3 text-purple-400 mb-4">
              <Trophy size={26} />
              <h2 className="text-2xl font-bold text-white">Key Achievements</h2>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li>Organized E-Summit featuring the Big Brand Theory pitch competition.</li>
              <li>Facilitated Community Incubation Centre (CIC) startup entries.</li>
              <li>Connected student innovators with National Entrepreneurship networks.</li>
            </ul>
          </div>
        </div>

        {/* Leadership & Faculty Section */}
        <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7">
          <div className="flex items-center gap-3 text-blue-400 mb-6">
            <Users size={26} />
            <h2 className="text-2xl font-bold text-white">Faculty Mentors & Leadership</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Prof. Sunil Dhingra</h3>
              <p className="text-xs text-cyan-400 mt-1">Director, UIET & Head, IIC</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Dr. Vishal Ahlawat</h3>
              <p className="text-xs text-cyan-400 mt-1">IIC President & Coordinator, CIC</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white">Connect With E-Cell UIET</h3>
          <p className="text-xs text-slate-400">E-Cell Office, Room No. 1, A Block, UIET, Kurukshetra</p>
          <div className="flex gap-6 text-slate-400">
            <a href="https://ecelluietkuk.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition" title="Website">
              <Globe size={22} />
            </a>
            <a href="mailto:ecelluiet@kuk.ac.in" className="hover:text-purple-400 transition" title="Email">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Ecell;
