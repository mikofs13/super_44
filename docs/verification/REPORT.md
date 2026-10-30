# Latest verification: Enicharet project

30 October 2026. Added Enicharet using its local README/progress/package manifest and two inspected existing artifacts, plus the owner-confirmed repository. GitHub repository metadata supplies the configured demo URL. No app/database operations were performed in the Enicharet workspace. The entry clearly describes a test-money prototype.

Passed: production build, lint, TypeScript, 11 unit tests and ten Edge browser scenarios against the static export at 127.0.0.1:3107 (18.5s). The new scenario checks switching between two projects with arrows/dots, reset to the selected project's first image, screenshot switching, loaded Enicharet preview, exact repo/demo hrefs, clickable details, honest payment limitations, detail refresh and mobile document width. Existing image fitting, navigation, reduced motion, failure recovery and automated axe scenarios also passed. Updated the prior single-project disabled-control assertion because two real projects now exist.

Inspected `enicharet-overview-desktop.png` and `enicharet-detail-mobile.png`. No live deployment was performed. The configured demo could not be fetched by the web tool; public availability, authentication and payment flows were not tested. Physical devices, other browser engines, manual screen-reader review and performance profiling remain unperformed.

---
# Latest verification: one screenshot at a time

3 October 2026. Project overview now displays one current image, switched by arrows or dots; detailed information and full gallery remain behind the clickable image.

Passed: production build, lint, TypeScript and nine Edge browser scenarios (42.6s) against the production preview on port 3100. Updated showcase coverage checks a single image, both arrow directions, keyboard dot selection, the selected dot, portrait and a substituted landscape image with object-fit: contain, stable frame width/height across image ratios, clickable details and mobile overflow. Existing navigation, reduced motion, image failures, no-JavaScript section navigation and automated accessibility checks passed. Inspected updated desktop/mobile `project-showcase` screenshots. Unit tests were not rerun for this UI-only change; their prior 11-test pass remains historical evidence.

No physical-device, other-browser, manual screen-reader, performance-profile or deployment checks were performed. Multi-project switching remains untested because only one real project is supplied.

---
# Latest verification: reference project showcase

3 October 2026. Project overview now shows combined screenshots, side screenshot arrows, information below and a separate project selector. Clicking images, title or Explore the build retains the detailed project view. Removed Super 44 from active JSON and saved its data in an archive.

Passed: production build, TypeScript, lint, 11 unit tests and nine Edge browser scenarios against production preview on port 3100 (41.5s). New coverage verifies three overview images together, next/previous screenshot order, keyboard dot selection, single-project disabled controls, absence of Super 44 in the overview, image-to-detail navigation and Back to projects. Existing refresh/history, failed-image recovery, reduced motion, no-JavaScript route navigation and automated axe checks passed. Desktop and mobile screenshots inspected: `project-showcase-desktop.png` and `project-showcase-mobile.png`.

Limitations: only one real project is currently supplied; switching between multiple project records has not been exercised in the browser. Project controls use the supplied JSON array and enable when it contains additional records. No physical-device, additional-browser, manual screen-reader, performance-profile or deployment checks were performed. Carousel buttons require JavaScript; native section links and initial project content remain HTML. Detail view is preserved with the current enhanced hash-route behavior.

---
# Latest verification: Ethio-Budget

3 October 2026. Added owner-supplied project copy, Expo/React Native stack, repository URL and three original JPEG screenshots (approximately 71–92 KB each). Project details display optional screenshot grids with uncropped intrinsic proportions. Supplied profile facts now appear in About, education and experience.

Passed: production export build, lint, TypeScript, 11 unit tests and eight Edge production-preview browser scenarios (32.6s, port 3100). The new scenario checks Ethio-Budget navigation, direct detail refresh, exact repository href, absence of an invented live link, three loaded screenshots and mobile document width. Existing route, motion, accessibility, failed-image and no-JavaScript scenarios passed. Tests now read the actual profile identity and select project-specific links. Updated the image-failure assertion for two gallery fallbacks after its initial strict-selector failure.

Inspected the live project in the in-app browser and `ethio-budget-desktop.png` / `ethio-budget-mobile.png`. Screenshots are vertically scrollable within the persistent portfolio window; mobile gallery is one column. Repository contents could not be fetched, so additional dependencies and app internals were not independently audited. No deployment, physical-device, other-browser or performance-profile checks were performed. Portrait, certificates and live app destination remain pending.

---
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
