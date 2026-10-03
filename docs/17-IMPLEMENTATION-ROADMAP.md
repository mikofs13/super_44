> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 17 · Implementation roadmap

## Delivery strategy

Build a vertical slice early: real HTML content, one static case study, one greybox scene transition, one fallback, and one modest-device measurement. This exposes the difficult integration before asset production absorbs the schedule.

Suggested effort is 26–43 focused working days for an experienced solo developer with some 3D familiarity. It excludes substantial learning time and custom high-detail modeling. Use acceptance gates rather than calendar pressure; a static launch is an acceptable checkpoint if 3D remains unfinished.

| Phase | Effort | Deliverable | Exit gate |
|---|---|---|---|
| 0 Content and decisions | 2–3 days | Workbook, scope, project evidence, asset sourcing plan | No invented facts; selected projects have usable evidence |
| 1 HTML foundation | 3–5 days | Routes, navigation, tokens, one real case study, mobile layout | Complete primary journey without JS |
| 2 Greybox vertical slice | 3–5 days | Client scene boundary, primitive car/garage, camera segment, poster fallback | Smooth transition, reduced motion and failure tested |
| 3 Complete narrative | 4–6 days | Six chapter anchors, all project pages, skills/about/contact | Deep links, Back, resize, reverse scroll reliable |
| 4 Asset production | 5–9 days | Optimized car, garage, props, posters, rights records | Budgets and key camera compositions pass |
| 5 Motion and visual polish | 3–5 days | Final materials, light, micro-interactions, quality profiles | No content obstruction or unnecessary motion |
| 6 Hardening | 4–6 days | Device QA, accessibility, performance, recovery | Release blockers cleared |
| 7 Release | 2–4 days | Preview, metadata, hosting, production smoke test | Launch checklist signed off |

Mobile, accessibility, and Static view begin in phase 1 and are checked throughout. They are not deferred to the end.

## Initial task backlog

| ID | Task | Depends on | Acceptance |
|---|---|---|---|
| P01 | Fill profile and first case study | None | Real links and evidence |
| P02 | Set compatible dependencies and CI scripts | None | Reproducible build |
| P03 | Implement semantic landing sections | P01, P02 | Anchors and keyboard flow work |
| P04 | Implement static case-study generation | P01, P02 | Direct URL and refresh work |
| P05 | Add view preference and poster boundary | P03 | Static causes no 3D downloads |
| P06 | Add primitive world and camera mapping | P05 | One transition plus reverse/jump tests |
| P07 | Complete all chapters | P06 | No geometry collisions or inaccessible content |
| P08 | Replace assets by load group | P07 | Each group passes manifest/budget checks |
| P09 | Add quality adaptation and context-loss recovery | P06 | Documented downgrade behavior |
| P10 | Complete content and final visual QA | P04, P08 | All placeholders removed |
| P11 | Run full device/accessibility/performance matrix | P09, P10 | Evidence recorded; blockers cleared |
| P12 | Deploy preview, review, promote, smoke test | P11 | Launch checklist complete |

## Scope reduction order

If time or performance slips, remove bloom/reflections first, then animated props, then extra close-up objects. Reduce the world to hero + a few stable chapter poses if needed. Preserve real project case studies, accessible navigation, contact, and the polished static experience. Never trade away these essentials to keep a decorative effect.

## Milestone reviews

At every phase record: what is demonstrably working, what remains unverified, budget measurements, newly discovered constraints, and the next gate. Ask representative visitors to locate a project and explain the owner's role during phases 1 and 5. Observe task completion rather than asking only whether the site looks impressive.

## Post-launch backlog

Possible additions: a technical case study about the portfolio, more projects, a CMS if updates justify it, optional audio, or a constrained inspect-car mode. Each needs a separate benefit/cost decision. Free driving remains outside the portfolio's default navigation.

