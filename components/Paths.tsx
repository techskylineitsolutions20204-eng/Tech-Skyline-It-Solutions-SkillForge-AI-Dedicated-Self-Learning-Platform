
import React, { useState, useEffect } from 'react';
import { LEARNING_PATHS } from '../constants';
import { LearningModule } from '../types';

const Paths: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<LearningModule | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('skillforge_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const handleNoteChange = (pathId: string, val: string) => {
    const next = { ...notes, [pathId]: val };
    setNotes(next);
    localStorage.setItem('skillforge_notes', JSON.stringify(next));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Tech Master Roadmaps</h2>
          <p className="text-zinc-400 text-lg">Exhaustive certification paths and 3-36 month competency targets.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold text-zinc-400 flex items-center gap-2 shadow-xl shadow-black/40">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            Live Domain Learning Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {LEARNING_PATHS.map((path) => (
          <div 
            key={path.id} 
            onClick={() => setSelectedPath(path)}
            className="flex flex-col bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all group cursor-pointer shadow-lg hover:shadow-blue-500/10"
          >
            <div className="p-6 flex-1">
              <div className={`w-14 h-14 rounded-2xl mb-5 flex items-center justify-center bg-zinc-800 group-hover:scale-110 transition-transform ${path.color} shadow-2xl shadow-black/30 border border-zinc-700/50`}>
                <i className={`fa-solid ${path.icon} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-black text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">{path.title}</h3>
              <p className="text-[10px] text-zinc-500 line-clamp-2 mb-4 italic leading-relaxed">"{path.outlook}"</p>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {path.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[9px] font-bold text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 uppercase tracking-tighter">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 bg-zinc-800/30 group-hover:bg-blue-600 group-hover:text-white text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] border-t border-zinc-800 transition-all flex items-center justify-center gap-2">
              Blueprint Access <i className="fa-solid fa-chevron-right text-[8px]"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Exhaustive Detail Modal */}
      {selectedPath && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div 
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
            onClick={() => setSelectedPath(null)}
          ></div>
          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
            <header className="p-8 pb-4 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-800 ${selectedPath.color} text-2xl shadow-xl`}>
                  <i className={`fa-solid ${selectedPath.icon}`}></i>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">{selectedPath.title}</h2>
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{selectedPath.path.replace('_', ' ')} Specialization</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPath(null)}
                className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Docs & Certs */}
                <div className="lg:col-span-4 space-y-10">
                   <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                      <i className="fa-solid fa-graduation-cap"></i> Live Learning Links
                    </h3>
                    <div className="space-y-3">
                      {selectedPath.certifications.map((cert, idx) => (
                        <a 
                          key={idx} 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-5 bg-zinc-800/40 border border-zinc-700/30 rounded-3xl hover:border-blue-500/50 hover:bg-zinc-800/60 transition-all group"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-blue-400/80 uppercase tracking-widest bg-blue-400/10 px-2 py-0.5 rounded">{cert.level}</span>
                            <i className="fa-solid fa-up-right-from-square text-[10px] text-zinc-600 group-hover:text-blue-400 transition-colors"></i>
                          </div>
                          <p className="font-bold text-zinc-100 text-base group-hover:text-white transition-colors">{cert.name}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-zinc-800">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 flex items-center gap-2">
                      <i className="fa-solid fa-pen-nib"></i> My Study Notes
                    </h3>
                    <textarea 
                      value={notes[selectedPath.id] || ''}
                      onChange={(e) => handleNoteChange(selectedPath.id, e.target.value)}
                      placeholder="Start drafting your certification strategy or module notes here... (Saves automatically)"
                      className="w-full h-64 bg-zinc-800/30 border border-zinc-700/50 rounded-3xl p-6 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 resize-none font-mono"
                    />
                  </div>
                </div>

                {/* Right Column: Roadmap & Lab */}
                <div className="lg:col-span-8 space-y-10">
                  <div className="bg-zinc-950/40 border border-zinc-800 p-8 sm:p-10 rounded-[3rem] space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
                    
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                      <i className="fa-solid fa-route"></i> 3–24 Month Compentency Path
                    </h3>
                    
                    <div className="space-y-10 relative">
                      <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500/50 via-zinc-800 to-transparent"></div>
                      {selectedPath.roadmap.map((step, idx) => (
                        <div key={idx} className="relative pl-14">
                          <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-zinc-900 border-2 border-emerald-500/50 flex items-center justify-center text-sm font-black text-white z-10 shadow-lg shadow-emerald-500/10">
                            {idx + 1}
                          </div>
                          <h4 className="font-bold text-white text-xl mb-3">{step.title}</h4>
                          <p className="text-zinc-400 leading-relaxed text-sm lg:text-base">{step.details}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                      <a 
                        href={selectedPath.learningUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95"
                      >
                         Launch Study Interface <i className="fa-solid fa-rocket"></i>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Market Outlook</h4>
                      <p className="text-zinc-200 text-sm font-medium leading-relaxed italic">"{selectedPath.outlook}"</p>
                    </div>
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Core Tech Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPath.roles.map(role => (
                          <span key={role} className="px-3 py-1.5 bg-zinc-800 text-zinc-400 rounded-xl text-[10px] font-bold border border-zinc-700/50">{role}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paths;
