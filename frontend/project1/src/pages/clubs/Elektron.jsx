import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Trophy, Users, Mail, Cpu, Zap, Globe, ArrowLeft } from 'lucide-react';

function Elektron() {
  const domains = [
    { title: "Embedded Systems", desc: "Microcontroller programming with STM32, ESP32, and Arduino platforms." },
    { title: "IoT Solutions", desc: "Designing smart sensor networks and cloud-connected hardware systems." },
    { title: "Circuit Design & PCB", desc: "Schematic capture, PCB routing, and hardware prototyping in KiCAD." },
    { title: "Robotics & Automation", desc: "Sensors, motor drivers, and autonomous control algorithms." }
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
            <Cpu size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Elektron Club
          </h1>
          <p className="mx-auto max-w-2xl text-slate-400">
            The hardware innovation hub of UIET, empowering students in electronics, IoT, embedded systems, and robotics.
          </p>
        </div>

        {/* Vision & Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Target className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Our Vision</h3>
            <p className="text-sm text-slate-400">Bridging software and physical hardware through real-world prototyping and embedded engineering.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Trophy className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Projects</h3>
            <p className="text-sm text-slate-400">Building smart campus devices, drone hardware, and autonomous robotics prototypes.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-6 space-y-2">
            <Users className="text-cyan-400" size={24} />
            <h3 className="font-bold text-lg">Community</h3>
            <p className="text-sm text-slate-400">Electronics enthusiasts, makers, and embedded software developers.</p>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Zap className="text-cyan-400" size={22} /> Hardware Domains
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
          <h2 className="text-2xl font-bold">Connect with Elektron</h2>
          <p className="text-sm text-slate-400">Got a hardware idea or want to build smart electronics?</p>
          <div className="flex justify-center gap-6 text-slate-400 pt-2">
            <span className="flex items-center gap-2 text-sm"><Mail size={18} /> elektron@uiet.ac.in</span>
            <span className="flex items-center gap-2 text-sm"><Globe size={18} /> uiet.ac.in/elektron</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Elektron;
