
import React, { useState } from 'react';
import { INTERNSHIP_TRACKS, EXTERNAL_RESOURCES } from '../constants';
import { InternshipTrack, CurriculumTerm } from '../types';

const Internship: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<InternshipTrack | null>(null);
  const [activeTermIndex, setActiveTermIndex] = useState(0);

  const activeTerm = activeTrack?.curriculum?.[activeTermIndex];

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-24">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Skyline Internship Hub v2026</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
          Verifiable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Industry Skills</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          The unified self-learning roadmap for Students & Professionals. We map elite practice labs 
          to a 12-Term mastery curriculum—spanning Python, ML, GenAI, and Project Management.
        </p>
      </div>

      {/* Industrial Tracks Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INTERNSHIP_TRACKS.map((track) => (
          <div 
            key={track.id} 
            onClick={() => {
              setActiveTrack(track);
              setActiveTermIndex(0);
            }}
            className={`p-8 bg-zinc-900/40 border rounded-[2.5rem] transition-all group cursor-pointer relative overflow-hidden ${
              activeTrack?.id === track.id ? 'border-blue-500 bg-zinc-900 shadow-2xl shadow-blue-500/5 scale-[1.02]' : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-800 mb-6 border border-zinc-700 shadow-xl group-hover:scale-110 transition-transform ${track.color}`}>
              <i className={`fa-solid ${track.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">{track.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{track.description}</p>
            <div className="mt-6 flex items-center gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
               <span>{track.curriculum?.length || 0} Terms</span>
               <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
               <span>Practice Labs</span>
            </div>
            {activeTrack?.id === track.id && (
              <div className="absolute top-4 right-6 text-blue-500 animate-bounce">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dynamic Curriculum Viewer */}
      {activeTrack && activeTrack.curriculum && (
        <section className="animate-in fade-in slide-in-from-bottom-12 duration-700 space-y-12 bg-[#09090b] border border-zinc-800 rounded-[3rem] p-10 lg:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 border-b border-zinc-800 pb-12">
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] font-black text-amber-500 uppercase tracking-widest">
                  Active Enrollment Track
                </span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                  Total Journey: 24 Months
                </span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">
                {activeTrack.title} <span className="text-zinc-700 font-light">Syllabus</span>
              </h2>
              <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed italic">
                Navigate through the industrial terms to access specific modules and practice labs. 
                Each term is designed for deep competency in its respective domain for Students and Professionals.
              </p>
            </div>

            {/* Platform Shortcuts */}
            <div className="flex gap-3 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto">
              {activeTrack.platforms.map(pid => {
                const res = EXTERNAL_RESOURCES.find(r => r.id === pid);
                if (!res) return null;
                return (
                  <a key={pid} href={res.url} target="_blank" className="flex-shrink-0 w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 transition-all group/p" title={res.name}>
                    <i className={`fa-solid ${res.icon} text-lg group-hover/p:scale-110 transition-transform`}></i>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Term Selector Strip */}
          <div className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-4 px-4 border-b border-zinc-900/50">
            {activeTrack.curriculum.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTermIndex(idx)}
                className={`flex-shrink-0 px-6 py-4 rounded-2xl transition-all border whitespace-nowrap ${
                  activeTermIndex === idx 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/10' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                }`}
              >
                <span className="block text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">
                  {term.term}
                </span>
                <span className="font-bold text-xs">{term.title}</span>
              </button>
            ))}
          </div>

          {/* Active Term Detailed Content */}
          {activeTerm && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="lg:col-span-4 space-y-8">
                 <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] shadow-inner">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6">Term Insights</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                          <i className="fa-solid fa-hourglass-start"></i>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-zinc-300">Target Duration</p>
                          <p className="text-xs text-zinc-500">{activeTerm.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                          <i className="fa-solid fa-award"></i>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-zinc-300">Competency Level</p>
                          <p className="text-xs text-zinc-500">Industrial Ready</p>
                        </div>
                      </div>
                      <div className="pt-4 space-y-3">
                         <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-3">
                           <i className="fa-solid fa-graduation-cap"></i> Practice Live Lab
                         </button>
                         <button className="w-full py-3 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-300 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                           Self Learning Material
                         </button>
                      </div>
                    </div>
                 </div>

                 {/* Tips Card */}
                 <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-[2.5rem]">
                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">Professional Track Tip</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed italic">
                      "For {activeTerm.title}, focus on building end-to-end pipelines. Professionals should aim to integrate these modules into existing production workflows."
                    </p>
                 </div>
               </div>

               <div className="lg:col-span-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeTerm.modules.map((module, i) => (
                      <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 space-y-6 group hover:border-blue-500/30 transition-all">
                        <div className="flex items-center justify-between">
                           <h4 className="text-lg font-black text-zinc-100 group-hover:text-blue-400 transition-colors">{module.title}</h4>
                           <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-600 border border-zinc-700">{i + 1}</span>
                        </div>
                        <ul className="space-y-3">
                          {module.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-1.5 flex-shrink-0"></div>
                              <span className="text-[11px] text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-4">
                           <button className="w-full py-3 bg-zinc-950/50 border border-zinc-800 hover:bg-blue-600 hover:border-blue-500 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest text-zinc-600 transition-all flex items-center justify-center gap-3">
                              Access Practice Lab <i className="fa-solid fa-terminal text-[8px]"></i>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeTerm.modules.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[3rem] text-zinc-700">
                       <i className="fa-solid fa-book-open text-4xl mb-4 opacity-20"></i>
                       <p className="text-xs font-bold uppercase tracking-widest">Syllabus expansion in progress...</p>
                    </div>
                  )}
               </div>
            </div>
          )}
        </section>
      )}

      {/* Global Learning Ecosystem Status */}
      <section className="bg-zinc-900/20 border border-zinc-800/50 p-10 rounded-[3rem] animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 justify-center md:justify-start">
              <i className="fa-solid fa-graduation-cap text-blue-500"></i>
              Professional Self-Learning
            </h2>
            <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
              Every term includes a curated selection of live lab accesses and research papers. 
              Designed specifically for the duality of student academic needs and professional project constraints.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl text-center">
                <span className="block text-3xl font-black text-blue-400">12</span>
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Mastery Terms</span>
             </div>
             <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl text-center">
                <span className="block text-3xl font-black text-emerald-400">24/7</span>
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Lab Access</span>
             </div>
          </div>
        </div>
      </section>

      {/* Unified Live Roadmap Visual Footer */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white">Career Integration Matrix</h2>
            <p className="text-zinc-500 text-sm font-medium">Visualizing your journey through the 12 Skyline Terms.</p>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {[
              { title: 'Foundational Base', tech: 'Terms 1-2: Python & ML', icon: 'fa-cubes' },
              { title: 'Intelligence Core', tech: 'Terms 3-6: GenAI & DS', icon: 'fa-database' },
              { title: 'Systems & Ops', tech: 'Terms 7-10: MLOps & Big Data', icon: 'fa-gears' },
              { title: 'Strategic Edge', tech: 'Terms 11-12: DSA & Leadership', icon: 'fa-robot' }
            ].map((node, i) => (
              <div key={i} className="p-8 bg-zinc-950/60 border border-zinc-800 rounded-[2rem] flex flex-col items-center text-center group hover:border-blue-500/50 transition-all shadow-inner">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-5 border border-zinc-800 text-zinc-600 group-hover:text-blue-500 shadow-xl transition-all">
                  <i className={`fa-solid ${node.icon} text-2xl`}></i>
                </div>
                <h4 className="text-base font-black text-white mb-2">{node.title}</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{node.tech}</p>
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800/50 -translate-y-1/2 -z-0 hidden md:block"></div>
        </div>
      </section>
    </div>
  );
};

export default Internship;
