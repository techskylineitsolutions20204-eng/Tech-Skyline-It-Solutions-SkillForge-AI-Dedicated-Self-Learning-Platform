
import React, { useState } from 'react';

interface AcademyCardProps {
  vendor: 'Google' | 'Microsoft' | 'IBM' | 'Community';
  title: string;
  icon: string;
  color: string;
  roles: string[];
  coverage: string[];
  features: string[];
  url: string;
  labType: string;
}

const AcademyCard: React.FC<AcademyCardProps> = ({ vendor, title, icon, color, roles, coverage, features, url, labType }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col h-full hover:border-zinc-700 transition-all group relative overflow-hidden shadow-2xl">
    <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
    
    <div className="flex items-center justify-between mb-8">
      <div className={`w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform ${color.replace('bg-', 'text-')}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <span className="text-[10px] font-black text-zinc-500 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 uppercase tracking-widest">{vendor}</span>
    </div>

    <div className="space-y-4 mb-8">
      <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {roles.map((r, i) => (
          <span key={i} className="text-[8px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2 py-0.5 rounded">{r}</span>
        ))}
      </div>
    </div>

    <div className="space-y-6 flex-1">
      <div className="space-y-3">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Curriculum Coverage</p>
        <div className="flex flex-wrap gap-2">
          {coverage.map((c, i) => (
            <span key={i} className="text-[10px] text-zinc-400 bg-zinc-950/50 px-2 py-1 rounded border border-zinc-800/50 font-medium">{c}</span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Platform Intel</p>
        <ul className="grid grid-cols-1 gap-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-[11px] text-zinc-500">
              <i className="fa-solid fa-circle-check text-[8px] text-blue-500"></i>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mt-10 pt-8 border-t border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
         <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
           <i className="fa-solid fa-flask"></i> {labType}
         </span>
         <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Free Access</span>
      </div>
      <button 
        onClick={() => window.open(url, '_blank')}
        className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-inner border border-zinc-700/50"
      >
        Launch Training Portal
      </button>
    </div>
  </div>
);

const GlobalAcademy: React.FC = () => {
  const [activeVendor, setActiveVendor] = useState<'All' | 'Google' | 'Microsoft' | 'IBM'>('All');

  const academyData: AcademyCardProps[] = [
    {
      vendor: "Google",
      title: "Google Cloud Skills Boost",
      icon: "fa-google",
      color: "bg-blue-500",
      roles: ["Cloud Engineer", "Data Analyst", "SRE"],
      coverage: ["Kubernetes", "IAM", "Compute Engine", "BigQuery"],
      features: ["Real Cloud Consoles", "Temporary Credentials", "Skills Badges"],
      url: "https://skills.google/collections",
      labType: "Live Cloud Console"
    },
    {
      vendor: "Microsoft",
      title: "Microsoft Learn",
      icon: "fa-microsoft",
      color: "bg-orange-500",
      roles: ["Azure Architect", "AI Engineer", "BI Analyst"],
      coverage: ["Azure VMs", "Power Platform", "MS 365", "SQL Server"],
      features: ["Sandbox Environments", "Official Cert Paths", "Hands-on Modules"],
      url: "https://learn.microsoft.com/en-us/training/browse/",
      labType: "Azure Sandbox"
    },
    {
      vendor: "IBM",
      title: "IBM SkillsBuild",
      icon: "fa-building-columns",
      color: "bg-indigo-500",
      roles: ["Cybersecurity Analyst", "AI Practitioner", "Data Scientist"],
      coverage: ["Ethical Hacking", "XAI", "BSON/JSON", "Incident Response"],
      features: ["Enterprise Workflows", "Professional Badges", "Career Mentorship"],
      url: "https://skillsbuild.org/adult-learners",
      labType: "Project-Based"
    },
    {
      vendor: "Community",
      title: "freeCodeCamp",
      icon: "fa-fire",
      color: "bg-emerald-500",
      roles: ["Full-Stack Dev", "Python Dev", "QA Engineer"],
      coverage: ["JavaScript", "Responsive Design", "Selenium", "Algorithmic Prep"],
      features: ["Browser-based IDE", "3000+ Hour Curriculum", "Industry Certifications"],
      url: "https://www.freecodecamp.org/",
      labType: "Browser IDE"
    }
  ];

  const filteredData = activeVendor === 'All' ? academyData : academyData.filter(item => item.vendor === activeVendor);

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-20 pb-40">
      {/* Academy Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-zinc-800 pb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-blue-500">
               <i className="fa-solid fa-earth-americas text-xl"></i>
             </div>
             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Global Partner Academy</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            The Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-500">Mastery Hub.</span>
          </h1>
          <p className="text-lg text-zinc-400 font-medium max-w-2xl leading-relaxed">
            Direct access to the world's most powerful enterprise learning platforms. 
            Real-world infrastructure, sandbox consoles, and verifiable credentials.
          </p>
        </div>
        
        <div className="flex gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl">
          {['All', 'Google', 'Microsoft', 'IBM'].map((v) => (
            <button
              key={v}
              onClick={() => setActiveVendor(v as any)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeVendor === v ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredData.map((item, i) => (
          <AcademyCard key={i} {...item} />
        ))}
      </div>

      {/* Technical Knowledge Blocks */}
      <div className="space-y-12">
        <h2 className="text-3xl font-black text-white tracking-tight">Intelligence <span className="text-blue-500">Deep-Dives</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cloud Trinity Block */}
          <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-[3rem] space-y-8">
             <div className="flex items-center gap-4 text-orange-500">
               <i className="fa-solid fa-cloud text-3xl"></i>
               <h3 className="text-xl font-black uppercase tracking-tight">The Cloud Trinity</h3>
             </div>
             <p className="text-xs text-zinc-500 leading-relaxed font-medium">Master the dominant public cloud ecosystems through hands-on virtual lab environments.</p>
             <div className="space-y-4">
               {[
                 { label: "AWS", topics: "EC2, DynamoDB, Timestream, S3" },
                 { label: "Azure", topics: "VMs, Database Management, SQL Server" },
                 { label: "GCP", topics: "Compute Engine, Vertex AI, K8s" }
               ].map((c, i) => (
                 <div key={i} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
                   <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">{c.label}</p>
                   <p className="text-[11px] text-zinc-500 font-medium">{c.topics}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* Cyber Security Block */}
          <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-[3rem] space-y-8">
             <div className="flex items-center gap-4 text-red-500">
               <i className="fa-solid fa-user-secret text-3xl"></i>
               <h3 className="text-xl font-black uppercase tracking-tight">Security & Forensics</h3>
             </div>
             <p className="text-xs text-zinc-500 leading-relaxed font-medium">Protect enterprise assets through advanced threat detection and algorithmic analysis.</p>
             <div className="space-y-4">
               {[
                 { label: "Ethical Hacking", topics: "SQL Injection, Web Attacks, Bug Bounty" },
                 { label: "Incident Response", topics: "Threat Detection, Mitigation Strategies" },
                 { label: "Forensics", topics: "Data Acquisition, Evidence Lifecycle" }
               ].map((c, i) => (
                 <div key={i} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
                   <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">{c.label}</p>
                   <p className="text-[11px] text-zinc-500 font-medium">{c.topics}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* AI Engineering Block */}
          <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-[3rem] space-y-8">
             <div className="flex items-center gap-4 text-purple-500">
               <i className="fa-solid fa-brain-circuit text-3xl"></i>
               <h3 className="text-xl font-black uppercase tracking-tight">AI & GenAI Master</h3>
             </div>
             <p className="text-xs text-zinc-500 leading-relaxed font-medium">Leverage Large Language Models (LLMs) and Vector compute for autonomous intelligent agents.</p>
             <div className="space-y-4">
               {[
                 { label: "GenAI Studio", topics: "Working with LLMs, Fine-tuning" },
                 { label: "Prompt Engineering", topics: "GitHub Copilot, Logic-Chains" },
                 { label: "Data Mastery", topics: "Python/R, Pandas, Matplotlib, SQL" }
               ].map((c, i) => (
                 <div key={i} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
                   <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">{c.label}</p>
                   <p className="text-[11px] text-zinc-500 font-medium">{c.topics}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Outcome Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
           <h3 className="text-xl font-black text-white tracking-tight">Universal Skill Acquisition Matrix</h3>
           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Industrial Learning Outcomes per Platform</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/50 text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                <th className="p-8">Domain</th>
                <th className="p-8">Primary Partner</th>
                <th className="p-8">Interactive Labs</th>
                <th className="p-8">Tech Stack Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                { domain: "Cloud Infra", partner: "AWS / Azure / GCP", labs: "FULL CLOUD", stack: "EC2, VM setup, Big Data" },
                { domain: "Cybersecurity", partner: "IBM SkillsBuild", labs: "PROJECT-BASED", stack: "SQLi, Forensics, Android BB" },
                { domain: "Data Science", partner: "Microsoft / Google", labs: "SANDBOX", stack: "Python, R, Pandas, SQL" },
                { domain: "Full Stack", partner: "freeCodeCamp", labs: "BROWSER IDE", stack: "JS, React, Git, Selenium" },
                { domain: "AI Mastery", partner: "IBM / Google AI", labs: "STUDIO", stack: "GenAI, LLMs, Copilot" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="p-8 font-black text-zinc-100 text-sm">{row.domain}</td>
                  <td className="p-8 font-bold text-blue-400 text-xs">{row.partner}</td>
                  <td className="p-8 font-black text-[10px] tracking-widest text-emerald-400">{row.labs}</td>
                  <td className="p-8 font-medium text-zinc-500 text-xs">{row.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GlobalAcademy;
