
import React, { useState, useEffect } from 'react';
import { FIREBASE_STRATEGIES } from '../constants';

const FirebaseArchitect: React.FC = () => {
  const [selections, setSelections] = useState({
    rendering: 'spa',
    framework: 'react',
    cicd: 'cli',
    dynamic: 'functions'
  });

  const [recommendation, setRecommendation] = useState<'Hosting' | 'AppHosting'>('Hosting');

  useEffect(() => {
    // Decision logic based on user prompt criteria
    if (
      selections.rendering === 'ssr' || 
      selections.framework === 'nextjs' || 
      selections.framework === 'angular' || 
      selections.cicd === 'github' ||
      selections.dynamic === 'managed'
    ) {
      setRecommendation('AppHosting');
    } else {
      setRecommendation('Hosting');
    }
  }, [selections]);

  const generateConfig = () => {
    if (recommendation === 'AppHosting') {
      if (selections.framework === 'nextjs') {
        return `kind: AppStack
customerRoot: /
buildSettings:
  baseDirectory: .
  outputDirectory: .next
  runtime: nodejs20
env:
  - variable: API_URL
    value: https://api.skillforge.ai
  - variable: NEXT_PUBLIC_FIREBASE_PROJECT
    value: skillforge-prod`;
      } else if (selections.framework === 'angular') {
        return `kind: AppStack
customerRoot: /
buildSettings:
  baseDirectory: .
  outputDirectory: dist/my-angular-app/browser
  buildCommand: ng build
env:
  - variable: PROJECT_ID
    value: skillforge-angular-prod`;
      }
      return `kind: AppStack
customerRoot: /
buildSettings:
  baseDirectory: .
  outputDirectory: build`;
    }

    // Default Firebase Hosting JSON
    return `{
  "hosting": {
    "public": "${selections.framework === 'react' ? 'dist' : 'public'}",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs20"
  }
}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Real-time configuration copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">
          <i className="fa-solid fa-wand-magic-sparkles"></i> Live Decision Engine
        </div>
        <h2 className="text-4xl font-extrabold text-white">Cloud Architecture <span className="text-blue-500">Forge</span></h2>
        <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
          Map your technical requirements to the perfect Firebase environment. Guidance is real-time and granular.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Wizard */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] shadow-xl sticky top-24">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <i className="fa-solid fa-sliders text-blue-500"></i>
              Parameters Wizard
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Rendering Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelections({...selections, rendering: 'spa'})}
                    className={`px-4 py-3 rounded-2xl text-[11px] font-bold border transition-all ${selections.rendering === 'spa' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}
                  >
                    Client (SPA)
                  </button>
                  <button 
                    onClick={() => setSelections({...selections, rendering: 'ssr'})}
                    className={`px-4 py-3 rounded-2xl text-[11px] font-bold border transition-all ${selections.rendering === 'ssr' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}
                  >
                    Server (SSR)
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Target Framework</label>
                <select 
                  value={selections.framework}
                  onChange={(e) => setSelections({...selections, framework: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3.5 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-blue-600 appearance-none shadow-inner"
                >
                  <option value="react">React (Vite)</option>
                  <option value="nextjs">Next.js (Managed SSR)</option>
                  <option value="angular">Angular (Native Sync)</option>
                  <option value="vue">Vue / Nuxt</option>
                  <option value="static">Pure Vanilla / HTML</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Dynamic Logic Location</label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSelections({...selections, dynamic: 'functions'})}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex items-center gap-4 ${selections.dynamic === 'functions' ? 'bg-zinc-800 border-blue-500' : 'bg-transparent border-zinc-800'}`}
                  >
                    <i className={`fa-solid fa-server ${selections.dynamic === 'functions' ? 'text-blue-500' : 'text-zinc-700'}`}></i>
                    <div>
                      <p className="text-[11px] font-bold text-zinc-100">Separated (Cloud Functions)</p>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Microservices Architecture</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setSelections({...selections, dynamic: 'managed'})}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex items-center gap-4 ${selections.dynamic === 'managed' ? 'bg-zinc-800 border-blue-500' : 'bg-transparent border-zinc-800'}`}
                  >
                    <i className={`fa-solid fa-cloud-bolt ${selections.dynamic === 'managed' ? 'text-blue-500' : 'text-zinc-700'}`}></i>
                    <div>
                      <p className="text-[11px] font-bold text-zinc-100">Integrated (Server Logic)</p>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest">App Hosting Native Compute</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-600 border border-blue-400 rounded-3xl shadow-2xl shadow-blue-600/20 transform hover:scale-[1.02] transition-transform">
              <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1 opacity-80">AI Recommended Suite</p>
              <p className="text-xl font-black text-white">{recommendation === 'Hosting' ? 'Firebase Hosting' : 'Firebase App Hosting'}</p>
            </div>
          </div>
        </div>

        {/* Right: Detailed Real-time Comparison Matrix */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="px-8 py-5 bg-zinc-800/50 border-b border-zinc-700 flex justify-between items-center">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Live Architectural Mapping</h3>
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-600 font-black uppercase tracking-[0.2em] text-[10px]">
                    <th className="p-8">Feature</th>
                    <th className={`p-8 transition-colors ${recommendation === 'Hosting' ? 'bg-blue-600/10 text-blue-400' : 'text-zinc-500'}`}>Hosting</th>
                    <th className={`p-8 transition-colors ${recommendation === 'AppHosting' ? 'bg-blue-600/10 text-blue-400' : 'text-zinc-500'}`}>App Hosting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="p-8 font-bold text-zinc-200">Rendering</td>
                    <td className={`p-8 ${recommendation === 'Hosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>Client-Side (SPA)</td>
                    <td className={`p-8 ${recommendation === 'AppHosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>SSR / Hybrid / Dynamic</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="p-8 font-bold text-zinc-200">CI/CD Flow</td>
                    <td className={`p-8 ${recommendation === 'Hosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>GitHub Actions / Manual CLI</td>
                    <td className={`p-8 ${recommendation === 'AppHosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>Native Managed GitHub Sync</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="p-8 font-bold text-zinc-200">Framework Focus</td>
                    <td className={`p-8 ${recommendation === 'Hosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>Any Static Build Artifacts</td>
                    <td className={`p-8 ${recommendation === 'AppHosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>Next.js & Angular (Deep)</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="p-8 font-bold text-zinc-200">Dynamic Logic</td>
                    <td className={`p-8 ${recommendation === 'Hosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>via Serverless Functions</td>
                    <td className={`p-8 ${recommendation === 'AppHosting' ? 'text-blue-300 font-bold' : 'text-zinc-600'}`}>Built-in Server Compute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Granular Code Generation */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-[2.5rem] overflow-hidden group shadow-inner">
            <div className="px-8 py-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-code-merge text-blue-500"></i>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">
                  {recommendation === 'Hosting' ? 'firebase.json' : 'apphosting.yaml'}
                </h4>
              </div>
              <button 
                onClick={() => handleCopy(generateConfig())}
                className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-[0.2em] flex items-center gap-3 transition-colors px-4 py-2 bg-zinc-800/50 rounded-xl"
              >
                <i className="fa-solid fa-copy"></i> Copy Config
              </button>
            </div>
            <pre className="p-10 font-mono text-xs lg:text-sm text-blue-400/90 leading-relaxed overflow-x-auto max-h-[500px] bg-black/40">
              <code>{generateConfig()}</code>
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] hover:border-zinc-700 transition-all">
              <i className="fa-solid fa-circle-info text-blue-500 mb-4 text-xl"></i>
              <h4 className="font-bold text-white mb-2">Platform Selection Insight</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {recommendation === 'AppHosting' 
                  ? "Based on your focus on Next.js/SSR or GitHub integration, App Hosting is mandated for unified performance." 
                  : "Firebase Hosting is the leaner, faster choice for static-optimized applications with microservices logic."}
              </p>
            </div>
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] hover:border-zinc-700 transition-all">
              <i className="fa-solid fa-rocket text-emerald-500 mb-4 text-xl"></i>
              <h4 className="font-bold text-white mb-2">Ready to Deploy?</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Use the Blaze billing plan to access multi-regional infrastructure and scale to millions of concurrent users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseArchitect;
