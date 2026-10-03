> Current revision: [restored garage with moving car](26-RESTORED-GARAGE.md). This supersedes conflicting visual/layout instructions below; path-based routing is retained.

> Current owner-approved revision: [large window and reference navigation](25-REFERENCE-NAVIGATION.md). It supersedes conflicting layout and routing descriptions below.

> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 09 · Animation rules

## One motion language

Motion communicates weight, place, and focus. The garage feels substantial; the UI feels immediate. Native scrolling stays untouched. No scroll-jacking, automatic section snapping, camera shake, bouncing controls, cursor trails, or repeating racing-light flashes.

| Interaction | Proposed duration | Movement / easing |
|---|---|---|
| Link/button feedback | 120–180ms | Color/opacity, optional 1px press |
| Menu disclosure | 180–240ms | Small opacity/transform transition |
| Optional text reveal | 280–400ms | ≤12px translation; text visible without JS |
| Poster-to-scene transition | 250–400ms | Opacity only after first frame |
| Selected skill highlight | 200–300ms | Light/material emphasis, no flashing |
| Door movement | 500–800ms equivalent | Controlled ease-out, tied to local progress |

Use a quart/quint-like ease-out for UI. Scrubbed camera progress is linear with respect to the authored path parameter; do not stack multiple smoothing systems. Any optional temporal damping must use delta time and settle quickly enough to preserve scroll responsiveness.

## Scroll mapping

For section `i`, measure `start_i` and `end_i` in document coordinates and compute `p = clamp((scrollY - start_i) / (end_i - start_i), 0, 1)`. Guard zero-length ranges. Apply p to that section's authored camera segment. Suggested local pacing: first 20% approach, middle 60% nearly stationary reading composition, last 20% exit. The actual section height follows real content, not a forced global 10,000px timeline.

Use one shared boundary pose between adjacent segments to avoid jumps. Handle the top and bottom of the page explicitly; if a chapter is shorter than a viewport, clamp to a stable shot. Avoid pins in v1. Navigation jumps update scene position immediately rather than making the visitor watch intermediate travel.

Use reversible animation: doors and lights derive from progress and therefore remain coherent during reverse scroll, restored scroll, and anchor jumps. Avoid one-time callbacks that leave the world in an inconsistent state after seeking.

## Property ownership and lifecycle

GSAP/ScrollTrigger reads scroll and writes progress refs. The R3F rig writes camera position/quaternion or look-target orientation. World components read chapter progress. CSS owns UI hover states. Never give the same property to two animation systems.

Create scoped animation contexts and clean them on unmount, route changes, and breakpoint changes. GSAP's matchMedia can scope responsive animations and revert them when conditions change. [Official matchMedia documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()).

Invalidate demand-render frames on progress changes, resize, or active transitions. Continue invalidating while a damped movement is unsettled; stop when stable. Do not leave a permanent invisible render loop running.

## Reduced motion and sound

Reduced motion defaults to a still poster, no camera travel, no parallax, instant anchor movement, and immediately visible content. An explicit user action may enable motion for that session. Listen for preference changes during the visit and stop motion immediately when requested. “Static” is always available independently of the operating-system setting.

Sound is excluded from v1. If added later, it starts muted, requires deliberate activation, has visible volume/mute controls, pauses when hidden, and carries no essential information.

## Review method

Scrub slowly, fling rapidly, reverse direction, jump to Contact, resize mid-transition, use Back, and toggle reduced motion. Reject clipping, sudden exposure jumps, wobbling text, excessive motion behind paragraphs, or any behavior that impedes selecting and reading text.



