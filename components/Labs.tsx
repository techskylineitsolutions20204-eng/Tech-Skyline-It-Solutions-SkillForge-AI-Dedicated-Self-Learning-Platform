
import React, { useState, useEffect, useRef } from 'react';
import { LEARNING_PATHS } from '../constants';
import { getLabScenario, analyzeCode, getDebugTrace } from '../services/geminiService';
import { LabScenario, LabFeedback, LabMetrics, DebugState } from '../types';

const Labs: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState(LEARNING_PATHS[0]);
  const [scenario, setScenario] = useState<LabScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'editor' | 'terminal' | 'debugger' | 'llmOutput'>('terminal');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['System boot successful...', 'Waiting for lab selection...']);
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

  // Sync with other tabs for collaboration
  useEffect(() => {
    if (!isCollaborating || !collabId) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `skillforge_collab_code_${collabId}` && e.newValue !== null) {
        setCode(e.newValue);
      }
      if (e.key === `skillforge_collab_terminal_${collabId}` && e.newValue !== null) {
        setTerminalOutput(JSON.parse(e.newValue));
      }
      if (e.key === `skillforge_collab_scenario_${collabId}` && e.newValue !== null) {
        setScenario(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isCollaborating, collabId]);

  // Update storage when local state changes (only if collaborating)
  useEffect(() => {
    if (isCollaborating && collabId) {
      localStorage.setItem(`skillforge_collab_code_${collabId}`, code);
    }
  }, [code, isCollaborating, collabId]);

  useEffect(() => {
    if (isCollaborating && collabId) {
      localStorage.setItem(`skillforge_collab_terminal_${collabId}`, JSON.stringify(terminalOutput));
    }
  }, [terminalOutput, isCollaborating, collabId]);

  useEffect(() => {
    if (isCollaborating && collabId && scenario) {
      localStorage.setItem(`skillforge_collab_scenario_${collabId}`, JSON.stringify(scenario));
    }
  }, [scenario, isCollaborating, collabId]);

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

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalOutput]);

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
    setTerminalOutput(prev => [...prev, `Initializing ${selectedPath.title} environment...`, 'Fetching live lab assets from Gemini Cloud...']);
    try {
      const data = await getLabScenario(selectedPath.title, selectedPath.skills[0]);
      setScenario(data);
      setTerminalOutput(prev => [...prev, `[SUCCESS] Lab "${data.title}" initialized.`, `Objective: ${data.objective}`]);
      setActiveView('editor');
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] Failed to boot lab environment. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDebug = async () => {
    if (!scenario) return;
    setIsDebugLoading(true);
    setTerminalOutput(prev => [...prev, '[DEBUG] Starting simulated execution trace...']);
    try {
      const trace = await getDebugTrace(code, scenario.objective);
      setDebugTrace(trace);
      setCurrentStepIndex(0);
      setActiveView('debugger');
      setTerminalOutput(prev => [...prev, `[DEBUG] Trace generated with ${trace.length} steps.`]);
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] Failed to generate debug trace.']);
    } finally {
      setIsDebugLoading(false);
    }
  };

  const stepForward = () => {
    if (currentStepIndex < debugTrace.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleResume = () => {
    if (currentStepIndex >= debugTrace.length - 1) return;
    
    let nextIdx = currentStepIndex + 1;
    while (nextIdx < debugTrace.length - 1) {
      if (breakpoints.has(debugTrace[nextIdx].line)) {
        break;
      }
      nextIdx++;
    }
    setCurrentStepIndex(nextIdx);
    setTerminalOutput(prev => [...prev, `[DEBUG] Resumed until breakpoint or end.`]);
  };

  const handleAnalyze = async () => {
    if (!scenario) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeCode(code, scenario.objective);
      setFeedback(result);
      setTerminalOutput(prev => [...prev, `[ANALYSIS] AI Review complete: ${result.message}`]);
      setActiveView('llmOutput');
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] AI Feedback engine offline.']);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runCode = () => {
    setTerminalOutput(prev => [...prev, '$ node solution.js', 'Executing...', '[OUTPUT] Code execution simulated successfully.', 'Ready for AI Feedback Review.']);
    setActiveView('terminal');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTerminalOutput(prev => [...prev, `$ ${inputValue}`]);
    const cmd = inputValue.toLowerCase();
    if (cmd === 'help') setTerminalOutput(prev => [...prev, 'Available: help, status, hints, clear, submit, analyze, debug']);
    else if (cmd === 'debug') handleStartDebug();
    else if (cmd === 'clear') setTerminalOutput(['Terminal cleared.']);
    else setTerminalOutput(prev => [...prev, `Command '${cmd}' processed in sandbox.`]);
    setInputValue('');
  };

  const toggleCollaboration = () => {
    if (isCollaborating) {
      setIsCollaborating(false);
      setTerminalOutput(prev => [...prev, '[SYSTEM] Collaboration mode disabled.']);
    } else {
      const id = collabId || 'default-session';
      setCollabId(id);
      setIsCollaborating(true);
      setTerminalOutput(prev => [...prev, `[SYSTEM] Collaboration enabled. Session ID: ${id}. Open this app in another tab to see real-time syncing.`]);
    }
  };

  const currentStep = currentStepIndex >= 0 ? debugTrace[currentStepIndex] : null;
  const previousStep = currentStepIndex > 0 ? debugTrace[currentStepIndex - 1] : null;
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
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">CPU Load</span>
              <span className={`text-xs font-mono font-bold ${metrics.cpu > 80 ? 'text-red-500' : 'text-emerald-500'}`}>{metrics.cpu.toFixed(1)}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Mem Usage</span>
              <span className="text-xs font-mono font-bold text-blue-400">{metrics.memory.toFixed(0)}MB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Net Latency</span>
              <span className="text-xs font-mono font-bold text-amber-500">{metrics.latency.toFixed(0)}ms</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-zinc-800/50 p-1 rounded-xl border border-zinc-700/50 mr-2">
            <input 
              type="text" 
              placeholder="Session ID" 
              value={collabId} 
              onChange={(e) => setCollabId(e.target.value)}
              disabled={isCollaborating}
              className="bg-transparent border-none outline-none text-[10px] font-bold text-zinc-300 w-24 px-2"
            />
            <button 
              onClick={toggleCollaboration} 
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                isCollaborating 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              <i className={`fa-solid ${isCollaborating ? 'fa-user-group' : 'fa-link'}`}></i>
              {isCollaborating ? 'Live' : 'Collab'}
            </button>
          </div>
          <button onClick={startLab} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
            <i className="fa-solid fa-rotate-right"></i> Reset
          </button>
          <button onClick={handleStartDebug} disabled={isDebugLoading || !scenario} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
            {isDebugLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-bug"></i>}
            Debug
          </button>
          <button onClick={handleAnalyze} disabled={isAnalyzing || !scenario} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
            {isAnalyzing ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-brain"></i>}
            Review
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Left: Lab Instructions & Path Picker */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-y-auto pr-2">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Domain Lab Access</h3>
            <div className="grid grid-cols-1 gap-2 mb-6">
              {LEARNING_PATHS.map((p) => (
                <button 
                  key={p.id} 
                  onClick={() => setSelectedPath(p)} 
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all border ${
                    selectedPath.id === p.id 
                      ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                      : 'bg-zinc-900/30 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <i className={`fa-solid ${p.icon} w-4 text-center text-xs`}></i>
                  <span className="text-[11px] font-medium truncate">{p.title}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Instructions {isCollaborating && <span className="text-emerald-500 ml-1 text-[8px]">(SYNCED)</span>}</h3>
              {scenario ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-zinc-100 text-sm mb-1">{scenario.title}</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{scenario.objective}</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">Mission Tasks</h5>
                    {scenario.tasks.map((task, i) => (
                      <div key={i} className="flex gap-2 items-start group">
                        <div className="w-4 h-4 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] text-zinc-500 shrink-0 mt-0.5 group-hover:bg-blue-600/20 group-hover:text-blue-400">
                          {i + 1}
                        </div>
                        <span className="text-[11px] text-zinc-400 group-hover:text-zinc-200 transition-colors">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                  <i className="fa-solid fa-code text-3xl text-zinc-800"></i>
                  <p className="text-[11px] text-zinc-600">Pick a domain and hit "Launch Environment" to begin simulation.</p>
                  <button onClick={startLab} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all">Launch Environment</button>
                </div>
              )}
            </div>
          </div>

          {/* Debugger Panels */}
          {activeView === 'debugger' && currentStep && (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-blue-500"></i>
                  Watch Variables
                </h4>
                <div className="space-y-1.5">
                  {Object.entries(currentStep.variables).length > 0 ? (
                    Object.entries(currentStep.variables).map(([name, val]) => {
                      const prevVal = previousStep?.variables[name];
                      const isChanged = prevVal !== undefined && prevVal !== val;
                      return (
                        <div key={name} className="flex justify-between items-center text-[11px] p-2 rounded bg-zinc-950/50 border border-zinc-800/50">
                          <span className="font-mono text-zinc-400">{name}</span>
                          <span className={`font-mono transition-all duration-300 ${isChanged ? 'text-amber-400 font-bold' : 'text-blue-400'}`}>
                            {val}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-[10px] text-zinc-600 italic">Scope clear.</p>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-purple-500"></i>
                  Call Stack
                </h4>
                <div className="space-y-1">
                  {currentStep.callStack.slice().reverse().map((fn, i) => (
                    <div key={i} className={`flex items-center gap-2 text-[11px] p-1.5 rounded ${i === 0 ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' : 'text-zinc-500'}`}>
                      <i className={`fa-solid ${i === 0 ? 'fa-arrow-right-to-bracket' : 'fa-square-caret-right'} text-[9px]`}></i>
                      <span className="font-mono">{fn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {feedback && activeView !== 'debugger' && (
            <div className={`bg-zinc-900 border rounded-2xl p-5 animate-in slide-in-from-left-4 ${
              feedback.status === 'success' ? 'border-emerald-500/30' : 
              feedback.status === 'warning' ? 'border-amber-500/30' : 'border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <i className={`fa-solid ${
                  feedback.status === 'success' ? 'fa-circle-check text-emerald-500' : 
                  feedback.status === 'warning' ? 'fa-triangle-exclamation text-amber-500' : 'fa-circle-xmark text-red-500'
                } text-xs`}></i>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-200">AI Mentor Insight</h4>
              </div>
              <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">{feedback.message}</p>
              <div className="space-y-1.5">
                {feedback.suggestions.map((s, i) => (
                  <div key={i} className="text-[10px] text-zinc-500 flex gap-2">
                    <span className="text-blue-500 font-bold">•</span> {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Main IDE Canvas */}
        <div className="col-span-12 lg:col-span-9 bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
          <div className="bg-zinc-900 px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex gap-1.5 overflow-x-auto">
              {[
                {id: 'editor', label: 'Editor', icon: 'fa-code'},
                {id: 'terminal', label: 'Terminal', icon: 'fa-terminal'},
                {id: 'debugger', label: 'Debugger', icon: 'fa-bug'},
                {id: 'llmOutput', label: 'LLM Output', icon: 'fa-brain-circuit'}
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id as any)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-widest flex items-center gap-2 whitespace-nowrap ${
                    activeView === v.id 
                      ? 'bg-zinc-800 text-blue-400 border border-zinc-700 shadow-inner' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <i className={`fa-solid ${v.icon} text-[10px]`}></i>
                  {v.label}
                </button>
              ))}
            </div>
            
            {activeView === 'debugger' ? (
              <div className="flex items-center gap-4">
                <div className="flex bg-zinc-800 rounded-lg p-1">
                  <button onClick={stepBackward} disabled={currentStepIndex <= 0} className="p-1.5 px-3 hover:bg-zinc-700 disabled:opacity-30 rounded transition-colors text-zinc-300" title="Step Back">
                    <i className="fa-solid fa-backward-step text-xs"></i>
                  </button>
                  <button onClick={stepForward} disabled={currentStepIndex >= debugTrace.length - 1} className="p-1.5 px-3 hover:bg-zinc-700 disabled:opacity-30 rounded transition-colors text-zinc-300" title="Step Over">
                    <i className="fa-solid fa-forward-step text-xs"></i>
                  </button>
                  <button onClick={handleResume} disabled={currentStepIndex >= debugTrace.length - 1} className="p-1.5 px-3 hover:bg-zinc-700 disabled:opacity-30 rounded transition-colors text-emerald-500" title="Resume to Breakpoint">
                    <i className="fa-solid fa-play text-xs"></i>
                  </button>
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  Step {currentStepIndex + 1} of {debugTrace.length}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                 {isCollaborating && (
                   <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                     Live Sync
                   </span>
                 )}
                 <button 
                   onClick={handleCopyCode} 
                   className="text-xs font-bold text-zinc-400 hover:text-zinc-200 flex items-center gap-2 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                   title="Copy Code to Clipboard"
                 >
                   <i className={`fa-solid ${copySuccess ? 'fa-check text-emerald-500' : 'fa-copy'}`}></i>
                   {copySuccess ? 'Copied' : 'Copy'}
                 </button>
                 <button onClick={runCode} className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-2 transition-colors">
                   <i className="fa-solid fa-play"></i> Run Code
                 </button>
              </div>
            )}
          </div>

          <div className="flex-1 relative overflow-hidden flex">
            <div className={`flex-1 flex overflow-hidden ${activeView === 'debugger' ? 'border-r border-zinc-800' : ''}`}>
              <div className="bg-zinc-900/50 w-12 flex flex-col items-center py-8 border-r border-zinc-800 select-none">
                {lines.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => toggleBreakpoint(i + 1)}
                    className="h-6 w-full flex items-center justify-center cursor-pointer group relative"
                  >
                    {breakpoints.has(i + 1) ? (
                      <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                    <span className={`absolute right-1 text-[9px] font-mono ${currentStep?.line === i + 1 ? 'text-blue-400 font-bold' : 'text-zinc-700'}`}>
                      {i + 1}
                    </span>
                    {currentStep?.line === i + 1 && (
                      <div className="absolute left-0 w-full h-full bg-blue-500/10 pointer-events-none"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex-1 relative overflow-hidden" ref={editorScrollRef}>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`w-full h-full bg-transparent p-8 py-8 font-mono text-sm text-zinc-300 outline-none resize-none leading-6 placeholder:text-zinc-700 transition-opacity ${activeView === 'debugger' ? 'pointer-events-none' : 'opacity-100'}`}
                  spellCheck={false}
                />
                
                {activeView === 'debugger' && currentStep && (
                  <div 
                    className="absolute left-0 right-0 bg-blue-500/10 border-y border-blue-500/30 pointer-events-none transition-all duration-300 ease-in-out z-10"
                    style={{ 
                      top: `${(currentStep.line - 1) * 24 + 32}px`, 
                      height: '24px' 
                    }}
                  >
                    <div className="absolute left-0 w-1 h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
                    <div className="absolute right-4 top-1 text-[10px] text-blue-400/80 font-mono italic flex items-center gap-1.5">
                      <i className="fa-solid fa-chevron-right text-[8px] animate-pulse"></i>
                      {currentStep.reason || 'Tracing...'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {activeView === 'terminal' && (
              <div className="absolute inset-0 flex flex-col bg-[#09090b] animate-in fade-in duration-300">
                <div className="flex-1 overflow-y-auto p-8 font-mono text-sm space-y-2">
                  {terminalOutput.map((line, idx) => (
                    <div key={idx} className={`${line.startsWith('$') ? 'text-blue-400' : line.startsWith('[ERROR]') ? 'text-red-400' : line.startsWith('[SUCCESS]') ? 'text-emerald-400' : line.startsWith('[ANALYSIS]') ? 'text-purple-400' : line.startsWith('[DEBUG]') ? 'text-blue-400' : line.startsWith('[SYSTEM]') ? 'text-amber-400' : 'text-zinc-400'}`}>
                      {line}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
                <form onSubmit={handleCommand} className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center gap-3">
                  <span className="text-blue-500 font-bold">$</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="help, debug, analyze..."
                    className="flex-1 bg-transparent border-none outline-none font-mono text-blue-400 placeholder:text-zinc-700"
                  />
                </form>
              </div>
            )}

            {activeView === 'llmOutput' && (
              <div className="absolute inset-0 flex flex-col bg-[#09090b] animate-in slide-in-from-right-4 duration-500">
                <div className="flex-1 overflow-y-auto p-10 font-sans leading-relaxed text-zinc-300">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-500">
                      <i className="fa-solid fa-brain-circuit fa-spin text-4xl text-blue-500"></i>
                      <p className="text-sm font-bold uppercase tracking-widest animate-pulse">AI is deconstructing your logic...</p>
                    </div>
                  ) : feedback ? (
                    <div className="max-w-4xl mx-auto space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
                           <i className="fa-solid fa-robot text-xl"></i>
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-white">Full AI Review</h2>
                          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Architectural Analysis & Feedback</p>
                        </div>
                      </div>

                      <div className={`p-6 rounded-3xl border ${
                        feedback.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/30' : 
                        feedback.status === 'warning' ? 'bg-amber-500/5 border-amber-500/30' : 
                        'bg-red-500/5 border-red-500/30'
                      }`}>
                        <p className="text-sm italic font-medium">"{feedback.message}"</p>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                          <i className="fa-solid fa-scroll text-blue-400"></i>
                          Detailed Technical Report
                        </h3>
                        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] text-sm text-zinc-400 leading-8 whitespace-pre-wrap font-mono">
                          {feedback.detailedReview || "No detailed review generated. Try running 'Review' again."}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                          <i className="fa-solid fa-lightbulb text-amber-400"></i>
                          Key Recommendations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {feedback.suggestions.map((s, idx) => (
                            <div key={idx} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex gap-4 group hover:border-blue-500/50 transition-all">
                              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-black shrink-0 group-hover:text-blue-400">
                                {idx + 1}
                              </div>
                              <p className="text-xs font-medium leading-relaxed">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-700 border-2 border-dashed border-zinc-900 rounded-[3rem] m-8">
                       <i className="fa-solid fa-microchip text-4xl mb-2"></i>
                       <p className="text-sm font-bold uppercase tracking-widest">No review active</p>
                       <p className="text-xs">Click the "Review" button in the header to trigger an LLM analysis of your code.</p>
                       <button onClick={handleAnalyze} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20">
                         Trigger Analysis
                       </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-1 bg-zinc-800 w-full overflow-hidden">
             <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: currentStepIndex >= 0 ? `${((currentStepIndex + 1) / debugTrace.length) * 100}%` : '0%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
