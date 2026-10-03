> Current revision: [restored garage with moving car](26-RESTORED-GARAGE.md). This supersedes conflicting visual/layout instructions below; path-based routing is retained.

> Current owner-approved revision: [large window and reference navigation](25-REFERENCE-NAVIGATION.md). It supersedes conflicting layout and routing descriptions below.

> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 12 · Responsive and mobile behavior

## Layout policy

| Range | Layout | Auto visual mode |
|---|---|---|
| Below 768px | Single column, inline chapter links, 4-column grid | Static posters |
| 768–1023px | Compact two-column where content fits, 8-column grid | Static posters; 3D opt-in |
| 1024px and above | Asymmetrical 12-column composition | Medium 3D if eligible |

These are initial layout thresholds. Content pressure, zoom, and input mode take precedence over device labels. A narrow desktop window receives the compact layout. Large touch devices do not acquire hover-only behavior.

## Effective-mode precedence

1. Unsupported graphics or a scene failure → Static, regardless of saved choice.
2. Explicit Static → Static without scene downloads.
3. Reduced-motion preference → Static unless the visitor explicitly enables motion for this session.
4. Explicit 3D → load the appropriate low/medium profile, with adaptation enabled.
5. Auto with data-saving preference where detectable → Static.
6. Auto below 1024px or primarily coarse pointer → Static.
7. Other Auto → eligible desktop 3D after initial content paint.

Treat connection/device hints as optional signals. If an API is unavailable, do not crash or claim a measured capability. Respect a later preference change. A visitor choosing 3D on a compact device starts at Low and sees a clear Static control.

## Mobile composition

Use a 4:3 or portrait-authored car poster below or behind a dedicated hero image region; never crop away the vehicle's defining silhouette to mimic desktop. Keep the name, role, and Projects action above the primary media where space is tight. Project previews stack media, title, short result, and action. Skills use labeled lists or accessible disclosures. Achievements and experience remain normal vertical lists.

Give images explicit dimensions/aspect ratios. Use `svh` only where a stable viewport-sized media region helps; avoid forcing every text section to full viewport height. Account for browser toolbars and safe-area insets. Fixed navigation must leave enough reading area in landscape and at 200% zoom.

## Input behavior

No essential hover information. No horizontal drag needed to reach projects. Native touch scroll and pinch zoom work. Buttons have 44px target goals and spacing. Menus close on destination activation and on Escape. A canvas cannot intercept scroll gestures in v1.

## Resize and orientation

Recalculate section ranges after layout settles. Preserve the reader's approximate content position; do not reset to the hero. Switch scene/poster in the same media box. If changing to Static, stop timers and release scene resources; switching back requires the loading boundary and a first-frame check again.

## Acceptance

Test 320, 390, 768, 1024, and 1440 CSS px; landscape phones; 200% zoom; large system text; coarse-pointer desktop; and one modest real phone. There should be no page-level horizontal scrolling, clipped controls, inaccessible menu items, or missing content. Long names and project titles must wrap intentionally.



