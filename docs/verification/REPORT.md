# Verification: selective garage restoration

30 September 2026. Restored the prior compact garage presentation, retaining the moving car and path-based routes. See 26-RESTORED-GARAGE.md.

Passed: production build, lint, TypeScript, eight unit tests and six browser scenarios (19.2s). Browser checks reused the existing localhost:3000 server; the screenshots include its development indicator, so these are local development-server checks, not a claim of production-browser testing. Production static export was built successfully separately.

Verified: entry to /info/, all five direct section paths, project details and refresh, Back/Forward, close to circuit, moving car and pause persistence, reduced motion, keyboard skip/focus, mobile tabs and no horizontal overflow, missing previews, navigation without JavaScript, compact desktop window size and automated axe scan.

Inspected restored-garage.png and restored-mobile.png. Final small layout adjustment keeps the status bar at the bottom of the mobile window; followed by a fresh build and focused mobile/desktop visual checks.

Not performed: physical-device testing, Safari/Firefox, manual screen-reader review, performance profiling or deployment. Existing personal content and external project URL gaps remain. Previously added large-window/profile/gallery source is preserved but not rendered. Current routing remains, while the visual browser toolbar/fullscreen UI was reverted with the rest of the large-window design.
