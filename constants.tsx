
import { LearningModule, FirebaseStrategy, ExternalResource, InternshipTrack } from './types';

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  // AI Platforms
  { id: 'google-ai-studio', name: 'Google AI Studio', url: 'https://aistudio.google.com/', description: 'Live prompt execution, multi-agent workflows, and tool calling.', category: 'ML_PLATFORM', icon: 'fa-brain' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/', description: 'Live demos via Spaces, Transformers, and free CPU inference.', category: 'ML_PLATFORM', icon: 'fa-face-smiling-hands' },
  { id: 'kaggle', name: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Free GPU/CPU notebooks, Python, Pandas, and ML datasets.', category: 'ML_PLATFORM', icon: 'fa-microchip' },
  { id: 'langchain', name: 'LangChain', url: 'https://python.langchain.com/', description: 'Agent reasoning chains and tool-augmented AI frameworks.', category: 'ML_PLATFORM', icon: 'fa-link' },
  
  // Cloud & DevOps
  { id: 'aws-skill-builder', name: 'AWS Skill Builder', url: 'https://explore.skillbuilder.aws/', description: 'Free labs for Cloud fundamentals and DevOps tracks.', category: 'CLOUD_CONSOLE', icon: 'fa-aws' },
  { id: 'gcp-skills-boost', name: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/', description: 'Real GCP console access for Docker, Kubernetes, and CI/CD.', category: 'CLOUD_CONSOLE', icon: 'fa-google' },
  { id: 'github-actions', name: 'GitHub Actions', url: 'https://github.com/features/actions', description: 'Free tier CI/CD DevOps pipelines and automation.', category: 'IDE', icon: 'fa-github' },
  
  // Full Stack & Sandboxes
  { id: 'freecodecamp', name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', description: 'Browser-based IDE and Full-stack project-based certifications.', category: 'INTERACTIVE_LAB', icon: 'fa-fire' },
  { id: 'replit', name: 'Replit', url: 'https://replit.com/', description: 'Live deployable apps for both Backend and Frontend.', category: 'SANDBOX', icon: 'fa-code' },
  { id: 'codesandbox', name: 'CodeSandbox', url: 'https://codesandbox.io/', description: 'React/Next.js live previews and API integration.', category: 'SANDBOX', icon: 'fa-box-open' },
  
  // Cyber & Sec
  { id: 'tryhackme', name: 'TryHackMe', url: 'https://tryhackme.com/', description: 'Browser-based labs for Red Team and Blue Team security.', category: 'SEC_LAB', icon: 'fa-shield-virus' },
  { id: 'overthewire', name: 'OverTheWire', url: 'https://overthewire.org/', description: 'Linux and security wargames for terminal mastery.', category: 'SEC_LAB', icon: 'fa-user-secret' },
  
  // Hardware & IoT
  { id: 'wokwi', name: 'Wokwi', url: 'https://wokwi.com/', description: 'Arduino and ESP32 simulation with real firmware logic.', category: 'IOT_SIM', icon: 'fa-microchip' },
  { id: 'tinkercad', name: 'Tinkercad', url: 'https://www.tinkercad.com/', description: 'IoT circuit simulation and 3D design for beginners.', category: 'IOT_SIM', icon: 'fa-plug' },
  
  // BA & Automation
  { id: 'uipath', name: 'UiPath Community', url: 'https://www.uipath.com/community', description: 'Free edition for real enterprise desktop automation.', category: 'INTERACTIVE_LAB', icon: 'fa-robot' },
  { id: 'robocorp', name: 'Robocorp', url: 'https://robocorp.com/', description: 'Python-based RPA and open-source software bots.', category: 'IDE', icon: 'fa-gears' },
  { id: 'ms-learn', name: 'Microsoft Learn', url: 'https://learn.microsoft.com/', description: 'Free Power BI labs and official learning paths.', category: 'TUTORIAL', icon: 'fa-microsoft' },
  { id: 'ibm-skillsbuild', name: 'IBM SkillsBuild', url: 'https://skillsbuild.org/', description: 'Industry-aligned AI and Business Analytics projects.', category: 'RESEARCH', icon: 'fa-briefcase' }
];

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic AI Engineer',
    description: 'Master LLM orchestration, RAG, and multi-agent workflows using live inference platforms.',
    platforms: ['google-ai-studio', 'huggingface', 'langchain', 'kaggle'],
    icon: 'fa-brain-circuit',
    color: 'text-purple-400',
    roadmap: ['Prompt Engineering in AI Studio', 'Deploying Models on HF Spaces', 'Building RAG with LangChain', 'Optimizing on Kaggle']
  },
  {
    id: 'devops-sre',
    title: 'Cloud DevOps & SRE',
    description: 'Infrastructure as code, CI/CD, and global scale operations in real cloud environments.',
    platforms: ['aws-skill-builder', 'gcp-skills-boost', 'github-actions', 'replit'],
    icon: 'fa-server',
    color: 'text-blue-400',
    roadmap: ['Cloud Fundamentals (AWS/GCP)', 'Docker & K8s Labs', 'GitHub Actions Pipelines', 'Deploying Live Microservices']
  },
  {
    id: 'cyber-trust',
    title: 'Cybersecurity Analyst',
    description: 'Offensive and defensive security training using browser-based wargames.',
    platforms: ['tryhackme', 'overthewire', 'github-actions'],
    icon: 'fa-shield-halved',
    color: 'text-red-400',
    roadmap: ['Linux CLI Mastery', 'Network Vulnerability Labs', 'Web Application Pentesting', 'Security Auditing Automation']
  },
  {
    id: 'fullstack-dev',
    title: 'Modern Full-Stack Architect',
    description: 'Building and deploying complete web applications with zero-config cloud tools.',
    platforms: ['freecodecamp', 'replit', 'codesandbox', 'github-actions'],
    icon: 'fa-layer-group',
    color: 'text-cyan-400',
    roadmap: ['Responsive Frontend (FCC)', 'Node/Python Backend (Replit)', 'API Integrations', 'Vercel/Hosting Deployments']
  },
  {
    id: 'ba-automation',
    title: 'Business AI & Automation',
    description: 'Bridging technical logic with business data and RPA automation.',
    platforms: ['uipath', 'ms-learn', 'ibm-skillsbuild', 'kaggle'],
    icon: 'fa-chart-pie',
    color: 'text-emerald-400',
    roadmap: ['Data Analytics Foundations', 'Power BI Dashboards', 'RPA Bot Development', 'AI Business Strategy']
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
