import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Trophy, Users, Mail, Car, Wrench, Globe, ArrowLeft } from 'lucide-react';

function SAE() {
  const domains = [
    { title: "Automotive Design", desc: "Vehicle dynamics, chassis modeling, and CAD analysis." },
    { title: "EV Mobility", desc: "Electric powertrain design, battery management, and motor controllers." },
    { title: "Manufacturing & Fabrication", desc: "Hands-on welding, machining, and prototype assembly." },
    { title: "Aerodynamics", desc: "CFD analysis and aerodynamic efficiency optimization." }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Navigation Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-white transition">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400">
            <Car size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Society of Automotive Engineers (SAE)
          </h1>
          <p className="mx-auto max-w-2xl text-slate-400">
            Designing, building, and racing high-performance vehicles while driving innovation in mobility engineering.
          </p>
        </div>

        {/* Vision & Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Target className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Our Mission</h3>
            <p className="text-sm text-slate-400">Promoting hands-on mobility engineering through practical vehicle projects and national competitions.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Trophy className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Achievements</h3>
            <p className="text-sm text-slate-400">Consistent participants and award winners in national Supra SAE and BAJA competitions.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Users className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Community</h3>
            <p className="text-sm text-slate-400">A passionate team of mechanical, electrical, and computer science students.</p>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Wrench className="text-cyan-400" size={22} /> Key Focus Areas
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {domains.map((domain, index) => (
              <div key={index} className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2 hover:border-cyan-500/40 transition">
                <h3 className="font-semibold text-lg text-cyan-400">{domain.title}</h3>
                <p className="text-sm text-slate-400">{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Connect with SAE UIET</h2>
          <p className="text-sm text-slate-400">Interested in automotive innovation or joining the team?</p>
          <div className="flex justify-center gap-6 text-slate-400 pt-2">
            <span className="flex items-center gap-2 text-sm"><Mail size={18} /> sae@uiet.ac.in</span>
            <span className="flex items-center gap-2 text-sm"><Globe size={18} /> uiet.ac.in/sae</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SAE;
