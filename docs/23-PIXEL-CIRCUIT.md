> Current owner-approved revision: [large window and reference navigation](25-REFERENCE-NAVIGATION.md). It supersedes conflicting layout and routing descriptions below.

# Approved pixel circuit milestone

29 September 2026. This document supersedes the earlier 3D landing direction for the current milestone. The owner chose concept B: a wide fictional racing circuit leading directly into a pit garage, with red/black pixel scenery and restrained yellow accents.

## Experience and architecture

- The landing uses optimized decorative WebP artwork, not a canvas. All content and navigation remain server-rendered HTML.
- Enter pit lane navigates immediately to the garage. Only the background has a 220ms opacity/scale animation. There is no approach screen, loading gate, scroll lock, or forced playback.
- Direct navigation, mobile, reduced motion, and Motion Off skip the effect. The preference is stored defensively; unavailable storage does not break navigation.
- Native scrolling works in both directions. Section links maintain URL hashes, focus, and browser history. Without JavaScript all sections remain visible.
- React owns section visibility; the Web Animations API owns the optional background animation. Owned animation, animation-frame work, and listeners are cleaned up.
- Static images are the default presentation. The earlier Static/3D switch is replaced by Motion On/Off because this version has no optional 3D scene. Previous scene source and tests are preserved as historical work, not loaded by the landing.
- Missing artwork leaves a dark background and all usable HTML. There are no model requests to fail in the new presentation.

## Design and responsive behavior

Near-black #101116, red #ed384b, cream #f8f1dc, yellow #f4cf61. Locally served Press Start 2P is reserved for short headings; Source Sans 3 carries body copy. Header links and the garage window are real links, not painted artwork or simulated operating-system controls.

Desktop shows the driver/car to the left of the window. At 767px and below, garage art becomes a banner above the window. Navigation stays visible. No hover-only interactions.

## Assets and budgets

Original generated fictional scenery is recorded in assets-source/pixel-circuit. No reference-site assets were copied. The art brief excluded official teams, logos, sponsor marks and identifiable circuit layouts. Inspect again before public launch; generation is not a legal clearance guarantee.

WebP exports: circuit wide 260986 bytes, small 89890; garage wide 206260, small 76152. Source images are not shipped from public. Small exports are selected on mobile via CSS; the project thumbnail uses the small circuit. Fonts are local with license notices in public/fonts. No WebGL or animation library is imported by the current landing.

## Next milestone

Replace the honest work-in-progress content with a verified biography, contact/social links, and at least one additional real project case study. Acceptance: working real links, evidence for every claim, useful project detail routes, keyboard and mobile QA, and no placeholder launch copy. Real-device performance, Safari/Firefox and screen-reader review remain release gates.

## Interaction correction: one scene and an animated racer

The owner's subsequent feedback supersedes the two stacked full-screen sections described above. Shortening the transition did not mean removing the character animation.

- The enhanced portfolio now occupies one viewport. Circuit and garage are states in that scene; navigation swaps HTML in the same window rather than scrolling between full pages.
- An original code-drawn pixel racer walks across the foreground. Another lap restarts its walk; navigation gives it a 220ms movement. Navigation and content do not wait for the racer.
- The HTML window uses native scrolling for content that exceeds its available height, including on mobile. Header, close control, section navigation, and Motion control stay available.
- Hash routes #hero, #projects, #skills, #about, #contact and #build support direct access, refresh, Back and Forward. Build notes open inside the same window. The earlier /projects/super-44/ URL is preserved for compatibility but is not used by primary navigation.
- Motion Off, reduced motion, and a hidden document stop ambient animation. No JavaScript means ordinary stacked HTML with anchor navigation. Missing artwork does not remove content.
- The reference website could not be re-inspected: both browser and web retrieval failed. These routing choices implement the owner's stated behavior; exact equivalence to the reference's URL scheme is not claimed.

Current acceptance: all section switches stay in one scene, project details do not leave the page, history and reload restore the section, visible racer animation can be stopped, long content remains reachable with native scrolling, and keyboard/failure fallbacks remain usable.

## Project content
Cards and in-window details are generated from src/content/projects.json. Each project has a preview, summary, description, stack, and optional repo/live URLs. Details use #project-SLUG; legacy #build selects the first project. See [authoring guide](24-ADDING-PROJECTS.md).

