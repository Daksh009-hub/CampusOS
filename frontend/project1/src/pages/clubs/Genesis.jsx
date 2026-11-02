import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Sparkles, Calendar, ArrowLeft, Mail, Globe, Dna } from 'lucide-react';

function Genesis() {
  const events = [
    { title: "Bioinformatics & Sequence Analysis Workshop", date: "Completed", desc: "Hands-on session using Python, BLAST, and Biopython for analyzing DNA and protein sequences." },
    { title: "CRISPR & Modern Gene Editing Symposium", date: "Completed", desc: "Guest expert talk series on genome editing tools and their application in biopharmaceuticals." },
    { title: "Bio-Innovate Ideation Hackathon", date: "Upcoming", desc: "Campus competition for pitching engineering solutions in bioprocessing, healthcare, and waste management." }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Introduction & Description */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400">
            <Dna size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Genesis — Biotechnology Society
          </h1>
          <p className="mx-auto max-w-3xl text-slate-400 leading-relaxed">
            Genesis is the official Biotechnology and Life Sciences Engineering Society at UIET Kurukshetra, bridging biological sciences with computational biology, bioprocessing, and bio-engineering.
          </p>
        </div>

        {/* Vision and Mission */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-3">
            <Target className="text-cyan-400" size={28} />
            <h2 className="text-xl font-bold">Our Vision</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              To establish UIET as a hub for biological engineering innovation, preparing students for high-impact biotechnology research and industrial bioprocessing.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-3">
            <Sparkles className="text-cyan-400" size={28} />
            <h2 className="text-xl font-bold">Our Mission</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Provide practical exposure to bioinformatics software, wet-lab skills, bioprocess scaling, and interdisciplinary bio-research.
            </p>
          </div>
        </div>

        {/* Events and Workshops */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Calendar className="text-cyan-400" size={22} /> Events & Workshops
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {events.map((ev, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{ev.date}</span>
                <h3 className="font-semibold text-lg text-white">{ev.title}</h3>
                <p className="text-sm text-slate-400">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Contact Genesis Biotech</h2>
          <div className="flex justify-center gap-6 text-slate-400 pt-2">
            <span className="flex items-center gap-2 text-sm"><Mail size={18} /> genesis.biotech@uiet.ac.in</span>
            <span className="flex items-center gap-2 text-sm"><Globe size={18} /> uiet.ac.in/biotech</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Genesis;
