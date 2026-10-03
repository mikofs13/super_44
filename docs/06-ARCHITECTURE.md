> Current owner direction (3 October 2026): [reference layout and editable content](27-REFERENCE-PROFILE-AND-CONTENT.md) supersedes conflicting presentation and content-authoring details below. Preserve architecture, accessibility, reduced motion and failure recovery contracts.

> Current revision: [restored garage with moving car](26-RESTORED-GARAGE.md). This supersedes conflicting visual/layout instructions below; path-based routing is retained.

> Current owner-approved revision: [large window and reference navigation](25-REFERENCE-NAVIGATION.md). It supersedes conflicting layout and routing descriptions below.

> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 06 · Architecture

## System boundary

```text
Validated local content
        |
        v
Build-time page generation ----> HTML + CSS + posters + case-study routes
                                      |
                               small client controls
                                      |
                     view/motion/capability decision
                                      |
                          optional dynamic scene import
                                      |
Native scroll -> section measurements -> scene progress -> camera/objects
```

The content layer owns truth. The scene may illustrate a project, but never owns its title, outcome, or destination. Rendering, loading, and animation failures cannot remove the semantic page.

## Ownership contracts

| Module | Owns | Must not own |
|---|---|---|
| Route content | Headings, links, images, metadata | GPU resources |
| Preference provider | Saved view and motion choices | Per-frame values |
| Scene boundary | Eligibility, loading, error recovery | Contact or project data fetching |
| Section controller | Measured ranges and active chapter | Camera mutation |
| Camera rig | Camera transform each frame | Browser history or focus |
| World components | Geometry, materials, local effects | Global scroll handlers |
| Asset registry | Asset IDs, URLs, load groups | Personal content |

One owner writes each animated property. GSAP updates normalized progress; the rig reads it and updates the camera. Do not tween the camera and also interpolate it from a different frame loop.

## State model

```ts
type ViewChoice = 'auto' | '3d' | 'static';
type SceneState = 'idle' | 'loading' | 'ready' | 'failed';
type Quality = 'low' | 'medium' | 'high';
type Chapter = 'hero' | 'projects' | 'skills' | 'achievements' | 'about' | 'contact';
```

Persist only view choice under a versioned local-storage key. Explicit consent to override reduced motion lasts for the current page visit only; never restore it from storage. A later OS motion-preference change clears that consent. Read storage safely; blocked storage must not break rendering. Derive effective mode from preference, reduced motion, device eligibility, and support. Keep `activeChapter` in UI state only when it changes. Store scroll progress, camera transforms, and frame timing in refs or scene-owned structures.

Saved `3d` never overrides reduced motion automatically. In reduced motion, show Static view with an explicit “Enable motion” action. Unsupported rendering always resolves to Static. See [12](12-RESPONSIVE-BEHAVIOR.md) for the complete precedence.

## Loading boundary

Render poster and content on the server/build. Mount browser-only code after hydration and eligibility checks. Start optional downloads after critical content has painted. Wrap scene loading in Suspense and an error boundary; preserve the poster outside both. A network failure, decoder failure, or lost graphics context affects only this boundary.

The first-frame callback changes loading to ready. It must not infer success merely from downloaded bytes. On context loss stop the render loop, show the poster and recovery control, and preserve scroll/focus. On unmount cancel listeners, GSAP contexts, pending state updates, and owned GPU resources. Shared caches need explicit lifetime ownership.

## Scroll and render contract

Measure semantic section start/end positions after fonts and image dimensions settle. Map current scroll to section-local progress. Recompute on layout changes and orientation changes using observers and a debounced refresh. Keep native scroll as the source of truth. Scroll does not repeatedly call React state setters.

Use demand rendering when idle. Scroll/progress changes invalidate frames; a damped transition requests further frames only until settled. Suspend updates in background tabs and on reading routes. R3F documents invalidation and on-demand rendering. [Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

## Security and data

Content is repository-owned and validated. Avoid runtime HTML injection and arbitrary untrusted MDX. Keep secrets out of client code and public environment variables. External links and downloadable assets are checked during release. The default architecture has no account, database, form submissions, or collection of personal visitor data.
