
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Explore', icon: 'fa-compass' },
    { id: 'paths', label: 'Learning Paths', icon: 'fa-map-signs' },
    { id: 'internship', label: 'Industrial Syllabus', icon: 'fa-graduation-cap' },
    { id: 'global-academy', label: 'Global Academy', icon: 'fa-earth-americas' },
    { id: 'labs', label: 'Hands-on Labs', icon: 'fa-flask' },
    { id: 'firebase', label: 'Architect Forge', icon: 'fa-diagram-project' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] text-zinc-100">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900/40 border-r border-zinc-800 flex flex-col hidden lg:flex">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800/50">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <i className="fa-solid fa-bolt text-white text-sm"></i>
          </div>
          <span className="text-lg font-black tracking-tighter">SkillForge <span className="text-blue-500">AI</span></span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-zinc-800 space-y-6">
          <div className="px-2 py-2 text-[10px] text-zinc-600 space-y-2 font-medium">
             <p className="font-black text-zinc-500 uppercase tracking-[0.2em] text-[8px] mb-3">Enterprise Support</p>
             <p className="flex items-center gap-2 hover:text-zinc-400 cursor-pointer transition-colors"><i className="fa-solid fa-phone w-3"></i> +1 (408) 614-0468</p>
             <p className="flex items-center gap-2 hover:text-zinc-400 cursor-pointer transition-colors"><i className="fa-brands fa-whatsapp w-3 text-emerald-500"></i> Global Support</p>
             <div className="pt-4 mt-2 border-t border-zinc-800/50">
                <p className="font-bold text-blue-500/80">Tech Skyline IT Solutions</p>
                <p className="text-[9px] mt-1 opacity-50">Silicon Valley • New Delhi</p>
             </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-[60]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                <i className="fa-solid fa-bolt text-white text-[10px]"></i>
              </div>
            </div>
            <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 w-64 lg:w-96 focus-within:border-blue-500/50 transition-all shadow-inner">
              <i className="fa-solid fa-search text-zinc-600 text-xs"></i>
              <input type="text" placeholder="Search Global Roadmaps..." className="bg-transparent border-none outline-none text-xs text-zinc-300 ml-3 w-full" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">Documentation</button>
            <div className="h-4 w-px bg-zinc-800"></div>
            <button className="px-5 py-1.5 bg-zinc-100 hover:bg-white text-black rounded-full text-xs font-bold transition-all shadow-lg">
              Partner Login
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#09090b]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
