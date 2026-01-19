
import { LearningModule, FirebaseStrategy, ExternalResource, InternshipTrack, CurriculumTerm } from './types';

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  // AI Platforms
  { id: 'google-ai-studio', name: 'Google AI Studio', url: 'https://aistudio.google.com/', description: 'Live prompt execution and multi-agent workflows.', category: 'ML_PLATFORM', icon: 'fa-brain' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/', description: 'Live demos via Spaces and Transformers.', category: 'ML_PLATFORM', icon: 'fa-face-smiling-hands' },
  { id: 'langchain', name: 'LangChain', url: 'https://python.langchain.com/', description: 'Agent reasoning chains and tool-augmented AI.', category: 'ML_PLATFORM', icon: 'fa-link' },
  
  // Microsoft & IBM & FCC
  { id: 'ms-learn', name: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/browse/', description: 'Official Azure, Power Platform, and Microsoft 365 training.', category: 'TUTORIAL', icon: 'fa-brands fa-microsoft' },
  { id: 'ibm-skillsbuild', name: 'IBM SkillsBuild', url: 'https://skillsbuild.org/adult-learners', description: 'Enterprise-grade AI, Cyber, and Data Analyst paths.', category: 'INTERACTIVE_LAB', icon: 'fa-building-columns' },
  { id: 'freecodecamp', name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', description: 'Browser-based IDE and Full-stack project certifications.', category: 'INTERACTIVE_LAB', icon: 'fa-fire' },
  { id: 'google-skills-boost', name: 'Google Skills Boost', url: 'https://skills.google/collections', description: 'Real Google Cloud console labs with temporary credentials.', category: 'CLOUD_CONSOLE', icon: 'fa-google' },

  // Backend & MongoDB
  { id: 'fastapi-docs', name: 'FastAPI Official', url: 'https://fastapi.tiangolo.com/', description: 'High performance asynchronous Python web framework.', category: 'TUTORIAL', icon: 'fa-bolt' },
  { id: 'mongodb-atlas', name: 'MongoDB Atlas', url: 'https://www.mongodb.com/atlas/database', description: 'Fully managed cloud database with global scale.', category: 'CLOUD_CONSOLE', icon: 'fa-database' },

  // Cloud & DevOps
  { id: 'aws-skill-builder', name: 'AWS Skill Builder', url: 'https://skillbuilder.aws/', description: 'Official AWS digital training and interactive labs.', category: 'CLOUD_CONSOLE', icon: 'fa-aws' },
  { id: 'github-actions', name: 'GitHub Actions', url: 'https://github.com/features/actions', description: 'CI/CD DevOps pipelines and automation.', category: 'IDE', icon: 'fa-github' }
];

const FULL_SKYLINE_CURRICULUM: CurriculumTerm[] = [
  {
    term: 'Term 1',
    duration: '2 Months',
    title: 'Python for GenAI',
    modules: [
      {
        title: 'Core Python',
        items: ['Variables', 'Collections', 'Loops', 'Functions', 'Asyncio Foundations']
      }
    ]
  }
];

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic AI Engineer',
    description: 'The complete 24-month journey from Python foundations to multi-agent deployment architectures.',
    platforms: ['google-ai-studio', 'huggingface', 'langchain'],
    icon: 'fa-brain-circuit',
    color: 'text-purple-400',
    roadmap: ['Python Mastery', 'ML Foundations', 'GenAI Architectures', 'Agentic Deployments'],
    curriculum: FULL_SKYLINE_CURRICULUM
  }
];

export const LEARNING_PATHS: LearningModule[] = [
  {
    id: 'fastapi-mongodb-mastery',
    path: 'BACKEND_API',
    title: 'FastAPI & NoSQL Mastery',
    roles: ['Backend Engineer', 'API Architect', 'Cloud Developer'],
    skills: ['FastAPI', 'MongoDB Atlas', 'Pydantic', 'AsyncIO', 'Docker', 'JWT Auth'],
    outlook: 'High-performance API development for modern non-blocking architectures.',
    icon: 'fa-bolt-lightning',
    color: 'text-emerald-400',
    learningUrl: 'https://fastapi.tiangolo.com/',
    certifications: [
      { level: 'Foundational', name: 'MongoDB Associate Developer', url: 'https://university.mongodb.com/certification' },
      { level: 'Advanced', name: 'AWS Certified Developer', url: 'https://aws.amazon.com/certification/certified-developer-associate/' }
    ],
    roadmap: [
      { 
        week: 'Week 1', 
        title: 'Async Foundations & Set-up', 
        details: 'Understanding Non-Blocking Architecture and environment orchestration.', 
        skills: 'Python 3.10+, Virtualenv, pip, AsyncMongoClient',
        effort: '15 hours'
      },
      { 
        week: 'Week 2', 
        title: 'Authentication & Security', 
        details: 'Implementing JWT (JSON Web Tokens) and OAuth2 password flows in FastAPI.', 
        skills: 'jose, passlib, OAuth2PasswordBearer, Dependency Injection',
        effort: '25 hours'
      }
    ]
  }
];

export const FIREBASE_STRATEGIES: FirebaseStrategy[] = [
  {
    type: 'Hosting',
    title: 'Firebase Hosting (Static/SPA)',
    benefits: ['Rapid deployment to global CDN', 'Zero-config SSL', 'Ideal for React/Vite Frontends'],
    useCase: 'Best for the Student Dashboard and Frontend documentation sites.',
    docUrl: 'https://firebase.google.com/docs/hosting'
  },
  {
    type: 'AppHosting',
    title: 'Firebase App Hosting (Dynamic/API)',
    benefits: ['FastAPI & Node.js dynamic compute', 'Direct GitHub integration', 'Native Cloud Run scaling'],
    useCase: 'Essential for the FastAPI Backend and MongoDB connection handling.',
    docUrl: 'https://firebase.google.com/docs/app-hosting'
  }
];
