
import React from 'react';
import { LEARNING_PATHS } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">SkillForge <span className="text-blue-500">Command Center</span></h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            You are on the path to mastering high-demand technologies for 2026. 
            Architecture is live and projects are ready for deployment.
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
