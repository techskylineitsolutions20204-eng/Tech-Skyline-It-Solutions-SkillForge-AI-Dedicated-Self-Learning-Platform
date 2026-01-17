
import { LearningModule, FirebaseStrategy } from './types';

export const LEARNING_PATHS: LearningModule[] = [
  {
    id: 'ai-ml',
    path: 'AI_ML',
    title: 'AI & Machine Learning',
    roles: ['AI/ML Engineer', 'Machine Learning Scientist', 'GenAI Specialist', 'AI Product Manager'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'LLM Engineering', 'MLOps'],
    outlook: 'Top-tier global wages due to specialist scarcity.',
    icon: 'fa-brain',
    color: 'text-purple-400',
    learningUrl: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/',
    certifications: [
      { level: 'Foundational', name: 'IBM AI Engineering Professional', url: 'https://www.coursera.org/professional-certificates/ai-engineer' },
      { level: 'Foundational', name: 'Google Cloud ML Engineer', url: 'https://cloud.google.com/certifications/machine-learning-engineer' },
      { level: 'Foundational', name: 'MS Azure AI Fundamentals (AI-900)', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/' },
      { level: 'Intermediate', name: 'TensorFlow Developer Certificate', url: 'https://www.tensorflow.org/certificate' },
      { level: 'Intermediate', name: 'AWS Certified Machine Learning – Specialty', url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/' },
      { level: 'Advanced', name: 'NVIDIA DLI Deep Learning Cert', url: 'https://www.nvidia.com/en-us/training/' }
    ],
    roadmap: [
      { title: 'Math & Fundamentals', details: 'Linear algebra, probability, statistics.' },
      { title: 'Python for ML', details: 'NumPy, pandas, scikit-learn.' },
      { title: 'Deep Learning', details: 'Neural networks, CNNs, RNNs.' },
      { title: 'Generative AI & Transformers', details: 'LLMs, fine-tuning, RAG architectures.' },
      { title: 'MLOps', details: 'Model deployment, versioning, monitoring.' }
    ]
  },
  {
    id: 'cloud',
    path: 'CLOUD',
    title: 'Cloud & Edge Computing',
    roles: ['Cloud Solutions Architect', 'Cloud Infrastructure Engineer', 'SRE'],
    skills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'Terraform', 'Edge Computing'],
    outlook: 'Critical enterprise scaling infrastructure.',
    icon: 'fa-cloud',
    color: 'text-blue-400',
    learningUrl: 'https://aws.amazon.com/training/',
    certifications: [
      { level: 'Foundational', name: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
      { level: 'Foundational', name: 'Azure Fundamentals (AZ-900)', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/' },
      { level: 'Intermediate', name: 'AWS Solutions Architect Associate', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
      { level: 'Intermediate', name: 'Google Cloud Professional Architect', url: 'https://cloud.google.com/certifications/cloud-architect' },
      { level: 'Advanced', name: 'Certified Kubernetes Administrator (CKA)', url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/' },
      { level: 'Advanced', name: 'HashiCorp Certified: Terraform Associate', url: 'https://www.hashicorp.com/certification/terraform-associate' }
    ],
    roadmap: [
      { title: 'Cloud Basics', details: 'IaaS, PaaS, SaaS, virtualization.' },
      { title: 'Core Services', details: 'Compute, storage, networking (VPCs).' },
      { title: 'Containers & Orchestration', details: 'Docker, Kubernetes, Helm.' },
      { title: 'Security & Cost', details: 'FinOps and IAM policies.' },
      { title: 'Edge Computing', details: 'IoT integration and Edge AI.' }
    ]
  },
  {
    id: 'cyber',
    path: 'CYBERSECURITY',
    title: 'Cybersecurity & Trust',
    roles: ['Security Architect', 'Ethical Hacker', 'Security Engineer'],
    skills: ['Zero Trust', 'SIEM', 'IAM', 'Penetration Testing', 'Incident Response'],
    outlook: 'Massive demand for defensive and offensive specialists.',
    icon: 'fa-shield-virus',
    color: 'text-red-400',
    learningUrl: 'https://www.comptia.org/certifications/security',
    certifications: [
      { level: 'Foundational', name: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security' },
      { level: 'Foundational', name: 'Certified Ethical Hacker (CEH)', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' },
      { level: 'Intermediate', name: 'ISC2 CISSP', url: 'https://www.isc2.org/Certifications/CISSP' },
      { level: 'Intermediate', name: 'Cloud Security (CCSP)', url: 'https://www.isc2.org/Certifications/CCSP' },
      { level: 'Advanced', name: 'OSCP (Offensive Security)', url: 'https://www.offsec.com/pen200-oscp/' },
      { level: 'Advanced', name: 'Forrester Zero Trust Certification', url: 'https://www.forrester.com/certification/zero-trust-strategies/' }
    ],
    roadmap: [
      { title: 'Security Fundamentals', details: 'Threats, vulnerabilities, risk management.' },
      { title: 'Networking & Tools', details: 'Firewalls, SIEM, Wireshark.' },
      { title: 'Cloud Security', details: 'IAM, encryption, secure architectures.' },
      { title: 'Ethical Hacking', details: 'Penetration testing and Red Teaming.' },
      { title: 'Zero Trust Architecture', details: 'Identity-driven security & automation.' }
    ]
  },
  {
    id: 'data',
    path: 'DATA_ANALYTICS',
    title: 'Data Science & Big Data',
    roles: ['Big Data Engineer', 'Data Architect', 'Data Scientist'],
    skills: ['SQL', 'Python/R', 'ETL', 'Spark', 'Kafka', 'BI Tools'],
    outlook: 'Data is the new oil; processing speed is critical.',
    icon: 'fa-chart-network',
    color: 'text-emerald-400',
    learningUrl: 'https://grow.google/certificates/data-analytics/',
    certifications: [
      { level: 'Foundational', name: 'Google Data Analytics Certificate', url: 'https://grow.google/certificates/data-analytics/' },
      { level: 'Foundational', name: 'Azure Data Fundamentals', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/' },
      { level: 'Intermediate', name: 'IBM Data Science Professional', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
      { level: 'Intermediate', name: 'SAS Certified Data Scientist', url: 'https://www.sas.com/en_us/certification/credentials/data-science/data-scientist.html' },
      { level: 'Advanced', name: 'Cloudera Big Data Certification', url: 'https://www.cloudera.com/about/training/certification.html' },
      { level: 'Advanced', name: 'Certified Analytics Professional (CAP)', url: 'https://www.certifiedanalytics.org/' }
    ],
    roadmap: [
      { title: 'Data Literacy & SQL', details: 'Relational databases and query optimization.' },
      { title: 'Python / R Analysis', details: 'Statistical analysis and data cleaning.' },
      { title: 'Data Engineering', details: 'ETL, pipelines, and schema design.' },
      { title: 'Real-Time Analytics', details: 'Streaming data with Spark & Kafka.' },
      { title: 'BI & Visualization', details: 'Storytelling with Tableau or PowerBI.' }
    ]
  },
  {
    id: 'soft-eng',
    path: 'SOFT_ENG',
    title: 'Software & Systems Eng.',
    roles: ['Full-Stack Developer', 'API Specialist', 'DevOps Engineer'],
    skills: ['React/Angular', 'Node/Go', 'Microservices', 'Linux', 'SRE'],
    outlook: 'Core foundation for all digital products.',
    icon: 'fa-code-branch',
    color: 'text-cyan-400',
    learningUrl: 'https://roadmap.sh/full-stack',
    certifications: [
      { level: 'Foundational', name: 'Oracle Java Certification', url: 'https://education.oracle.com/java-certification' },
      { level: 'Foundational', name: 'Python Institute PCEP/PCAP', url: 'https://pythoninstitute.org/certification/' },
      { level: 'Intermediate', name: 'AWS Developer Associate', url: 'https://aws.amazon.com/certification/certified-developer-associate/' },
      { level: 'Intermediate', name: 'TOGAF Certified Architect', url: 'https://www.opengroup.org/certifications/togaf' },
      { level: 'Advanced', name: 'Google Professional DevOps Engineer', url: 'https://cloud.google.com/certifications/devops-engineer' },
      { level: 'Advanced', name: 'Linux Foundation SRE Cert', url: 'https://training.linuxfoundation.org/certification/certified-sre-practitioner/' }
    ],
    roadmap: [
      { title: 'CS Fundamentals', details: 'Data structures, algorithms, system design.' },
      { title: 'Backend & APIs', details: 'Node.js, Python, or Go with REST/GraphQL.' },
      { title: 'Frontend Mastery', details: 'Modern frameworks like React or Angular.' },
      { title: 'Databases & Caching', details: 'Postgres, MongoDB, Redis.' },
      { title: 'DevOps & SRE', details: 'CI/CD, observability, and site reliability.' }
    ]
  },
  {
    id: 'automation',
    path: 'AUTOMATION',
    title: 'Automation & Intelligent Ops',
    roles: ['RPA Developer', 'Automation Architect', 'Workflow Lead'],
    skills: ['UiPath', 'Blue Prism', 'Process Mapping', 'AI Integration'],
    outlook: 'High efficiency gains across enterprise sectors.',
    icon: 'fa-robot',
    color: 'text-orange-400',
    learningUrl: 'https://www.uipath.com/learning/academy',
    certifications: [
      { level: 'Foundational', name: 'UiPath RPA Associate', url: 'https://www.uipath.com/learning/certification' },
      { level: 'Intermediate', name: 'Automation Anywhere Advanced', url: 'https://university.automationanywhere.com/certification/' },
      { level: 'Intermediate', name: 'Blue Prism Developer', url: 'https://www.blueprism.com/learning/certification/' },
      { level: 'Advanced', name: 'ITIL 4 Foundation', url: 'https://www.axelos.com/certifications/itil-service-management/itil-4-foundation' }
    ],
    roadmap: [
      { title: 'Process Mapping', details: 'Business logic and process flow design.' },
      { title: 'RPA Tooling', details: 'Hands-on with UiPath or Automation Anywhere.' },
      { title: 'AI Integration', details: 'Adding Document AI and ML to workflows.' },
      { title: 'DevOps for Automation', details: 'Testing and deploying automation scripts.' }
    ]
  },
  {
    id: 'quantum',
    path: 'QUANTUM',
    title: 'Quantum Computing',
    roles: ['Quantum Researcher', 'Quantum Developer', 'Algorithmist'],
    skills: ['Qubits', 'Qiskit', 'Cirq', 'Quantum Physics', 'Linear Algebra'],
    outlook: 'The next computational frontier; specialized niche.',
    icon: 'fa-atom',
    color: 'text-indigo-400',
    learningUrl: 'https://qiskit.org/learn',
    certifications: [
      { level: 'Foundational', name: 'Azure Quantum Fundamentals', url: 'https://learn.microsoft.com/en-us/training/paths/quantum-computing-fundamentals/' },
      { level: 'Intermediate', name: 'IBM Quantum Developer', url: 'https://www.ibm.com/training/certification/C0010300' },
      { level: 'Advanced', name: 'Qiskit Developer Certification', url: 'https://www.ibm.com/training/certification/C0010300' }
    ],
    roadmap: [
      { title: 'Physics & Algebra', details: 'Quantum mechanics and complex vector spaces.' },
      { title: 'Quantum Information', details: 'Qubits, entanglement, and gates.' },
      { title: 'Quantum Algorithms', details: 'Grover, Shor, and VQE.' },
      { title: 'Hands-on Coding', details: 'Qiskit, Cirq, and cloud quantum hardware.' }
    ]
  },
  {
    id: 'emerging',
    path: 'EMERGING',
    title: 'Emerging (Web3/AR/IoT)',
    roles: ['Blockchain Dev', 'AR/VR Engineer', 'IoT Architect'],
    skills: ['Solidity', 'Unity', 'Embedded C', 'Spatial Design'],
    outlook: 'Merging physical and digital worlds.',
    icon: 'fa-vr-cardboard',
    color: 'text-pink-400',
    learningUrl: 'https://ethereum.org/en/developers/',
    certifications: [
      { level: 'Foundational', name: 'Unity Certified Artist', url: 'https://unity.com/learn/certification' },
      { level: 'Foundational', name: 'Certified Blockchain Developer', url: 'https://www.blockchain-council.org/certifications/certified-blockchain-developer/' },
      { level: 'Intermediate', name: 'Ethereum Developer Cert', url: 'https://consensys.net/academy/' },
      { level: 'Intermediate', name: 'Cisco IoT Certification', url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/iot.html' },
      { level: 'Advanced', name: 'Unreal Engine Certification', url: 'https://www.unrealengine.com/en-US/training' },
      { level: 'Advanced', name: 'AWS IoT Specialty', url: 'https://aws.amazon.com/certification/certified-iot-specialty/' }
    ],
    roadmap: [
      { title: '3D Prototyping', details: 'Unity/Unreal modeling and spatial UX.' },
      { title: 'Web3 & Smart Contracts', details: 'Solidity, DApps, and DeFi logic.' },
      { title: 'IoT & Sensors', details: 'Embedded systems and networking.' },
      { title: 'Security Audits', details: 'Auditing smart contracts and IoT devices.' }
    ]
  },
  {
    id: 'ai-prod',
    path: 'AI_PRODUCT',
    title: 'AI Product & Management',
    roles: ['AI Product Manager', 'Compliance Officer', 'Strategic Lead'],
    skills: ['Agile', 'AI Ethics', 'Roadmapping', 'Lifecycle Management'],
    outlook: 'Bridging technical AI with business value.',
    icon: 'fa-box-open',
    color: 'text-amber-400',
    learningUrl: 'https://www.productschool.com/blog/product-management-2/the-ultimate-ai-product-manager-guide',
    certifications: [
      { level: 'Foundational', name: 'PMI Agile Certified (PMI-ACP)', url: 'https://www.pmi.org/certifications/agile-acp' },
      { level: 'Intermediate', name: 'AI Product Manager (Deeplearning.ai)', url: 'https://www.deeplearning.ai/courses/ai-product-management-specialization/' },
      { level: 'Advanced', name: 'Certified Scrum Product Owner (CSPO)', url: 'https://www.scrumalliance.org/get-certified/product-owner-track/cspo' }
    ],
    roadmap: [
      { title: 'Product Strategy', details: 'Market analysis and AI roadmaps.' },
      { title: 'AI Lifecycle', details: 'From model design to production monitoring.' },
      { title: 'Ethics & Compliance', details: 'Bias, safety, and regulatory alignment.' },
      { title: 'Stakeholder Alignment', details: 'Translating AI value to business metrics.' }
    ]
  },
  {
    id: 'hardware',
    path: 'HARDWARE',
    title: 'Hardware & Semi Engineering',
    roles: ['ASIC Designer', 'FPGA Engineer', 'HPC Architect'],
    skills: ['VLSI', 'Digital Logic', 'HPC', 'Parallel Compute', 'Verilog'],
    outlook: 'The physical backbone of the AI era.',
    icon: 'fa-memory',
    color: 'text-zinc-400',
    learningUrl: 'https://www.nvidia.com/en-us/training/',
    certifications: [
      { level: 'Foundational', name: 'Cisco CCNA', url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html' },
      { level: 'Intermediate', name: 'ARM Architect Training', url: 'https://www.arm.com/services/training' },
      { level: 'Advanced', name: 'JEDEC / IPC Standards Certs', url: 'https://www.ipc.org/certification' }
    ],
    roadmap: [
      { title: 'Digital Logic & VLSI', details: 'Transistor theory and gate logic.' },
      { title: 'ASIC / FPGA Design', details: 'Hardware Description Languages (HDL).' },
      { title: 'HPC Architecture', details: 'Memory hierarchies and cache coherence.' },
      { title: 'Verification', details: 'Testing chips using simulation tools.' }
    ]
  }
];

export const FIREBASE_STRATEGIES: FirebaseStrategy[] = [
  {
    type: 'Hosting',
    title: 'Firebase Hosting (Static/SPA)',
    benefits: [
      'Rapid deployment to global CDN',
      'Zero-config SSL',
      'Optimized for SPAs (React/Vue/Angular)',
      'No-cost custom domains'
    ],
    useCase: 'Best for documentation, landing pages, and pure client-side applications that leverage Firebase Auth and Firestore.',
    docUrl: 'https://firebase.google.com/docs/hosting'
  },
  {
    type: 'AppHosting',
    title: 'Firebase App Hosting (Dynamic/SSR)',
    benefits: [
      'Next.js & Angular SSR native support',
      'Unified CDN and Server-Side management',
      'Direct GitHub integration with auto-builds',
      'Scalable Google Cloud infrastructure'
    ],
    useCase: 'Essential for SEO-heavy sites, complex dashboards with server-side logic, and enterprise-grade dynamic web apps.',
    docUrl: 'https://firebase.google.com/docs/app-hosting'
  }
];
