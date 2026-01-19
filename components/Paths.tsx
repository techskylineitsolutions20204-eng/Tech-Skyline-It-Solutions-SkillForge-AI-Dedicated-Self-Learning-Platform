
import React, { useState, useEffect } from 'react';
import { LEARNING_PATHS, EXTERNAL_RESOURCES } from '../constants';
import { LearningModule, Project } from '../types';

const Paths: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<LearningModule | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<Record<string, Project[]>>({});
  const [newProj, setNewProj] = useState<Project>({ name: '', repoUrl: '', demoUrl: '', techStack: '', description: '' });

  useEffect(() => {
    const savedNotes = localStorage.getItem('skillforge_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    const savedProjects = localStorage.getItem('skillforge_projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  const handleNoteChange = (pathId: string, val: string) => {
    const next = { ...notes, [pathId]: val };
    setNotes(next);
    localStorage.setItem('skillforge_notes', JSON.stringify(next));
  };

  const addProject = (pathId: string) => {
    if (!newProj.name.trim() || !newProj.repoUrl.trim()) return;
    
    const currentPathProjects = projects[pathId] || [];
    const next = { ...projects, [pathId]: [...currentPathProjects, newProj] };
    
    setProjects(next);
    localStorage.setItem('skillforge_projects', JSON.stringify(next));
    setNewProj({ name: '', repoUrl: '', demoUrl: '', techStack: '', description: '' });
  };

  const removeProject = (pathId: string, index: number) => {
    const currentPathProjects = [...(projects[pathId] || [])];
    currentPathProjects.splice(index, 1);
    const next = { ...projects, [pathId]: currentPathProjects };
    setProjects(next);
    localStorage.setItem('skillforge_projects', JSON.stringify(next));
  };

  const learningResources = EXTERNAL_RESOURCES.filter(r => r.category === 'TUTORIAL' || r.category === 'RESEARCH');

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Tech Master Roadmaps</h2>
          <p className="text-zinc-400 text-lg">Exhaustive certification paths and competency targets.</p>
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
            </div>
            
            <button className="w-full py-4 bg-zinc-800/30 group-hover:bg-blue-600 group-hover:text-white text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] border-t border-zinc-800 transition-all flex items-center justify-center gap-2">
              Blueprint Access <i className="fa-solid fa-chevron-right text-[8px]"></i>
            </button>
          </div>
        ))}
      </div>

      {selectedPath && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl" onClick={() => setSelectedPath(null)}></div>
          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
            <header className="p-8 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-800 ${selectedPath.color} text-2xl shadow-xl`}>
                  <i className={`fa-solid ${selectedPath.icon}`}></i>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">{selectedPath.title}</h2>
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{selectedPath.path.replace('_', ' ')} Portfolio</p>
                </div>
              </div>
              <button onClick={() => setSelectedPath(null)} className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-400 shadow-lg">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-10">
                   <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                      <i className="fa-solid fa-graduation-cap"></i> Recommended Certs
                    </h3>
                    <div className="space-y-3">
                      {selectedPath.certifications.map((cert, idx) => (
                        <a key={idx} href={cert.url} target="_blank" className="block p-5 bg-zinc-800/40 border border-zinc-700/30 rounded-3xl hover:border-blue-500/50 transition-all">
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-0.5 rounded">{cert.level}</span>
                          <p className="font-bold text-zinc-100 text-base mt-2">{cert.name}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 flex items-center gap-2">
                      <i className="fa-solid fa-pen-nib"></i> Learning Log
                    </h3>
                    <textarea 
                      value={notes[selectedPath.id] || ''}
                      onChange={(e) => handleNoteChange(selectedPath.id, e.target.value)}
                      placeholder="Capture insights, breakthroughs, or configuration steps..."
                      className="w-full h-48 bg-zinc-800/30 border border-zinc-700/50 rounded-3xl p-6 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-amber-500/30 resize-none font-mono"
                    />
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-12">
                  <div className="bg-zinc-950/40 border border-zinc-800 p-8 sm:p-10 rounded-[3rem] space-y-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500 flex items-center gap-2">
                      <i className="fa-solid fa-rocket"></i> My Project Portfolio & GitHub
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 space-y-4">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Register New Project</h4>
                        <div className="space-y-3">
                          <input type="text" placeholder="Project Name" value={newProj.name} onChange={e => setNewProj({...newProj, name: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-xs text-zinc-100 outline-none" />
                          <input type="text" placeholder="GitHub Repository URL" value={newProj.repoUrl} onChange={e => setNewProj({...newProj, repoUrl: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-xs text-zinc-100 outline-none" />
                          <input type="text" placeholder="Live Demo URL (Optional)" value={newProj.demoUrl} onChange={e => setNewProj({...newProj, demoUrl: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-xs text-zinc-100 outline-none" />
                          <input type="text" placeholder="Tech Stack (e.g. React, Node, Firebase)" value={newProj.techStack} onChange={e => setNewProj({...newProj, techStack: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-xs text-zinc-100 outline-none" />
                          <textarea placeholder="Brief description..." value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-xs text-zinc-100 outline-none h-20 resize-none" />
                          <button onClick={() => addProject(selectedPath.id)} className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all">
                            Showcase Project
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {projects[selectedPath.id]?.length ? (
                          projects[selectedPath.id].map((proj, idx) => (
                            <div key={idx} className="p-5 bg-zinc-900 rounded-3xl border border-zinc-800 group hover:border-pink-500/50 transition-all space-y-3 relative">
                              <button onClick={() => removeProject(selectedPath.id, idx)} className="absolute top-4 right-4 text-zinc-700 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash text-xs"></i></button>
                              <h5 className="font-black text-white text-base pr-6">{proj.name}</h5>
                              {proj.description && <p className="text-[11px] text-zinc-500 leading-relaxed italic">"{proj.description}"</p>}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {proj.techStack.split(',').map(s => <span key={s} className="text-[8px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 uppercase">{s.trim()}</span>)}
                              </div>
                              <div className="flex gap-4 pt-2">
                                <a href={proj.repoUrl} target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-blue-400 hover:text-blue-300"><i className="fa-brands fa-github"></i> Repository</a>
                                {proj.demoUrl && <a href={proj.demoUrl} target="_blank" className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 hover:text-emerald-300"><i className="fa-solid fa-globe"></i> Live Demo</a>}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-zinc-700 border-2 border-dashed border-zinc-800 rounded-[2rem] p-10">
                            <i className="fa-solid fa-code text-4xl mb-4 opacity-20"></i>
                            <p className="text-xs font-bold uppercase tracking-widest text-center">Your portfolio is empty.<br/>Showcase your work!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950/40 border border-zinc-800 p-8 sm:p-10 rounded-[3rem] space-y-8">
                     <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                      <i className="fa-solid fa-route"></i> Career Blueprint (3-24 Months)
                    </h3>
                    <div className="space-y-8 relative pl-6">
                      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-zinc-800"></div>
                      {selectedPath.roadmap.map((step, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-emerald-500"></div>
                          <h4 className="font-bold text-white text-base mb-1">{step.title}</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed">{step.details}</p>
                        </div>
                      ))}
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
