
export type TechPath = 
  | 'AI_ML' 
  | 'CLOUD' 
  | 'CYBERSECURITY' 
  | 'DATA_ANALYTICS' 
  | 'SOFT_ENG' 
  | 'AUTOMATION' 
  | 'QUANTUM' 
  | 'EMERGING' 
  | 'AI_PRODUCT' 
  | 'HARDWARE'
  | 'DEVOPS'
  | 'RPA'
  | 'QA'
  | 'FOUNDATION'
  | 'AI_GOVERNANCE'
  | 'BACKEND_API';

export interface Certification {
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  name: string;
  url: string;
}

export interface RoadmapStep {
  title: string;
  details: string;
  week?: string;
  effort?: string;
  skills?: string;
  studyGuide?: string; // Content for the detailed tutorial
}

export interface CurriculumTopic {
  title: string;
  items: string[];
}

export interface CurriculumTerm {
  term: string;
  duration: string;
  title: string;
  modules: CurriculumTopic[];
}

export interface LearningModule {
  id: string;
  title: string;
  roles: string[];
  skills: string[];
  outlook: string;
  icon: string;
  color: string;
  path: TechPath;
  learningUrl: string;
  certifications: Certification[];
  roadmap: RoadmapStep[];
}

export interface InternshipTrack {
  id: string;
  title: string;
  description: string;
  platforms: string[]; // IDs of ExternalResource
  icon: string;
  color: string;
  roadmap: string[];
  curriculum?: CurriculumTerm[];
}

export interface Project {
  name: string;
  repoUrl: string;
  demoUrl?: string;
  techStack: string;
  description?: string;
}

export interface LabScenario {
  id: string;
  path: TechPath;
  title: string;
  objective: string;
  tasks: string[];
  hints: string[];
}

export interface LabFeedback {
  status: 'success' | 'warning' | 'error';
  message: string;
  suggestions: string[];
  detailedReview?: string;
}

export interface LabMetrics {
  cpu: number;
  memory: number;
  latency: number;
}

export interface DebugState {
  line: number;
  variables: Record<string, string>;
  callStack: string[];
  reason?: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export interface FirebaseStrategy {
  type: 'Hosting' | 'AppHosting';
  title: string;
  benefits: string[];
  useCase: string;
  docUrl: string;
}

export type ResourceCategory = 
  | 'AI_ASSISTANT' 
  | 'INTERACTIVE_LAB' 
  | 'SANDBOX' 
  | 'TUTORIAL' 
  | 'IDE' 
  | 'RESEARCH'
  | 'CLOUD_CONSOLE'
  | 'ML_PLATFORM'
  | 'IOT_SIM'
  | 'SEC_LAB';

export interface ExternalResource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: ResourceCategory;
  icon: string;
}
