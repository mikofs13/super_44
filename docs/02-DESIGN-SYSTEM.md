> Current revision: [restored garage with moving car](26-RESTORED-GARAGE.md). This supersedes conflicting visual/layout instructions below; path-based routing is retained.

> Current owner-approved revision: [large window and reference navigation](25-REFERENCE-NAVIGATION.md). It supersedes conflicting layout and routing descriptions below.

> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 02 · Design system

## Art direction

The visitor enters a workshop at blue hour, where charcoal architecture recedes behind ivory lettering and warm task lights. Use a restrained palette: neutral surfaces carry the interface; a burnt-orange signal color marks actions and a few painted car details. This avoids default red-and-black racing imitation while retaining motorsport character.

The hero is asymmetrical: copy occupies approximately five of twelve columns, the car six, with breathing room between. Align project sections to a strong editorial grid. Use full-width project rows with unequal image/text proportions, a compact skill list, a chronological experience list, and an open contact panel. Do not repeat an identical card grid for every section.

## Proposed tokens

```css
:root {
  --surface-base: oklch(0.18 0.008 65);
  --surface-raised: oklch(0.23 0.009 65);
  --surface-panel: oklch(0.28 0.010 65);
  --text-primary: oklch(0.94 0.010 80);
  --text-secondary: oklch(0.76 0.012 80);
  --signal: oklch(0.73 0.15 48);
  --on-signal: oklch(0.18 0.008 65);
  --focus: oklch(0.85 0.10 85);
  --divider: oklch(0.42 0.010 65);
  --radius-control: 0.375rem;
  --radius-media: 0.75rem;
  --page-max: 90rem;
  --reading-max: 68ch;
  --gutter: clamp(1.25rem, 4vw, 4.5rem);
  --section-space: clamp(4rem, 9vw, 9rem);
}
```

These are art-direction starting values. Verify rendered contrast in all states before accepting them. Use dark text on the signal fill. Dividers are decorative; use a stronger border where a control boundary is required. Never rely on a translucent panel over changing 3D light for readable text. Give reading regions an opaque backing.

## Typography

Proposed pair: **Barlow Condensed 600/700** for short display headings, **Source Sans 3 400/600** for body and controls. The former suggests compact garage signage; the latter keeps case studies comfortable. Review real specimens and actual project names before committing. Self-host only licensed WOFF2 files and needed subsets; preserve the font licenses. Catalog links are in [21](21-SOURCES.md).

| Role | Size | Line height | Rule |
|---|---|---|---|
| Hero | clamp(3.5rem, 7vw, 7.5rem) | 0.98 | At most three short lines |
| Section heading | clamp(2.25rem, 4vw, 4.5rem) | 1.08 | Real headings, not baked into images |
| Project title | clamp(1.5rem, 2.5vw, 2.5rem) | 1.2 | Sentence/title case |
| Body | 1.125rem | 1.65 | 60–68ch preferred |
| Small labels | 0.875rem | 1.4 | Short caps allowed; never long paragraphs |

Use a 4px spacing base with 8/12/16/24/32/48/64/96px steps. Group a label and its value closely; separate unrelated content generously. Heading steps should have visible size and weight contrast.

## Components and states

| Component | Default | Hover / focus | Active / unavailable |
|---|---|---|---|
| Primary link | Signal fill, clear action | Slight tonal shift; visible focus ring | Pressed 1px transform; links never fake-disabled |
| Secondary link | Text and underline | Stronger underline | Current location indicated by text and shape |
| Chapter navigation | Plain section names | Underline, no glow | `aria-current="location"` |
| Project row | Image, title, outcome, action | Image may move ≤4px | Whole row only one primary link; avoid nested links |
| View selector | Text buttons: Auto / 3D / Static | Focus ring | Selected state uses text plus fill |
| Status message | Inline near relevant control | No hover dependence | Error includes recovery action |

Touch target goal: 44×44 CSS px. Focus ring: 2px with 3px offset, tested against adjoining surfaces. Use actual buttons for actions and anchors for destinations. Icons supplement text; decorative icons are hidden from assistive technology.

## Material and image language

Use satin paint, powder-coated metal, low-contrast concrete, rubber, and sparse carbon weave. Carbon texture belongs on car parts, not behind body text. Avoid perfect mirrors, bloom halos, floating technology-logo clouds, glass panels everywhere, gradient lettering, and giant spinning trophies.

Project images show real product screens with consistent crops and legible details. Portrait photography should use the same warm/cool balance as the garage. Case studies use quiet solid backgrounds and generous image captions.

## Design review gate

Review 1440px, 1024px, 768px, 390px, and 320px layouts with actual long content. Confirm hierarchy without animation, inspect grayscale distinction, verify contrast, and check that the main action remains obvious in the first viewport. No image-generation or final visual asset is included in this documentation pack.



