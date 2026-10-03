# Super 44

Current approved direction: [restored garage with moving car](docs/26-RESTORED-GARAGE.md). Its scope supersedes earlier 3D landing requirements. Preserve the historical implementation without loading it on the current landing.

Start with [index](docs/00-START-HERE.md) and [roadmap](docs/17-IMPLEMENTATION-ROADMAP.md).

- Preserve existing work. Do not silently restore deleted starter files.
- HTML owns content and navigation; the landing canvas is optional decoration.
- Follow [architecture](docs/06-ARCHITECTURE.md), [world plan](docs/04-3D-WORLD-PLAN.md), [motion](docs/09-ANIMATION-RULES.md), and [performance](docs/11-PERFORMANCE.md).
- Native scroll, keyboard access, reduced motion, Static view, and failure recovery are required.
- Keep each animated property under one owner. Clean up listeners, observers, requests, and owned GPU resources.
- Follow [design](docs/02-DESIGN-SYSTEM.md), [responsive](docs/12-RESPONSIVE-BEHAVIOR.md), and [accessibility](docs/13-ACCESSIBILITY.md) rules.
- Use verified content and owned/licensed assets. Never invent personal claims.
- Use one package manager and lockfile. Read installed framework docs before framework changes.
- Test relevant behavior using [QA](docs/15-TESTING.md). Record deviations and unverified checks honestly.
- Update authoritative docs and [decisions](docs/20-DECISIONS-AND-RISKS.md) together.

## Commands
Verified: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run preview`, `npm run test:e2e`. Details belong in README.md.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->




