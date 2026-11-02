import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Trophy, Users, CalendarDays, Mail, Cpu, Zap, Linkedin, Instagram } from 'lucide-react';

function Elektron() {
  const events = [
    { title: "Circuit Design 101", desc: "Introductory workshop on PCB schematic layout, breadboarding, and soldering.", date: "Nov 2026" },
    { title: "Arduino & IoT Bootcamp", desc: "Building smart home automation hardware using ESP32 and microcontrollers.", date: "Oct 2026" },
    { title: "Embedded Systems Challenge", desc: "Competition on sensor interfacing and real-time C/C++ programming.", date: "Sep 2026" }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Header / Hero */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
            <Cpu size={16} /> UIET KURUKSHETRA
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Elektron Society
          </h1>
          <p className="mx-auto max-w-3xl text-slate-400 text-base md:text-lg leading-relaxed">
            The premier hardware and electronics community at UIET Kurukshetra. Connecting circuit enthusiasts, embedded systems coders, robotics builders, and IoT innovators.
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
              To cultivate practical engineering knowledge in electronic circuit design, robotics, VLSI, signal processing, and Internet of Things (IoT) through hardware hackathons and hands-on labs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7 transition hover:border-purple-500/50">
            <div className="flex items-center gap-3 text-purple-400 mb-4">
              <Trophy size={26} />
              <h2 className="text-2xl font-bold text-white">Key Achievements</h2>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li>Organized Tech Odyssey hardware and circuit design workshops.</li>
              <li>Built autonomous line-following and obstacle-avoiding robots.</li>
              <li>Facilitated PCB etching and electronic component training labs.</li>
            </ul>
          </div>
        </div>

        {/* Focus Domains */}
        <div className="rounded-2xl border border-slate-800 bg-[#10172A] p-7">
          <div className="flex items-center gap-3 text-blue-400 mb-6">
            <Zap size={26} />
            <h2 className="text-2xl font-bold text-white">Technical Domains</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Embedded Systems</h3>
              <p className="text-xs text-slate-400 mt-1">ARM Cortex, STM32, Arduino, and micro-architecture coding.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">IoT & Wireless</h3>
              <p className="text-xs text-slate-400 mt-1">Wi-Fi/BLE communication, MQTT protocols, and cloud telemetry.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#080D1C] p-4">
              <h3 className="font-bold text-white text-base">Robotics & Automation</h3>
              <p className="text-xs text-slate-400 mt-1">Motor drivers, sensors, PID control, and robotic arm kinematics.</p>
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
          <h3 className="text-lg font-semibold text-white">Connect With Elektron</h3>
          <p className="text-xs text-slate-400">ECE Department, Room No. 100 Area, UIET Kurukshetra</p>
          <div className="flex gap-6 text-slate-400">
            <a href="mailto:director.uiet@kuk.ac.in" className="hover:text-purple-400 transition" title="Email">
              <Mail size={22} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition" title="LinkedIn">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Elektron;
