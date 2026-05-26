import { useMemo, useState } from 'react';
import { GitBranch, ListChecks, Map, Play, ShieldAlert, Zap } from 'lucide-react';
import { analyzeTasks, exportMarkdown, getNextBestAction } from './critical-path';
import { sampleProject, sampleTasks } from './sample-data';
import type { TaskAnalysis } from './types';

const statusLabels: Record<string, string> = {
  intake: 'Intake',
  ready: 'Ready',
  blocked: 'Blocked',
  in_progress: 'In Progress',
  done: 'Done',
  not_now: 'Not Now',
};

function scoreLabel(task: TaskAnalysis): string {
  return task.priorityScore.toFixed(1);
}

export function App() {
  const [copied, setCopied] = useState(false);
  const analysis = useMemo(() => analyzeTasks(sampleTasks), []);
  const nextBestAction = getNextBestAction(analysis);
  const blockers = analysis.filter((task) => task.isBlocked && task.status !== 'done');
  const critical = analysis.filter((task) => task.isCriticalCandidate);
  const fastTrack = analysis.filter((task) => task.isFastTrackCandidate);
  const doneCount = analysis.filter((task) => task.status === 'done').length;
  const markdown = exportMarkdown(sampleProject.name, sampleProject.objective, analysis);

  async function copyPlan() {
    await window.navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Critical Path Mapper</p>
          <h1>Turn messy goals into blocker-aware action maps.</h1>
          <p className="hero-copy">
            A lightweight planning tool for finding blockers, dependency chains, fast-track work,
            and the next best action when everything feels urgent.
          </p>
        </div>
        <div className="hero-card">
          <span>Current demo project</span>
          <strong>{sampleProject.name}</strong>
          <p>{sampleProject.objective}</p>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Project summary metrics">
        <MetricCard icon={<Play />} label="Next Best Action" value={nextBestAction?.title ?? 'None'} detail={nextBestAction?.reason ?? 'No unblocked task found.'} />
        <MetricCard icon={<ShieldAlert />} label="Top Blockers" value={String(blockers.length)} detail="Tasks waiting on unfinished dependencies." />
        <MetricCard icon={<GitBranch />} label="Critical Candidates" value={String(critical.length)} detail="Tasks likely to shape the shortest path to done." />
        <MetricCard icon={<Zap />} label="Fast-Track Work" value={String(fastTrack.length)} detail="Parallel work that can move while the main path advances." />
      </section>

      <section className="content-grid">
        <Panel title="Critical Path Candidates" icon={<Map />}>
          <TaskList tasks={critical} empty="No critical path candidates yet." />
        </Panel>

        <Panel title="Blocked Work" icon={<ShieldAlert />}>
          <TaskList tasks={blockers} empty="No blocked tasks. Tiny parade." />
        </Panel>
      </section>

      <section className="content-grid wide-left">
        <Panel title="Priority Stack" icon={<ListChecks />}>
          <div className="task-table">
            {analysis.map((task) => (
              <article className="task-row" key={task.id}>
                <div>
                  <div className="task-title-row">
                    <h3>{task.title}</h3>
                    <span className={`status status-${task.status}`}>{statusLabels[task.status]}</span>
                  </div>
                  <p>{task.description}</p>
                  <small>{task.reason}</small>
                </div>
                <div className="score-box">
                  <span>Score</span>
                  <strong>{scoreLabel(task)}</strong>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Export Plan" icon={<GitBranch />}>
          <p className="panel-copy">
            MVP export turns the current analysis into a copyable markdown action plan.
          </p>
          <button className="primary-button" onClick={copyPlan} type="button">
            {copied ? 'Copied plan' : 'Copy markdown plan'}
          </button>
          <pre className="export-box">{markdown}</pre>
        </Panel>
      </section>

      <footer className="footer">
        <span>{doneCount} of {analysis.length} demo tasks complete.</span>
        <span>Local-first MVP scaffold. No accounts. No backend. No process theater.</span>
      </footer>
    </main>
  );
}

type MetricCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
};

function MetricCard({ icon, label, value, detail }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="icon-wrap">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

type PanelProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function Panel({ title, icon, children }: PanelProps) {
  return (
    <section className="panel">
      <header className="panel-header">
        <div className="icon-wrap small">{icon}</div>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}

type TaskListProps = {
  tasks: TaskAnalysis[];
  empty: string;
};

function TaskList({ tasks, empty }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">{empty}</p>;
  }

  return (
    <div className="mini-list">
      {tasks.map((task) => (
        <article key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.reason}</p>
          <span>Priority {scoreLabel(task)}</span>
        </article>
      ))}
    </div>
  );
}
