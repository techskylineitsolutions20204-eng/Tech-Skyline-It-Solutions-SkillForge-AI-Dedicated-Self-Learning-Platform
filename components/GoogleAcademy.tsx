
import React from 'react';

interface IndustryBlockProps {
  title: string;
  icon: string;
  roles: string[];
  platforms: {
    name: string;
    url: string;
    coverage: string[];
    labs: boolean;
    cost: string;
    certification?: string;
  }[];
  accentColor: string;
}

const IndustryBlock: React.FC<IndustryBlockProps> = ({ title, icon, roles, platforms, accentColor }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 space-y-8 hover:border-zinc-700 transition-all shadow-xl group relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 ${accentColor} opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity`}></div>
    
    <div className="flex items-center justify-between">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-800 border border-zinc-700 shadow-xl group-hover:scale-110 transition-transform`}>
        <i className={`fa-solid ${icon} text-2xl ${accentColor.replace('bg-', 'text-')}`}></i>
      </div>
      <div className="flex gap-2">
        {roles.slice(0, 2).map((role, idx) => (
          <span key={idx} className="text-[8px] font-black text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 uppercase tracking-widest">{role}</span>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-2">Active Learning Blocks</p>
    </div>

    <div className="space-y-6">
      {platforms.map((platform, idx) => (
        <div key={idx} className="space-y-4 pt-4 border-t border-zinc-800/50 first:border-t-0 first:pt-0">
          <div className="flex items-center justify-between">
            <a href={platform.url} target="_blank" className="font-black text-zinc-200 hover:text-blue-500 transition-colors flex items-center gap-2 group/link">
              {platform.name}
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-0 group-hover/link:opacity-100 transition-opacity"></i>
            </a>
            <div className="flex gap-2">
              {platform.labs && <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">Live Lab</span>}
              <span className="text-[8px] font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase">{platform.cost}</span>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-1.5">
            {platform.coverage.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[11px] text-zinc-500 font-medium">
                <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => window.open(platform.url, '_blank')}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-inner border border-zinc-700/50"
          >
            Launch Interface
          </button>
        </div>
      ))}
    </div>
  </div>
);

const GoogleAcademy: React.FC = () => {
  const industries = [
    {
      title: "Software Development",
      icon: "fa-code",
      accentColor: "bg-blue-500",
      roles: ["Full-Stack Developer", "Web Developer", "Automation Engineer"],
      platforms: [
        {
          name: "Google Developers",
          url: "https://developers.google.com",
          coverage: ["HTML, CSS, JavaScript", "Web APIs & PWA", "Git & Version Control", "Android Basics"],
          labs: true,
          cost: "100% Free",
          certification: "None (Skill-focused)"
        },
        {
          name: "Google Digital Garage",
          url: "https://learndigital.withgoogle.com/digitalgarage",
          coverage: ["Web Dev Fundamentals", "Programming Concepts"],
          labs: false,
          cost: "Free",
          certification: "Free Certificate"
        }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: "fa-cloud",
      accentColor: "bg-red-500",
      roles: ["Cloud Engineer", "DevOps Engineer", "SRE"],
      platforms: [
        {
          name: "Google Cloud Skills Boost",
          url: "https://skills.google/collections",
          coverage: ["Google Cloud Fundamentals", "Kubernetes & DevOps", "IAM, Compute, Storage"],
          labs: true,
          cost: "Free Labs",
          certification: "Badges/Paths"
        },
        {
          name: "Qwiklabs",
          url: "https://www.qwiklabs.com",
          coverage: ["Hands-on Infrastructure", "CI/CD & Docker Labs"],
          labs: true,
          cost: "Free Access",
          certification: "Lab Completion"
        }
      ]
    },
    {
      title: "Data & BI Analytics",
      icon: "fa-chart-pie",
      accentColor: "bg-amber-500",
      roles: ["Data Analyst", "BI Specialist", "Data Engineer"],
      platforms: [
        {
          name: "Analytics Academy",
          url: "https://analytics.google.com/analytics/academy",
          coverage: ["Data Analysis Fundamentals", "Google Analytics", "Reporting Dashboards"],
          labs: true,
          cost: "Free",
          certification: "Free Certification"
        },
        {
          name: "Google Skillshop",
          url: "https://skillshop.withgoogle.com",
          coverage: ["Data Measurement Tools", "MarTech Analytics"],
          labs: false,
          cost: "Free",
          certification: "Free Certifications"
        }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: "fa-brain-circuit",
      accentColor: "bg-purple-500",
      roles: ["AI Engineer", "ML Practitioner", "GenAI Specialist"],
      platforms: [
        {
          name: "Google AI Education",
          url: "https://ai.google/education",
          coverage: ["Neural Networks", "Responsible AI", "ML Fundamentals"],
          labs: true,
          cost: "Free",
          certification: "Open Knowledge"
        },
        {
          name: "Google Colab",
          url: "https://colab.research.google.com",
          coverage: ["Python Execution", "ML Notebook Demos"],
          labs: true,
          cost: "Free Tier",
          certification: "Tool Access"
        }
      ]
    },
    {
      title: "Cybersecurity",
      icon: "fa-shield-halved",
      accentColor: "bg-emerald-500",
      roles: ["Security Analyst", "SOC Analyst", "Cyber Risk Analyst"],
      platforms: [
        {
          name: "Grow with Google Cyber",
          url: "https://grow.google/intl/en_in/cybersecurity/",
          coverage: ["Threat Awareness", "Security Ops Concepts", "Foundations"],
          labs: false,
          cost: "Free Path",
          certification: "Certificate available"
        },
        {
          name: "Google Cloud Security",
          url: "https://cloud.google.com/security/resources",
          coverage: ["IAM & Zero Trust", "Cloud Security Labs"],
          labs: true,
          cost: "Free Labs",
          certification: "Skills Boost Badges"
        }
      ]
    },
    {
      title: "Automation & IT Ops",
      icon: "fa-robot",
      accentColor: "bg-cyan-500",
      roles: ["Automation Engineer", "IT Ops", "Platform Engineer"],
      platforms: [
        {
          name: "Workspace Learning",
          url: "https://support.google.com/a/users",
          coverage: ["Workflow Automation", "Productivity Scaling"],
          labs: false,
          cost: "Free",
          certification: "Proficiency"
        },
        {
          name: "Apps Script Dev",
          url: "https://developers.google.com/apps-script",
          coverage: ["Custom Automation", "Google Cloud Integration"],
          labs: true,
          cost: "Free",
          certification: "Project-based"
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-20 pb-40">
      {/* Academy Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-zinc-800 pb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-blue-500">
               <i className="fa-brands fa-google text-xl"></i>
             </div>
             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Official Ecosystem</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            Google Mastery <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Academy.</span>
          </h1>
          <p className="text-lg text-zinc-400 font-medium max-w-2xl leading-relaxed">
            We've aggregated Google's most powerful free training platforms. 
            Access real cloud consoles, live lab environments, and industry-standard certifications without cost.
          </p>
        </div>
        <div className="flex gap-4">
           <a href="https://skills.google/collections" target="_blank" className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
             Launch Skills Boost
           </a>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind, i) => (
          <IndustryBlock key={i} {...ind} />
        ))}
      </div>

      {/* Summary Table Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-xl">
           <div>
             <h3 className="text-xl font-black text-white tracking-tight">Industry-Wise Platform Summary</h3>
             <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Cross-Platform Competency Matrix</p>
           </div>
           <i className="fa-solid fa-list-check text-zinc-700 text-2xl"></i>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/50 text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                <th className="p-8">Tech Industry</th>
                <th className="p-8">Google Free Platforms</th>
                <th className="p-8">Live Labs</th>
                <th className="p-8">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                { ind: "Software Dev", plat: "Google Developers, Digital Garage", labs: "YES", outcome: "Skills / Cert" },
                { ind: "Cloud & DevOps", plat: "Skills Boost, Qwiklabs", labs: "YES", outcome: "Badges / Labs" },
                { ind: "Data & BI", plat: "Analytics Academy, Skillshop", labs: "LIMITED", outcome: "Certifications" },
                { ind: "AI & ML", plat: "Google AI, Colab", labs: "YES", outcome: "Interactive Demos" },
                { ind: "Cybersecurity", plat: "Grow with Google, Cloud Sec", labs: "YES", outcome: "Cert / Badges" },
                { ind: "Automation", plat: "Apps Script, Workspace Learning", labs: "YES", outcome: "Projects" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="p-8 font-black text-zinc-100 text-sm">{row.ind}</td>
                  <td className="p-8 font-medium text-zinc-400 text-xs">{row.plat}</td>
                  <td className={`p-8 font-black text-[10px] tracking-widest ${row.labs === 'YES' ? 'text-emerald-400' : 'text-zinc-600'}`}>{row.labs}</td>
                  <td className="p-8 font-bold text-blue-400 text-xs">{row.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="relative z-10 space-y-8">
           <h2 className="text-4xl font-black text-white tracking-tight">Ready to verify your skills?</h2>
           <p className="text-blue-100 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
             Google Cloud Skills Boost provides real cloud consoles with temporary credentials. 
             Start your first lab session now and deploy actual infrastructure in minutes.
           </p>
           <button 
             onClick={() => window.open('https://skills.google/collections', '_blank')}
             className="px-12 py-5 bg-white text-blue-700 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/40 hover:scale-105 transition-all"
           >
             Start First Lab Module
           </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAcademy;
