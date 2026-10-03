> Current revision: [restored garage with moving car](26-RESTORED-GARAGE.md). This supersedes conflicting visual/layout instructions below; path-based routing is retained.

# Current direction: large window, introduction and racing straight

This revision supersedes the narrow garage window, walking racer and hash-only section navigation in 23-PIXEL-CIRCUIT.md. It follows the owner's latest request.

## Reference observations

Inspected https://shr5ya-yadav.vercel.app/ in Chrome on 29 September 2026. Start opens /info. About includes section tabs, portrait and introduction. Projects opens /projects with a focused title, screenshot arrows/dots and project arrows/dots. The window provides Back, Forward, Reload, Fullscreen and Close. Close on Projects returns to About; Close on About returns home.

Super 44 reproduces these observed interaction patterns with its own red/black/yellow identity and original racing assets. It does not copy the person's text, portrait, certificates or character art. No claim of exhaustive parity with every reference edge case.

## Implementation

- Large centered window, max-width 1320px with 3% viewport margins. Window content scrolls natively; navigation stays in view. Mobile uses a horizontally scrolling tab strip and fixed visible window controls.
- / starts the circuit view. /info/ opens About first. Section routes: /projects/, /skills/, /certificates/, /contact/. Static exports make each direct URL and refresh work without server rewrites.
- Native links are intercepted inside the interactive scene to update browser history and change HTML panes immediately. Real hrefs work without JavaScript. Browser toolbar Back/Forward uses actual browser history; Reload reloads the document. Fullscreen uses the browser API with a maximized-window fallback when unsupported or denied.
- About contains a banner, round portrait, name/role, short introduction and project/contact links. Personal data has not been supplied; empty fields are explicitly pending, never invented.
- Projects presents one project at a time. Project arrows/dots navigate records, screenshot arrows/dots navigate images. Only one real project is seeded, so project arrows are disabled until more are added. Details can be shared via /projects/#project-SLUG. Legacy /#project-SLUG and #build remain supported.
- An original red open-wheel car crosses a foreground straight with rotating wheels. Motion Off, reduced motion and hidden-document state stop ambient animation. Navigation movement remains 220ms and never delays access to content.
- Missing artwork and preview images preserve usable HTML. Original greybox source remains archived/unreferenced by the landing.

## Add your personal introduction

Edit src/content/profile.json:

```json
{
  "name": "Your actual public name",
  "role": "Your actual role",
  "introduction": ["A short paragraph about who you are and what you build.", "A sentence about your interests or the opportunities you want."],
  "photo": { "src": "/images/profile/portrait.webp", "alt": "Portrait of your public name" }
}
```

This is a template, not publishable personal content. Put your permitted photo in public/images/profile/portrait.webp. A square image of about 600px works well. Until a real photo is supplied the circular portrait area says Portrait pending. Build and preview after editing. No personal photo or text has been taken from the reference.

## Remaining inputs and gates

Real photo, name, role, short introduction, contacts, project destinations and any genuine certificates. Verify Safari/Firefox, a physical phone, manual screen-reader behavior and performance before public launch. Fullscreen behavior depends on the browser, with a layout fallback.

