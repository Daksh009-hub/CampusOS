import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Trophy, Users, Mail, Sparkles, Lightbulb, Globe, ArrowLeft } from 'lucide-react';

function Genesis() {
  const domains = [
    { title: "Literary & Debating", desc: "Debates, panel discussions, creative writing, and public speaking workshops." },
    { title: "Fine Arts & Design", desc: "UI/UX design, graphic arts, poster crafting, and digital illustrations." },
    { title: "Performing Arts", desc: "Stage performances, music, and cultural showcases across campus." },
    { title: "Event Planning", desc: "Managing large-scale campus cultural events and student competitions." }
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
            <Lightbulb size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Genesis Cultural & Creative Society
          </h1>
          <p className="mx-auto max-w-2xl text-slate-400">
            Fostering creativity, cultural expression, literary excellence, and artistic leadership across UIET.
          </p>
        </div>

        {/* Vision & Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Target className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Our Vision</h3>
            <p className="text-sm text-slate-400">Providing an open platform for artistic expression, public speaking, and creative innovation.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Trophy className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Festivals</h3>
            <p className="text-sm text-slate-400">Hosting flagship campus cultural evenings and inter-college art fests.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Users className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Community</h3>
            <p className="text-sm text-slate-400">Writers, designers, performers, and creative thinkers across all years.</p>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Sparkles className="text-cyan-400" size={22} /> Creative Wings
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
          <h2 className="text-2xl font-bold">Connect with Genesis</h2>
          <p className="text-sm text-slate-400">Want to participate in creative events or join a wing?</p>
          <div className="flex justify-center gap-6 text-slate-400 pt-2">
            <span className="flex items-center gap-2 text-sm"><Mail size={18} /> genesis@uiet.ac.in</span>
            <span className="flex items-center gap-2 text-sm"><Globe size={18} /> uiet.ac.in/genesis</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Genesis;
