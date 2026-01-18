
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
  | 'HARDWARE';

export interface Certification {
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  name: string;
  url: string;
}

export interface RoadmapStep {
  title: string;
  details: string;
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
