
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
    if (
      selections.rendering === 'ssr' || 
      selections.framework === 'nextjs' || 
      selections.framework === 'fastapi' || 
      selections.cicd === 'github' ||
      selections.dynamic === 'managed'
    ) {
      setRecommendation('AppHosting');
    } else {
      setRecommendation('Hosting');
    }
  }, [selections]);

  const generateConfig = () => {
    if (selections.framework === 'fastapi') {
      return `# apphosting.yaml for FastAPI
kind: AppStack
customerRoot: /
runConfig:
  concurrency: 80
  cpu: 1
  memoryMiB: 512
env:
  - variable: MONGODB_URL
    secret: MONGODB_ATLAS_CONNECTION_STRING
  - variable: API_MODE
    value: production
buildSettings:
  runtime: python311`;
    }

    if (recommendation === 'AppHosting') {
      return `kind: AppStack
customerRoot: /
buildSettings:
  baseDirectory: .
  outputDirectory: .next
  runtime: nodejs20`;
    }

    return `{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}`;
  };

  const generateDockerfile = () => {
    if (selections.framework === 'fastapi') {
      return `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]`;
    }
    return `# Not required for standard Hosting
# App Hosting handles builds automatically for JS frameworks.`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-8 py-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">
          <i className="fa-solid fa-wand-magic-sparkles"></i> Cloud Architecture Forge
        </div>
        <h2 className="text-4xl font-extrabold text-white">The "Powerful Application" <span className="text-blue-500">Pattern</span></h2>
        <p className="text-zinc-400 text-lg max-w-3xl mx-auto font-medium">
          Deploying FastAPI + MongoDB? Use Firebase Hosting for the UI and App Hosting for the API.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] shadow-xl sticky top-24">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">Parameters Wizard</h3>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Stack Focus</label>
                <select 
                  value={selections.framework}
                  onChange={(e) => setSelections({...selections, framework: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3.5 text-sm text-zinc-200 outline-none focus:ring-2 focus:ring-blue-600 appearance-none shadow-inner"
                >
                  <option value="react">React Frontend (Firebase Hosting)</option>
                  <option value="fastapi">FastAPI Backend (App Hosting/Cloud Run)</option>
                  <option value="nextjs">Next.js Fullstack (App Hosting)</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Data Tier</label>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                  <i className="fa-solid fa-database text-emerald-500"></i>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-100">MongoDB Atlas</p>
                    <p className="text-[9px] text-zinc-500 uppercase">External Cluster</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-600 border border-blue-400 rounded-3xl shadow-2xl shadow-blue-600/20">
              <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1 opacity-80">Recommended Strategy</p>
              <p className="text-xl font-black text-white">{recommendation === 'Hosting' ? 'Firebase Hosting' : 'Firebase App Hosting'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-10">
          {/* Architecture Visualizer */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
             <div className="relative z-10 flex flex-col items-center gap-12">
                <div className="flex gap-12 items-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500">
                      <i className="fa-solid fa-globe text-2xl"></i>
                    </div>
                    <span className="text-[10px] font-black text-zinc-500">Frontend (Hosting)</span>
                  </div>
                  <i className="fa-solid fa-arrow-right-arrow-left text-zinc-700"></i>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center text-blue-500 shadow-2xl shadow-blue-500/20">
                      <i className="fa-solid fa-bolt text-3xl"></i>
                    </div>
                    <span className="text-[10px] font-black text-blue-500">FastAPI API (App Hosting)</span>
                  </div>
                  <i className="fa-solid fa-arrow-right-arrow-left text-zinc-700"></i>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <i className="fa-solid fa-database text-2xl"></i>
                    </div>
                    <span className="text-[10px] font-black text-zinc-500">MongoDB Atlas</span>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl max-w-md text-center">
                   <p className="text-xs text-zinc-400 font-medium">
                     "Firebase Hosting handles the static React build at the edge, while App Hosting runs your FastAPI container on Google Cloud Run for non-blocking database queries."
                   </p>
                </div>
             </div>
          </div>

          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-inner">
            <div className="px-8 py-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-file-code text-blue-500"></i>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">
                  Infrastructure Definition
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-r border-zinc-800">
                <div className="p-4 bg-zinc-800/50 text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800">apphosting.yaml</div>
                <pre className="p-6 font-mono text-[11px] text-blue-400 overflow-x-auto whitespace-pre">
                  <code>{generateConfig()}</code>
                </pre>
              </div>
              <div>
                <div className="p-4 bg-zinc-800/50 text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800">Dockerfile</div>
                <pre className="p-6 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre">
                  <code>{generateDockerfile()}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseArchitect;
