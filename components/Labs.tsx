
import React, { useState, useEffect, useRef } from 'react';
import { LEARNING_PATHS } from '../constants';
import { getLabScenario, analyzeCode, getDebugTrace } from '../services/geminiService';
import { LabScenario, LabFeedback, LabMetrics, DebugState } from '../types';

type EnvPreset = 'node' | 'browser' | 'leetcode' | 'hackerrank';

const Labs: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState(LEARNING_PATHS[1]); // Default to Soft Eng
  const [scenario, setScenario] = useState<LabScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<'terminal' | 'debugger' | 'llmOutput'>('terminal');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['SkillForge Kernel v2.5 initialized...', 'Awaiting lab deployment...']);
  const [env, setEnv] = useState<EnvPreset>('node');
  const [code, setCode] = useState('// Write your solution here...\n\nfunction solve() {\n  let x = 10;\n  let y = 20;\n  let sum = x + y;\n  console.log("Sum is:", sum);\n  return sum;\n}\n\nsolve();');
  const [feedback, setFeedback] = useState<LabFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<LabMetrics>({ cpu: 12, memory: 450, latency: 45 });
  const [breakpoints, setBreakpoints] = useState<Set<number>>(new Set());
  
  // Debugger specific state
  const [debugTrace, setDebugTrace] = useState<DebugState[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isDebugLoading, setIsDebugLoading] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    if (activeTool === 'terminal') scrollToBottom();
  }, [terminalOutput, activeTool]);

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
    setTerminalOutput(prev => [...prev, `[SYSTEM] Bootstrapping ${env.toUpperCase()} environment...`]);
    try {
      const data = await getLabScenario(selectedPath.title, `Context: ${env}. Focus on ${selectedPath.skills[0]}.`);
      setScenario(data);
      setTerminalOutput(prev => [...prev, `[READY] Microcontainer online.`, `[TASK] ${data.title}`]);
      setActiveTool('terminal');
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[CRITICAL] Failed to allocate resources for lab.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDebug = async () => {
    if (!scenario) return;
    setIsDebugLoading(true);
    setActiveTool('debugger');
    try {
      const trace = await getDebugTrace(code, scenario.objective);
      setDebugTrace(trace);
      setCurrentStepIndex(0);
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] Debugger attachment failed. Check syntax.']);
    } finally {
      setIsDebugLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!scenario) return;
    setIsAnalyzing(true);
    setActiveTool('llmOutput');
    try {
      const result = await analyzeCode(code, scenario.objective);
      setFeedback(result);
      setTerminalOutput(prev => [...prev, `[INTEL] LLM analysis report generated.`]);
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] LLM reasoning engine timed out.']);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runCode = () => {
    setTerminalOutput(prev => [
      ...prev, 
      `$ ${env === 'node' ? 'node' : 'browser'} main.js`, 
      '[STDOUT] Execution complete.',
      '[HINT] Use "LLM Output" to check against lab objectives.'
    ]);
    setActiveTool('terminal');
  };

  const currentStep = currentStepIndex >= 0 ? debugTrace[currentStepIndex] : null;
  const lines = code.split('\n');

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-10rem)] max-w-[1600px] mx-auto">
      {/* Dynamic Workspace Header */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-800 ${selectedPath.color} shadow-lg shadow-black/20 border border-zinc-700`}>
              <i className={`fa-solid ${selectedPath.icon} text-lg`}></i>
            </div>
            <div>
               <span className="block text-xs font-black text-zinc-500 uppercase tracking-widest">Active Lab</span>
               <span className="font-bold text-zinc-100">{selectedPath.title}</span>
            </div>
          </div>
          <div className="h-10 w-px bg-zinc-800 hidden md:block"></div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Runtime:</span>
            <select 
              value={env} 
              onChange={(e) => setEnv(e.target.value as EnvPreset)}
              className="bg-transparent border-none outline-none text-[10px] font-black text-blue-400 cursor-pointer uppercase tracking-widest"
            >
              <option value="node" className="bg-zinc-900">Node.js</option>
              <option value="browser" className="bg-zinc-900">Browser</option>
              <option value="leetcode" className="bg-zinc-900">LeetCode</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button onClick={startLab} disabled={isLoading} className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-zinc-700/50">
            <i className={`fa-solid ${isLoading ? 'fa-spinner fa-spin' : 'fa-rocket'} text-blue-400`}></i> Deploy
          </button>
          <button onClick={handleStartDebug} disabled={isDebugLoading || !scenario} className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-zinc-700/50">
            <i className={`fa-solid ${isDebugLoading ? 'fa-spinner fa-spin' : 'fa-bug'} text-amber-500`}></i> Trace
          </button>
          <button onClick={handleAnalyze} disabled={isAnalyzing || !scenario} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2">
            <i className={`fa-solid ${isAnalyzing ? 'fa-spinner fa-spin' : 'fa-brain-circuit'}`}></i> LLM Output
          </button>
        </div>
      </div>

      {/* Main Engineering Split View */}
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Left: Editor and Task Detail */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-[#09090b] border border-zinc-800 rounded-[2rem] flex flex-col overflow-hidden relative shadow-inner">
            <div className="bg-zinc-900/80 px-6 py-3 border-b border-zinc-800 flex items-center justify-between backdrop-blur-sm sticky top-0 z-10">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-solid fa-code text-blue-500"></i> solution.js
              </span>
              <button onClick={runCode} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 hover:bg-emerald-500/20 rounded-lg flex items-center gap-2 transition-all">
                <i className="fa-solid fa-play text-[8px]"></i> RUN
              </button>
            </div>
            <div className="flex-1 flex overflow-hidden">
              <div className="bg-zinc-900/30 w-12 flex flex-col items-center py-6 border-r border-zinc-800 select-none">
                {lines.map((_, i) => (
                  <div key={i} onClick={() => toggleBreakpoint(i + 1)} className="h-6 w-full flex items-center justify-center cursor-pointer group">
                    <span className={`text-[9px] font-mono transition-colors ${currentStep?.line === i + 1 ? 'text-blue-400 font-bold bg-blue-500/10 w-full text-center' : 'text-zinc-700 group-hover:text-zinc-400'}`}>
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-transparent p-6 font-mono text-sm text-zinc-300 outline-none resize-none leading-6 scrollbar-hide"
                spellCheck={false}
              />
            </div>
          </div>
          
          {scenario && (
            <div className="bg-zinc-900/30 border border-zinc-800/50 p-5 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-left-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Current Objective</h4>
                <p className="text-xs text-zinc-200 font-bold">{scenario.title}</p>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{scenario.objective}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Specialized Tools Panel */}
        <div className="col-span-12 lg:col-span-5 flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="flex border-b border-zinc-800 bg-zinc-900/50">
            {[
              { id: 'terminal', label: 'Terminal', icon: 'fa-terminal' },
              { id: 'debugger', label: 'Debugger', icon: 'fa-bug' },
              { id: 'llmOutput', label: 'LLM Output', icon: 'fa-brain-circuit' }
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-r last:border-r-0 border-zinc-800 ${
                  activeTool === tool.id ? 'bg-zinc-800/80 text-blue-400 shadow-inner' : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/30'
                }`}
              >
                <i className={`fa-solid ${tool.icon} ${activeTool === tool.id ? 'text-blue-400' : 'text-zinc-700'}`}></i>
                {tool.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-7 bg-[#050507]">
            {activeTool === 'terminal' && (
              <div className="font-mono text-[11px] space-y-1.5 leading-relaxed">
                {terminalOutput.map((line, i) => (
                  <div key={i} className={`
                    ${line.startsWith('$') ? 'text-blue-500 font-bold' : 
                    line.startsWith('[ERROR]') || line.startsWith('[CRITICAL]') ? 'text-red-400' : 
                    line.startsWith('[READY]') || line.startsWith('[SUCCESS]') ? 'text-emerald-400' : 
                    line.startsWith('[TASK]') ? 'text-amber-400 italic' : 
                    'text-zinc-500'}
                  `}>
                    {line}
                  </div>
                ))}
                <div className="w-2 h-4 bg-blue-500/50 animate-pulse inline-block align-middle ml-1"></div>
                <div ref={terminalEndRef} />
              </div>
            )}

            {activeTool === 'debugger' && (
              <div className="space-y-6">
                {!debugTrace.length ? (
                  <div className="flex flex-col items-center justify-center h-64 text-zinc-700 italic text-[11px] text-center px-10">
                    <i className="fa-solid fa-code-branch text-3xl mb-4 opacity-20"></i>
                    {isDebugLoading ? 'Capturing execution trace...' : 'Click "Trace" to simulate logical flow and inspect scope variables.'}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-inner">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                          disabled={currentStepIndex === 0}
                          className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-700/50"
                        >
                          <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button 
                          onClick={() => setCurrentStepIndex(Math.min(debugTrace.length - 1, currentStepIndex + 1))}
                          disabled={currentStepIndex === debugTrace.length - 1}
                          className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-700/50"
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                      <div className="text-right">
                         <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">Step Pointer</span>
                         <span className="text-xs font-bold text-blue-400">{currentStepIndex + 1} / {debugTrace.length}</span>
                      </div>
                    </div>

                    {currentStep && (
                      <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-sm">
                          <h5 className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <i className="fa-solid fa-table-list"></i> Local Scope
                          </h5>
                          <div className="space-y-2">
                            {Object.entries(currentStep.variables).map(([k, v]) => (
                              <div key={k} className="flex justify-between font-mono text-[11px] border-b border-zinc-800/50 pb-1 last:border-0">
                                <span className="text-zinc-500">{k}</span>
                                <span className="text-emerald-400 font-bold">{v}</span>
                              </div>
                            ))}
                            {Object.keys(currentStep.variables).length === 0 && <span className="text-[10px] text-zinc-600 italic">No variables in scope.</span>}
                          </div>
                        </div>
                        
                        <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-sm">
                          <h5 className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <i className="fa-solid fa-layer-group"></i> Stack Trace
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {currentStep.callStack.map((frame, i) => (
                              <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-lg text-[10px] font-bold border border-zinc-700 shadow-sm">{frame}</span>
                            ))}
                          </div>
                        </div>

                        {currentStep.reason && (
                          <div className="p-4 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-2xl">
                             <p className="text-[11px] text-zinc-400 italic leading-relaxed">"{currentStep.reason}"</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTool === 'llmOutput' && (
              <div className="space-y-6">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-6 text-center px-10">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>
                      <i className="fa-solid fa-brain-circuit text-2xl text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] animate-pulse">Neural Synthesis Active</p>
                      <p className="text-[11px] text-zinc-600 italic">Validating implementation against lab objectives...</p>
                    </div>
                  </div>
                ) : feedback ? (
                  <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
                    <div className={`p-5 rounded-[1.5rem] border shadow-lg ${feedback.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : feedback.status === 'warning' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
                       <div className="flex items-center gap-3 mb-2">
                          <i className={`fa-solid ${feedback.status === 'success' ? 'fa-circle-check' : feedback.status === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-xmark'}`}></i>
                          <span className="text-[10px] font-black uppercase tracking-widest">{feedback.status} Assessment</span>
                       </div>
                       <p className="text-xs font-bold leading-relaxed">"{feedback.message}"</p>
                    </div>

                    <div className="space-y-3">
                       <h5 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">Intelligence Briefing</h5>
                       <div className="space-y-2">
                         {feedback.suggestions.map((s, i) => (
                           <div key={i} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-[11px] text-zinc-400 hover:border-blue-500/30 transition-all flex items-start gap-3">
                             <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-bold text-blue-500 mt-0.5 border border-blue-500/20 flex-shrink-0">{i + 1}</div>
                             <span className="leading-relaxed">{s}</span>
                           </div>
                         ))}
                       </div>
                    </div>

                    <div className="space-y-3">
                       <h5 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">Architectural Review</h5>
                       <div className="p-6 bg-black/40 border border-zinc-800 rounded-3xl text-[11px] text-zinc-500 leading-relaxed font-mono whitespace-pre-wrap shadow-inner">
                         {feedback.detailedReview}
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-zinc-700 italic text-[11px] text-center px-10">
                    <i className="fa-solid fa-microchip-ai text-3xl mb-4 opacity-20"></i>
                    Awaiting solution submission. Deploy a lab and write code to trigger the LLM Output engine.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Instance Metrics Sidebar Integration */}
          <div className="p-5 bg-zinc-900/80 border-t border-zinc-800 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-5 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className={`w-1 h-3 rounded-full ${metrics.cpu > 70 ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                CPU {metrics.cpu.toFixed(0)}%
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-emerald-500"></span>
                RAM {metrics.memory.toFixed(0)}MB
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-amber-500"></span>
                LAT {metrics.latency.toFixed(0)}ms
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Live Node</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
