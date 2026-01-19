
import React, { useState, useEffect } from 'react';
import { LEARNING_PATHS, EXTERNAL_RESOURCES } from '../constants';
import { LearningModule, Project, RoadmapStep } from '../types';
import { useNav } from '../App';

const Paths: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<LearningModule | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<Record<string, Project[]>>({});
  const [newProj, setNewProj] = useState<Project>({ name: '', repoUrl: '', demoUrl: '', techStack: '', description: '' });
  const { setActiveTab } = useNav();

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

  const handleStartLab = (step: RoadmapStep) => {
    // Save the context for the Labs component
    localStorage.setItem('active_lab_context', JSON.stringify({
      path: selectedPath?.title,
      skill: step.title,
      objective: step.details
    }));
    setActiveTab('labs');
    setSelectedPath(null);
  };

  const handleStudyDocs = (step: RoadmapStep) => {
    const query = encodeURIComponent(`${step.title} ${step.skills} tutorial`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Active Certification Engine</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">Technical <span className="text-blue-500">Blueprints</span></h2>
          <p className="text-zinc-400 text-lg max-w-2xl font-medium">Map your 6-week foundation or 24-month mastery journey with live lab integration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {LEARNING_PATHS.map((path) => (
          <div 
            key={path.id} 
            onClick={() => setSelectedPath(path)}
            className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all group cursor-pointer shadow-xl hover:shadow-blue-500/5"
          >
            <div className="p-10 flex-1 space-y-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-800 group-hover:scale-110 transition-transform ${path.color} shadow-2xl border border-zinc-700/50`}>
                <i className={`fa-solid ${path.icon} text-3xl`}></i>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">{path.title}</h3>
                <p className="text-xs text-zinc-500 italic font-medium leading-relaxed">"{path.outlook}"</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {path.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-[9px] font-black text-zinc-400 uppercase tracking-widest">{skill}</span>
                ))}
              </div>
            </div>
            
            <button className="w-full py-5 bg-zinc-800/50 group-hover:bg-blue-600 group-hover:text-white text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] border-t border-zinc-800 transition-all flex items-center justify-center gap-3">
              Access Full Blueprint <i className="fa-solid fa-chevron-right text-[8px]"></i>
            </button>
          </div>
        ))}
      </div>

      {selectedPath && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-2xl" onClick={() => setSelectedPath(null)}></div>
          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-7xl max-h-[92vh] overflow-hidden rounded-[3.5rem] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
            <header className="p-10 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
              <div className="flex items-center gap-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-800 ${selectedPath.color} text-3xl shadow-2xl border border-zinc-700`}>
                  <i className={`fa-solid ${selectedPath.icon}`}></i>
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight">{selectedPath.title}</h2>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Industrial Career Roadmap</p>
                </div>
              </div>
              <button onClick={() => setSelectedPath(null)} className="w-14 h-14 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 shadow-xl transition-all hover:rotate-90">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-10 sm:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4 space-y-12">
                   <div className="space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 flex items-center gap-3">
                      <i className="fa-solid fa-award"></i> Verification Targets
                    </h3>
                    <div className="space-y-4">
                      {selectedPath.certifications.map((cert, idx) => (
                        <a key={idx} href={cert.url} target="_blank" className="block p-6 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-blue-500/50 transition-all group/cert">
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-lg border border-blue-400/20">{cert.level}</span>
                          <p className="font-black text-zinc-100 text-lg mt-4 group-hover:text-blue-400 transition-colors">{cert.name}</p>
                          <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                            Official Exam <i className="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 flex items-center gap-3">
                      <i className="fa-solid fa-terminal"></i> Engineer's Notebook
                    </h3>
                    <textarea 
                      value={notes[selectedPath.id] || ''}
                      onChange={(e) => handleNoteChange(selectedPath.id, e.target.value)}
                      placeholder="Capture breaking changes, CLI commands, or architectural patterns..."
                      className="w-full h-64 bg-zinc-950/50 border border-zinc-800 rounded-[2.5rem] p-8 text-sm text-zinc-300 outline-none focus:ring-2 focus:ring-amber-500/30 resize-none font-mono shadow-inner"
                    />
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-16">
                  <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-[3.5rem] space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                      <i className="fa-solid fa-route"></i> Live Curriculum Timeline
                    </h3>
                    <div className="space-y-12 relative pl-10">
                      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-zinc-900"></div>
                      {selectedPath.roadmap.map((step, idx) => (
                        <div key={idx} className="relative group/step">
                          <div className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-xl bg-zinc-900 border-2 border-zinc-800 group-hover/step:border-emerald-500 group-hover/step:bg-emerald-500/10 transition-all flex items-center justify-center shadow-xl">
                             <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/step:bg-emerald-500 transition-colors"></div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                              <h4 className="font-black text-white text-xl tracking-tight">{step.week ? `${step.week}: ` : ''}{step.title}</h4>
                              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{step.effort || 'Self-paced'}</p>
                            </div>
                            <div className="flex gap-3">
                               <button 
                                onClick={() => handleStudyDocs(step)}
                                className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                               >
                                 Study Docs
                               </button>
                               <button 
                                onClick={() => handleStartLab(step)}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/10 flex items-center gap-2"
                               >
                                 <i className="fa-solid fa-flask"></i> Practice Lab
                               </button>
                            </div>
                          </div>
                          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium italic">"{step.details}"</p>
                          {step.skills && (
                            <div className="flex flex-wrap gap-2">
                              {step.skills.split(',').map(skill => (
                                <span key={skill} className="text-[9px] font-black text-blue-400 bg-blue-500/5 px-3 py-1 rounded-lg border border-blue-500/10 uppercase tracking-widest">{skill.trim()}</span>
                              ))}
                            </div>
                          )}
                          <div className="mt-8 pt-8 border-t border-zinc-900/50 hidden group-last/step:block">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl flex items-center gap-6">
                               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-xl">
                                  <i className="fa-solid fa-check-double text-xl"></i>
                               </div>
                               <div>
                                  <p className="text-sm font-black text-white">Milestone Complete</p>
                                  <p className="text-xs text-zinc-500 font-medium italic mt-1">Ready for industrial verification and project showcase.</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio Section */}
                  <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-[3.5rem] space-y-10 shadow-inner">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-3">
                      <i className="fa-solid fa-briefcase"></i> Industrial Showcase (Portfolio)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 space-y-6 shadow-xl">
                          <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Deploy New Entry</h4>
                          <div className="space-y-4">
                            <input type="text" placeholder="Project Name" value={newProj.name} onChange={e => setNewProj({...newProj, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-3 text-xs text-zinc-100 outline-none focus:border-pink-500/50 transition-all" />
                            <input type="text" placeholder="GitHub URL" value={newProj.repoUrl} onChange={e => setNewProj({...newProj, repoUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-3 text-xs text-zinc-100 outline-none focus:border-pink-500/50 transition-all" />
                            <textarea placeholder="Technical scope and challenges..." value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-3 text-xs text-zinc-100 outline-none h-32 resize-none focus:border-pink-500/50 transition-all" />
                            <button onClick={() => addProject(selectedPath.id)} className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-pink-600/20 transition-all">
                              Showcase Project
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                        {projects[selectedPath.id]?.length ? (
                          projects[selectedPath.id].map((proj, idx) => (
                            <div key={idx} className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 group hover:border-pink-500/50 transition-all space-y-5 relative shadow-xl">
                              <button onClick={() => removeProject(selectedPath.id, idx)} className="absolute top-6 right-6 text-zinc-700 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash text-xs"></i></button>
                              <h5 className="font-black text-white text-xl tracking-tight">{proj.name}</h5>
                              {proj.description && <p className="text-xs text-zinc-500 leading-relaxed italic font-medium">"{proj.description}"</p>}
                              <div className="flex gap-6 pt-2">
                                <a href={proj.repoUrl} target="_blank" className="flex items-center gap-2 text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest"><i className="fa-brands fa-github text-base"></i> Repo</a>
                                {proj.demoUrl && <a href={proj.demoUrl} target="_blank" className="flex items-center gap-2 text-[10px] font-black text-emerald-500 hover:text-emerald-400 uppercase tracking-widest"><i className="fa-solid fa-globe text-base"></i> Demo</a>}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-zinc-800 border-2 border-dashed border-zinc-900 rounded-[3rem] p-12">
                            <i className="fa-solid fa-code text-6xl mb-6 opacity-20"></i>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center leading-loose">Portfolio Buffer Empty.<br/>Commit your first project entry.</p>
                          </div>
                        )}
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
