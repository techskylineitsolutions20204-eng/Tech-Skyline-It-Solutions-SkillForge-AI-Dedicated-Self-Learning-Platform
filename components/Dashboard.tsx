
import React from 'react';
import { LEARNING_PATHS } from '../constants';
import { useNav } from '../App';

const Dashboard: React.FC = () => {
  const { setActiveTab } = useNav();

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-10">
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Skyline Tech Innovation Hub 2026</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
              Master the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Intelligent Edge.</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed font-medium max-w-2xl">
              From foundational Python to advanced Agentic AI architectures. 
              We map elite industrial roadmaps into verifiable self-learning steps for students and professionals.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => setActiveTab('internship')}
              className="px-10 py-5 bg-white text-black rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-2xl shadow-white/5 active:scale-95"
            >
              Launch Industrial Syllabus
            </button>
            <button 
              onClick={() => setActiveTab('labs')}
              className="px-10 py-5 bg-zinc-900 border border-zinc-800 text-white rounded-2xl font-black text-lg transition-all hover:bg-zinc-800 border-zinc-700"
            >
              Explore Lab Ecosystems
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-zinc-800/50">
             {[
               { label: 'Competency Terms', val: '12' },
               { label: 'Lab Ecosystems', val: '20+' },
               { label: 'Verifiable Skills', val: '100+' },
               { label: 'Learner Success', val: '98%' },
             ].map((m, i) => (
               <div key={i} className="space-y-1">
                 <p className="text-3xl font-black text-white">{m.val}</p>
                 <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{m.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Primary Technical Tracks Grid */}
      <section className="px-8 py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
             <div className="space-y-3">
                <h2 className="text-3xl font-black text-white">Advanced Learning Paths</h2>
                <p className="text-zinc-500 font-medium">Curated competency targets for modern high-performance roles.</p>
             </div>
             <button 
              onClick={() => setActiveTab('paths')}
              className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2 hover:text-blue-400 transition-colors"
             >
                View All Paths <i className="fa-solid fa-arrow-right"></i>
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEARNING_PATHS.slice(0, 3).map((path) => (
              <div 
                key={path.id} 
                onClick={() => setActiveTab('paths')}
                className="p-10 bg-zinc-900 border border-zinc-800 rounded-[3rem] space-y-8 hover:border-blue-500/30 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-800 mb-6 border border-zinc-700 shadow-xl group-hover:scale-110 transition-transform ${path.color}`}>
                  <i className={`fa-solid ${path.icon} text-2xl`}></i>
                </div>
                
                <div className="space-y-3 relative">
                  <h3 className="text-2xl font-black text-white leading-tight">{path.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium italic">"{path.outlook}"</p>
                </div>

                <div className="space-y-3 relative">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Core Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.slice(0, 4).map(s => (
                      <span key={s} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-[9px] font-bold text-zinc-400 uppercase">{s}</span>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Access Blueprint
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Integration Visual */}
      <section className="px-8 py-24">
        <div className="max-w-7xl mx-auto bg-zinc-900 border border-zinc-800 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Self-Learning with <br />
                <span className="text-blue-500">Live Lab Access.</span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                We aggregate the world's most powerful free practice environments. 
                Whether it's AWS Skill Builder, GCP Skills Boost, or Codecademy, 
                we integrate them directly into your term-by-term roadmap.
              </p>
              <ul className="space-y-4">
                {[
                  'Unified 12-Term Engineering Syllabus',
                  'One-click access to industrial lab consoles',
                  'Gemini AI-powered technical feedback',
                  'Strategic Firebase architecture guidance'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold text-zinc-300">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                      <i className="fa-solid fa-check text-[10px]"></i>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setActiveTab('labs')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-600/20"
              >
                Launch Active Simulator
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-[4rem] blur-2xl"></div>
              <div className="relative bg-zinc-950 border border-zinc-800 rounded-[3rem] p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Kernel Simulation</span>
                </div>
                <div className="space-y-4 font-mono text-xs text-blue-400/80">
                  <p><span className="text-zinc-600"># Initializing lab environment...</span></p>
                  <p><span className="text-emerald-500">$</span> deploy --target cloud-infra-v4</p>
                  <p className="text-zinc-500">>> Resource allocated: AWS EC2 micro</p>
                  <p className="text-zinc-500">>> Environment: Python 3.12, Node 22</p>
                  <p><span className="text-emerald-500">$</span> skyline verify-competency term-1</p>
                  <p className="text-white font-bold">STATUS: READY</p>
                  <div className="pt-4 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-blue-600 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
