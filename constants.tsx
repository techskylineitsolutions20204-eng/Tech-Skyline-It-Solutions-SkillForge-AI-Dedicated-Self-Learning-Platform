
import { LearningModule, FirebaseStrategy, ExternalResource, InternshipTrack, CurriculumTerm } from './types';

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  // AI Platforms
  { id: 'google-ai-studio', name: 'Google AI Studio', url: 'https://aistudio.google.com/', description: 'Live prompt execution, multi-agent workflows, and tool calling.', category: 'ML_PLATFORM', icon: 'fa-brain' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/', description: 'Live demos via Spaces, Transformers, and free CPU inference.', category: 'ML_PLATFORM', icon: 'fa-face-smiling-hands' },
  { id: 'kaggle', name: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Free GPU/CPU notebooks, Python, Pandas, and ML datasets.', category: 'ML_PLATFORM', icon: 'fa-microchip' },
  { id: 'langchain', name: 'LangChain', url: 'https://python.langchain.com/', description: 'Agent reasoning chains and tool-augmented AI frameworks.', category: 'ML_PLATFORM', icon: 'fa-link' },
  { id: 'projectpro-pyspark', name: 'ProjectPro PySpark', url: 'https://www.projectpro.io/hadoop-tutorial/pyspark-machine-learning-tutorial', description: 'Real-world PySpark and Hadoop Machine Learning tutorials.', category: 'TUTORIAL', icon: 'fa-database' },
  
  // Cloud & DevOps
  { id: 'aws-skill-builder', name: 'AWS Skill Builder', url: 'https://skillbuilder.aws/', description: 'Official AWS digital training and interactive labs.', category: 'CLOUD_CONSOLE', icon: 'fa-aws' },
  { id: 'gcp-skills-boost', name: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/', description: 'Real GCP console access for Docker, Kubernetes, and CI/CD.', category: 'CLOUD_CONSOLE', icon: 'fa-google' },
  { id: 'github-actions', name: 'GitHub Actions', url: 'https://github.com/features/actions', description: 'Free tier CI/CD DevOps pipelines and automation.', category: 'IDE', icon: 'fa-github' },
  { id: 'greatlearning-devops', name: 'Great Learning DevOps', url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/foundations-of-devops-and-git', description: 'Foundations of DevOps and Git version control.', category: 'TUTORIAL', icon: 'fa-infinity' },
  
  // Full Stack & Sandboxes
  { id: 'freecodecamp', name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', description: 'Browser-based IDE and Full-stack project-based certifications.', category: 'INTERACTIVE_LAB', icon: 'fa-fire' },
  { id: 'greatlearning-webdev', name: 'Great Learning Web Dev', url: 'https://www.mygreatlearning.com/web-development/free-courses', description: 'Comprehensive free courses for modern web development.', category: 'TUTORIAL', icon: 'fa-globe' },
  { id: 'replit', name: 'Replit', url: 'https://replit.com/', description: 'Live deployable apps for both Backend and Frontend.', category: 'SANDBOX', icon: 'fa-code' },
  { id: 'codesandbox', name: 'CodeSandbox', url: 'https://codesandbox.io/', description: 'React/Next.js live previews and API integration.', category: 'SANDBOX', icon: 'fa-box-open' },
  { id: 'besant-node', name: 'Besant Node.js', url: 'https://www.besanttechnologies.com/node-js-tutorial', description: 'Professional Node.js and backend engineering tutorial.', category: 'TUTORIAL', icon: 'fa-brands fa-node-js' },
  
  // Python & Learning
  { id: 'codecademy-python', name: 'Codecademy Python', url: 'https://www.codecademy.com/learn/learn-python', description: 'Interactive Python coding environment for beginners.', category: 'TUTORIAL', icon: 'fa-brands fa-python' },
  { id: 'cs-circles', name: 'CS Circles', url: 'https://cs.courses/cs-circles/', description: 'Excellent Python problem-solving and logic platform.', category: 'TUTORIAL', icon: 'fa-circle-dot' },
  { id: 'codecademy-git', name: 'Codecademy Git', url: 'https://www.codecademy.com/learn/learn-git', description: 'Mastering version control with Git and GitHub.', category: 'TUTORIAL', icon: 'fa-code-branch' },
  { id: 'codecademy-catalog', name: 'Codecademy Catalog', url: 'https://www.codecademy.com/catalog', description: 'Extensive library of interactive tech courses.', category: 'TUTORIAL', icon: 'fa-book-open' },
  { id: 'codecademy-python3', name: 'Codecademy Python 3', url: 'https://www.codecademy.com/learn/paths/python-3', description: 'Professional Python 3 learning path.', category: 'TUTORIAL', icon: 'fa-brands fa-python' },
  
  // Cyber & Sec
  { id: 'codecademy-cyber', name: 'Codecademy Cybersecurity', url: 'https://www.codecademy.com/learn/paths/cybersecurity', description: 'Structured path for modern cybersecurity fundamentals.', category: 'SEC_LAB', icon: 'fa-user-secret' },
  { id: 'tryhackme', name: 'TryHackMe', url: 'https://tryhackme.com/', description: 'Browser-based labs for Red Team and Blue Team security.', category: 'SEC_LAB', icon: 'fa-shield-virus' },
  
  // BI & Automation
  { id: 'ms-powerbi', name: 'Microsoft Power BI', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', description: 'Official Power BI training for data visualization.', category: 'TUTORIAL', icon: 'fa-chart-column' },
  { id: 'uipath-academy', name: 'UiPath Academy', url: 'https://academy.uipath.com/', description: 'The gold standard for Robotic Process Automation (RPA) training.', category: 'INTERACTIVE_LAB', icon: 'fa-robot' },
  
  // Research & Resources
  { id: 'avinash-certificates', name: 'GitHub Free Certificates', url: 'https://github.com/avinash201199/Free-courses-with-Certificates', description: 'Exhaustive list of high-quality free tech courses with certificates.', category: 'RESEARCH', icon: 'fa-award' }
];

const FULL_SKYLINE_CURRICULUM: CurriculumTerm[] = [
  {
    term: 'Term 1',
    duration: '2 Months',
    title: 'Python for GenAI',
    modules: [
      {
        title: 'Core Python',
        items: [
          'Variables: Dynamic reassign, naming conventions',
          'Numeric types: int, float, complex',
          'Collections: list, tuple, set, dict (Mutable vs Immutable)',
          'Loops: for/while, range(), enumerate(), zip()',
          'Functions: def/return, positional/keyword args, Lambda'
        ]
      },
      {
        title: 'Advanced Python',
        items: [
          'File Handling: open(), read(), write() for CSV/JSON',
          'Regex: re.search(), re.findall(), re.sub() for log cleaning',
          'Exceptional Handling: try, except, finally custom exceptions',
          'OOPs: classes, __init__, Inheritance, Method overriding'
        ]
      },
      {
        title: 'Data & Viz Libraries',
        items: [
          'NumPy: Vectorized computations, indexing, slicing, broadcasting',
          'Pandas: DataFrames, Cleaning (missing/duplicates), groupby',
          'Matplotlib: Customizing line, bar, scatter, histograms',
          'Seaborn: Boxplots, Heatmaps, correlation analysis'
        ]
      }
    ]
  },
  {
    term: 'Term 2',
    duration: '3 Months',
    title: 'Foundation For Gen AI',
    modules: [
      {
        title: 'ML Fundamentals',
        items: [
          'Supervised vs Unsupervised learning paradigms',
          'Features, labels, training, validation, and test sets',
          'Bias–variance trade-off and model generalization',
          'Overfitting and underfitting with real examples',
          'End-to-end industrial ML workflow projects'
        ]
      },
      {
        title: 'Regression & Classification',
        items: [
          'Multiple Regression with feature interactions (RMSE, MAE, R²)',
          'Logistic Regression for binary classification',
          'Handling class imbalance using sampling techniques',
          'Metrics: Precision, Recall, F1-Score, ROC-AUC'
        ]
      },
      {
        title: 'Deep Learning & NLP',
        items: [
          'Perceptron, Backpropagation, and Optimization',
          'Attention Mechanism foundations',
          'Text Pre-processing: BoW, TF-IDF, Word2Vec',
          'NER, Topic Modeling (LDA/LSA), POS Tagging'
        ]
      },
      {
        title: 'Transformer – BERT Model',
        items: [
          'Encoder–Decoder blocks & Multi-head self-attention',
          'Positional encoding concepts',
          'BERT pre-training: MLM (Masked LM) and NSP',
          'BERT use cases in real-world systems'
        ]
      }
    ]
  },
  {
    term: 'Term 3',
    duration: '3 Months',
    title: 'Generative AI',
    modules: [
      {
        title: 'Diffusion & GANs',
        items: ['Image Generation models', 'Stable Diffusion internals', 'GAN architectures']
      },
      {
        title: 'Large Language Models',
        items: ['Zero-shot vs Few-shot prompting', 'RAG (Retrieval Augmented Generation)', 'Vector DB integration']
      }
    ]
  },
  {
    term: 'Term 4',
    duration: '1.5 Months',
    title: 'Agentic AI',
    modules: [
      {
        title: 'Autonomous Agents',
        items: ['Agent Reasoning (Chain of Thought)', 'Multi-agent orchestration frameworks', 'Self-correcting agents']
      },
      {
        title: 'Tools & Actions',
        items: ['Function Calling mastery', 'Agent memory persistence', 'Browser automation for agents']
      }
    ]
  },
  {
    term: 'Term 5',
    duration: '1 Month',
    title: 'Statistics & Foundation of DS',
    modules: [
      {
        title: 'Statistical Inference',
        items: ['Descriptive vs Inferential stats', 'Hypothesis Testing & p-values', 'Probability Distributions']
      }
    ]
  },
  {
    term: 'Term 6',
    duration: '3 Months',
    title: 'Advanced Data Science',
    modules: [
      {
        title: 'Big Data Feature Engineering',
        items: ['Handling high-cardinality features', 'Dimensionality reduction (PCA/t-SNE)', 'Advanced Time Series analysis']
      }
    ]
  },
  {
    term: 'Term 7',
    duration: '1 Month',
    title: 'Deployment & MLOps',
    modules: [
      {
        title: 'Model Lifecycle',
        items: ['Dockerizing models', 'Cloud serving (Vertex AI/SageMaker)', 'Model Drift monitoring']
      }
    ]
  },
  {
    term: 'Term 8',
    duration: '1.5 Months',
    title: 'Data Analytics & Viz Tools',
    modules: [
      {
        title: 'BI Engineering',
        items: ['Power BI advanced DAX', 'Tableau interactive dashboards', 'Storytelling with data']
      }
    ]
  },
  {
    term: 'Term 9',
    duration: '2 Months',
    title: 'DATA BASE MANAGEMENT SYSTEM',
    modules: [
      {
        title: 'Enterprise SQL & NoSQL',
        items: ['Complex Query Optimization', 'PostgreSQL for AI workloads', 'NoSQL (MongoDB/Firestore)']
      }
    ]
  },
  {
    term: 'Term 10',
    duration: '1 Month',
    title: 'Big Data Analytics',
    modules: [
      {
        title: 'Distributed Systems',
        items: ['Apache Spark with PySpark', 'Hadoop ecosystem foundations', 'Real-time streaming (Kafka)']
      }
    ]
  },
  {
    term: 'Term 11',
    duration: '1 Month',
    title: 'DSA (Optional)',
    modules: [
      {
        title: 'Algorithmic Engineering',
        items: ['Tree and Graph traversals', 'Dynamic Programming patterns', 'Big O Analysis']
      }
    ]
  },
  {
    term: 'Term 12',
    duration: 'Skills & Tools',
    title: 'Project Management',
    modules: [
      {
        title: 'Agile & Execution',
        items: ['Jira for Engineering teams', 'Scrum methodology', 'Technical Leadership skills']
      }
    ]
  }
];

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic AI Engineer',
    description: 'The complete 24-month journey from Python foundations to multi-agent deployment architectures.',
    platforms: ['google-ai-studio', 'huggingface', 'langchain', 'kaggle'],
    icon: 'fa-brain-circuit',
    color: 'text-purple-400',
    roadmap: ['Python Mastery', 'ML Foundations', 'GenAI Architectures', 'Agentic Deployments'],
    curriculum: FULL_SKYLINE_CURRICULUM
  },
  {
    id: 'devops-sre',
    title: 'Cloud DevOps & SRE',
    description: 'Focusing on Term 7/9/10 expertise: Infrastructure as code and global scale operations.',
    platforms: ['aws-skill-builder', 'gcp-skills-boost', 'github-actions', 'replit'],
    icon: 'fa-server',
    color: 'text-blue-400',
    roadmap: ['Cloud Fundamentals', 'Docker & K8s', 'Managed CI/CD', 'Observability'],
    curriculum: FULL_SKYLINE_CURRICULUM.filter((_, i) => [0, 6, 8, 9].includes(i))
  },
  {
    id: 'ba-automation',
    title: 'Business AI & Data Analyst',
    description: 'Focusing on Term 5/8/9/12 expertise: Data storytelling and automated intelligence.',
    platforms: ['uipath', 'ms-learn', 'ibm-skillsbuild', 'kaggle'],
    icon: 'fa-chart-pie',
    color: 'text-emerald-400',
    roadmap: ['Data Foundations', 'Power BI Mastery', 'RPA Logic', 'Project Lifecycle'],
    curriculum: FULL_SKYLINE_CURRICULUM.filter((_, i) => [0, 4, 7, 8, 11].includes(i))
  }
];

export const LEARNING_PATHS: LearningModule[] = [
  {
    id: 'skillforge-foundation',
    path: 'FOUNDATION',
    title: 'SkillForge 6-Week Fast-Track',
    roles: ['Junior Developer', 'Data Associate', 'Cloud Assistant'],
    skills: ['Python', 'Git', 'Web Dev', 'AWS', 'Data Viz', 'Cybersecurity'],
    outlook: 'Entry-level mastery in modern engineering fundamentals.',
    icon: 'fa-rocket',
    color: 'text-amber-500',
    learningUrl: 'https://www.codecademy.com/catalog',
    certifications: [
      { level: 'Foundational', name: 'Codecademy Python & Git', url: 'https://www.codecademy.com/learn/learn-python' },
      { level: 'Foundational', name: 'SkillBuilder Cloud Practitioner', url: 'https://skillbuilder.aws/' }
    ],
    roadmap: [
      { week: 'Week 1', title: 'Python & Git Foundations', details: 'Learn Python basics, scripting, and Git version control.', skills: 'Python syntax, data types, Git, GitHub', effort: '20 hours' },
      { week: 'Week 2', title: 'Web Development (HTML/CSS/JS)', details: 'Build responsive websites using core frontend technologies.', skills: 'HTML5, CSS3, JavaScript', effort: '20 hours' },
      { week: 'Week 3', title: 'Backend Development (Node & Python)', details: 'Develop backend APIs and server-side logic.', skills: 'Node.js, Express, Python backend', effort: '20 hours' },
      { week: 'Week 4', title: 'AWS & DevOps Fundamentals', details: 'Understand cloud computing and DevOps pipelines.', skills: 'AWS, CI/CD, Docker, DevOps basics', effort: '20 hours' },
      { week: 'Week 5', title: 'Data Science & Power BI', details: 'Analyze data and build BI dashboards.', skills: 'Python Data Science, Power BI', effort: '20 hours' },
      { week: 'Week 6', title: 'Cybersecurity & RPA', details: 'Learn security fundamentals and automation workflows.', skills: 'Cybersecurity basics, RPA, UiPath', effort: '20 hours' }
    ]
  },
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
      { level: 'Advanced', name: 'DeepLearning.AI TensorFlow / GenAI', url: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/' }
    ],
    roadmap: [
      { title: 'Foundations & Deep Learning', details: 'Linear algebra, backpropagation, CNNs, RNNs, and PyTorch internals.' },
      { title: 'Generative AI & LLMs', details: 'Transformer architectures, Attention mechanisms, and Tokenization.' }
    ]
  },
  {
    id: 'soft-eng',
    path: 'SOFT_ENG',
    title: 'Software & Systems Eng.',
    roles: ['Senior Full-Stack Developer', 'Backend Architect', 'Node.js Specialist'],
    skills: ['Node.js', 'Browser APIs', 'TypeScript', 'LeetCode Mastery', 'HackerRank Prep'],
    outlook: 'Fundamental demand for high-performance engineers with algorithmic proficiency.',
    icon: 'fa-code-pull-request',
    color: 'text-cyan-400',
    learningUrl: 'https://roadmap.sh/full-stack',
    certifications: [
      { level: 'Foundational', name: 'AWS Certified Developer Associate', url: 'https://aws.amazon.com/certification/certified-developer-associate/' }
    ],
    roadmap: [
      { title: 'Algorithmic Mastery', details: 'Data structures, Dynamic Programming for high-tier technical interviews.' }
    ]
  }
];

export const FIREBASE_STRATEGIES: FirebaseStrategy[] = [
  {
    type: 'Hosting',
    title: 'Firebase Hosting (Static/SPA)',
    benefits: ['Rapid deployment to global CDN', 'Zero-config SSL', 'Optimized for SPAs'],
    useCase: 'Best for documentation, landing pages, and pure client-side applications.',
    docUrl: 'https://firebase.google.com/docs/hosting'
  },
  {
    type: 'AppHosting',
    title: 'Firebase App Hosting (Dynamic/SSR)',
    benefits: ['Next.js & Angular SSR native support', 'Direct GitHub integration', 'Scalable Google Cloud infra'],
    useCase: 'Essential for SEO-heavy sites and complex dashboards with server-side logic.',
    docUrl: 'https://firebase.google.com/docs/app-hosting'
  }
];
