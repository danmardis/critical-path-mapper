# Critical Path Mapper

Turn messy goals into blocker-aware action maps.

Critical Path Mapper is a lightweight planning tool for identifying blockers, dependency chains, fast-track opportunities, and the next best action in chaotic personal or project backlogs.

## Why this exists

Most lightweight task tools treat work as a flat list. Real work is not flat.

Some tasks block others. Some tasks can run in parallel. Some tasks are urgent because they stop active damage. Some tasks only feel urgent because they are emotionally loud.

Critical Path Mapper helps users answer:

> What has to happen first, what is blocked, what can run in parallel, and what is the shortest realistic path to done?

## MVP direction

The first version will be a single-page app with local storage only.

Core capabilities:

- Create a project.
- Add tasks.
- Mark dependencies.
- Score tasks by urgency, impact, risk, effort, and blocker status.
- Identify blocked tasks.
- Identify critical-path candidates.
- Identify fast-track opportunities.
- Export a markdown action plan.

## Initial use cases

- Planning a public software project.
- Sorting a job-search backlog.
- Stabilizing a home repair backlog.
- Managing vehicle/fleet repair and sale dependencies.
- Turning an overwhelming goal into next physical actions.

## Planned stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Local storage for MVP persistence

Potential later additions:

- React Flow dependency visualization
- Project templates
- Markdown import/export
- Static deployment on a professional portfolio domain

## Portfolio goal

This project is designed to demonstrate:

- systems thinking
- dependency modeling
- prioritization logic
- product judgment
- clean UI execution
- practical operations thinking inspired by Agile, Lean, ITIL, project management, and Theory of Constraints

## Status

Repo shell initialized. Product planning is underway.

See:

- [`docs/product-brief.md`](docs/product-brief.md)
- [`docs/roadmap.md`](docs/roadmap.md)
- [`docs/domain-strategy.md`](docs/domain-strategy.md)

## License

MIT License. See [`LICENSE`](LICENSE).
