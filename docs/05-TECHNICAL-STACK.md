# 05 · Technical stack

## Recommended baseline

| Tool | Responsibility | Constraint |
|---|---|---|
| Next.js App Router + React + TypeScript | Routes, pre-rendered content, metadata, UI | Keep reading content outside the canvas boundary |
| Three.js + React Three Fiber | Optional 3D scene | One canvas on landing route only |
| Selected Drei helpers | Loading and scene utilities | Import only needed helpers; no free-roam controls in v1 |
| GSAP + ScrollTrigger | Translate native scroll into scene progress | No smooth-scroll replacement or scroll snapping |
| CSS Modules + global tokens | Layout, components, responsive styles | Avoid a second styling system initially |
| Local typed content | Projects, skills, biography | Validate during build; no CMS initially |
| Blender + glTF tooling | Modeling, export, compression | Preserve editable source outside public assets |
| Vitest + Testing Library | Logic and component behavior | Test user-visible contracts |
| Playwright + axe integration | End-to-end and automated accessibility | Supplement with real-device/manual testing |
| ESLint + formatter + TypeScript | Consistency and static checks | CI enforcement |

CSS Modules is a deliberate simplification from the earlier Tailwind suggestion. Tailwind remains viable if the implementer already uses it; document the switch and retain the same tokens. Zustand is deferred because a small preference provider and refs are enough. Add a store only when independently mounted controls create a demonstrated need.

## Dependency selection procedure

At implementation kickoff choose maintained, mutually compatible stable releases. Check Next.js's supported Node version; React/R3F peer compatibility; Three/Drei compatibility; GSAP integration; and test-runner requirements. Install with one package manager, commit its lockfile, pin Node in project configuration, and record resolved versions in the decision log. Do not use unbounded `latest` ranges in the committed manifest. This pack does not claim to have tested a particular version combination.

Next.js documents client/server boundaries and lazy loading. Place browser-only scene code behind a client wrapper; if using `next/dynamic` with `ssr: false`, declare it in that client boundary. [Official component guidance](https://nextjs.org/docs/app/getting-started/server-and-client-components), [lazy-loading guidance](https://nextjs.org/docs/app/guides/lazy-loading).

## Hosting baseline

Use a static export on a static host with HTTPS, preview deployments, custom domains, compression, and rollback. Contact is a visible email link and copy action, so no server is needed. Pre-generate project slugs. For static export, provide pre-optimized images or a compatible custom image loader; do not assume the default server image optimizer exists. [Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports).

If a real contact form or CMS preview becomes necessary, revisit hosting and privacy requirements before adding a server route. Hosting selection is an implementation decision; this document does not provision a provider or imply a paid subscription.

## Deferred dependencies

No physics engine, particle engine, postprocessing library, analytics SDK, audio framework, or CMS until a measured requirement justifies it. Prefer a single small bloom pass only after the base scene meets its budgets. Every dependency addition should state purpose, transfer cost, runtime impact, maintenance cost, and removal path.
