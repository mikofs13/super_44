# 14 · Coding conventions

## Code boundaries

Use TypeScript strict mode. Prefer narrow domain types and explicit loading/error states to unrelated booleans. Server-render content by default; add client boundaries only where browser behavior is necessary. Keep browser globals out of module initialization that can run during build. Validate content at build time and fail with a specific file/field message.

Components use PascalCase; hooks use `use` plus a meaningful name; utilities use camelCase; route/content slugs use kebab-case. CSS variables describe semantic roles (`--text-primary`) rather than current colors (`--orange`). Keep naming stable across asset node names, manifests, and scene references.

## Component design

Separate semantic content, controls, and decorative scene modules. Give components one responsibility and explicit props. Prefer composition over large mode flags. Extract only repeated or conceptually independent behavior. Do not create an enormous `Scene.tsx` or a universal component with dozens of optional props.

Store editable content in `content/`, asset metadata in the asset registry, camera coordinates in camera configuration, and visual tokens in global CSS. Do not bury project titles or personal details in mesh components.

## Animation and performance discipline

Use refs for rapidly changing scene values. Never call React state setters each frame for camera transforms. Reuse temporary vectors, geometries, and materials. Define who owns disposal; cloned objects may still share underlying resources. Clean up subscriptions, observers, GSAP contexts, event listeners, and animation frames when their owner unmounts. [R3F guidance](https://r3f.docs.pmnd.rs/advanced/pitfalls).

Use delta-time-based animation rather than assuming a 60Hz display. Clamp unusually large time steps after tab reactivation. Honor reduced motion centrally so one component cannot accidentally re-enable it.

## Styling and content

Use semantic HTML before ARIA. Avoid layout-property animation for decorative motion. Keep focus styles in the shared control primitives. Use logical CSS properties where practical, with sufficient room for longer labels. Keep text separate from imagery and avoid canvas-rendered essential text.

Comments explain intent, resource ownership, and unusual tradeoffs; avoid narrating obvious syntax. No unchecked `any`, blanket lint suppressions, debug logs containing personal data, dead demo links, or placeholder achievements in a release.

## Repository workflow

One package manager and lockfile. Small commits organized around a behavior change. Pull requests describe user-visible effect, relevant design decisions, validation, and remaining limitations. Include screenshots for visible changes and performance evidence for heavy asset/effect changes.

Define these project scripts during setup: `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`, `validate:content`, and `validate:assets`. The pack specifies their purposes; it does not provide installed tooling or ready-to-run script implementations.

## Definition of done

A change works in Static and relevant 3D modes, has correct cleanup, remains keyboard accessible, fits its budget, passes appropriate tests, and updates affected documents. No test is needed merely to assert a decorative class name; test behavior that could actually regress.
