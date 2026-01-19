
import React, { useState } from 'react';
import { INTERNSHIP_TRACKS, EXTERNAL_RESOURCES } from '../constants';
import { InternshipTrack, CurriculumTerm } from '../types';
import { useNav } from '../App';

const Internship: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<InternshipTrack | null>(null);
  const [activeTermIndex, setActiveTermIndex] = useState(0);
  const { setActiveTab } = useNav();

  const activeTerm = activeTrack?.curriculum?.[activeTermIndex];

  const handleOpenDocs = () => {
    // Open a primary resource based on the active term/track
    if (activeTerm?.title.toLowerCase().includes('python')) {
      window.open('https://www.codecademy.com/learn/paths/python-3', '_blank');
    } else if (activeTerm?.title.toLowerCase().includes('cloud') || activeTerm?.title.toLowerCase().includes('deployment')) {
      window.open('https://skillbuilder.aws/', '_blank');
    } else if (activeTerm?.title.toLowerCase().includes('data') || activeTerm?.title.toLowerCase().includes('bi')) {
      window.open('https://learn.microsoft.com/en-us/training/powerplatform/power-bi', '_blank');
    } else {
      window.open('https://www.codecademy.com/catalog', '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12 px-8 pb-32">
      {/* Sub-Header / Breadcrumb Simulation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-800 pb-10">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Training & Certification</span>
            <i className="fa-solid fa-chevron-right text-[8px] text-zinc-700"></i>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Learning Plans</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Skyline Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Curriculums</span></h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-zinc-800 border border-zinc-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-all">Resume Learning</button>
          <button onClick={() => setActiveTab('paths')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">Enroll Now</button>
        </div>
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
            className={`p-10 bg-zinc-900 border rounded-[3rem] transition-all group cursor-pointer relative overflow-hidden ${
              activeTrack?.id === track.id ? 'border-blue-500 bg-[#0c0c0e] shadow-2xl shadow-blue-500/5 scale-[1.02]' : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-800 mb-8 border border-zinc-700 shadow-xl group-hover:scale-110 transition-transform ${track.color}`}>
              <i className={`fa-solid ${track.icon} text-2xl`}></i>
            </div>
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">{track.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-8 font-medium">{track.description}</p>
            <div className="flex items-center justify-between mt-auto">
               <div className="flex items-center gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                  <span>{track.curriculum?.length || 0} Terms</span>
                  <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                  <span className="text-blue-500/70">Industrial Path</span>
               </div>
               {activeTrack?.id === track.id && <i className="fa-solid fa-circle-check text-blue-500"></i>}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Curriculum Viewer */}
      {activeTrack && activeTrack.curriculum && (
        <section className="animate-in fade-in slide-in-from-bottom-12 duration-700 space-y-12 bg-[#09090b] border border-zinc-800 rounded-[4rem] p-10 lg:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 border-b border-zinc-800 pb-16">
            <div className="space-y-6 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  Official Skyline Track
                </span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-zinc-900/80 px-4 py-1.5 rounded-xl border border-zinc-800">
                  Total Journey: 24 Months
                </span>
              </div>
              <h2 className="text-5xl font-black text-white tracking-tight leading-[1.1]">
                {activeTrack.title} <span className="text-zinc-700 font-light italic">Roadmap</span>
              </h2>
              <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed font-medium">
                Our exhaustive engineering curriculum maps high-paying tech competencies to verifiable self-learning steps. 
                Designed for both students and professionals aiming for architectural mastery.
              </p>
            </div>

            {/* Platform Shortcuts */}
            <div className="grid grid-cols-4 gap-4 w-full lg:w-auto">
              {activeTrack.platforms.map(pid => {
                const res = EXTERNAL_RESOURCES.find(r => r.id === pid);
                if (!res) return null;
                return (
                  <a key={pid} href={res.url} target="_blank" className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 transition-all shadow-lg group/p" title={res.name}>
                    <i className={`fa-solid ${res.icon} text-xl group-hover/p:scale-110 transition-transform`}></i>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Term Selector Strip */}
          <div className="flex items-center gap-4 overflow-x-auto pb-10 scrollbar-hide no-scrollbar -mx-4 px-4 border-b border-zinc-900/50">
            {activeTrack.curriculum.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTermIndex(idx)}
                className={`flex-shrink-0 px-8 py-5 rounded-[2rem] transition-all border whitespace-nowrap text-left ${
                  activeTermIndex === idx 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-600/20' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                }`}
              >
                <span className="block text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">
                  {term.term}
                </span>
                <span className="font-black text-sm tracking-tight">{term.title}</span>
              </button>
            ))}
          </div>

          {/* Active Term Detailed Content */}
          {activeTerm && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="lg:col-span-4 space-y-10">
                 <div className="p-10 bg-zinc-900 border border-zinc-800 rounded-[3rem] shadow-2xl relative overflow-hidden group/card">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/card:bg-blue-500/10 transition-colors"></div>
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-10">Term Intel</h3>
                    <div className="space-y-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                          <i className="fa-solid fa-clock-rotate-left"></i>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Target Duration</p>
                          <p className="text-sm font-bold text-zinc-500">{activeTerm.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                          <i className="fa-solid fa-bolt"></i>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Competency</p>
                          <p className="text-sm font-bold text-zinc-500">Industry Ready</p>
                        </div>
                      </div>
                      <div className="pt-8 space-y-4">
                         <button onClick={() => setActiveTab('labs')} className="w-full py-4.5 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3">
                           <i className="fa-solid fa-flask"></i> Launch Practice Lab
                         </button>
                         <button onClick={handleOpenDocs} className="w-full py-4 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-300 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all">
                           Self Learning Docs
                         </button>
                      </div>
                    </div>
                 </div>

                 <div className="p-10 bg-amber-500/5 border border-amber-500/10 rounded-[3rem]">
                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4">Mentor insight</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed italic font-medium">
                      "Mastering {activeTerm.title} requires deep experimentation. Use our Interactive Labs to validate every concept manually before moving to the next term."
                    </p>
                 </div>
               </div>

               <div className="lg:col-span-8 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activeTerm.modules.map((module, i) => (
                      <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-10 space-y-8 group hover:border-blue-500/30 transition-all hover:bg-zinc-900 shadow-xl">
                        <div className="flex items-center justify-between">
                           <h4 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">{module.title}</h4>
                           <span className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xs font-black text-zinc-600 border border-zinc-700 shadow-inner">{i + 1}</span>
                        </div>
                        <ul className="space-y-4">
                          {module.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-4">
                              <div className="w-2 h-2 rounded-full bg-blue-500/40 mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                              <span className="text-[13px] text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-6">
                           <button onClick={() => setActiveTab('labs')} className="w-full py-4 bg-zinc-950/50 border border-zinc-800 hover:bg-blue-600 hover:border-blue-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 transition-all flex items-center justify-center gap-3 shadow-inner">
                              Practice Module <i className="fa-solid fa-terminal text-[8px]"></i>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeTerm.modules.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[3rem] text-zinc-700">
                       <i className="fa-solid fa-book-open text-4xl mb-4 opacity-10"></i>
                       <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Term Syllabus is loading...</p>
                    </div>
                  )}
               </div>
            </div>
          )}
        </section>
      )}

      {/* Unified Live Roadmap Visual Footer */}
      <section className="bg-zinc-900/30 border border-zinc-800 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tight">Industrial Mastery Matrix</h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              Your career is built term-by-term. From basic syntax to agentic autonomy, we provide the verifiable path.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Foundation', value: 'Terms 1-2', color: 'text-blue-500' },
              { label: 'Intelligence', value: 'Terms 3-6', color: 'text-purple-500' },
              { label: 'Systems', value: 'Terms 7-10', color: 'text-emerald-500' },
              { label: 'Strategy', value: 'Terms 11-12', color: 'text-amber-500' }
            ].map((node, i) => (
              <div key={i} className="space-y-2">
                <span className={`block text-3xl font-black ${node.color}`}>{node.value}</span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internship;
