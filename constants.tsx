
import { LearningModule, FirebaseStrategy } from './types';

export const LEARNING_PATHS: LearningModule[] = [
  {
    id: 'ai-ml',
    path: 'AI_ML',
    title: 'AI & Machine Learning',
    roles: ['AI/ML Engineer', 'Machine Learning Scientist', 'GenAI Specialist', 'AI Product Manager'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Deep Learning Architectures', 'LLMs'],
    outlook: 'Salaries often sit at the top of tech wage tables globally due to scarcity.',
    icon: 'fa-brain',
    color: 'text-purple-400',
    learningUrl: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/',
    certifications: [
      { level: 'Foundational', name: 'IBM AI Engineering Professional', url: 'https://www.coursera.org/professional-certificates/ai-engineer' },
      { level: 'Foundational', name: 'Google Cloud ML Engineer', url: 'https://cloud.google.com/certifications/machine-learning-engineer' },
      { level: 'Foundational', name: 'MS Azure AI Fundamentals (AI-900)', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/' },
      { level: 'Intermediate', name: 'TensorFlow Developer Certificate', url: 'https://www.tensorflow.org/certificate' },
      { level: 'Intermediate', name: 'AWS Certified Machine Learning – Specialty', url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/' },
      { level: 'Advanced', name: 'DeepLearning.AI Generative AI', url: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/' },
      { level: 'Advanced', name: 'NVIDIA DLI Certifications', url: 'https://www.nvidia.com/en-us/training/' }
    ],
    roadmap: [
      { title: 'Math & Fundamentals', details: 'Linear algebra, probability, statistics.' },
      { title: 'Python for ML', details: 'NumPy, pandas, scikit-learn.' },
      { title: 'Deep Learning', details: 'Neural networks, CNNs, RNNs.' },
      { title: 'Generative AI & Transformers', details: 'LLMs, fine-tuning, RAG.' },
      { title: 'MLOps', details: 'Model deployment, versioning, monitoring.' },
      { title: 'Capstone', details: 'Real-world AI project + portfolio.' }
    ]
  },
  {
    id: 'cloud',
    path: 'CLOUD',
    title: 'Cloud & Architecture',
    roles: ['Cloud Solutions Architect', 'Cloud Infrastructure Engineer', 'SRE', 'Multi-cloud Architect'],
    skills: ['Multi-cloud', 'Hybrid Cloud', 'Kubernetes', 'Terraform', 'Service Mesh', 'FinOps'],
    outlook: 'High demand for architects capable of managing complex multi-provider environments.',
    icon: 'fa-cloud',
    color: 'text-blue-400',
    learningUrl: 'https://aws.amazon.com/training/',
    certifications: [
      { level: 'Foundational', name: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
      { level: 'Intermediate', name: 'AWS Solutions Architect Associate', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
      { level: 'Intermediate', name: 'HashiCorp Certified: Terraform Associate', url: 'https://www.hashicorp.com/certification/terraform-associate' },
      { level: 'Advanced', name: 'Certified Kubernetes Administrator (CKA)', url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/' },
      { level: 'Advanced', name: 'Google Professional Cloud Architect', url: 'https://cloud.google.com/certifications/cloud-architect' },
      { level: 'Advanced', name: 'Azure Solutions Architect Expert', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/' }
    ],
    roadmap: [
      { title: 'Infrastructure as Code (IaC)', details: 'Mastering Terraform for reproducible multi-provider resource provisioning.' },
      { title: 'Kubernetes & Containers', details: 'Deep dive into Docker, Kubernetes objects, Helm, and cluster administration (EKS, GKE, AKS).' },
      { title: 'Multi-Cloud Strategy', details: 'Workload distribution patterns across AWS, GCP, and Azure; Disaster Recovery and High Availability.' },
      { title: 'Hybrid Cloud Connectivity', details: 'Establishing secure connections between On-prem and Cloud via VPN, Direct Connect, and Interconnect.' },
      { title: 'Service Mesh & Networking', details: 'Implementing Istio or Linkerd for microservices communication, observability, and security in hybrid clusters.' },
      { title: 'Cloud FinOps & Governance', details: 'Cost optimization strategies, tagging policies, and governance across disparate cloud providers.' }
    ]
  },
  {
    id: 'cyber',
    path: 'CYBERSECURITY',
    title: 'Cybersecurity & Trust',
    roles: ['Security Architect', 'Ethical Hacker', 'Security Engineer'],
    skills: ['Zero Trust', 'Firewalls', 'SIEM', 'IAM', 'Encryption', 'Incident Response'],
    outlook: 'Highest demand due to increasing digital threats and vulnerabilities.',
    icon: 'fa-shield-virus',
    color: 'text-red-400',
    learningUrl: 'https://www.comptia.org/certifications/security',
    certifications: [
      { level: 'Foundational', name: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security' },
      { level: 'Foundational', name: 'Certified Ethical Hacker (CEH)', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' },
      { level: 'Intermediate', name: 'ISC2 CISSP', url: 'https://www.isc2.org/Certifications/CISSP' },
      { level: 'Intermediate', name: 'Cloud Security (CCSP)', url: 'https://www.isc2.org/Certifications/CCSP' },
      { level: 'Advanced', name: 'OSCP (Offensive Security)', url: 'https://www.offsec.com/pen200-oscp/' },
      { level: 'Advanced', name: 'Certified Incident Handler (GCIH)', url: 'https://www.giac.org/certification/certified-incident-handler-gcih' }
    ],
    roadmap: [
      { title: 'Security Fundamentals', details: 'Threats, vulnerabilities, risk mitigation.' },
      { title: 'Networking & Tools', details: 'Firewalls, SIEM (Splunk/Sentinel).' },
      { title: 'Cloud Security', details: 'IAM, KMS, secure cloud architecture.' },
      { title: 'Ethical Hacking', details: 'Penetration testing and Red Teaming.' },
      { title: 'Zero Trust', details: 'Architecture design and automation.' },
      { title: 'Capture-the-Flag', details: 'Live hands-on CTF challenge labs.' }
    ]
  },
  {
    id: 'data',
    path: 'DATA_ANALYTICS',
    title: 'Data Science & Big Data',
    roles: ['Big Data Engineer', 'Data Architect', 'Data Scientist'],
    skills: ['SQL', 'Python/R', 'ETL Pipelines', 'Spark', 'Kafka', 'BI Tools'],
    outlook: 'Critical for real-time business insights and data-driven decisions.',
    icon: 'fa-chart-network',
    color: 'text-emerald-400',
    learningUrl: 'https://grow.google/certificates/data-analytics/',
    certifications: [
      { level: 'Foundational', name: 'Google Data Analytics Certificate', url: 'https://grow.google/certificates/data-analytics/' },
      { level: 'Foundational', name: 'Azure Data Fundamentals', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/' },
      { level: 'Intermediate', name: 'IBM Data Science Professional', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
      { level: 'Intermediate', name: 'SAS Certified Data Scientist', url: 'https://www.sas.com/en_us/certification/credentials/data-science/data-scientist.html' },
      { level: 'Advanced', name: 'Certified Analytics Professional (CAP)', url: 'https://www.certifiedanalytics.org/' },
      { level: 'Advanced', name: 'TensorFlow Data Specialization', url: 'https://www.coursera.org/specializations/tensorflow-data-and-deployment' }
    ],
    roadmap: [
      { title: 'Data Literacy & SQL', details: 'Relational databases and advanced queries.' },
      { title: 'Python / R Analysis', details: 'NumPy, pandas, statistical testing.' },
      { title: 'Statistics', details: 'Experimentation and data modeling.' },
      { title: 'Data Engineering', details: 'ETL, pipelines, and schema design.' },
      { title: 'Real-Time Analytics', details: 'BI Tools and streaming analytics.' },
      { title: 'Portfolio', details: 'Full dashboards + case study projects.' }
    ]
  },
  {
    id: 'soft-eng',
    path: 'SOFT_ENG',
    title: 'Software Engineering',
    roles: ['Full-Stack Developer', 'Backend Architect', 'API Specialist'],
    skills: ['React/Angular', 'Node/Django', 'Go', 'Microservices', 'SRE'],
    outlook: 'Modern web and systems architecture remain evergreen essentials.',
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
      { title: 'CS Fundamentals', details: 'Data structures, algorithms, logic.' },
      { title: 'Backend & APIs', details: 'Node.js, Python, or Go with GraphQL.' },
      { title: 'Frontend', details: 'React, Angular, or Vue with state management.' },
      { title: 'Databases & Caching', details: 'Postgres, MongoDB, Redis.' },
      { title: 'SRE & DevOps', details: 'CI/CD and Site Reliability Engineering.' },
      { title: 'Cloud-Native', details: 'Building for distributed environments.' }
    ]
  },
  {
    id: 'automation',
    path: 'AUTOMATION',
    title: 'Automation & RPA',
    roles: ['RPA Developer', 'Automation Architect', 'Intelligent Ops Lead'],
    skills: ['UiPath', 'Blue Prism', 'Process Mapping', 'AI Workflow Integration'],
    outlook: 'Intelligent operations are the key to organizational efficiency.',
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
      { title: 'Business Mapping', details: 'Documenting business processes and logic.' },
      { title: 'RPA Tooling', details: 'Scripting with UiPath or Automation Anywhere.' },
      { title: 'AI Integration', details: 'Merging ML models with RPA workflows.' },
      { title: 'DevOps for Automation', details: 'Scaling scripts in production envs.' },
      { title: 'Live Projects', details: 'End-to-end automation deployments.' }
    ]
  },
  {
    id: 'quantum',
    path: 'QUANTUM',
    title: 'Quantum Computing',
    roles: ['Quantum Algorithmist', 'Quantum Engineer', 'R&D Specialist'],
    skills: ['Qubits', 'Qiskit', 'Cirq', 'Quantum Physics', 'Quantum Information'],
    outlook: 'Emerging highly-specialized space for R&D leadership.',
    icon: 'fa-atom',
    color: 'text-indigo-400',
    learningUrl: 'https://qiskit.org/learn',
    certifications: [
      { level: 'Foundational', name: 'Azure Quantum Fundamentals', url: 'https://learn.microsoft.com/en-us/training/paths/quantum-computing-fundamentals/' },
      { level: 'Intermediate', name: 'IBM Quantum Developer', url: 'https://www.ibm.com/training/certification/C0010300' },
      { level: 'Advanced', name: 'Qiskit Developer Certification', url: 'https://www.ibm.com/training/certification/C0010300' }
    ],
    roadmap: [
      { title: 'Physics & Algebra', details: 'Quantum mechanics and linear algebra.' },
      { title: 'Information & Qubits', details: 'Qubit behavior and entanglement.' },
      { title: 'Quantum Algorithms', details: 'Grover, Shor, and hybrid algorithms.' },
      { title: 'Hands-on Coding', details: 'Using Qiskit / Cirq on Azure Quantum.' },
      { title: 'Applied Projects', details: 'Real-world quantum simulation testing.' }
    ]
  },
  {
    id: 'emerging',
    path: 'EMERGING',
    title: 'Emerging (AR/VR/Web3/IoT)',
    roles: ['Blockchain Dev', 'Spatial UX Designer', 'IoT Solutions Engineer'],
    skills: ['Solidity', 'Unity/Unreal', 'Embedded C', 'Spatial Interaction Design'],
    outlook: 'The next phase of physical-digital interaction.',
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
      { title: 'Spatial Computing', details: '3D modeling and immersive UX design.' },
      { title: 'Blockchain & Smart Contracts', details: 'Solidity and DApps architecture.' },
      { title: 'IoT & Edge AI', details: 'Embedded systems and sensor networking.' },
      { title: 'Security Audits', details: 'Securing smart contracts and IoT nodes.' }
    ]
  },
  {
    id: 'ai-prod',
    path: 'AI_PRODUCT',
    title: 'AI Product & Governance',
    roles: ['AI Product Manager', 'Compliance Specialist', 'Strategic AI Lead'],
    skills: ['Agile', 'AI Lifecycle', 'Ethics', 'Compliance', 'Product Roadmapping'],
    outlook: 'Crucial hybrid role bridging AI tech with business strategy.',
    icon: 'fa-box-open',
    color: 'text-amber-400',
    learningUrl: 'https://www.productschool.com/blog/product-management-2/the-ultimate-ai-product-manager-guide',
    certifications: [
      { level: 'Foundational', name: 'PMI Agile Certified (PMI-ACP)', url: 'https://www.pmi.org/certifications/agile-acp' },
      { level: 'Intermediate', name: 'AI Product Manager (Deeplearning.ai)', url: 'https://www.deeplearning.ai/courses/ai-product-management-specialization/' },
      { level: 'Advanced', name: 'Certified Scrum Product Owner (CSPO)', url: 'https://www.scrumalliance.org/get-certified/product-owner-track/cspo' }
    ],
    roadmap: [
      { title: 'Product Strategy', details: 'Roadmapping and market-fit analysis.' },
      { title: 'AI Lifecycle', details: 'From model design to production monitoring.' },
      { title: 'Ethics & Compliance', details: 'Governance and bias mitigation.' },
      { title: 'Go-to-Market', details: 'Scaling AI products for global impact.' }
    ]
  },
  {
    id: 'hardware',
    path: 'HARDWARE',
    title: 'Hardware & Semiconductors',
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
