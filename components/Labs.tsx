
import React, { useState, useEffect, useRef } from 'react';
import { LEARNING_PATHS } from '../constants';
import { getLabScenario, analyzeCode, getDebugTrace } from '../services/geminiService';
import { LabScenario, LabFeedback, LabMetrics, DebugState } from '../types';

type EnvPreset = 'node' | 'browser' | 'leetcode' | 'fastapi';

const Labs: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState(LEARNING_PATHS[0]); // Default to FastAPI
  const [scenario, setScenario] = useState<LabScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<'terminal' | 'debugger' | 'llmOutput'>('terminal');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['SkillForge Kernel v2.6 initialized...', 'System status: Awaiting deployment request.']);
  const [env, setEnv] = useState<EnvPreset>('fastapi');
  const [code, setCode] = useState(`from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Student(BaseModel):
    name: str
    email: str
    course: str

@app.post("/students/")
async def create_student(student: Student = Body(...)):
    # Simulation: MongoDB insert_one logic
    return {"status": "created", "data": student}`);
    
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
    // Check for context from the Paths component
    const savedContext = localStorage.getItem('active_lab_context');
    if (savedContext) {
      const context = JSON.parse(savedContext);
      localStorage.removeItem('active_lab_context');
      deployLab(context.path, context.skill, context.objective);
    }
  }, []);

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

  const deployLab = async (pathOverride?: string, skillOverride?: string, objOverride?: string) => {
    setIsLoading(true);
    const path = pathOverride || selectedPath.title;
    const skill = skillOverride || selectedPath.skills[0];
    const objectiveHint = objOverride || `Context: ${env}. Focus on ${skill}.`;

    setTerminalOutput(prev => [...prev, `[SYSTEM] Provisioning isolated ${env.toUpperCase()} workspace for ${path}...`]);
    try {
      const data = await getLabScenario(path, objectiveHint);
      setScenario(data);
      setTerminalOutput(prev => [
        ...prev, 
        `[SUCCESS] Micro-container online.`, 
        `[READY] Active Objective: ${data.title}`,
        `[INTEL] Tasks: ${data.tasks.join(' | ')}`
      ]);
      setActiveTool('terminal');
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[CRITICAL] Resource allocation failed. Gemini engine overloaded.']);
    } finally {
      setIsLoading(false);
    }
  };

  const startLab = () => deployLab();

  const handleStartDebug = async () => {
    if (!scenario) return;
    setIsDebugLoading(true);
    setActiveTool('debugger');
    try {
      const trace = await getDebugTrace(code, scenario.objective);
      setDebugTrace(trace);
      setCurrentStepIndex(0);
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] Trace debugger failed to attach. Please verify code syntax.']);
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
      setTerminalOutput(prev => [...prev, `[INTEL] Assessment generated. View results in "LLM Output".`]);
    } catch (error) {
      setTerminalOutput(prev => [...prev, '[ERROR] Neural analysis timed out. Retrying link...']);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runCode = () => {
    setTerminalOutput(prev => [
      ...prev, 
      `$ ${env === 'fastapi' ? 'uvicorn main:app' : 'node main.js'}`, 
      '[STDOUT] Execution initialized...',
      '[STDOUT] Log: Application startup complete.',
      '[HINT] Use "Trace" to inspect Pydantic validation steps.'
    ]);
    setActiveTool('terminal');
  };

  const currentStep = currentStepIndex >= 0 ? debugTrace[currentStepIndex] : null;
  const lines = code.split('\n');

  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-10rem)] max-w-[1600px] mx-auto p-4 lg:p-0">
      {/* Dynamic Engineering Workspace Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem] shadow-2xl gap-6">
        <div className="flex items-center gap-8 w-full lg:w-auto">
          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-800 ${selectedPath.color} shadow-2xl border border-zinc-700/50`}>
              <i className={`fa-solid ${selectedPath.icon} text-xl`}></i>
            </div>
            <div>
               <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Active Cluster</span>
               <span className="font-black text-white tracking-tight">{selectedPath.title}</span>
            </div>
          </div>
          <div className="h-10 w-px bg-zinc-800 hidden md:block"></div>
          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-inner">
            <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em]">Runtime</span>
            <select 
              value={env} 
              onChange={(e) => setEnv(e.target.value as EnvPreset)}
              className="bg-transparent border-none outline-none text-[10px] font-black text-blue-500 cursor-pointer uppercase tracking-widest focus:text-blue-400"
            >
              <option value="fastapi" className="bg-zinc-900">FastAPI (Py3.11)</option>
              <option value="node" className="bg-zinc-900">Node v22</option>
              <option value="browser" className="bg-zinc-900">Browser API</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <button onClick={startLab} disabled={isLoading} className="flex-1 lg:flex-none px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-zinc-700 shadow-xl">
            <i className={`fa-solid ${isLoading ? 'fa-spinner fa-spin' : 'fa-bolt'} text-blue-400`}></i> Deploy Lab
          </button>
          <button onClick={handleAnalyze} disabled={isAnalyzing || !scenario} className="flex-1 lg:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3">
            <i className={`fa-solid ${isAnalyzing ? 'fa-spinner fa-spin' : 'fa-brain-circuit'}`}></i> Analyze Suite
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 bg-[#09090b] border border-zinc-800 rounded-[3rem] flex flex-col overflow-hidden relative shadow-2xl">
            <div className="bg-zinc-900/90 px-8 py-4 border-b border-zinc-800 flex items-center justify-between backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-code text-emerald-500 text-sm"></i>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">app/main.py</span>
              </div>
              <button onClick={runCode} className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 hover:bg-emerald-400 hover:text-white rounded-xl flex items-center gap-3 transition-all shadow-inner">
                <i className="fa-solid fa-play text-[8px]"></i> SPIN UP SERVER
              </button>
            </div>
            <div className="flex-1 flex overflow-hidden">
              <div className="bg-zinc-900/40 w-14 flex flex-col items-center py-8 border-r border-zinc-800 select-none no-scrollbar">
                {lines.map((_, i) => (
                  <div key={i} className="h-6 w-full flex items-center justify-center group">
                    <span className="text-[10px] font-mono text-zinc-700 group-hover:text-zinc-400">{i + 1}</span>
                  </div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-transparent p-8 font-mono text-[13px] text-zinc-300 outline-none resize-none leading-7 scrollbar-hide selection:bg-blue-500/30"
                spellCheck={false}
              />
            </div>
          </div>
          
          {scenario && (
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] flex items-start gap-6 animate-in fade-in slide-in-from-left-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner flex-shrink-0">
                <i className="fa-solid fa-clipboard-check text-xl"></i>
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Module Objective</h4>
                <p className="text-xl font-black text-white tracking-tight">{scenario.title}</p>
                <p className="text-sm text-zinc-400 leading-relaxed font-medium italic opacity-80">{scenario.objective}</p>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-5 flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="flex border-b border-zinc-800 bg-zinc-900/80">
            {[
              { id: 'terminal', label: 'Server Console', icon: 'fa-terminal' },
              { id: 'llmOutput', label: 'Code Review', icon: 'fa-brain-circuit' }
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-r last:border-r-0 border-zinc-800 ${
                  activeTool === tool.id ? 'bg-zinc-800/80 text-blue-400 shadow-inner' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'
                }`}
              >
                <i className={`fa-solid ${tool.icon} ${activeTool === tool.id ? 'text-blue-400' : 'text-zinc-700'}`}></i>
                {tool.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-[#050507] custom-scrollbar">
            {activeTool === 'terminal' && (
              <div className="font-mono text-[12px] space-y-2 leading-relaxed">
                {terminalOutput.map((line, i) => (
                  <div key={i} className={`
                    ${line.startsWith('$') ? 'text-blue-500 font-black' : 
                    line.startsWith('[STDOUT]') ? 'text-zinc-400' : 
                    line.startsWith('[SUCCESS]') ? 'text-emerald-400' : 
                    'text-zinc-500'}
                  `}>
                    {line}
                  </div>
                ))}
                <div className="w-2.5 h-5 bg-blue-500/50 animate-pulse inline-block align-middle ml-1"></div>
                <div ref={terminalEndRef} />
              </div>
            )}

            {activeTool === 'llmOutput' && (
              <div className="space-y-8">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-80 gap-10 text-center px-12">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin"></div>
                      <i className="fa-solid fa-brain-circuit text-3xl text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                    </div>
                  </div>
                ) : feedback ? (
                  <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                    <div className={`p-8 rounded-[2.5rem] border shadow-2xl relative overflow-hidden ${feedback.status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/5 border-amber-500/20 text-amber-400'}`}>
                       <p className="text-lg font-black leading-tight">"{feedback.message}"</p>
                    </div>
                    <div className="space-y-6">
                       <h5 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] border-b border-zinc-900 pb-4">FastAPI Suggestions</h5>
                       {feedback.suggestions.map((s, i) => (
                         <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl text-[12px] text-zinc-300 flex items-start gap-5 shadow-xl">
                           <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-xs font-black text-blue-500 flex-shrink-0">{i + 1}</div>
                           <span className="leading-relaxed font-medium">{s}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-80 text-zinc-800 italic text-[12px] text-center px-12">
                    <i className="fa-solid fa-gauge-high text-5xl mb-6 opacity-10"></i>
                    Deploy a roadmap module and write code to trigger the real-time SkillForge assessment engine.
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="p-6 bg-zinc-900/90 border-t border-zinc-800 flex justify-between items-center backdrop-blur-2xl">
            <div className="flex items-center gap-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-4 rounded-full ${metrics.cpu > 70 ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                CPU {metrics.cpu.toFixed(0)}%
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-4 rounded-full bg-emerald-500"></span>
                MEM {metrics.memory.toFixed(0)}MB
              </div>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">API Cluster Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
