> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 03 · UX flow and storyboard

## Routes and navigation

| Route | Purpose |
|---|---|
| `/` | Complete portfolio with optional canvas |
| `/#projects` | Direct access to featured work |
| `/#skills`, `/#achievements`, `/#about`, `/#contact` | Stable chapter anchors |
| `/projects/[slug]` | Independently shareable case study |
| `/credits` | Asset acknowledgments |
| Unknown route | Useful 404 with Projects and Home links |

Header: owner name/home, Projects, Skills, About, Contact, and a compact View control. Achievements is available in the chapter rail and normal page flow. Include a skip-to-content link. Use normal URLs and native anchor behavior; preserve deep links on reload. Do not make a canvas click the only route to anything.

## Six-chapter storyboard

| Chapter | Content | Cinematic composition | Interaction |
|---|---|---|---|
| 1 Starting bay | Name, role, one-line value, Projects/Contact | Three-quarter car, garage entrance, warm strip light | Immediate HTML links |
| 2 Project bays | Three project summaries and outcomes | Camera slides along neighboring garage openings | Open conventional case-study route |
| 3 Engineering | Skill groups backed by project evidence | Stationary car side, tools and monitor | Select an HTML skill group; optional scene highlight |
| 4 Display shelf | A few verified achievements | Close but stable view of objects | Read proof and optional external source |
| 5 Driver desk | Biography, portrait, experience, résumé | Helmet, workbench, subdued background | Read story or download résumé |
| 6 Pit exit | Contact details and availability if accurate | Camera settles toward daylight | Email and verified profile links |

The earlier concept placed skills before projects. This plan deliberately puts project evidence first. The environment is one contiguous workshop; the chapter order is identical in the HTML and camera mapping.

## Primary user journeys

Recruiter: land → read role → activate Projects → inspect a project → contact. Engineering lead: open a shared case-study link → review constraints and decisions → source/demo → other work. Enthusiast: scroll through the full cinematic sequence → read the site's own case study if available. Every journey works in Static view.

## Initial load and failure states

1. Send readable HTML and a sized hero poster immediately.
2. Resolve saved view and reduced-motion preferences after hydration without changing content geometry.
3. Auto mode may request 3D only when allowed by [12](12-RESPONSIVE-BEHAVIOR.md).
4. Show a small inline “Preparing 3D view” status. Never block the page or fabricate loading percentages.
5. Replace the poster only after a successful rendered frame. With reduced motion, keep the poster.
6. If loading exceeds 8 seconds, keep the poster and offer “Try 3D”. If a late load completes, do not surprise the visitor with automatic movement; require that action.
7. On errors show “3D view is unavailable. You can still explore all projects.” Retry is explicit and limited to one attempt per activation.

No compulsory starting-light intro in v1. A later optional intro must be skippable and must not delay content.

## Reading and return behavior

Case studies contain title, summary, role, dates, problem, constraints, approach, evidence, tradeoffs, next steps, and useful links. Never keep a GPU-heavy canvas running behind reading routes. Browser Back restores the landing page's previous scroll position and selected view. Direct entry into a case study does not download world assets.

Use native history restoration where it works. If application routing needs a custom restoration layer, record position by history entry, wait until layout is ready, and verify with browser Back/Forward tests. Do not rewrite history on every scroll frame.

## Interaction rules

The canvas is decorative in v1; pointer events pass through to HTML. Skill selections may alter decorative lighting, but all resulting information exists in the selected HTML panel. Mobile navigation expands inline beneath the header, with Escape-to-close and focus returned to its toggle. Do not trap focus in this nonmodal menu.

Acceptance: keyboard-only users can complete every journey; anchors are not hidden under the header; selecting a navigation item never plays an obligatory travel animation; the contact action is accessible from the initial header.

