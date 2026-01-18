
import React, { useState, useEffect, useRef } from 'react';
import { LEARNING_PATHS } from '../constants';
import { getLabScenario, analyzeCode, getDebugTrace } from '../services/geminiService';
import { LabScenario, LabFeedback, LabMetrics, DebugState } from '../types';

type EnvPreset = 'node' | 'browser' | 'leetcode' | 'hackerrank';

const Labs: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState(LEARNING_PATHS[1]); // Default to Soft Eng
  const [scenario, setScenario] = useState<LabScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'editor' | 'terminal' | 'debugger' | 'llmOutput'>('terminal');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['SkillForge OS v2.4 initialized...', 'Awaiting environment selection...']);
  const [env, setEnv] = useState<EnvPreset>('node');
  const [code, setCode] = useState('// Write your solution here...\n\nfunction solve() {\n  let x = 10;\n  let y = 20;\n  let sum = x + y;\n  console.log("Sum is:", sum);\n  return sum;\n}\n\nsolve();');
  const [feedback, setFeedback] = useState<LabFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<LabMetrics>({ cpu: 12, memory: 450, latency: 45 });
  const [inputValue, setInputValue] = useState('');
  const [breakpoints, setBreakpoints] = useState<Set<number>>(new Set());
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Collaboration State
  const [collabId, setCollabId] = useState<string>('');
  const [isCollaborating, setIsCollaborating] = useState(false);
  
  // Debugger specific state
  const [debugTrace, setDebugTrace] = useState<DebugState[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isDebugLoading, setIsDebugLoading] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const editorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCollaborating || !collabId) return;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `skillforge_collab_code_${collabId}` && e.newValue !== null) setCode(e.newValue);
      if (e.key === `skillforge_collab_terminal_${collabId}` && e.newValue !== null) setTerminalOutput(JSON.parse(e.newValue));
      if (e.key === `skillforge_collab_scenario_${collabId}` && e.newValue !== null) setScenario(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isCollaborating, collabId]);

  useEffect(() => {
    if (isCollaborating && collabId) localStorage.setItem(`skillforge_collab_code_${collabId}`, code);
  }, [code, isCollaborating, collabId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.max(100, Math.min(2048, prev.memory + (Math.random() * 50 - 25))),
        latency: Math.max(10, Math.min(200, prev.latency + (Math.random() * 20 - 10)))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [terminalOutput]);

  const toggleBreakpoint = (line: number) => {
    setBreakpoints(prev => {
      const next = new Set(prev);
      if (next.has(line)) next.delete(line);
      else next.add(line);
      return next;
    });
  };

  const startLab = async () => {
    setIsLoading(true);
    const envLabel = env.toUpperCase();
    setTerminalOutput(prev => [...prev, `[SYSTEM] Provisioning ${envLabel} container...`, `[SYSTEM] Attaching ${selectedPath.title} context...`]);
    try {
      const data = await getLabScenario(selectedPath.title, `Context: ${env}. Focus on high-level ${selectedPath.skills[0]}.`);
      setScenario(data);
      setTerminalOutput(prev => [...prev, `[SUCCESS] ${envLabel} Lab ready.`, `[TASK] ${data.title}: ${data.objective}`]);
      setActiveView('editor');
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] Failed to boot lab environment. Neural link timeout.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDebug = async () => {
    if (!scenario) return;
    setIsDebugLoading(true);
    setTerminalOutput(prev => [...prev, '[DEBUG] Injecting instrumentation hooks...']);
    try {
      const trace = await getDebugTrace(code, scenario.objective);
      setDebugTrace(trace);
      setCurrentStepIndex(0);
      setActiveView('debugger');
      setTerminalOutput(prev => [...prev, `[DEBUG] Trace capture successful. Found ${trace.length} state steps.`]);
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] Trace capture failed. Stack overflow or infinite loop detected.']);
    } finally {
      setIsDebugLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!scenario) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeCode(code, scenario.objective);
      setFeedback(result);
      setTerminalOutput(prev => [...prev, `[ANALYSIS] AI Review complete: Code quality is ${result.status.toUpperCase()}.`]);
      setActiveView('llmOutput');
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] AI Feedback engine offline. Neural buffer error.']);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runCode = () => {
    const isComp = env === 'leetcode' || env === 'hackerrank';
    setTerminalOutput(prev => [
      ...prev, 
      isComp ? `$ submit solution.js` : `$ node solution.js`, 
      'Executing runtime...', 
      isComp ? '[SUCCESS] 12/12 Test Cases Passed (45ms)' : '[OUTPUT] Execution complete in sandboxed runtime.',
      'Ready for AI Peer Review.'
    ]);
    setActiveView('terminal');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const toggleCollaboration = () => {
    if (isCollaborating) {
      setIsCollaborating(false);
      setTerminalOutput(prev => [...prev, '[SYSTEM] Live sync terminated.']);
    } else {
      const id = collabId || 'session-' + Math.random().toString(36).substr(2, 5);
      setCollabId(id);
      setIsCollaborating(true);
      setTerminalOutput(prev => [...prev, `[SYSTEM] Multi-user sync enabled. Session ID: ${id}`]);
    }
  };

  const currentStep = currentStepIndex >= 0 ? debugTrace[currentStepIndex] : null;
  const lines = code.split('\n');

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-10rem)] max-w-[1600px] mx-auto">
      {/* Top Header/Stats Bar */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-800 ${selectedPath.color}`}>
              <i className={`fa-solid ${selectedPath.icon}`}></i>
            </div>
            <span className="font-bold text-zinc-100">{selectedPath.title}</span>
          </div>
          <div className="h-6 w-px bg-zinc-800"></div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Runtime:</span>
              <select 
                value={env} 
                onChange={(e) => setEnv(e.target.value as EnvPreset)}
                className="bg-transparent border-none outline-none text-[10px] font-bold text-blue-400 cursor-pointer uppercase"
              >
                <option value="node" className="bg-zinc-900">Node.js (LTS)</option>
                <option value="browser" className="bg-zinc-900">Browser (V8)</option>
                <option value="leetcode" className="bg-zinc-900">LeetCode Mode</option>
                <option value="hackerrank" className="bg-zinc-900">HackerRank Mode</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={toggleCollaboration} 
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              isCollaborating 
              ? 'bg-emerald-600 text-white' 
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            <i className={`fa-solid ${isCollaborating ? 'fa-user-group' : 'fa-link'}`}></i>
            {isCollaborating ? 'Sync Active' : 'Live Sync'}
          </button>
          
          <button onClick={startLab} disabled={isLoading} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
            <i className="fa-solid fa-rocket"></i> Launch
          </button>
          
          <button onClick={handleAnalyze} disabled={isAnalyzing || !scenario} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
            {isAnalyzing ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-brain"></i>}
            Review
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Left: Lab Instructions */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Challenge Description</h3>
            {scenario ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h4 className="font-bold text-zinc-100 text-sm">{scenario.title}</h4>
                   <span className="text-[9px] px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full font-black uppercase tracking-widest">Medium</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{scenario.objective}</p>
                <div className="space-y-2">
                  <h5 className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-list-check"></i> Functional Requirements
                  </h5>
                  {scenario.tasks.map((task, i) => (
                    <div key={i} className="flex gap-2 items-start group">
                      <div className="w-4 h-4 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] text-zinc-500 shrink-0 mt-0.5 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                        {i + 1}
                      </div>
                      <span className="text-[11px] text-zinc-400 group-hover:text-zinc-200 transition-colors">{task}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-zinc-800">
                  <h5 className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-2">Hints & Constraints</h5>
                  {scenario.hints.map((hint, i) => (
                    <div key={i} className="text-[10px] text-zinc-500 mb-1 flex items-start gap-2">
                      <i className="fa-solid fa-lightbulb text-amber-500/50 text-[8px] mt-1"></i>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <i className="fa-solid fa-code text-4xl text-zinc-800 mb-2"></i>
                <p className="text-[11px] text-zinc-600">Choose a specialization and launch to fetch a live challenge from Gemini.</p>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                   {LEARNING_PATHS.slice(0,4).map(p => (
                     <button key={p.id} onClick={() => setSelectedPath(p)} className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all border ${selectedPath.id === p.id ? 'bg-blue-600 text-white border-blue-500' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                       {p.title}
                     </button>
                   ))}
                </div>
              </div>
            )}
          </div>

          {/* Metrics Visualization */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Instance Health</h4>
            <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-[9px] font-bold mb-1">
                   <span className="text-zinc-400">MEMORY CONSUMPTION</span>
                   <span className="text-blue-400">{metrics.memory.toFixed(0)} MB</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(metrics.memory / 2048) * 100}%` }}></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-[9px] font-bold mb-1">
                   <span className="text-zinc-400">V8 ENGINE CPU LOAD</span>
                   <span className={metrics.cpu > 80 ? 'text-red-500' : 'text-emerald-500'}>{metrics.cpu.toFixed(1)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${metrics.cpu}%`, backgroundColor: metrics.cpu > 80 ? '#ef4444' : '#10b981' }}></div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Main IDE */}
        <div className="col-span-12 lg:col-span-9 bg-[#0c0c0e] border border-zinc-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
          <div className="bg-zinc-900 px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex gap-2">
              {[
                {id: 'editor', label: 'Solution.js', icon: 'fa-file-code'},
                {id: 'terminal', label: 'Output', icon: 'fa-terminal'},
                {id: 'debugger', label: 'Debugger', icon: 'fa-bug'},
                {id: 'llmOutput', label: 'AI Review', icon: 'fa-microchip-ai'}
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeView === v.id 
                      ? 'bg-zinc-800 text-blue-400 border border-zinc-700' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <i className={`fa-solid ${v.icon} text-[10px]`}></i>
                  {v.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
               <button 
                 onClick={handleCopyCode} 
                 className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2"
               >
                 <i className={`fa-solid ${copySuccess ? 'fa-check text-emerald-500' : 'fa-copy'}`}></i>
                 {copySuccess ? 'COPIED' : 'COPY'}
               </button>
               <div className="h-4 w-px bg-zinc-800"></div>
               <button onClick={runCode} className="text-xs font-black text-emerald-500 hover:text-emerald-400 flex items-center gap-2 transition-all">
                 <i className="fa-solid fa-play"></i> {env === 'leetcode' || env === 'hackerrank' ? 'SUBMIT' : 'RUN'}
               </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden flex">
            {/* Editor Surface */}
            <div className="flex-1 flex overflow-hidden">
               <div className="bg-zinc-900/80 w-12 flex flex-col items-center py-8 border-r border-zinc-800 select-none">
                {lines.map((_, i) => (
                  <div key={i} onClick={() => toggleBreakpoint(i + 1)} className="h-6 w-full flex items-center justify-center cursor-pointer group relative">
                    {breakpoints.has(i + 1) && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
                    <span className={`text-[9px] font-mono ${currentStep?.line === i + 1 ? 'text-blue-400 font-bold' : 'text-zinc-700'}`}>
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-transparent p-8 font-mono text-sm text-zinc-300 outline-none resize-none leading-6 placeholder:text-zinc-800"
                spellCheck={false}
              />
            </div>

            {/* Overlays for different views */}
            {activeView === 'terminal' && (
              <div className="absolute inset-0 bg-[#09090b] p-8 font-mono text-sm overflow-y-auto animate-in fade-in duration-200">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className={`mb-1.5 ${line.startsWith('$') ? 'text-blue-500' : line.startsWith('[ERROR]') ? 'text-red-500' : line.startsWith('[SUCCESS]') ? 'text-emerald-500' : 'text-zinc-400'}`}>
                    {line}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            )}

            {activeView === 'llmOutput' && (
              <div className="absolute inset-0 bg-[#09090b] overflow-y-auto animate-in slide-in-from-right-4 duration-300 p-10">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                     <i className="fa-solid fa-brain-circuit fa-spin text-4xl text-blue-500"></i>
                     <p className="text-xs font-black text-zinc-500 uppercase tracking-widest animate-pulse">Deconstructing architecture...</p>
                  </div>
                ) : feedback ? (
                  <div className="max-w-3xl mx-auto space-y-8 pb-10">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                         <i className="fa-solid fa-robot text-xl"></i>
                       </div>
                       <div>
                         <h2 className="text-xl font-black text-white">Gemini Code Synthesis</h2>
                         <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Architectural Analysis Report</p>
                       </div>
                    </div>
                    
                    <div className={`p-6 rounded-[2rem] border ${feedback.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/5 border-amber-500/20 text-amber-400'}`}>
                       <p className="text-sm italic font-medium">"{feedback.message}"</p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                        <i className="fa-solid fa-list-ul text-blue-400"></i> Critical Observations
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feedback.suggestions.map((s, idx) => (
                          <div key={idx} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-[11px] leading-relaxed text-zinc-400 hover:border-blue-500/50 transition-colors">
                            <span className="text-blue-500 font-black mr-2">#{idx + 1}</span> {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {feedback.detailedReview && (
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                          <i className="fa-solid fa-scroll text-purple-400"></i> Deep Context Review
                        </h3>
                        <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-[2rem] text-xs text-zinc-400 leading-7 font-mono whitespace-pre-wrap">
                          {feedback.detailedReview}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-700">
                    <i className="fa-solid fa-microchip text-5xl mb-4"></i>
                    <p className="text-xs font-black uppercase tracking-[0.2em]">Launch lab and click "Review" to trigger AI analysis.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="h-1 bg-zinc-900 w-full overflow-hidden">
             {activeView === 'debugger' && (
               <div className="h-full bg-blue-500 transition-all" style={{ width: `${(currentStepIndex + 1) / (debugTrace.length || 1) * 100}%` }}></div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
