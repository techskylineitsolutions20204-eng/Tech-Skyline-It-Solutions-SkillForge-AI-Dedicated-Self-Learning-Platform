
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: 'fa-house' },
    { id: 'paths', label: 'Learning Paths', icon: 'fa-route' },
    { id: 'labs', label: 'Interactive Labs', icon: 'fa-terminal' },
    { id: 'firebase', label: 'Firebase Architect', icon: 'fa-fire' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-900/50 border-r border-zinc-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-bolt-lightning text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">SkillForge <span className="text-blue-500">AI</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-4">
          <div className="bg-zinc-800/50 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider font-bold">Blaze Plan Enabled</p>
            <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-amber-500"></div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Ready for Firebase App Hosting & Cloud Functions.</p>
          </div>
          
          <div className="px-2 py-2 text-[10px] text-zinc-500 space-y-1 font-medium">
            <p className="font-bold text-zinc-400 uppercase tracking-widest text-[8px] mb-2">Technical Support</p>
            <p className="flex items-center gap-2"><i className="fa-solid fa-phone w-3"></i> USA: +1 (408) 614-0468</p>
            <p className="flex items-center gap-2"><i className="fa-brands fa-whatsapp w-3"></i> WhatsApp: +91 81062 43684</p>
            <p className="flex items-center gap-2 truncate"><i className="fa-solid fa-envelope w-3"></i> techskylineitsolutions20204@gmail.com</p>
            <p className="mt-2 font-bold text-blue-500/80">Tech Skyline IT Solutions</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
              <i className="fa-solid fa-bell"></i>
            </button>
            <div className="h-8 w-8 rounded-full bg-zinc-700 border border-zinc-600 overflow-hidden">
              <img src="https://picsum.photos/seed/user123/32/32" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
