export type TaskStatus = 'intake' | 'ready' | 'blocked' | 'in_progress' | 'done' | 'not_now';

export type Project = {
  id: string;
  name: string;
  objective: string;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  startDay?: number;
  durationDays?: number;
  phase?: 'stabilize' | 'build' | 'polish' | 'deploy';
  status: TaskStatus;
  dependsOn: string[];
  effort: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  urgency: 1 | 2 | 3 | 4 | 5;
  risk: 1 | 2 | 3 | 4 | 5;
  canParallelize: boolean;
  isActiveDamage: boolean;
  owner?: string;
  dueDate?: string;
  notes?: string;
};

export type TaskAnalysis = Task & {
  priorityScore: number;
  dependentCount: number;
  dependencyDepth: number;
  isBlocked: boolean;
  isCriticalCandidate: boolean;
  isFastTrackCandidate: boolean;
  reason: string;
};
