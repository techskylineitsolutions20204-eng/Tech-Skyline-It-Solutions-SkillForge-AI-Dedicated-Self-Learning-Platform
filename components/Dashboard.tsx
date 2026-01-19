
import React from 'react';
import { EXTERNAL_RESOURCES } from '../constants';
import { ResourceCategory } from '../types';

const Dashboard: React.FC = () => {
  const getCategoryLabel = (cat: ResourceCategory) => {
    switch(cat) {
      case 'AI_ASSISTANT': return 'AI Coding Assistants';
      case 'INTERACTIVE_LAB': return 'Interactive Coding Labs';
      case 'SANDBOX': return 'In-Browser Sandboxes';
      case 'TUTORIAL': return 'Guided Tutorials';
      case 'IDE': return 'Professional IDEs';
      case 'RESEARCH': return 'Academic & Research';
      default: return 'Other Resources';
    }
  };

  const categories: ResourceCategory[] = ['AI_ASSISTANT', 'INTERACTIVE_LAB', 'SANDBOX', 'IDE', 'TUTORIAL', 'RESEARCH'];

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Ecosystem Online: 2026 Edition</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
            SkillForge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Resource Hub</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Your centralized gateway to the elite tools and platforms defining the modern tech landscape. 
            From AI-native code agents to immersive sandboxed environments.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 transition-all flex items-center gap-3">
              Explore Learning Paths <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
            <button className="px-8 py-3.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-100 rounded-2xl font-black transition-all border border-zinc-700 backdrop-blur-sm">
              Quick Tutorials
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Tips Section */}
      <section className="bg-zinc-900/20 border border-zinc-800/50 p-8 rounded-[2rem] animate-in fade-in duration-700">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3">
          <i className="fa-solid fa-lightbulb text-amber-500"></i>
          Strategic Usage Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest">For Learning</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Combine freeCodeCamp and Codecademy for structured lessons, then use SoloLearn for mobile practice during transit.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">For Building</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Generate core logic with Workik or ZZZ Code, then refine and debug directly in VS Code using Google Code Assist.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-purple-400 uppercase tracking-widest">For Experimentation</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Spin up a Replit or PlayCode sandbox to test snippets quickly before committing to your main repository.</p>
          </div>
        </div>
      </section>

      {/* Categorized Ecosystem Resources */}
      <div className="space-y-16">
        {categories.map((cat) => {
          const catResources = EXTERNAL_RESOURCES.filter(r => r.category === cat);
          if (catResources.length === 0) return null;
          
          return (
            <section key={cat} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-black text-white tracking-tight">{getCategoryLabel(cat)}</h2>
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
                  {catResources.length} Resources
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {catResources.map((tool) => (
                  <a 
                    key={tool.id} 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col bg-zinc-900/40 border border-zinc-800/60 p-6 rounded-[2rem] hover:border-blue-500/50 hover:bg-zinc-900/60 transition-all group shadow-sm hover:shadow-blue-500/5"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-all shadow-lg shadow-black/20">
                        <i className={`fa-solid ${tool.icon} text-xl`}></i>
                      </div>
                      <i className="fa-solid fa-up-right-from-square text-[10px] text-zinc-700 group-hover:text-blue-500 transition-colors"></i>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-black text-white text-base group-hover:text-blue-400 transition-colors">{tool.name}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 font-medium">{tool.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Elite Tier</span>
                       <span className="text-blue-500/50 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Visit Site <i className="fa-solid fa-chevron-right text-[8px] ml-1"></i></span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Strategic Table */}
      <section className="bg-zinc-900/40 border border-zinc-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-[80px]"></div>
        <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-4">
          <i className="fa-solid fa-hourglass-start text-emerald-500"></i>
          Time-to-Competency Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800">
              <tr className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">
                <th className="pb-6 px-6">Specialization Domain</th>
                <th className="pb-6 px-6">Foundational (0-9m)</th>
                <th className="pb-6 px-6">Architectural (9-18m)</th>
                <th className="pb-6 px-6">Strategic (18-36m)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                { d: 'AI & Machine Learning', s1: 'Foundations + Python Mastery', s2: 'Deep Learning + Core MLOps', s3: 'GenAI Leadership + R&D' },
                { d: 'Cloud & Systems', s1: 'Core Provisioning + Certs', s2: 'Distributed Systems Arch', s3: 'Sovereign Multi-cloud' },
                { d: 'Cyber Security', s1: 'Security+ / Network Flow', s2: 'Pen-Testing / Forensics', s3: 'Zero Trust Infrastructure' },
                { d: 'Software Engineering', s1: 'Algo Foundations / Full-Stack', s2: 'Microservices / Node.js High-Perf', s3: 'System Design / Staff Eng' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="py-6 px-6 font-black text-zinc-200 group-hover:text-blue-400 transition-colors">{row.d}</td>
                  <td className="py-6 px-6 text-zinc-400 font-medium">{row.s1}</td>
                  <td className="py-6 px-6 text-zinc-400 font-medium">{row.s2}</td>
                  <td className="py-6 px-6 text-zinc-400 font-medium">{row.s3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
