
import { LearningModule, FirebaseStrategy, ExternalResource } from './types';

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  // IDE & Core Tools
  {
    id: 'vscode',
    name: 'VS Code + AI',
    url: 'https://code.visualstudio.com/',
    description: 'Industry-standard IDE with built-in AI Agent Mode and copilot features.',
    category: 'IDE',
    icon: 'fa-code'
  },
  {
    id: 'google-assist',
    name: 'Google Code Assist',
    url: 'https://codeassist.google/',
    description: 'Enterprise AI assistant integrated into IDEs for code generation and debugging.',
    category: 'AI_ASSISTANT',
    icon: 'fa-google'
  },
  
  // AI Assistants & Generators
  {
    id: 'codeium',
    name: 'Codeium',
    url: 'https://codeium.com/',
    description: 'Ultra-fast free AI code autocomplete and chat for 70+ languages.',
    category: 'AI_ASSISTANT',
    icon: 'fa-bolt'
  },
  {
    id: 'zzzcode',
    name: 'ZZZ Code AI',
    url: 'https://zzzcode.ai/code-generator',
    description: 'Free online form-based generator for logic snippets and unit tests.',
    category: 'AI_ASSISTANT',
    icon: 'fa-microchip-ai'
  },
  {
    id: 'workik',
    name: 'Workik AI',
    url: 'https://workik.com/ai-code-generator',
    description: 'Prompt-to-code generator for full application structures and modules.',
    category: 'AI_ASSISTANT',
    icon: 'fa-wand-sparkles'
  },
  {
    id: 'deepai',
    name: 'DeepAI Code',
    url: 'https://deepai.org/chat/ai-code',
    description: 'Conversational code logic explainer and translator.',
    category: 'AI_ASSISTANT',
    icon: 'fa-brain-circuit'
  },
  {
    id: 'cline',
    name: 'Cline Bot',
    url: 'https://cline.bot/',
    description: 'Autonomous open-source AI coding agent for complex file manipulation.',
    category: 'AI_ASSISTANT',
    icon: 'fa-robot'
  },

  // Interactive Learning Platforms
  {
    id: 'fcc',
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/',
    description: 'Comprehensive curriculum for web dev, data science, and security.',
    category: 'INTERACTIVE_LAB',
    icon: 'fa-fire-flame-curved'
  },
  {
    id: 'codecademy',
    name: 'Codecademy',
    url: 'https://www.codecademy.com/',
    description: 'Pro-grade interactive lessons with in-browser code feedback.',
    category: 'INTERACTIVE_LAB',
    icon: 'fa-keyboard'
  },
  {
    id: 'sololearn',
    name: 'SoloLearn',
    url: 'https://www.sololearn.com/en/',
    description: 'Mobile-first hands-on coding courses for 25+ technologies.',
    category: 'INTERACTIVE_LAB',
    icon: 'fa-mobile-screen-button'
  },
  {
    id: 'codechef',
    name: 'CodeChef Learn',
    url: 'https://www.codechef.com/',
    description: 'Competitive programming and data structures mastery.',
    category: 'INTERACTIVE_LAB',
    icon: 'fa-hat-wizard'
  },
  {
    id: 'codecombat',
    name: 'CodeCombat',
    url: 'https://codecombat.com/',
    description: 'Gamified environment for learning core JS/Python logic through play.',
    category: 'INTERACTIVE_LAB',
    icon: 'fa-gamepad'
  },

  // Online Compilers & Sandboxes
  {
    id: 'playcode',
    name: 'PlayCode JS',
    url: 'https://playcode.io/',
    description: 'High-performance JavaScript playground with live visualization.',
    category: 'SANDBOX',
    icon: 'fa-play'
  },
  {
    id: 'edube',
    name: 'Edube Interactive',
    url: 'https://edube.org/',
    description: 'Guided sandbox for Python, JS, and C++ certification prep.',
    category: 'SANDBOX',
    icon: 'fa-terminal'
  },

  // Tutorials & Research
  {
    id: 'learnpython',
    name: 'LearnPython.org',
    url: 'https://www.learnpython.org/',
    description: 'Interactive tutorials specifically for Python and Data Science.',
    category: 'TUTORIAL',
    icon: 'fa-brands fa-python'
  },
  {
    id: 'arxiv',
    name: 'arXiv Research',
    url: 'https://arxiv.org/abs/1209.2166',
    description: 'Elite research library for deep learning and AI paper mastery.',
    category: 'RESEARCH',
    icon: 'fa-book-open'
  }
];

export const LEARNING_PATHS: LearningModule[] = [
  {
    id: 'ai-ml',
    path: 'AI_ML',
    title: 'AI & Machine Learning',
    roles: ['GenAI Engineer', 'MLOps Specialist', 'LLM Architect', 'AI Scientist'],
    skills: ['Generative AI', 'LLMs', 'MLOps', 'PyTorch', 'RAG', 'Fine-tuning', 'Vector DBs'],
    outlook: 'High-velocity growth; $200k-$450k+ roles for GenAI & MLOps specialists.',
    icon: 'fa-brain-circuit',
    color: 'text-purple-400',
    learningUrl: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/',
    certifications: [
      { level: 'Foundational', name: 'Google Cloud ML Engineer', url: 'https://cloud.google.com/certifications/machine-learning-engineer' },
      { level: 'Intermediate', name: 'AWS Machine Learning – Specialty', url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/' },
      { level: 'Advanced', name: 'DeepLearning.AI TensorFlow / GenAI', url: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/' },
      { level: 'Advanced', name: 'NVIDIA DLI: LLMs and Transformers', url: 'https://www.nvidia.com/en-us/training/' }
    ],
    roadmap: [
      { title: 'Foundations & Deep Learning', details: 'Linear algebra, backpropagation, CNNs, RNNs, and PyTorch/TensorFlow internals.' },
      { title: 'Generative AI & LLMs', details: 'Transformer architectures, Attention mechanisms, BERT/GPT lineage, and Tokenization.' },
      { title: 'Prompt Engineering & RAG', details: 'Context injection, Retrieval Augmented Generation (RAG), and Vector Databases (Pinecone, Weaviate).' },
      { title: 'LLM Fine-tuning & RLHF', details: 'PEFT (LoRA, QLoRA), Reinforcement Learning from Human Feedback (RLHF), and Quantization.' },
      { title: 'MLOps & Deployment', details: 'CI/CD for ML, Model monitoring, Data drift detection, and serving with TFX or TorchServe.' }
    ]
  },
  {
    id: 'soft-eng',
    path: 'SOFT_ENG',
    title: 'Software & Systems Eng.',
    roles: ['Senior Full-Stack Developer', 'Backend Architect', 'Node.js Specialist', 'Frontend Engineer'],
    skills: ['Node.js', 'Browser APIs', 'TypeScript', 'LeetCode Mastery', 'HackerRank Prep', 'Microservices', 'CI/CD'],
    outlook: 'Fundamental demand for high-performance engineers with algorithmic proficiency.',
    icon: 'fa-code-pull-request',
    color: 'text-cyan-400',
    learningUrl: 'https://roadmap.sh/full-stack',
    certifications: [
      { level: 'Foundational', name: 'AWS Certified Developer Associate', url: 'https://aws.amazon.com/certification/certified-developer-associate/' },
      { level: 'Intermediate', name: 'Node.js Application Developer (LFNAD)', url: 'https://training.linuxfoundation.org/certification/jsnad/' },
      { level: 'Advanced', name: 'Meta Full-Stack Engineer', url: 'https://www.coursera.org/professional-certificates/meta-full-stack-engineer' },
      { level: 'Advanced', name: 'Google Professional DevOps Engineer', url: 'https://cloud.google.com/certifications/devops-engineer' }
    ],
    roadmap: [
      { title: 'Algorithmic Mastery (LeetCode/HackerRank)', details: 'Data structures, Dynamic Programming, and Graph theory for high-tier technical interviews.' },
      { title: 'Modern Full-stack (Browser/Node)', details: 'DOM manipulation, Browser rendering engines, and high-concurrency Node.js event-loop optimization.' },
      { title: 'System Design & Architecture', details: 'Scalability, Load Balancing, Caching strategies, and Distributed Systems fundamentals.' },
      { title: 'DevOps & SRE', details: 'CI/CD pipelines, Docker, Kubernetes, and full-stack observability with Grafana.' },
      { title: 'Platform Engineering', details: 'Building Internal Developer Portals (IDPs) and self-service infrastructure.' }
    ]
  },
  {
    id: 'cloud',
    path: 'CLOUD',
    title: 'Cloud & Architecture',
    roles: ['Cloud Architect', 'Hybrid Cloud Engineer', 'Multi-cloud Consultant'],
    skills: ['Multi-cloud', 'Hybrid Cloud', 'Kubernetes', 'Terraform', 'Anthos', 'Azure Arc'],
    outlook: 'Enterprise demand shifting from "Cloud First" to "Sovereign Multi-cloud".',
    icon: 'fa-cloud-word',
    color: 'text-blue-400',
    learningUrl: 'https://aws.amazon.com/training/',
    certifications: [
      { level: 'Foundational', name: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
      { level: 'Intermediate', name: 'HashiCorp Certified: Terraform Associate', url: 'https://www.hashicorp.com/certification/terraform-associate' },
      { level: 'Advanced', name: 'Certified Kubernetes Administrator (CKA)', url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/' },
      { level: 'Advanced', name: 'AWS Solutions Architect Professional', url: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/' }
    ],
    roadmap: [
      { title: 'Infrastructure as Code (IaC)', details: 'Mastering Terraform and Pulumi for multi-provider (AWS, GCP, Azure) provisioning.' },
      { title: 'Kubernetes & Service Mesh', details: 'Cluster orchestration (EKS/GKE/AKS) and Istio for traffic management and security.' },
      { title: 'Multi-cloud & Hybrid patterns', details: 'Workload portability with containers, Anthos (GCP), and Azure Arc for on-prem management.' },
      { title: 'Cloud Networking & DNS', details: 'Direct Connect, ExpressRoute, and global load balancing across regions.' },
      { title: 'FinOps & Governance', details: 'Cost attribution, automated scaling policies, and cross-cloud tagging strategies.' }
    ]
  },
  {
    id: 'cyber',
    path: 'CYBERSECURITY',
    title: 'Cybersecurity & Trust',
    roles: ['Zero Trust Architect', 'Incident Responder', 'Security Engineer'],
    skills: ['Zero Trust', 'Incident Response', 'Cloud Security', 'IAM', 'SOAR', 'EDR'],
    outlook: 'Critical focus on "Trust but Verify" architectures and automated response.',
    icon: 'fa-shield-halved',
    color: 'text-red-400',
    learningUrl: 'https://www.comptia.org/certifications/security',
    certifications: [
      { level: 'Foundational', name: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security' },
      { level: 'Intermediate', name: 'Certified Ethical Hacker (CEH)', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' },
      { level: 'Advanced', name: 'OSCP (Penetration Testing)', url: 'https://www.offsec.com/courses/pen-200/' },
      { level: 'Advanced', name: 'ISC2 CISSP', url: 'https://www.isc2.org/Certifications/CISSP' }
    ],
    roadmap: [
      { title: 'Zero Trust Architecture', details: 'Identity-first security, micro-segmentation, and continuous authorization principles.' },
      { title: 'Cloud Security Posture (CSPM)', details: 'Securing serverless, containers, and multi-tenant cloud environments.' },
      { title: 'Incident Response & Forensics', details: 'Phases of IR: Preparation, Identification, Containment, Eradication, and Recovery.' },
      { title: 'SOC & SOAR', details: 'Security Operations Centers and Security Orchestration, Automation, and Response (SOAR).' },
      { title: 'Advanced Threat Hunting', details: 'Using SIEM/EDR data to proactively find hidden adversarial presence.' }
    ]
  },
  {
    id: 'data',
    path: 'DATA_ANALYTICS',
    title: 'Data & Real-time Insights',
    roles: ['Big Data Engineer', 'Real-time Analyst', 'Data Architect'],
    skills: ['Big Data', 'Real-time Analytics', 'Spark', 'Kafka', 'Snowflake', 'Dremio'],
    outlook: 'Transitioning from batch processing to real-time event-driven architectures.',
    icon: 'fa-database',
    color: 'text-emerald-400',
    learningUrl: 'https://grow.google/certificates/data-analytics/',
    certifications: [
      { level: 'Foundational', name: 'Google Data Analytics Certificate', url: 'https://grow.google/certificates/data-analytics/' },
      { level: 'Intermediate', name: 'Snowflake SnowPro Core', url: 'https://www.snowflake.com/en/data-cloud/certifications/' },
      { level: 'Advanced', name: 'Databricks Data Engineer Professional', url: 'https://www.databricks.com/learn/certification' },
      { level: 'Advanced', name: 'Confluent Certified Developer for Apache Kafka', url: 'https://www.confluent.io/certification/' }
    ],
    roadmap: [
      { title: 'Modern Data Warehousing', details: 'Cloud-native storage (Snowflake/BigQuery) and Lakehouse architectures (Databricks).' },
      { title: 'Streaming & Real-time Processing', details: 'Apache Kafka, Flink, and Spark Streaming for low-latency data pipelines.' },
      { title: 'ETL/ELT Frameworks', details: 'dbt (data build tool), Airflow for orchestration, and modern ingestion tools.' },
      { title: 'Big Data Governance', details: 'Data quality, lineage, and catalogs (Atlan, Alation, Amundsen).' },
      { title: 'Advanced Visual Analytics', details: 'Real-time dashboards using Looker, Tableau, and custom D3.js apps.' }
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
