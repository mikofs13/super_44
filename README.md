# Super 44

Original red/black/yellow racing portfolio with a moving car and HTML content in a large browser-style window. Start with [index](docs/00-START-HERE.md), [current direction](docs/27-REFERENCE-PROFILE-AND-CONTENT.md) and [content editing guide](docs/28-EDITING-CONTENT.md).

Edit `src/content/profile.json` for personal details, portrait, education, experience, skills, certificates and contact. Edit `src/content/projects.json` for projects, previews, explanations and optional repository/live links; see [adding projects](docs/24-ADDING-PROJECTS.md). Rebuild and redeploy to publish. Personal content remains incomplete; no identity or claims were invented.

Node 24 and npm with package-lock.json. Production static output is `out/`.

Verified commands:

- `npm run build`: validates content and generates the static export.
- `npm run lint`: ESLint.
- `npm run typecheck`: TypeScript.
- `npm run test`: 12 unit tests for profile/project validation and historical scene policy.
- `npm run preview`: serves the export at http://127.0.0.1:3000.
- `npm run test:e2e`: thirteen current scenarios using installed Microsoft Edge, including routes, motion, mobile, failed images, no-JavaScript navigation and axe.

On Windows keep preview in a separate terminal for browser tests. If port 3000 is occupied, set `$env:SUPER44_PORT='3100'` in both preview and test terminals before running those commands. The latest verification used the production export on port 3108. See [verification report](docs/verification/REPORT.md) for limitations.

Home enters `/info/`. Other static routes: `/projects/`, `/skills/`, `/certificates/`, `/contact/`. Project detail URLs: `/projects/#project-SLUG`. Content scrolls inside the window while tabs and controls remain available. Motion Off and reduced motion pause the original racer. Native links provide navigation without JavaScript.

Original editable artwork is in `assets-source/`; optimized delivery images are in `public/`. Historical 3D implementation and archived tests are preserved but not loaded on the current landing.

Contact now includes a native email enquiry form. Before delivery is operational, complete the FormSubmit activation and a real inbox test in [contact setup](docs/29-CONTACT-FORM.md). No email credentials are stored in the site.
