import type { Task, TaskAnalysis } from './types';

const activeDamageBonus = 4;
const blockerBonus = 3;

function countDependents(taskId: string, tasks: Task[]): number {
  return tasks.filter((task) => task.dependsOn.includes(taskId)).length;
}

function dependencyDepth(task: Task, tasks: Task[], visited = new Set<string>()): number {
  if (task.dependsOn.length === 0) return 0;
  if (visited.has(task.id)) return 0;

  visited.add(task.id);

  const depths = task.dependsOn.map((dependencyId) => {
    const dependency = tasks.find((candidate) => candidate.id === dependencyId);
    return dependency ? 1 + dependencyDepth(dependency, tasks, new Set(visited)) : 1;
  });

  return Math.max(...depths);
}

function isTaskBlocked(task: Task, tasks: Task[]): boolean {
  return task.dependsOn.some((dependencyId) => {
    const dependency = tasks.find((candidate) => candidate.id === dependencyId);
    return dependency ? dependency.status !== 'done' : true;
  });
}

function getReason(task: Task, dependentCount: number, isBlocked: boolean): string {
  if (task.status === 'done') return 'Completed work that no longer blocks the plan.';
  if (isBlocked) return 'Blocked by unfinished dependencies.';
  if (task.isActiveDamage) return 'Stops active damage or compounding risk.';
  if (dependentCount > 0) return `Unblocks ${dependentCount} downstream task${dependentCount === 1 ? '' : 's'}.`;
  if (task.canParallelize) return 'Ready to run in parallel while the main path moves.';
  return 'Ready work scored by urgency, impact, risk, and effort.';
}

export function analyzeTasks(tasks: Task[]): TaskAnalysis[] {
  return tasks
    .map((task) => {
      const dependentCount = countDependents(task.id, tasks);
      const depth = dependencyDepth(task, tasks);
      const blocked = isTaskBlocked(task, tasks) || task.status === 'blocked';
      const priorityScore =
        task.impact +
        task.urgency +
        task.risk +
        (task.isActiveDamage ? activeDamageBonus : 0) +
        (dependentCount > 0 ? blockerBonus : 0) -
        task.effort * 0.5;

      const isCriticalCandidate =
        task.status !== 'done' && !blocked && (dependentCount > 0 || depth >= 2 || task.impact >= 5);

      const isFastTrackCandidate =
        task.status !== 'done' && !blocked && task.canParallelize && dependentCount === 0;

      return {
        ...task,
        priorityScore,
        dependentCount,
        dependencyDepth: depth,
        isBlocked: blocked,
        isCriticalCandidate,
        isFastTrackCandidate,
        reason: getReason(task, dependentCount, blocked),
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

export function getNextBestAction(tasks: TaskAnalysis[]): TaskAnalysis | undefined {
  return tasks.find((task) => task.status !== 'done' && !task.isBlocked);
}

export function exportMarkdown(projectName: string, objective: string, tasks: TaskAnalysis[]): string {
  const next = getNextBestAction(tasks);
  const blockers = tasks.filter((task) => task.isBlocked && task.status !== 'done');
  const critical = tasks.filter((task) => task.isCriticalCandidate);
  const fastTrack = tasks.filter((task) => task.isFastTrackCandidate);

  const lines = [
    `# ${projectName}`,
    '',
    `Objective: ${objective}`,
    '',
    '## Next Best Action',
    next ? `- ${next.title} — ${next.reason}` : '- No available next action found.',
    '',
    '## Critical Path Candidates',
    ...formatTaskList(critical),
    '',
    '## Blockers',
    ...formatTaskList(blockers),
    '',
    '## Fast-Track Candidates',
    ...formatTaskList(fastTrack),
  ];

  return lines.join('\n');
}

function formatTaskList(tasks: TaskAnalysis[]): string[] {
  if (tasks.length === 0) return ['- None'];
  return tasks.map((task) => `- ${task.title} (${task.reason})`);
}
