
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
    // Logic to determine best fit
    if (selections.rendering === 'ssr' || selections.framework === 'nextjs' || selections.framework === 'angular' || selections.cicd === 'github') {
      setRecommendation('AppHosting');
    } else {
      setRecommendation('Hosting');
    }
  }, [selections]);

  const configPresets = {
    Hosting: `{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}`,
    AppHosting: `kind: AppStack
customerRoot: /
buildSettings:
  baseDirectory: .
  outputDirectory: .next
env:
  - variable: API_URL
    value: https://api.skillforge.ai`
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Configuration copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">
          <i className="fa-solid fa-wand-magic-sparkles"></i> Architectural Decision Engine
        </div>
        <h2 className="text-4xl font-extrabold text-white">Project Blueprint Designer</h2>
        <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
          Configure your requirements and let SkillForge AI architect the optimal Firebase infrastructure for your live environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration Wizard */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest mb-6 flex items-center gap-2">
              <i className="fa-solid fa-sliders text-blue-500"></i>
              Requirements Wizard
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-500 uppercase">Primary Rendering Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelections({...selections, rendering: 'spa'})}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${selections.rendering === 'spa' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
                  >
                    Client/SPA
                  </button>
                  <button 
                    onClick={() => setSelections({...selections, rendering: 'ssr'})}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${selections.rendering === 'ssr' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
                  >
                    Server/SSR
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-500 uppercase">Core Framework</label>
                <select 
                  value={selections.framework}
                  onChange={(e) => setSelections({...selections, framework: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
                >
                  <option value="react">React / Vite</option>
                  <option value="nextjs">Next.js (SSR)</option>
                  <option value="angular">Angular (Universal)</option>
                  <option value="vue">Vue / Nuxt</option>
                  <option value="static">Vanilla JS / HTML</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-500 uppercase">Deployment Strategy</label>
                <div className="space-y-2">
                  <div 
                    onClick={() => setSelections({...selections, cicd: 'cli'})}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${selections.cicd === 'cli' ? 'bg-zinc-800 border-blue-500' : 'bg-transparent border-zinc-800'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selections.cicd === 'cli' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                      <i className="fa-solid fa-terminal text-xs"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-200">Firebase CLI</p>
                      <p className="text-[10px] text-zinc-500">Manual or GitHub Actions</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => setSelections({...selections, cicd: 'github'})}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${selections.cicd === 'github' ? 'bg-zinc-800 border-blue-500' : 'bg-transparent border-zinc-800'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selections.cicd === 'github' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                      <i className="fa-brands fa-github text-xs"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-200">GitHub Managed</p>
                      <p className="text-[10px] text-zinc-500">Native Managed Infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter mb-1">Recommended Platform</p>
              <p className="text-lg font-black text-white">{recommendation === 'Hosting' ? 'Firebase Hosting' : 'Firebase App Hosting'}</p>
            </div>
          </div>
        </div>

        {/* Right: Live Guidance & Config */}
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed Feature Comparison */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-zinc-800/50 border-b border-zinc-700">
              <h3 className="text-sm font-bold text-zinc-200">Architectural Guidance Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-widest text-[10px]">
                    <th className="p-6">Feature</th>
                    <th className={`p-6 ${recommendation === 'Hosting' ? 'bg-blue-600/10 text-blue-400' : ''}`}>Hosting</th>
                    <th className={`p-6 ${recommendation === 'AppHosting' ? 'bg-blue-600/10 text-blue-400' : ''}`}>App Hosting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-6 font-bold text-zinc-200">Rendering</td>
                    <td className={`p-6 ${recommendation === 'Hosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>Client-Side (SPA)</td>
                    <td className={`p-6 ${recommendation === 'AppHosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>Server-Side (SSR) / Hybrid</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-6 font-bold text-zinc-200">CI/CD</td>
                    <td className={`p-6 ${recommendation === 'Hosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>GitHub Actions / CLI</td>
                    <td className={`p-6 ${recommendation === 'AppHosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>Native Managed GitHub Sync</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-6 font-bold text-zinc-200">Frameworks</td>
                    <td className={`p-6 ${recommendation === 'Hosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>Any Static Output</td>
                    <td className={`p-6 ${recommendation === 'AppHosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>Next.js, Angular (Deep Integration)</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-6 font-bold text-zinc-200">Dynamic Content</td>
                    <td className={`p-6 ${recommendation === 'Hosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>via Cloud Functions</td>
                    <td className={`p-6 ${recommendation === 'AppHosting' ? 'text-blue-300 font-semibold' : 'text-zinc-500'}`}>Built-in Server Logic</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Config Generator */}
          <div className="bg-[#09090b] border border-zinc-800 rounded-3xl overflow-hidden group">
            <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-file-code text-blue-500"></i>
                <h4 className="text-sm font-bold text-zinc-100">
                  {recommendation === 'Hosting' ? 'firebase.json' : 'apphosting.yaml'}
                </h4>
              </div>
              <button 
                onClick={() => handleCopy(configPresets[recommendation])}
                className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <i className="fa-solid fa-copy"></i> Copy Configuration
              </button>
            </div>
            <pre className="p-8 font-mono text-sm text-blue-400/90 leading-relaxed overflow-x-auto max-h-[400px]">
              <code>{configPresets[recommendation]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseArchitect;
