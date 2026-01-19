
import { LearningModule, FirebaseStrategy, ExternalResource, InternshipTrack, CurriculumTerm } from './types';

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  // AI Platforms
  { id: 'google-ai-studio', name: 'Google AI Studio', url: 'https://aistudio.google.com/', description: 'Live prompt execution, multi-agent workflows, and tool calling.', category: 'ML_PLATFORM', icon: 'fa-brain' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/', description: 'Live demos via Spaces, Transformers, and free CPU inference.', category: 'ML_PLATFORM', icon: 'fa-face-smiling-hands' },
  { id: 'kaggle', name: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Free GPU/CPU notebooks, Python, Pandas, and ML datasets.', category: 'ML_PLATFORM', icon: 'fa-microchip' },
  { id: 'langchain', name: 'LangChain', url: 'https://python.langchain.com/', description: 'Agent reasoning chains and tool-augmented AI frameworks.', category: 'ML_PLATFORM', icon: 'fa-link' },
  
  // Backend & MongoDB
  { id: 'fastapi-docs', name: 'FastAPI Official', url: 'https://fastapi.tiangolo.com/', description: 'High performance, easy to learn, fast to code, ready for production.', category: 'TUTORIAL', icon: 'fa-bolt' },
  { id: 'mongodb-atlas', name: 'MongoDB Atlas', url: 'https://www.mongodb.com/atlas/database', description: 'Fully managed cloud database with global scale.', category: 'CLOUD_CONSOLE', icon: 'fa-database' },
  { id: 'pydantic-docs', name: 'Pydantic', url: 'https://docs.pydantic.dev/', description: 'Data validation and settings management using python type hints.', category: 'TUTORIAL', icon: 'fa-check-double' },

  // Cloud & DevOps
  { id: 'aws-skill-builder', name: 'AWS Skill Builder', url: 'https://skillbuilder.aws/', description: 'Official AWS digital training and interactive labs.', category: 'CLOUD_CONSOLE', icon: 'fa-aws' },
  { id: 'gcp-skills-boost', name: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/', description: 'Real GCP console access for Docker, Kubernetes, and CI/CD.', category: 'CLOUD_CONSOLE', icon: 'fa-google' },
  { id: 'github-actions', name: 'GitHub Actions', url: 'https://github.com/features/actions', description: 'Free tier CI/CD DevOps pipelines and automation.', category: 'IDE', icon: 'fa-github' },
  
  // Full Stack & Sandboxes
  { id: 'freecodecamp', name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', description: 'Browser-based IDE and Full-stack project-based certifications.', category: 'INTERACTIVE_LAB', icon: 'fa-fire' },
  { id: 'replit', name: 'Replit', url: 'https://replit.com/', description: 'Live deployable apps for both Backend and Frontend.', category: 'SANDBOX', icon: 'fa-code' },
  { id: 'codesandbox', name: 'CodeSandbox', url: 'https://codesandbox.io/', description: 'React/Next.js live previews and API integration.', category: 'SANDBOX', icon: 'fa-box-open' }
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
    skills: ['FastAPI', 'MongoDB Atlas', 'Pydantic', 'AsyncIO', 'Docker', 'CRUD Design'],
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
        effort: '15 hours',
        studyGuide: 'Learn how FastAPI handles thousands of concurrent requests using asyncio event loops.'
      },
      { 
        week: 'Week 2', 
        title: 'Pydantic & Data Modeling', 
        details: 'Building StudentModel and UpdateStudentModel with validation.', 
        skills: 'BaseModel, Field, PyObjectId, Annotated, Field Aliases',
        effort: '20 hours'
      },
      { 
        week: 'Week 3', 
        title: 'CRUD implementation', 
        details: 'Implementing POST, GET, PUT, and DELETE with MongoDB Atlas.', 
        skills: 'insert_one, find_one, find_one_and_update, delete_one',
        effort: '25 hours'
      },
      { 
        week: 'Week 4', 
        title: 'Advanced Serialization', 
        details: 'Handling BSON vs JSON, ObjectIDs, and JSON encoding.', 
        skills: 'json_encoders, model_dump, by_alias, exclude',
        effort: '20 hours'
      },
      { 
        week: 'Week 5', 
        title: 'Documentation & API Testing', 
        details: 'Auto-generated OpenAPI (Swagger) and TestClient integration.', 
        skills: 'Swagger UI, /docs, HTTPStatus, TestClient',
        effort: '15 hours'
      },
      { 
        week: 'Week 6', 
        title: 'Industrial Deployment', 
        details: 'Dockerizing FastAPI for Firebase App Hosting and Cloud Run.', 
        skills: 'Dockerfile, apphosting.yaml, Environment Secrets, CORS',
        effort: '25 hours'
      }
    ]
  },
  {
    id: 'ai-ml',
    path: 'AI_ML',
    title: 'AI & Machine Learning',
    roles: ['GenAI Engineer', 'MLOps Specialist', 'LLM Architect'],
    skills: ['Generative AI', 'LLMs', 'MLOps', 'PyTorch', 'RAG'],
    outlook: 'High-velocity growth; $200k-$450k+ roles for GenAI & MLOps specialists.',
    icon: 'fa-brain-circuit',
    color: 'text-purple-400',
    learningUrl: 'https://www.deeplearning.ai/courses/generative-ai-with-llms/',
    certifications: [
      { level: 'Foundational', name: 'Google Cloud ML Engineer', url: 'https://cloud.google.com/certifications/machine-learning-engineer' }
    ],
    roadmap: [
      { title: 'Foundations & Deep Learning', details: 'Linear algebra, backpropagation, CNNs, RNNs, and PyTorch internals.', skills: 'Linear Algebra, Calculus, PyTorch', effort: '40 hours' },
      { title: 'Generative AI & LLMs', details: 'Transformer architectures, Attention mechanisms, and Tokenization.', skills: 'Transformers, Attention, LLMs', effort: '60 hours' }
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
