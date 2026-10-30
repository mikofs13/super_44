# 20 · Decisions, assumptions, and risks

## Proposed baseline decisions

| ID | Decision | Rationale | Revisit when |
|---|---|---|---|
| D01 | HTML is the complete portfolio | Reading/navigation survives scene failure | Never remove this invariant |
| D02 | Projects precede skills | Evidence answers recruiter questions sooner | User research supports a better order |
| D03 | One compact garage and decorative canvas | Controls modeling and runtime scope | A new interaction has a clear purpose |
| D04 | Native scroll; no pinned journey | Familiar behavior and reliable anchor links | Proven benefit outweighs complexity |
| D05 | Static by default on compact/touch layouts | Better predictable reading and loading | Real-device evidence supports an upgrade |
| D06 | Static export and email contact | Simple operations, no unnecessary backend | Form/CMS requirements become real |
| D07 | CSS Modules; no state library initially | Smaller conceptual surface | Team needs justify alternatives |
| D08 | Super 44 fictional team identity and generic car | Owner-selected team name; original personal brand | Final visual identity is reviewed |
| D09 | No compulsory intro or audio | Immediate access to portfolio evidence | An optional feature passes usability review |

The team name Super 44 is confirmed by the owner. Other baseline decisions remain recommendations, not claims of user approval for the final visual identity, purchases, hosting, or production implementation.

## Owner inputs still needed before implementation

Public identity and contact; strongest projects; actual technology stack and achievements; résumé/portrait; asset budget and modeling ability; desired launch timing; hosting/domain ownership; and access to representative testing devices. The team name is confirmed as Super 44. The documentation remains actionable without inventing the remaining facts.

## Risk register

| Risk | Early signal | Mitigation | Owner role |
|---|---|---|---|
| Spectacle hides evidence | Users cannot find projects promptly | Visible navigation, project-first flow | Design/content |
| Asset scope grows | Large detailed model before greybox is approved | Gate asset production behind vertical slice | 3D/engineering |
| GPU/browser failures | Context loss or poor sustained frame time | Profiles, Static fallback, actual device testing | Engineering |
| Memory leaks | More resource objects after repeated visits | Explicit ownership and cleanup tests | Engineering |
| Inconsistent scroll state | Back or resize causes camera jumps | Measured sections, shared poses, reversible progress | Engineering |
| Weak portfolio substance | Impressive scene but vague case studies | Evidence workbook before final art | Content |
| Unclear asset permissions | No license/provenance record | Replace before shipping; maintain credits | Asset owner |
| Dependency mismatch | Peer conflicts or build-only errors | Compatibility check and locked versions | Engineering |
| Delayed launch | Effects consume hardening time | Cut optional effects before essentials | Project owner |

## Decision record template

```text
ID / date / owner:
Problem:
Options considered:
Selected option and reason:
Evidence or prototype:
Consequences and accepted limitations:
Affected documents and tests:
Review trigger:
Status: proposed / accepted / superseded
```

## Documentation maintenance

Use the pack as a living contract. Keep v1 scope and current decisions easy to find; mark superseded decisions rather than leaving contradictory instructions. Update budget tables after an accepted change, not after quietly exceeding them. Record tested versions and actual measured results separately from proposed targets.

## Implemented slice decisions · 2026-09-26

- The owner authorized implementation of the 3D vertical slice with autonomous routine decisions. Established a fresh `src/` foundation without restoring the deleted starter UI or Tailwind configuration.
- Adopted npm with an exact dependency manifest and lockfile; Node 24.11.0 is the tested runtime. See package.json for resolved versions and verification/REPORT.md for executed checks.
- Resolved motion persistence in favor of session-only consent; only view choice is saved. Updated the architecture contract accordingly.
- Implemented two poses and an original generated glTF car before full narrative/asset production. Case studies and personal content remain future work, clearly labeled in the UI.
- Extended loading behavior with a timed-out state and canceled stale completions. No late automatic movement after the eight-second limit.
- Used the Node test runner for the small pure policy module; Playwright and axe test user-visible contracts. Vitest/Testing Library remain unnecessary for this slice.
- Fixed quality caps and a very small scene replace adaptive tiers for this milestone only. Full device profiling and adaptive quality remain explicit follow-up work. No performance budget was relaxed.

Implementation and ownership details: [vertical slice](22-VERTICAL-SLICE.md).

## 29 September 2026 — approved concept B
Owner selected the red/black/yellow pixel circuit and garage. Implemented decorative WebP artwork with HTML portfolio window; previous 3D landing is preserved but unreferenced. Entrance effect capped at 220ms, direct links instant, reduced motion respected. Motion toggle replaces Static/3D for this non-WebGL version. See [current specification](23-PIXEL-CIRCUIT.md). Biography, real contact links, additional projects, real-device and cross-browser checks remain open.

## Owner correction: persistent scene and racer
Replace the stacked page flow with one scene and in-place HTML section routing. Keep the brief 220ms navigation movement and an original animated racer; Motion Off/reduced motion stops all animation. Hash routes include build notes. Reference URL was unreachable during reinspection, so exact route equivalence remains unverified. See docs/23-PIXEL-CIRCUIT.md.

## Data-driven projects
Owner requested project previews, explanations, repository and live links. Implemented a local JSON authoring source with server-rendered cards/detail views inside the persistent scene. Repo/live links are optional, external links open in a new tab, and no URLs were invented. This is a build-time content workflow, not a browser admin/CMS. See [adding projects](24-ADDING-PROJECTS.md).

## Reference inspected; expanded window and moving car
Reference became reachable in Chrome. Implemented observed /info-first navigation, section routes, focused views, browser toolbar/fullscreen/close behavior, and image/project selectors. Enlarged the window and replaced walking character with original moving car on a straight. Empty profile fields remain explicit placeholders. See [current specification](25-REFERENCE-NAVIGATION.md). Real browser history is used by toolbar controls and can leave the site, as normal browser Back does.

## 30 September 2026: selective restoration
Owner requested previous compact garage design, retaining current routes and moving car. Restored prior content/window/card presentation; removed large-window portrait/browser-toolbar UI from active rendering. Retained all current static routes, history and deep links. Car lane colors now blend with garage. Historical source components remain available. See docs/26-RESTORED-GARAGE.md.

## 3 October 2026: screenshot layout and editable files
Owner requested the supplied screenshots' browser-window layout and route behavior, preserving Super 44's theme and moving car. This supersedes selective restoration's compact window and inactive profile. Implemented centered larger window, persistent chrome, native inner scroll, About banner/portrait/introduction/education/experience, and build-time profile JSON for all personal sections. Owner selected editable files with rebuilds to publish; no CMS is needed. Existing skill additions were preserved. Pending identity, portrait, education, experience and destinations remain honest placeholders. Real browser history can leave the site; address display is decorative. See [current contract](27-REFERENCE-PROFILE-AND-CONTENT.md) and [editing guide](28-EDITING-CONTENT.md). Production build, lint, typecheck, 11 unit tests and seven production-preview browser scenarios passed. Physical devices, other browser engines, screen readers, performance profiling and deployment remain unverified.

## 3 October 2026: authored profile and Ethio-Budget
Owner supplied biography, university degree, employer/role/dates and Ethio-Budget description, screenshots and repository URL. Added these to editable content without inventing employment arrangement, results, dependencies or a demo destination. Enabled the existing optional screenshot data in project details as a responsive grid with intrinsic image proportions; cards contain phone screenshots. Repository retrieval failed, so only owner-confirmed Expo and React Native are listed. See [current specification](27-REFERENCE-PROFILE-AND-CONTENT.md) and [authoring guide](24-ADDING-PROJECTS.md).

## 3 October 2026: project carousel overview
Owner requested reference-style side navigation and combined images while preserving clickable detail information, and removal of Super 44 as a listed project. Added a manual screenshot stage and separate project selector with keyboard buttons and live status, without automatic animation. Active JSON now contains Ethio-Budget only; Super 44 data is archived. Project arrows remain disabled until more real records are supplied. The detail component and historical card component remain available; current overview uses the new showcase. Existing section paths, detail history and racing theme are preserved. See [current specification](27-REFERENCE-PROFILE-AND-CONTENT.md).

## 3 October 2026: one screenshot at a time
Owner corrected the overview to show a single screenshot switched by arrows/dots. The responsive frame contains portrait and landscape images at their original proportions and keeps its dimensions stable while switching. Image links still open the preserved detailed view; that view retains all screenshots. Screenshot components remount per source to avoid carrying a failed-image state into the next image. See docs/27-REFERENCE-PROFILE-AND-CONTENT.md.

## 30 October 2026: Enicharet portfolio entry
Owner requested Enicharet and supplied its GitHub URL. Read the matching local project's README, PROGRESS.md and package.json, and confirmed repository identity/homepage through GitHub. Added accurate lowest-unique-bid mechanics, implemented features, stack, two inspected existing screenshots, repo and configured demo URL. Marked it as a test-money prototype; real payments/physical handover are not implemented. No other project's source, database or runtime was modified. Project controls now navigate two real records. Live demo availability remains unverified after the web fetch failed. See the [current specification](27-REFERENCE-PROFILE-AND-CONTENT.md) and [verification report](verification/REPORT.md).
