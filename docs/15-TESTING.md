# 15 · Testing and quality assurance

## Test layers

| Layer | What to verify | Tool / method |
|---|---|---|
| Static | Types, lint, content schemas, missing assets | TypeScript and validation scripts |
| Unit | Progress clamping, mode precedence, quality cooldowns, slug validation | Vitest |
| Component | Menu keyboard behavior, view controls, copy fallback, loading recovery | Testing Library |
| End-to-end | Navigation, direct routes, history, fallback, no-JS reading | Playwright |
| Accessibility | Labels, contrast flags, focus, reading order | axe plus manual checks |
| Visual | Key compositions and responsive layouts | Deterministic screenshots and human review |
| Runtime | Network, frame timing, memory lifecycle | Browser profiling on real devices |

## Critical scenarios

| ID | Setup and action | Expected result |
|---|---|---|
| NAV-01 | Load home, activate Projects | Correct heading visible, URL anchor valid |
| NAV-02 | Open case study directly, reload | Complete page; no world model requests |
| NAV-03 | Scroll home, open project, use Back | Prior reading position and view preserved |
| MODE-01 | Load with reduced motion | No moving camera; complete static content |
| MODE-02 | Select Static and reload | Preference retained; no 3D assets requested |
| MODE-03 | Toggle reduced motion while scene runs | Motion stops without losing content/focus |
| FAIL-01 | Block a required GLB or decoder | Poster and useful retry; page still works |
| FAIL-02 | Force graphics context loss | Safe fallback without reload loop |
| FAIL-03 | Delay assets beyond 8 seconds | Poster persists; late completion does not surprise |
| A11Y-01 | Keyboard-only primary journeys | No trap, all controls visible and operable |
| MOBILE-01 | 320px, zoom, landscape | No page overflow or inaccessible controls |
| PERF-01 | Repeatedly visit home/project | No accumulating canvases, listeners, or resources |
| DATA-01 | Missing project image / duplicate slug | Build fails with actionable message |
| BASE-01 | Disable JavaScript | Projects, contact, résumé, and routes remain usable |

## Browser/device matrix

At release record the current tested versions of Chrome/Edge, Firefox, and Safari, plus Android Chrome and iOS Safari on actual devices where available. Include one integrated-GPU laptop and a modest phone, not only a development workstation. Browser emulation does not substitute for mobile graphics, memory, and touch testing.

For each configuration record OS, browser, GPU/device, viewport, mode, connection profile, and result. If a browser cannot run 3D reliably, the tested fallback must still meet all reading/navigation requirements.

## Visual QA

Capture all six chapter anchor poses at desktop size and all static mobile compositions. Freeze animation at a deterministic progress value, wait for fonts/assets, and use fixed content. Allow small renderer differences; compare layout and composition rather than requiring exact GPU pixels across systems. Inspect the full camera path manually for clipping and occlusion.

## CI and release gates

CI runs install from lockfile, lint, typecheck, content/asset validation, unit tests, production build, and core end-to-end tests against the built output. Add automated accessibility scans on home and one case study. GPU checks may need a dedicated environment; do not silently skip them and claim the scene is verified.

Release blockers: unreadable/missing content, broken contact/project links, keyboard traps, unrecoverable scene errors, required budget failures without an accepted documented revision, and missing asset rights. Minor purely decorative differences may be logged with an owner and follow-up date.

## Test report template

Record commit/build ID, date, tester, device matrix, scenarios passed/failed, performance evidence, accessibility findings, screenshots, accepted limitations, and go/no-go decision. Keep failing evidence attached to the issue. Re-run affected tests after fixes; expand testing only if the change creates new risk.
