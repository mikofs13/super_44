# Current direction: reference layout and editable content

3 October 2026. The owner supplied two screenshots and requested their layout and routes, keeping Super 44's own racing theme. This supersedes the compact-window and inactive-profile requirements in [26](26-RESTORED-GARAGE.md). The owner chose editable content files with rebuilds to publish.

Home opens About at `/info/`. A large centered browser window has persistent About, Projects, Skills, Certificates and Contact tabs, real browser Back/Forward/Reload controls, fullscreen and close-to-home controls. Content scrolls natively inside the window; chrome stays in place. Other routes are `/projects/`, `/skills/`, `/certificates/`, `/contact/`. Project details remain `/projects/#project-SLUG`; direct loads and refresh work. Back may leave the site, as normal browser history does.

About has a full-width original garage banner, overlapping circular portrait, name, role, introduction, education and experience. Missing personal information remains explicitly pending. The reference person's identity, portrait, claims and artwork are not reused. Dark content, red chrome and small yellow accents preserve Super 44. The original moving car stays on the blended pit lane below; there is no long entrance transition.

HTML owns every content section and link. JSON is validated and rendered at build time. There is no browser editor, account or database. Existing skills are preserved in the new profile source. Historical 3D remains unreferenced. Motion Off, reduced motion, hidden-document pause, storage failure and failed-image recovery remain supported. The address display is decorative, not an editable browser address field.

On mobile, tabs scroll horizontally and controls remain available. About content scrolls vertically. Fullscreen uses the browser API where supported, with an expanded-window fallback. Navigation works without JavaScript through static route links; JavaScript-only toolbar/motion enhancements are optional.

See [editing content](28-EDITING-CONTENT.md), [project editing](24-ADDING-PROJECTS.md) and [verification](verification/REPORT.md). Next milestone: populate verified identity, portrait, biography and real project evidence, then review their actual text lengths and outbound destinations before launch.

Content update: the owner supplied identity, biography, Addis Tech Group experience (June 2026–Present), and Ethio-Budget with three screenshots and repository URL. Project details now show optional screenshots in a responsive grid without cropping phone screens. Ethio-Budget's confirmed stack is Expo and React Native; repository contents could not be retrieved to verify additional dependencies. No live URL was supplied. Portrait and certificates remain pending.

Latest project presentation: the owner supplied a project-carousel reference. `/projects/` now shows one project's screenshots together in a shared stage with side arrows and leading-image dots. Title, summary, technologies, repository/demo links when supplied, and Explore the build sit beneath. Image and title links retain the existing detail route and full information. Separate project arrows/dots below select records in JSON order; with one record, project arrows are visibly disabled. There is no automatic carousel movement. Native buttons provide keyboard access and live status. Super 44 was removed from active project data and preserved at `src/content/archive/super-44.json`; its old standalone build-notes URL remains as historical compatibility content. Ethio-Budget is the only displayed project. Further projects can be added through the existing JSON workflow.

Owner correction: the overview now displays exactly one screenshot at a time. Previous/Next and screenshot dots replace the current image, wrapping through the screenshot array. A stable responsive display area uses `object-fit: contain` so portrait and landscape images keep their original proportions without cropping. Each image remains clickable to open details. The full detail gallery remains unchanged. This supersedes the combined-image overview above.

30 October 2026: added Enicharet as the second active project after Ethio-Budget. Project arrows/dots are now enabled. Copy and stack come from the local Enicharet README, progress notes and package manifest; the owner confirmed `https://github.com/mikofs13/enicharet`. Its GitHub homepage field supplies `https://enicharet.vercel.app`; live availability could not be verified with the web fetch tool. Existing collection/operations screenshots were inspected and copied from that project's artifacts without modification. Describe the implementation as a test-money prototype, including OTP accounts, private bidding, ledger, settlement and operations; do not claim live payments or physical prize fulfilment. Preserve the single-image overview and clickable detail view.

Contact update: `/contact/` now has a labeled native enquiry form with required name/email/message and an optional project subject, posting through FormSubmit to the existing profile email. Preserve the direct mailto fallback, browser validation, hosted spam check, privacy disclosure and no-JavaScript submission. Keep the static export; no email secret or server was introduced. Owner activation and a real inbox-delivery check remain required: [setup instructions](29-CONTACT-FORM.md).

Certificate update: the owner supplied two DataCamp statements of accomplishment. Added Understanding Artificial Intelligence (August 28, 2026) and Introduction to AI for Work (September 12, 2026), awarded to Michael Feleke. The Certificates page uses two matching dark cards on desktop and a single column on mobile, with original artwork previews, issuer/date text and native PDF links. Previews fit without cropping; failed previews retain titles and PDF access. PDFs were copied unchanged and first pages rendered to optimized WebP images. No external credential-verification URL or professional accreditation was invented. Optional `document` and `preview` fields in editable profile content are build-validated for safe paths and file existence. Native preview/PDF links work without JavaScript. The static preview serves PDFs with application/pdf.

Latest space correction: removed the footer strip below the car, including its duplicate navigation and fictional-circuit label. The enhanced app uses two rows (header and scene) so the previous 44px desktop/42px mobile footer allocation expands the portfolio window. The car lane remains at the viewport's bottom edge, with its existing height and clearance. Motion On/Off now sits in the window toolbar and on the welcome screen, sharing the same state and handler; it stays available in fullscreen. Keep native inner scroll, reduced motion and pause persistence. This supersedes earlier separate-footer descriptions.

## 24 November 2026 · College application portfolio

The About pane leads with the owner’s name and interests, followed by Neway Challenge Academy and its academic results, a short biography, Honors & Awards, Activities & Leadership, and professional experience. The About page presents the owner-provided academic and extracurricular details in editable profile JSON. The original garage artwork remains part of the masthead, and an optional supplied portrait can be displayed. Existing section routes, the project showcase, browser controls and motion preferences are preserved. See the [editing guide](28-EDITING-CONTENT.md).

## 24 November 2026 · Admissions tabs and compact window

About contains the short biography and education. Honors, Activities and Experience each have their own tab and static route at `/honors/`, `/activities/` and `/experience/`. The active tab stays in view in the horizontally scrolling mobile tab strip. The supplied 67% zoom screenshot sets the desktop composition at normal zoom, with a compact centered window, garage artwork visible at both sides, and larger main navigation and in-window status bar. The pit lane stays full width. The editable `photo` field is ready for the owner’s portrait.

## 24 November 2026 · Common App activities

The Activities tab uses all ten entries in the owner’s Common App order. Each entry shows the role, organization, grade levels, category, time commitment and a short account of the work. About reflects the updated chess, debate and volunteering roles.

Owner correction: About also contains Honors & Awards and Experience. Activities remains a separate tab and static route. Honors leads with the engineering fair win, followed by the Ethiopian Mathematics Olympiad entry with its national competition and Addis Ababa placement details.

Certificate update: the Pathways to Space Program certificate is listed with FASESA and Boeing and its issue date of 10 July 2024. The card links to the original PDF in Google Drive.

Certificate update: added Neway Challenge Academy’s Certificate of Excellence for third place at the local science fair, dated 7 May 2024. The card links to the original PDF in Google Drive.

Certificate update: the four Drive-linked certificates now use local WebP previews in the same cards as the DataCamp certificates. Three sideways scans are rotated upright in their previews. Clicking a preview opens its original PDF on Drive.

Portrait update: About shows the owner’s supplied headshot alongside the name. The circular frame adjusts to the available width and uses a centered crop with room above the hair.

Development recovery: validate the profile schema in every mode. Check local image and PDF existence during production builds so a temporarily missing image in development can use the existing preview fallback.
