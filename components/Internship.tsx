
import React from 'react';
import { INTERNSHIP_TRACKS, EXTERNAL_RESOURCES } from '../constants';
import { InternshipTrack } from '../types';

const Internship: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Elite Internship Hub: 2026 Edition</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
          Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Industry Roadmaps</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          The TechSkyline-style internship platform. We map the world's most powerful free lab ecosystems 
          into structured tracks for rapid skill acquisition—no credit card required.
        </p>
      </div>

      {/* Industrial Tracks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {INTERNSHIP_TRACKS.map((track) => (
          <div key={track.id} className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10 hover:border-blue-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-start justify-between mb-8 relative">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-800 border border-zinc-700 shadow-xl group-hover:scale-110 transition-transform ${track.color}`}>
                <i className={`fa-solid ${track.icon} text-3xl`}></i>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Duration</span>
                <span className="text-sm font-bold text-zinc-300">12 - 24 Weeks</span>
              </div>
            </div>

            <div className="space-y-4 mb-10 relative">
              <h3 className="text-2xl font-black text-white">{track.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{track.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* Lab Ecosystem */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-flask"></i> Lab Ecosystem
                </h4>
                <div className="flex flex-wrap gap-3">
                  {track.platforms.map(pid => {
                    const res = EXTERNAL_RESOURCES.find(r => r.id === pid);
                    if (!res) return null;
                    return (
                      <a key={pid} href={res.url} target="_blank" className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-all w-full group/tool">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover/tool:text-blue-400">
                          <i className={`fa-solid ${res.icon} text-sm`}></i>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-zinc-300">{res.name}</p>
                          <p className="text-[9px] text-zinc-600 font-bold uppercase">{res.category.replace('_', ' ')}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Learning Pipeline */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-timeline"></i> Pipeline Steps
                </h4>
                <div className="space-y-3 relative pl-6">
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-zinc-800"></div>
                  {track.roadmap.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-zinc-900 border-2 border-zinc-700"></div>
                      <p className="text-[11px] font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between relative">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-zinc-900 overflow-hidden bg-zinc-800">
                    <img src={`https://picsum.photos/seed/intern${i + track.id}/40/40`} alt="Intern" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500">
                  +42
                </div>
              </div>
              <button className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Join Active Track
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Unified Live Roadmap Visual */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white">Skyline Engineering Roadmap</h2>
            <p className="text-zinc-500 text-sm font-medium">The horizontal integration of multi-domain expertise.</p>
          </div>
          <div className="flex gap-4">
             <div className="text-center">
               <span className="block text-2xl font-black text-blue-400">01</span>
               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Phase</span>
             </div>
             <div className="w-px h-10 bg-zinc-800"></div>
             <div className="text-center">
               <span className="block text-2xl font-black text-emerald-400">20+</span>
               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Platforms</span>
             </div>
          </div>
        </div>

        <div className="space-y-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {[
              { title: 'Foundational Base', tech: 'fcc, codecademy, sololearn', icon: 'fa-cubes' },
              { title: 'Sandbox Logic', tech: 'replit, codesandbox, wokwi', icon: 'fa-box' },
              { title: 'Cloud Mastery', tech: 'aws, gcp, azure, firebase', icon: 'fa-cloud' },
              { title: 'Elite Agentic AI', tech: 'gemini, langsmith, huggingface', icon: 'fa-robot' }
            ].map((node, i) => (
              <div key={i} className="p-6 bg-zinc-950/60 border border-zinc-800 rounded-3xl flex flex-col items-center text-center group hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800 text-zinc-600 group-hover:text-blue-500">
                  <i className={`fa-solid ${node.icon} text-xl`}></i>
                </div>
                <h4 className="text-sm font-black text-white mb-2">{node.title}</h4>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">{node.tech}</p>
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 -z-0 hidden md:block"></div>
        </div>
      </section>
    </div>
  );
};

export default Internship;
