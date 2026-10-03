# Verification: reference profile and editable content

3 October 2026. Current specification: [reference layout and editable files](../27-REFERENCE-PROFILE-AND-CONTENT.md).

Passed: production static build, lint, TypeScript, 11 unit tests and seven browser scenarios (14.0s). Browser tests used installed Microsoft Edge at 1440 x 1000 and 390 x 844 against the actual `out/` export served separately on 127.0.0.1:3100. The user's existing port 3000 server was left intact. An initial inactive-tab contrast failure was corrected and the production build/browser suite rerun successfully.

Verified: home opens About; all five routes load directly; project details and refresh; toolbar Back/Forward/Reload; close to home; fullscreen enter/exit; persistent chrome while About scrolls; mobile tab access and no document overflow; keyboard skip/focus; moving car, Motion Off persistence and reduced motion; blocked storage and image requests; native navigation without JavaScript; preserved skills; axe scans on About and Projects (zero detected violations).

Inspected the live About preview in the in-app browser and production screenshots `profile-desktop.png`, `profile-mobile.png`, and `profile-scrolled.png`. Desktop and mobile show the banner, overlapping portrait placeholder and larger persistent window. Test fixtures validate adding/removing profile records; no test identities are published.

Not performed: physical-device testing, Safari/Firefox, manual screen-reader review, performance profiling, outbound destination verification or deployment. Real identity, portrait, biography, education, experience and contact details remain unfilled. Long real-content layouts must be reviewed after authoring. Native links work without JavaScript; fullscreen/motion/history toolbar enhancements require it. This suite is not a claim of full accessibility certification.

---

Historical verification below describes the superseded compact layout.

# Verification: selective garage restoration

30 September 2026. Restored the prior compact garage presentation, retaining the moving car and path-based routes. See 26-RESTORED-GARAGE.md.

Passed: production build, lint, TypeScript, eight unit tests and six browser scenarios (19.2s). Browser checks reused the existing localhost:3000 server; the screenshots include its development indicator, so these are local development-server checks, not a claim of production-browser testing. Production static export was built successfully separately.

Verified: entry to /info/, all five direct section paths, project details and refresh, Back/Forward, close to circuit, moving car and pause persistence, reduced motion, keyboard skip/focus, mobile tabs and no horizontal overflow, missing previews, navigation without JavaScript, compact desktop window size and automated axe scan.

Inspected restored-garage.png and restored-mobile.png. Final small layout adjustment keeps the status bar at the bottom of the mobile window; followed by a fresh build and focused mobile/desktop visual checks.

Not performed: physical-device testing, Safari/Firefox, manual screen-reader review, performance profiling or deployment. Existing personal content and external project URL gaps remain. Previously added large-window/profile/gallery source is preserved but not rendered. Current routing remains, while the visual browser toolbar/fullscreen UI was reverted with the rest of the large-window design.
