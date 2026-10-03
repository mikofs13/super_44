# Current direction: reference layout and editable content

3 October 2026. The owner supplied two screenshots and requested their layout and routes, keeping Super 44's own racing theme. This supersedes the compact-window and inactive-profile requirements in [26](26-RESTORED-GARAGE.md). The owner chose editable content files with rebuilds to publish.

Home opens About at `/info/`. A large centered browser window has persistent About, Projects, Skills, Certificates and Contact tabs, real browser Back/Forward/Reload controls, fullscreen and close-to-home controls. Content scrolls natively inside the window; chrome stays in place. Other routes are `/projects/`, `/skills/`, `/certificates/`, `/contact/`. Project details remain `/projects/#project-SLUG`; direct loads and refresh work. Back may leave the site, as normal browser history does.

About has a full-width original garage banner, overlapping circular portrait, name, role, introduction, education and experience. Missing personal information remains explicitly pending. The reference person's identity, portrait, claims and artwork are not reused. Dark content, red chrome and small yellow accents preserve Super 44. The original moving car stays on the blended pit lane below; there is no long entrance transition.

HTML owns every content section and link. JSON is validated and rendered at build time. There is no browser editor, account or database. Existing skills are preserved in the new profile source. Historical 3D remains unreferenced. Motion Off, reduced motion, hidden-document pause, storage failure and failed-image recovery remain supported. The address display is decorative, not an editable browser address field.

On mobile, tabs scroll horizontally and controls remain available. About content scrolls vertically. Fullscreen uses the browser API where supported, with an expanded-window fallback. Navigation works without JavaScript through static route links; JavaScript-only toolbar/motion enhancements are optional.

See [editing content](28-EDITING-CONTENT.md), [project editing](24-ADDING-PROJECTS.md) and [verification](verification/REPORT.md). Next milestone: populate verified identity, portrait, biography and real project evidence, then review their actual text lengths and outbound destinations before launch.
