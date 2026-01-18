
import React from 'react';
import { LEARNING_PATHS, EXTERNAL_RESOURCES } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">SkillForge <span className="text-blue-500">Command Center</span></h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Empowering your journey to elite technical mastery. Access premium roadmaps, AI-driven labs, and industry-standard tooling.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
              Continue Active Lab <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
            <button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl font-bold transition-all border border-zinc-700">
              Review Roadmap
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl group hover:border-zinc-600 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-check-double"></i>
            </div>
            <h3 className="font-bold text-zinc-200">Modules Mastered</h3>
          </div>
          <p className="text-3xl font-black">12</p>
          <p className="text-sm text-zinc-500 mt-1">+2 from last session</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl group hover:border-zinc-600 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
              <i className="fa-solid fa-terminal"></i>
            </div>
            <h3 className="font-bold text-zinc-200">Lab Practice</h3>
          </div>
          <p className="text-3xl font-black">48</p>
          <p className="text-sm text-zinc-500 mt-1">120 hours total uptime</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl group hover:border-zinc-600 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
              <i className="fa-solid fa-ranking-star"></i>
            </div>
            <h3 className="font-bold text-zinc-200">Talent Score</h3>
          </div>
          <p className="text-3xl font-black">2,450</p>
          <p className="text-sm text-zinc-500 mt-1">Top 15% in Distributed Systems</p>
        </div>
      </div>

      {/* Recommended Elite Tooling & Resources */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-3">
            <i className="fa-solid fa-toolbox text-blue-500"></i>
            Elite Tooling & Ecosystem
          </h2>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            Verified for 2026
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXTERNAL_RESOURCES.map((tool) => (
            <a 
              key={tool.id} 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl hover:border-blue-500/50 transition-all group flex items-start gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-colors shadow-lg shadow-black/20">
                <i className={`fa-solid ${tool.icon} text-lg`}></i>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-zinc-100 text-sm group-hover:text-white">{tool.name}</h4>
                  <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${
                    tool.category === 'AI_TOOL' ? 'bg-purple-500/10 text-purple-400' :
                    tool.category === 'LEARNING' ? 'bg-emerald-500/10 text-emerald-400' :
                    tool.category === 'RESEARCH' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {tool.category.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8">
        <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-hourglass-start text-blue-500"></i>
          Time-to-Competency Guide (Strategic 2026)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-800">
              <tr className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                <th className="pb-4 px-4">Domain</th>
                <th className="pb-4 px-4">6–9 Months</th>
                <th className="pb-4 px-4">9–18 Months</th>
                <th className="pb-4 px-4">18–36 Months</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                { d: 'AI & ML', s1: 'Fundamentals + Python', s2: 'Deep Learning + MLOps', s3: 'Advanced GenAI / Leadership' },
                { d: 'Cloud Architecture', s1: 'Core + Associate Certs', s2: 'Professional Architect', s3: 'Multi-cloud Strategy' },
                { d: 'Cybersecurity', s1: 'Security+', s2: 'CISSP / CISM', s3: 'Cloud/Zero Trust Specialist' },
                { d: 'Data Analytics', s1: 'SQL + Analytics Basics', s2: 'Data Engineering', s3: 'Real-time & Big Data Lead' },
                { d: 'Software Eng', s1: 'Core Languages', s2: 'Full-stack + DevOps', s3: 'Architecture + SRE' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-zinc-200">{row.d}</td>
                  <td className="py-4 px-4 text-zinc-400">{row.s1}</td>
                  <td className="py-4 px-4 text-zinc-400">{row.s2}</td>
                  <td className="py-4 px-4 text-zinc-400">{row.s3}</td>
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
