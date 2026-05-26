# Roadmap

## Guiding principle

Build the smallest useful tool that turns chaos into sequencing.

Critical Path Mapper should not become a bloated project-management suite. Its edge is clarity: dependencies, blockers, active damage, fast-track opportunities, and next best action.

## Milestone 0: Repo Shell

Status: started.

- [x] Create public repository.
- [x] Add README.
- [x] Add product brief.
- [x] Add roadmap.
- [x] Add domain strategy.
- [x] Add license.
- [ ] Add initial screenshots placeholder.
- [ ] Add public project brief or case-study outline.

## Milestone 1: Static MVP

Goal: render a useful demo with sample data.

- [ ] Set up React + Vite + TypeScript.
- [ ] Add Tailwind CSS.
- [ ] Define Project and Task types.
- [ ] Add sample projects.
- [ ] Render dashboard cards.
- [ ] Render task table.
- [ ] Calculate basic priority score.
- [ ] Show top blocker.
- [ ] Show blocked tasks.
- [ ] Show quick wins / fast-track candidates.
- [ ] Add markdown export from sample data.

Done when:

> A visitor can open the app and understand the concept without adding their own data.

## Milestone 2: Editable Local MVP

Goal: allow real local usage without accounts or backend.

- [ ] Add project creation.
- [ ] Add task creation/editing.
- [ ] Add dependency selection.
- [ ] Persist data to local storage.
- [ ] Add task status changes.
- [ ] Add clear demo/reset controls.
- [ ] Add markdown export for current project.

Done when:

> A user can create one project, add tasks, mark dependencies, and export a usable action plan.

## Milestone 3: Dependency Intelligence

Goal: make the app meaningfully dependency-aware.

- [ ] Compute dependency depth.
- [ ] Detect circular dependencies.
- [ ] Identify tasks blocking the most downstream work.
- [ ] Identify critical path candidates.
- [ ] Identify parallelizable ready tasks.
- [ ] Separate active damage from ordinary urgency.
- [ ] Add explanatory labels for why a task is prioritized.

Done when:

> The app can explain why a task is the next best action.

## Milestone 4: Visual Polish

Goal: make the project portfolio-worthy.

- [ ] Add responsive layout.
- [ ] Add empty states.
- [ ] Add project templates.
- [ ] Add severity/status badges.
- [ ] Add screenshots to README.
- [ ] Add deploy link.
- [ ] Add concise case study.

Done when:

> The repo and app are polished enough to pin publicly on GitHub and link from a portfolio.

## Milestone 5: Optional Graph View

Goal: add visual dependency mapping only after the core logic is useful.

- [ ] Evaluate React Flow or a simpler graph renderer.
- [ ] Add node/edge view.
- [ ] Highlight critical path candidates.
- [ ] Highlight blockers.
- [ ] Keep table/list view as the primary accessible interface.

Done when:

> The graph clarifies the plan instead of becoming decorative complexity.

## Milestone 6: Deployment + Portfolio Integration

Goal: host publicly under a professional domain.

- [ ] Choose deployment provider.
- [ ] Deploy static app.
- [ ] Configure domain/subpath.
- [ ] Add project to GitHub profile.
- [ ] Add project to portfolio site.
- [ ] Add short write-up: problem, design, implementation, tradeoffs.

Recommended initial location:

> `danielmardis.com/critical-path-mapper`

Alternative:

> `projects.danielmardis.com/critical-path-mapper`

## Backlog

Potential later features:

- Import/export JSON.
- Markdown import.
- More project templates.
- Printable action plan.
- Time estimates.
- Constraint labels.
- Theory of Constraints mode.
- ITIL-style incident/problem/change framing.
- Fast-tracking recommendations.
- Calendar export.
- AI-assisted task extraction from a brain dump, explicitly post-MVP.

## Anti-roadmap

Do not add these until the core app is useful:

- Accounts
- Teams
- Comments
- Permissions
- Notifications
- Native mobile app
- Backend database
- AI assistant
- Complex Gantt charting
- Enterprise integrations

The app should remain a sharp little knife, not a Swiss Army refrigerator.
