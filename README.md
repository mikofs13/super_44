# Super 44

The current implementation is the approved red/black pixel circuit and pit garage. Start with [documentation index](docs/00-START-HERE.md) and [current milestone](docs/23-PIXEL-CIRCUIT.md).

Node 24 and npm; use package-lock.json. Production output is static in out/.

Verified commands:
- npm run build — production build and static export.
- npm run lint — ESLint.
- npm run typecheck — TypeScript.
- npm run test — seven unit tests covering project content validation and retained historical scene policy.

Browser checks: npm run test:e2e uses installed Microsoft Edge and starts the static preview on port 3000. Browser coverage and limitations are recorded in docs/verification/REPORT.md. Historical 3D e2e tests are in tests/archive and are not part of the current suite.

The source images in assets-source are editable originals. Public WebP variants are optimized delivery assets. Personal details remain explicitly incomplete; this is not ready for public launch.

Also verified: npm run preview serves http://127.0.0.1:3000; npm run test:e2e passed all seven current scenarios against that preview. On this Windows host start preview in a separate terminal before e2e to avoid managed-server teardown stalls.

Current interaction: one persistent scene with an animated racer and in-place HTML panes. Hash links include project build notes; the earlier standalone route remains a compatibility URL. Current browser suite has eight scenarios.

## Adding projects
Edit src/content/projects.json and place screenshots in public/images/projects. See [the step-by-step guide](docs/24-ADDING-PROJECTS.md). Build and redeploy to publish edits.


Current design/navigation: docs/25-REFERENCE-NAVIGATION.md. Personal introduction and portrait are editable in src/content/profile.json. /info/, /projects/, /skills/, /certificates/ and /contact/ are real static routes.

Latest verification: nine current browser scenarios and eight unit tests; see docs/verification/REPORT.md. Earlier counts above describe previous revisions.

Current presentation: docs/26-RESTORED-GARAGE.md restores the compact garage layout with current paths and moving car. Profile and gallery source are preserved but not active in this revision.
