import type { CSSProperties } from 'react';
import type { TaskAnalysis } from '../types';

const phaseLabels: Record<NonNullable<TaskAnalysis['phase']>, string> = {
  stabilize: 'Stabilize',
  build: 'Build',
  polish: 'Polish',
  deploy: 'Deploy',
};

function getTimelineClass(task: TaskAnalysis): string {
  if (task.status === 'done') return 'done';
  if (task.isBlocked || task.status === 'blocked') return 'waiting';
  if (task.isActiveDamage) return 'active-damage';
  if (task.isCriticalCandidate) return 'critical';
  if (task.isFastTrackCandidate) return 'fast-track';
  return 'standard';
}

function getTimelineLabel(task: TaskAnalysis): string {
  if (task.status === 'done') return 'Done';
  if (task.isBlocked || task.status === 'blocked') return 'Waiting';
  if (task.isActiveDamage) return 'Active Damage';
  if (task.isCriticalCandidate) return 'Critical';
  if (task.isFastTrackCandidate) return 'Fast Track';
  return task.phase ? phaseLabels[task.phase] : 'Planned';
}

type TimelineProps = {
  tasks: TaskAnalysis[];
};

export function Timeline({ tasks }: TimelineProps) {
  const timelineTasks = [...tasks]
    .filter((task) => task.startDay && task.durationDays)
    .sort((a, b) => (a.startDay ?? 0) - (b.startDay ?? 0) || a.title.localeCompare(b.title));

  const totalDays = Math.max(
    1,
    ...timelineTasks.map((task) => (task.startDay ?? 1) + (task.durationDays ?? 1) - 1),
  );
  const days = Array.from({ length: totalDays }, (_, index) => index + 1);

  return (
    <section className="panel timeline-panel" aria-labelledby="timeline-title">
      <header className="section-heading">
        <div>
          <p className="eyebrow compact">Fast-Track Timeline</p>
          <h2 id="timeline-title">A seven-day launch path with safe overlap.</h2>
        </div>
        <p>
          Bars show when work starts, how long it runs, and which items can move in parallel
          without hiding blockers.
        </p>
      </header>

      <div className="timeline" style={{ '--day-count': totalDays } as CSSProperties}>
        <div className="timeline-header" aria-hidden="true">
          <div />
          {days.map((day) => (
            <span key={day}>Day {day}</span>
          ))}
        </div>

        <div className="timeline-rows">
          {timelineTasks.map((task) => {
            const start = task.startDay ?? 1;
            const duration = task.durationDays ?? 1;
            const end = start + duration;
            const modifier = getTimelineClass(task);

            return (
              <article className="timeline-row" key={task.id}>
                <div className="timeline-task">
                  <h3>{task.title}</h3>
                  <span>{task.phase ? phaseLabels[task.phase] : 'Planned'}</span>
                </div>
                <div className="timeline-track">
                  <div
                    className={`timeline-bar timeline-${modifier}`}
                    style={{ gridColumn: `${start} / ${end}` }}
                  >
                    <span>{getTimelineLabel(task)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
