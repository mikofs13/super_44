> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# Super 44: F1-inspired developer portfolio

## Documentation pack v1.0

Prepared 26 September 2026. This is an implementation blueprint, not a completed website. **Super 44** is the owner-selected fictional team name. No official racing-team affiliation is implied.

Build a useful portfolio first, then add a directed 3D garage experience. The same HTML content serves cinematic, reduced-motion, mobile, and unavailable-WebGL modes. No visitor needs to drive a car, wait through an intro, or interact with a canvas to find work or contact details.

## Read in this order

| File | What it decides |
|---|---|
| [01 Project vision](01-PROJECT-VISION.md) | Audience, priorities, scope, success |
| [02 Design system](02-DESIGN-SYSTEM.md) | Visual language, tokens, components |
| [03 UX and storyboard](03-UX-AND-STORYBOARD.md) | Navigation, scene sequence, interaction states |
| [04 3D world](04-3D-WORLD-PLAN.md) | Layout, camera, materials, scene ownership |
| [05 Technical stack](05-TECHNICAL-STACK.md) | Tools, dependency policy, alternatives |
| [06 Architecture](06-ARCHITECTURE.md) | Boundaries, data, loading, state |
| [07 Folder structure](07-FOLDER-STRUCTURE.md) | Where implementation belongs |
| [08 Content strategy](08-CONTENT-STRATEGY.md) | Evidence, schemas, editorial rules |
| [09 Animation rules](09-ANIMATION-RULES.md) | Timing, scroll mapping, motion preferences |
| [10 Asset pipeline](10-ASSET-PIPELINE.md) | Production brief, budgets, licensing records |
| [11 Performance](11-PERFORMANCE.md) | Budgets, measurement, adaptive quality |
| [12 Responsive behavior](12-RESPONSIVE-BEHAVIOR.md) | Desktop, tablet, mobile, touch |
| [13 Accessibility](13-ACCESSIBILITY.md) | Keyboard, semantics, motion, contrast |
| [14 Coding conventions](14-CODING-CONVENTIONS.md) | Maintainability and engineering rules |
| [15 Testing](15-TESTING.md) | Automation, device QA, release gates |
| [16 Deployment](16-DEPLOYMENT.md) | Hosting, previews, rollback, monitoring |
| [17 Implementation roadmap](17-IMPLEMENTATION-ROADMAP.md) | Dependency-ordered build milestones |
| [18 Launch checklist](18-LAUNCH-CHECKLIST.md) | Explicit go/no-go checks |
| [19 Content workbook](19-CONTENT-WORKBOOK.md) | Fill-in templates for real portfolio material |
| [20 Decisions and risks](20-DECISIONS-AND-RISKS.md) | Tradeoffs and unresolved owner inputs |
| [21 Sources](21-SOURCES.md) | Primary documentation and verification boundaries |

## Start building

1. Fill in the workbook with your name, role, real projects, links, and contact details.
2. Build the complete HTML portfolio and one case study using the design system.
3. Prove one greybox camera transition on a modest laptop and a phone.
4. Complete the remaining milestones; promote assets only after performance review.
5. Use the launch checklist on a production-like preview, then deploy.

The numbered reading order explains the system; the roadmap defines the actual build order. A single developer can own every role, but should review content, design, engineering, and release readiness separately.

Implementation update: the [two-pose vertical slice](22-VERTICAL-SLICE.md) now exists. Its verification record is separate from the proposed requirements in this pack; it does not imply the full portfolio or release checklist is complete.

## Authority and change control

Values in this pack are **proposed project requirements**, unless explicitly attributed to a source. They are not measured results. Personal facts in the earlier conversation were illustrative and are not treated as verified. All workbook placeholders must be replaced or omitted before launch.

When documents overlap: performance budgets live in 11; motion rules in 09; routes and user behavior in 03; runtime boundaries in 06. Change the authoritative file first and update linked documents in the same change. Record significant departures in 20.

## Included and excluded

Included: planning documents, implementation contracts, reusable content templates, QA criteria, and a delivery checklist. Excluded: application code, final artwork, purchased assets, a verified dependency lockfile, hosting configuration, and a deployed site. Code fragments illustrate intended contracts and require implementation and testing.


To add or edit project previews, explanations, repo and demo links, use [Adding projects](24-ADDING-PROJECTS.md).

Latest approved experience: [large window, About introduction and moving car](25-REFERENCE-NAVIGATION.md).

Latest owner direction: [restored garage with moving car](26-RESTORED-GARAGE.md).
