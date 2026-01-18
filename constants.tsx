
import { LearningModule, FirebaseStrategy } from './types';

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
  },
  {
    id: 'soft-eng',
    path: 'SOFT_ENG',
    title: 'Software & Systems Eng.',
    roles: ['Full-Stack Developer', 'DevOps Engineer', 'SRE', 'Platform Engineer'],
    skills: ['Full-stack', 'DevOps', 'SRE', 'Node.js', 'Go', 'Microservices', 'CI/CD'],
    outlook: 'High demand for developers who can "own" the full lifecycle from code to prod.',
    icon: 'fa-code-pull-request',
    color: 'text-cyan-400',
    learningUrl: 'https://roadmap.sh/full-stack',
    certifications: [
      { level: 'Foundational', name: 'AWS Certified Developer Associate', url: 'https://aws.amazon.com/certification/certified-developer-associate/' },
      { level: 'Intermediate', name: 'Microsoft Certified: Azure Developer', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/' },
      { level: 'Advanced', name: 'Google Professional DevOps Engineer', url: 'https://cloud.google.com/certifications/devops-engineer' },
      { level: 'Advanced', name: 'Linux Foundation SRE Cert', url: 'https://training.linuxfoundation.org/certification/certified-sre-practitioner/' }
    ],
    roadmap: [
      { title: 'Full-stack Modernity', details: 'Advanced React/Next.js for frontend and Go/Rust/Node.js for high-perf backend.' },
      { title: 'DevOps & Toolchains', details: 'Advanced GitHub Actions, Jenkins, and automated testing strategies.' },
      { title: 'SRE & Observability', details: 'SLIs/SLOs, Error Budgets, and full-stack monitoring with Prometheus/Grafana.' },
      { title: 'Microservices & APIs', details: 'Design patterns, GraphQL, gRPC, and API Gateway (Kong/Apigee) management.' },
      { title: 'Platform Engineering', details: 'Building Internal Developer Portals (IDPs) and self-service infrastructure.' }
    ]
  },
  {
    id: 'automation',
    path: 'AUTOMATION',
    title: 'Automation & Intelligent Ops',
    roles: ['RPA Developer', 'Low-Code Architect', 'Process Engineer'],
    skills: ['RPA', 'Low-code', 'Intelligent Operations', 'UiPath', 'Power Platform'],
    outlook: 'Democratization of development via low-code and AI-led automation.',
    icon: 'fa-microchip-ai',
    color: 'text-orange-400',
    learningUrl: 'https://www.uipath.com/learning/academy',
    certifications: [
      { level: 'Foundational', name: 'Microsoft Power Platform Fundamentals', url: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/' },
      { level: 'Intermediate', name: 'UiPath Certified RPA Associate', url: 'https://www.uipath.com/learning/certification' },
      { level: 'Advanced', name: 'UiPath Advanced RPA Developer', url: 'https://www.uipath.com/learning/certification' },
      { level: 'Advanced', name: 'Automation Anywhere Professional', url: 'https://university.automationanywhere.com/certification/' }
    ],
    roadmap: [
      { title: 'Process Mapping & Mining', details: 'Analyzing business workflows to identify high-ROI automation targets.' },
      { title: 'RPA Development', details: 'Building bots with UiPath or Blue Prism to automate legacy UI tasks.' },
      { title: 'Low-Code Application Design', details: 'Microsoft Power Apps and OutSystems for rapid internal tool development.' },
      { title: 'Intelligent Automation (IA)', details: 'Integrating AI/OCR and Document AI to handle unstructured data in workflows.' },
      { title: 'Center of Excellence (CoE)', details: 'Governing and scaling automation across the entire enterprise.' }
    ]
  },
  {
    id: 'quantum',
    path: 'QUANTUM',
    title: 'Quantum Computing',
    roles: ['Quantum Developer', 'Quantum Hardware Engineer', 'Algorithmist'],
    skills: ['Qubits', 'Error Correction', 'Qiskit', 'Cirq', 'Quantum Algorithms'],
    outlook: 'Specialized R&D frontier; transition from NISQ to Fault-tolerant systems.',
    icon: 'fa-atom-simple',
    color: 'text-indigo-400',
    learningUrl: 'https://qiskit.org/learn',
    certifications: [
      { level: 'Foundational', name: 'Microsoft Azure Quantum Fundamentals', url: 'https://learn.microsoft.com/en-us/training/paths/quantum-computing-fundamentals/' },
      { level: 'Intermediate', name: 'IBM Quantum Developer', url: 'https://www.ibm.com/training/certification/C0010300' },
      { level: 'Advanced', name: 'MIT xPRO Quantum Computing', url: 'https://learn-xpro.mit.edu/quantum-computing' }
    ],
    roadmap: [
      { title: 'Quantum Mechanics for Devs', details: 'Linear algebra, Hilbert spaces, and qubit state representation.' },
      { title: 'Qubits & Gates', details: 'Superposition, entanglement, and universal gate sets (Hadamard, CNOT).' },
      { title: 'Quantum Error Correction', details: 'Surface codes, logical qubits, and noise mitigation in the NISQ era.' },
      { title: 'Quantum Algorithms', details: 'Shor’s, Grover’s, VQE (Variational Quantum Eigensolver), and QAOA.' },
      { title: 'SDKs: Qiskit & Cirq', details: 'Programming real quantum hardware via IBM Quantum and Google Cirq.' }
    ]
  },
  {
    id: 'emerging',
    path: 'EMERGING',
    title: 'Emerging (XR/Web3/IoT)',
    roles: ['Web3 Developer', 'AR/VR Architect', 'IoT Systems Lead'],
    skills: ['Blockchain', 'AR/VR', 'IoT', 'Solidity', 'Unity', 'Edge AI', 'MQTT'],
    outlook: 'Convergence of spatial computing, decentralized finance, and industrial IoT.',
    icon: 'fa-vr-cardboard',
    color: 'text-pink-400',
    learningUrl: 'https://ethereum.org/en/developers/',
    certifications: [
      { level: 'Foundational', name: 'Unity Certified User', url: 'https://unity.com/learn/certification' },
      { level: 'Intermediate', name: 'Certified Blockchain Developer', url: 'https://www.blockchain-council.org/certifications/certified-blockchain-developer/' },
      { level: 'Advanced', name: 'Ethereum Developer Certification', url: 'https://consensys.net/academy/' },
      { level: 'Advanced', name: 'AWS Certified IoT Specialty', url: 'https://aws.amazon.com/certification/certified-iot-specialty/' }
    ],
    roadmap: [
      { title: 'Web3 & Smart Contracts', details: 'Solidity development, DApp architecture, and decentralized storage (IPFS).' },
      { title: 'Immersive Tech (AR/VR)', details: 'Unity/Unreal Engine, 3D spatial UI, and Mixed Reality (MR) for Enterprise.' },
      { title: 'IoT Ecosystems', details: 'Device management, MQTT protocols, and hardware security (TPM/HSM).' },
      { title: 'Edge AI & Analytics', details: 'Running ML models on low-power devices with TensorFlow Lite or Edge Impulse.' },
      { title: 'Digital Twins', details: 'Connecting IoT real-time data to 3D spatial models for simulation.' }
    ]
  },
  {
    id: 'ai-prod',
    path: 'AI_PRODUCT',
    title: 'AI Product & Management',
    roles: ['AI Product Manager', 'Compliance Officer', 'AI Governance Lead'],
    skills: ['Product Management', 'AI Compliance', 'AI Governance', 'Ethics', 'Strategy'],
    outlook: 'Bridging the gap between AI capability and organizational ROI.',
    icon: 'fa-briefcase',
    color: 'text-amber-400',
    learningUrl: 'https://www.productschool.com/',
    certifications: [
      { level: 'Foundational', name: 'Agile Certified Practitioner (PMI-ACP)', url: 'https://www.pmi.org/certifications/agile-acp' },
      { level: 'Intermediate', name: 'AI Product Manager (DeepLearning.AI)', url: 'https://www.deeplearning.ai/courses/ai-product-management-specialization/' },
      { level: 'Advanced', name: 'Certified Scrum Product Owner (CSPO)', url: 'https://www.scrumalliance.org/get-certified/product-owner-track/cspo' }
    ],
    roadmap: [
      { title: 'AI Lifecycle Management', details: 'From problem framing to model performance auditing and iterative improvement.' },
      { title: 'AI Governance & Ethics', details: 'Managing bias, explainability (XAI), and corporate AI safety guidelines.' },
      { title: 'AI Compliance & Regulation', details: 'Navigating the EU AI Act, GDPR, and sector-specific AI regulations.' },
      { title: 'Strategic Roadmap Design', details: 'Prioritizing AI features based on feasibility, cost, and business value.' },
      { title: 'Stakeholder & Ethics Review', details: 'Building cross-functional review boards for responsible AI rollout.' }
    ]
  },
  {
    id: 'hardware',
    path: 'HARDWARE',
    title: 'Hardware & HPC',
    roles: ['AI Chip Architect', 'HPC Engineer', 'FPGA Designer'],
    skills: ['AI Chips', 'HPC', 'Parallel Compute', 'CUDA', 'ASIC', 'VLSI', 'Verilog'],
    outlook: 'Hardware-software codesign is the key to scaling the next generation of AI.',
    icon: 'fa-microchip',
    color: 'text-zinc-400',
    learningUrl: 'https://www.nvidia.com/en-us/training/',
    certifications: [
      { level: 'Foundational', name: 'NVIDIA DLI: Fundamentals of Accelerated Computing', url: 'https://www.nvidia.com/en-us/training/' },
      { level: 'Intermediate', name: 'Intel HPC Certification', url: 'https://www.intel.com/content/www/us/en/developer/topic-technology/hpc/training.html' },
      { level: 'Advanced', name: 'Cadence/Synopsys VLSI Training', url: 'https://www.cadence.com/en_US/home/training.html' }
    ],
    roadmap: [
      { title: 'Digital Logic & VLSI', details: 'Gate-level design, timing analysis, and ASIC/FPGA workflows.' },
      { title: 'Parallel Compute & CUDA', details: 'GPU architecture and optimizing C++/Python for massive parallelism.' },
      { title: 'AI Chip Architectures', details: 'TPUs, NPUs, and custom silicon optimized for tensor operations.' },
      { title: 'High-Performance Computing (HPC)', details: 'Cluster networking (InfiniBand), MPI, and distributed storage for research.' },
      { title: 'Hardware-Software Codesign', details: 'Optimizing compiler stacks for custom hardware targets.' }
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
