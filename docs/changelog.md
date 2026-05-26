# Changelog

Notable project changes and deployment milestones for Critical Path Mapper.

## 2026-05-26

### Timeline/readability sprint

- Added responsive Fast-Track Timeline with Day 1-7 labels.
- Added status-colored timeline bars for critical path, fast-track, waiting/blocked, active damage, and done states.
- Added legend / “How to Read This” panel.
- Reordered the page flow:
  - Hero
  - Command summary metrics
  - Fast-Track Timeline
  - Legend
  - Critical Path and Blocked Work
  - Priority Stack
  - Export Plan
- Updated sample data into a realistic 7-day overlapping launch plan.
- Improved readability, card symmetry, spacing, and task-row density.
- Built successfully with isolated Docker `node:22-bookworm`.
- Deployed commit `796ab21 Add timeline view and readability polish` to `https://projects.danielmardis.com/critical-path-mapper/`.

### Initial public deployment

- Created public repo `danmardis/critical-path-mapper`.
- Added README, product brief, roadmap, domain strategy, deployment docs, and MIT license.
- Added React/Vite/TypeScript static MVP scaffold.
- Added sample project data.
- Added priority scoring, blocker detection, critical-path candidate detection, fast-track candidate detection, and markdown export.
- Configured Vite base path for `/critical-path-mapper/` deployment.
- Deployed static build to `/var/www/projects/critical-path-mapper/`.
- Verified public URLs:
  - `https://projects.danielmardis.com/`
  - `https://projects.danielmardis.com/critical-path-mapper/`

## Upcoming

### Sprint 2: First-Time Visitor Clarity

Planned focus:

- Add screenshot to README.
- Add clearer live demo link and “what this shows” section.
- Add “Built by Daniel Mardis” footer link.
- Add GitHub repo/live demo links inside the app.
- Improve mobile timeline behavior if visual QA shows cramped scrolling.
- Consider sample project switcher for App Launch, House Exit, and Vehicle Fleet templates.

### Later

Potential next capabilities:

- Editable tasks.
- Local storage persistence.
- Project templates.
- Markdown import/export refinement.
- Dependency graph visualization after the table/timeline model is useful.
