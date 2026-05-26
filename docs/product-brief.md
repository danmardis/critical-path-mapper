# Product Brief

## Product name

**Critical Path Mapper**

## Tagline

Turn messy goals into blocker-aware action maps.

## Product thesis

Most task tools flatten work into lists. But real work has dependencies, blockers, sequencing, risk, and parallelizable paths.

Critical Path Mapper helps users convert an overwhelming goal or backlog into a structured view of:

- what is blocked,
- what blocks other work,
- what should happen first,
- what can happen in parallel,
- what is active damage,
- and what is not worth doing yet.

## Primary question

> What is the shortest realistic path to done?

## Target users

### Solo builders

People building small software, portfolio projects, personal systems, or side projects who need lightweight planning without enterprise overhead.

### Job seekers

People managing applications, resume updates, networking, interview prep, and follow-ups.

### Home/project backlog users

People stabilizing chaotic home, vehicle, repair, or life-admin backlogs where sequencing matters.

### Operations-minded planners

People who think in blockers, dependencies, incidents, constraints, risks, and delivery paths.

## MVP problem statement

A user has a goal with many tasks, but they do not know what to do first because everything feels urgent.

The app should help them:

1. Capture the tasks.
2. Mark dependencies.
3. Score urgency, impact, risk, and effort.
4. Detect blockers and blocked tasks.
5. Suggest the next best action.
6. Highlight fast-track opportunities.
7. Export a concise action plan.

## MVP scope

The MVP is a local-first single-page app.

### In scope

- Project creation
- Task creation
- Dependency assignment
- Priority scoring
- Blocker detection
- Critical-path candidate detection
- Fast-track candidate detection
- Markdown export
- Sample project templates
- Local storage persistence

### Out of scope

- Accounts/auth
- Backend/database
- Collaboration
- AI features
- Calendar integration
- Notifications
- Full Gantt charting
- Enterprise project-management workflows

## Core concepts

### Task

A unit of work that can be scored, blocked, completed, or deferred.

### Dependency

A relationship where one task must be completed or addressed before another task can move forward.

### Blocker

A task that prevents one or more downstream tasks from progressing.

### Critical path candidate

A task or chain of tasks likely to determine the shortest realistic path to project completion.

### Fast-track candidate

A task that can be done in parallel while the critical path is moving.

### Active damage

A task that prevents ongoing deterioration, loss, safety risk, cost growth, or compounding problems.

## Data model draft

```ts
type Project = {
  id: string;
  name: string;
  objective: string;
  createdAt: string;
  updatedAt: string;
};

type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'intake' | 'ready' | 'blocked' | 'in_progress' | 'done' | 'not_now';
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
```

## Scoring draft

```text
priority = impact + urgency + risk + activeDamageBonus + blockerBonus - effortPenalty
```

Where:

- `activeDamageBonus = 4` when `isActiveDamage` is true.
- `blockerBonus = 3` when other tasks depend on this task.
- `effortPenalty = effort * 0.5`.

This scoring model is intentionally simple for MVP. It should be explainable and easy to adjust.

## MVP screens

### 1. Project Dashboard

Shows:

- objective
- next best action
- top blocker
- critical path candidates
- blocked tasks
- fast-track candidates
- task counts by status

### 2. Task Intake

Allows users to add tasks quickly without perfect details.

### 3. Priority Board

Suggested lanes:

- Stop the Bleeding
- Critical Path
- Ready
- Blocked
- Fast Track
- Not Now
- Done

### 4. Dependency Map

MVP may start as a nested list or tree view.

Later versions may use a visual node graph.

### 5. Export Plan

Generates a markdown summary:

- objective
- next best action
- critical path
- blockers
- fast-track work
- not-now work

## Example templates

### Public App Launch

- Create repo
- Write README
- Define MVP
- Build local-storage app
- Add sample data
- Deploy
- Add screenshots

### House Exit Readiness

- Identify active damage
- Remove odor sources
- Clear access paths
- Get quotes
- Defer cosmetic projects

### Vehicle Fleet Triage

- Keep one daily driver accessible
- Fix safety items
- Move blocked vehicles
- Sell dead-weight vehicles
- Evaluate repair candidates with numbers

## Product voice

Clear, practical, calm, and systems-minded.

Avoid jargon-heavy enterprise language. The app should feel useful to normal people while still showing disciplined operational thinking.

## Success criteria

The MVP succeeds if a user can:

1. Add a messy project in under five minutes.
2. Identify the top blocker.
3. See the next best action.
4. Find at least one parallel task.
5. Export a useful plan.

Portfolio success criteria:

> A hiring manager can open the repo, understand the project, see the app, and understand the systems-thinking value in under two minutes.
